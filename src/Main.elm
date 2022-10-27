module Main exposing (..)

import Animator exposing (..)
import Animator.Inline exposing (..)
import Browser
import Browser.Dom exposing (Error, Viewport, getViewport, getViewportOf)
import Browser.Events exposing (onAnimationFrame, onMouseMove, onResize)
import Browser.Navigation exposing (Key)
import Debug exposing (..)
import Element exposing (..)
import Element.Background as Background
import Element.Events exposing (onClick)
import Element.Font exposing (Font, justify)
import Html exposing (a, button, label)
import Html.Attributes exposing (autoplay, src, style)
import Json.Decode as Decode exposing (Decoder)
import List exposing (maximum)
import List.Extra exposing (..)
import Project exposing (..)
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
        -- Navigation
        (Animator.init Projects)
        (Animator.init Start)
        -- List projectr viewer
        Projects.MovingUp.data
        Projects.MovingUp.data
        (Animator.init Idle)
        [ Projects.CONFINED_SPACE.data, Projects.LifeLike.data, Projects.MovingUp.data ]
    , Cmd.batch
        [ Task.perform vpToWH getViewport
        , Task.perform Loaded (Task.succeed Animating)
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

        MouseMovedOverBackground ->
            ( model, Cmd.none )

        NavigateTroughProjects dir ->
            let
                newProjectsList =
                    Debug.log "hi hallo" (reorderListBasedOnDirection dir model.allProjects)

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

        GetViewportScopes ->
            ( model, Cmd.none )

        -- Task.attempt ViewProject getViewportOf "hi" )
        ViewProject project ->
            ( { model | currentProject = project }, Cmd.none )

        ChangePage newPage ->
            ( { model | page = model.page |> Animator.go Animator.slowly newPage }, Cmd.none )


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
            .page
            (\newPage model -> { model | page = newPage })
            (\_ -> False)
        |> Animator.watchingWith
            .transitionProject
            (\newState model -> { model | transitionProject = newState })
            (\_ -> False)
        |> Animator.watchingWith
            .loaded
            (\newLoadedStatus model -> { model | loaded = newLoadedStatus })
            (\_ -> False)


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ onResize (\w h -> AdjustScreenSize { width = w, height = h })
        , animator |> Animator.toSubscription Tick model
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

            -- , Element.Font.family [ Element.Font.typeface "Helvetica", Element.Font.sansSerif ]
            ]
          <|
            column
                [ Element.width fill
                , Element.height fill
                ]
                [ projectViewerPage model vmin
                ]
        ]
    }
