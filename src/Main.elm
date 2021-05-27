module Main exposing (..)

import Animator exposing (..)
import Animator.Inline exposing (..)
import Browser
import Browser.Dom exposing (Error, Viewport, getViewport)
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
import List exposing (maximum)
import List.Extra exposing (..)
import Point2d exposing (Point2d)
import Project exposing (..)
import ProjectViewerPage3D exposing (projectViewer)
import Projects.CONFINED_SPACE
import Projects.Empty
import Projects.LifeLike
import Projects.MovingUp
import ProjectsViewerPage exposing (projectViewerPage)
import Task
import Time exposing (Month, Posix, toDay, toHour)
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
        (Animator.init Start)
        (Animator.init Closed)
        (Animator.init False)
        (Animator.init Projects)
        Projects.MovingUp.data
        Projects.MovingUp.data
        (Animator.init Idle)
        [ Projects.CONFINED_SPACE.data, Projects.LifeLike.data, Projects.MovingUp.data ]
        Dict.empty
        (Time.millisToPosix 0)
        0
        0
    , Cmd.batch
        [ Task.perform vpToWH getViewport
        , Task.perform Loaded (Task.succeed Animating)
        , ProjectViewerPage3D.textureLoaders
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

        SetCurrentTime newTime ->
            let
                elapsedTime =
                    Time.posixToMillis newTime - Time.posixToMillis model.lastTime
            in
            ( { model
                | lastTime = newTime
                , deltaTime = elapsedTime
                , elapsedMs = model.elapsedMs + elapsedTime
              }
            , Cmd.none
            )

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
            case result of
                ( Err err, name ) ->
                    ( { model | textures = Dict.insert name (Error <| Debug.log "texture load fail" err) model.textures }, Cmd.none )

                ( Ok texture, name ) ->
                    ( { model | textures = Dict.insert name (LoadedTexture texture) model.textures }, Cmd.none )


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

        -- , Time.every (1000 / 60) SetCurrentTime
        ]


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
                    -- projectViewerPage model vmin
                    ProjectViewerPage3D.projectViewer model
                ]
        ]
    }
