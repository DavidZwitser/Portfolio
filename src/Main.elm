module Main exposing (..)

import Animator exposing (..)
import Animator.Inline exposing (..)
import Browser
import Browser.Dom exposing (Error, Viewport, getViewport, getViewportOf)
import Browser.Events exposing (onAnimationFrame, onMouseMove, onResize)
import Browser.Navigation exposing (Key)
import Debug exposing (..)
import Dict
import Element exposing (..)
import Element.Background as Background
import Element.Border as Border
import Element.Events exposing (onClick)
import Element.Font exposing (Font, justify)
import Element.Input
import HomePage exposing (homePage)
import Html exposing (a, button, label)
import Html.Attributes exposing (autoplay, src, style)
import Json.Decode as Decode exposing (Decoder)
import List exposing (maximum)
import List.Extra exposing (..)
import Pixels exposing (Pixels)
import Point2d exposing (Point2d)
import Process
import Project exposing (..)
import ProjectViewerPage3D exposing (projectViewer)
import Projects.CONFINED_SPACE
import Projects.Empty
import Projects.LifeLike
import Projects.MovingUp
import ProjectsViewerPage exposing (projectViewerPage)
import Scene3d exposing (Background)
import Task
import Time exposing (Month, Posix, toDay, toHour)
import TriangularMesh exposing (grid)
import Types exposing (..)
import Url


main =
    Browser.application
        { init = init
        , onUrlChange = UrlChanged
        , onUrlRequest = LinkClicked
        , subscriptions = subscriptions
        , update = update
        , view = view
        }


init : () -> Url.Url -> Browser.Navigation.Key -> ( Model, Cmd Msg )
init _ _ _ =
    ( Model
        { width = 0, height = 0 }
        -- Navigation
        (Animator.init Projects)
        -- Home screen
        (Animator.init Start)
        (Animator.init Closed)
        (Animator.init False)
        -- List projectr viewer
        Projects.MovingUp.data
        Projects.MovingUp.data
        (Animator.init Idle)
        -- Grid project viewer
        [ Projects.CONFINED_SPACE.data, Projects.LifeLike.data, Projects.MovingUp.data ]
        Dict.empty
        ProjectViewerPage3D.initialGridPositions
        Still
        ( 0, 0 )
        Projects.Empty.data
    , Cmd.batch
        [ Task.perform vpToWH getViewport
        , Task.perform Loaded (Task.succeed Animating)
        , Cmd.batch ProjectViewerPage3D.textureLoaders
        ]
    )


vpToWH : Viewport -> Msg
vpToWH viewport =
    AdjustScreenSize
        { width = round viewport.viewport.width
        , height = round viewport.viewport.height
        }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        AdjustScreenSize viewport ->
            ( { model | screenSize = viewport }
            , Cmd.none
            )

        Tick newTime ->
            ( model |> Animator.update newTime animator, Cmd.none )

        Loaded _ ->
            ( { model
                | loaded =
                    model.loaded
                        |> Animator.queue
                            [ Animator.event (Animator.millis 1000) Animating
                            , Animator.event Animator.immediately Finished
                            ]
              }
            , Cmd.none
            )

        UrlChanged url ->
            ( model, Cmd.none )

        LinkClicked request ->
            ( model, Cmd.none )

        MouseDown ->
            ( { model | gridStatus = Dragging }, Cmd.none )

        MouseUp ->
            ( { model | gridStatus = Gliding }, Process.sleep 200 |> Task.perform (always TrySnappingGrid) )

        TrySnappingGrid ->
            if model.gridStatus == Dragging || model.gridStatus == Snapping then
                ( model, Cmd.none )

            else
                ( { model | gridStatus = Snapping, gridMomentum = ( 0, 0 ) }, Cmd.none )

        SnapGridStep time ->
            let
                ( newGrid, arived ) =
                    ProjectViewerPage3D.snapGridTo { x = Tuple.first model.gridMomentum, y = Tuple.second model.gridMomentum } model.gridData
            in
            ( { model
                | gridData = newGrid
                , gridMomentum = ( Tuple.first model.gridMomentum + 0.17, Tuple.second model.gridMomentum + 0.17 )
                , gridStatus =
                    if not arived then
                        Snapping

                    else
                        Still
              }
            , Cmd.none
            )

        GlideGridStep _ ->
            let
                newMomentum =
                    ( Tuple.first model.gridMomentum * 0.9
                    , Tuple.second model.gridMomentum * 0.9
                    )

                newGrid =
                    ProjectViewerPage3D.moveGridPositions 0 newMomentum model.gridData
            in
            ( { model | gridData = newGrid, gridMomentum = newMomentum }, Cmd.none )

        MouseMove dx dy ->
            if model.gridStatus == Dragging then
                let
                    noNaN value =
                        if (value |> isNaN) || (value |> isInfinite) then
                            0

                        else
                            value

                    furthestDistance =
                        ProjectViewerPage3D.itemClosestToCenterWithDefaults model.gridData

                    newGrid =
                        ProjectViewerPage3D.moveGridPositions 0 ( dx, dy ) model.gridData
                in
                ( { model
                    | gridData = newGrid
                    , gridMomentum = ( dx, dy )
                  }
                , Cmd.none
                )

            else
                ( model, Cmd.none )

        OpenContactInfo newStatus ->
            ( { model
                | contactInfoState =
                    model.contactInfoState
                        |> Animator.go Animator.slowly
                            (if current model.contactInfoState == Closed then
                                OpenedBig

                             else
                                Closed
                            )
              }
            , Cmd.none
            )

        OpenNavigationMenu do ->
            ( { model | showingNavigationMenu = model.showingNavigationMenu |> Animator.go Animator.slowly do }, Cmd.none )

        MouseMovedOverBackground ->
            ( model, Cmd.none )

        NavigateTroughProjects dir ->
            let
                newProjectsList =
                    reorderListBasedOnDirection dir model.allProjects

                currProject =
                    Maybe.withDefault Projects.Empty.data <| List.head newProjectsList

                lastProject =
                    Maybe.withDefault Projects.Empty.data <| List.head model.allProjects
            in
            ( { model
                | allProjects = newProjectsList
                , currentProject = currProject
                , lastProject = lastProject
                , transitionProject =
                    model.transitionProject
                        |> Animator.queue
                            [ Animator.event Animator.slowly Out
                            , Animator.event Animator.slowly In
                            ]
              }
            , Cmd.none
            )

        TextureLoaded result ->
            let
                newTextures =
                    case result of
                        ( Err err, name ) ->
                            Dict.insert name (Error <| Debug.log "texture load fail" err) model.textures

                        ( Ok texture, name ) ->
                            Dict.insert name (LoadedTexture texture) model.textures
            in
            ( { model
                | textures = newTextures
              }
            , Cmd.none
            )

        GetViewportScopes ->
            ( model, Cmd.none )

        -- Task.attempt ViewProject getViewportOf "hi" )
        ViewProject project ->
            ( { model | currentProject = project }, Cmd.none )

        ChangePage newPage ->
            ( { model | page = model.page |> Animator.go Animator.slowly newPage }, Cmd.none )



-- tmp : Result x z -> Msg
-- tmp res =


reorderListBasedOnDirection : Direction -> List a -> List a
reorderListBasedOnDirection dir list =
    case list of
        [] ->
            []

        s :: xs ->
            if dir == Right then
                List.append xs [ s ]

            else
                let
                    decomposedList =
                        Maybe.withDefault ( s, [] ) <| List.Extra.unconsLast list
                in
                Tuple.first decomposedList :: Tuple.second decomposedList


animator : Animator.Animator Model
animator =
    Animator.animator
        |> Animator.watchingWith
            .loaded
            (\newLoadedStatus model -> { model | loaded = newLoadedStatus })
            (\_ -> False)
        |> Animator.watchingWith
            .page
            (\newPage model -> { model | page = newPage })
            (\_ -> False)
        |> Animator.watchingWith
            .contactInfoState
            (\newState model -> { model | contactInfoState = newState })
            (\_ -> False)
        |> Animator.watchingWith
            .showingNavigationMenu
            (\newState model -> { model | showingNavigationMenu = newState })
            (\_ -> False)
        |> Animator.watchingWith
            .transitionProject
            (\newState model -> { model | transitionProject = newState })
            (\_ -> False)


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ onResize (\w h -> AdjustScreenSize { width = w, height = h })
        , animator |> Animator.toSubscription Tick model
        , case model.gridStatus of
            Dragging ->
                Sub.batch
                    [ Browser.Events.onMouseMove decodeMouseMove
                    , Browser.Events.onMouseUp (Decode.succeed MouseUp)
                    ]

            Snapping ->
                Time.every (1000 / 60) SnapGridStep

            Gliding ->
                Time.every (1000 / 60) GlideGridStep

            _ ->
                Sub.none
        , Browser.Events.onMouseDown (Decode.succeed MouseDown)
        ]


decodeMouseMove : Decoder Msg
decodeMouseMove =
    Decode.map2 MouseMove
        (Decode.field "movementX" Decode.float)
        (Decode.field "movementY" Decode.float)


loadFadein : Animator.Timeline LoaderStatus -> Element msg
loadFadein timelineRef =
    el
        [ Element.width fill
        , Element.height fill
        , Background.color <| rgb255 0 0 0
        , transparent True
        , htmlAttribute <|
            Animator.Inline.opacity timelineRef <|
                \status ->
                    case status of
                        Start ->
                            Animator.at 1

                        Animating ->
                            Animator.at 0

                        Finished ->
                            Animator.at 0
        , htmlAttribute <|
            Animator.Inline.scale timelineRef <|
                \status ->
                    case status of
                        Start ->
                            Animator.at 1

                        Animating ->
                            Animator.at 1

                        Finished ->
                            Animator.at 0
        ]
        none


view : Model -> Browser.Document Msg
view model =
    let
        vmin =
            if model.screenSize.width < model.screenSize.height then
                toFloat model.screenSize.width

            else
                toFloat model.screenSize.height
    in
    { title = "David Zwitser"
    , body =
        [ layout
            [ inFront <| loadFadein model.loaded
            , Background.color <| rgb 0.9 0.9 0.9
            , clip
            , inFront <|
                Element.Input.button
                    [ Background.color <| rgb 0.2 0.2 0.2
                    , Element.width <| px 50
                    , Element.height <| px 50
                    ]
                    { onPress =
                        Just <|
                            ChangePage
                                (if current model.page == Home then
                                    Projects

                                 else
                                    Home
                                )
                    , label = el [ Element.Font.color <| rgb 1 1 1 ] <| text "Page"
                    }

            -- , Element.Font.family [ Element.Font.typeface "Helvetica", Element.Font.sansSerif ]
            ]
          <|
            column
                [ Element.width fill
                , Element.height fill
                ]
                [ if Animator.current model.page == Home then
                    homePage model vmin

                  else
                    -- ProjectViewerPage3D.projectViewer model.gridData model.textures
                    projectViewerPage model vmin
                ]
        ]
    }
