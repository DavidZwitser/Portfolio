module Main exposing (..)

import Animator exposing (..)
import Browser
import Browser.Dom exposing (Viewport, getViewport)
import Browser.Navigation
import Debug exposing (..)
import Effects.LoadAnimation
import Element exposing (..)
import Element.Background as Background
import Element.Font
import List
import List.Extra exposing (..)
import Project exposing (..)
import Projects.CONFINED_SPACE
import Projects.CanWorld
import Projects.DavidZwitser
import Projects.LifeLike
import Projects.MovingUp
import Task
import Types exposing (..)
import Url
import Viewers.ProjectsViewer.ProjectsViewer exposing (projectViewer)


main : Program () Model Msg
main =
    Browser.application
        { init = init
        , onUrlChange = UrlChanged
        , onUrlRequest = LinkClicked
        , update = update
        , view = view
        , subscriptions =
            \model ->
                Sub.batch
                    [ animator |> Animator.toSubscription Tick model ]
        }


init : () -> Url.Url -> Browser.Navigation.Key -> ( Model, Cmd Msg )
init _ _ _ =
    ( { loaded = Animator.init False
      , currentProject = Projects.CONFINED_SPACE.data
      , allProjects =
            [ Projects.DavidZwitser.data
            , Projects.CONFINED_SPACE.data
            , Projects.CanWorld.data
            , Projects.MovingUp.data
            , Projects.LifeLike.data
            ]
      , imageIndex = 0
      , activeViewerPart = Animator.init Background
      }
    , Cmd.batch
        [ Task.perform PageLoaded (Task.succeed True) ]
    )


animator : Animator.Animator Model
animator =
    Animator.animator
        |> Animator.watchingWith
            .loaded
            (\newLoadedStatus model -> { model | loaded = newLoadedStatus })
            (\_ -> False)
        |> Animator.watchingWith
            .activeViewerPart
            (\newViewPart model -> { model | activeViewerPart = newViewPart })
            (\_ -> False)


view : Model -> Browser.Document Msg
view model =
    { title = "David Zwitser"
    , body =
        [ layout
            [ inFront <| Effects.LoadAnimation.loadFadein model.loaded
            , Background.color <| rgb 0.2 0.2 0.2
            , Element.Font.family
                [ Element.Font.external
                    { name = "Trispace"
                    , url = "https://fonts.googleapis.com/css2?family=Trispace:wght@400&display=swap"
                    }
                , Element.Font.sansSerif
                ]
            ]
          <|
            row
                [ Element.height fill
                , Element.width fill
                , padding 20
                , spacing 30
                ]
                [ projectViewer model
                ]
        ]
    }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Tick newTime ->
            ( Animator.update newTime animator model, Cmd.none )

        PageLoaded _ ->
            ( { model | loaded = model.loaded |> Animator.go Animator.verySlowly True }, Cmd.none )

        UrlChanged _ ->
            ( model, Cmd.none )

        LinkClicked _ ->
            ( model, Cmd.none )

        ProjectClicked project ->
            ( { model | currentProject = project, imageIndex = 0 }, Cmd.none )

        NextImageClicked dir ->
            let
                currProjectImagesAmount =
                    List.length model.currentProject.sources.resultImages

                newImageIndex =
                    clamp 0 (currProjectImagesAmount - 1) <|
                        if dir == Right then
                            model.imageIndex + 1

                        else
                            model.imageIndex - 1
            in
            ( { model | imageIndex = newImageIndex }, Cmd.none )

        ImageIndexClicked index ->
            ( { model | imageIndex = index }, Cmd.none )

        NewPagePartHovered viewerPart ->
            ( { model
                | activeViewerPart =
                    model.activeViewerPart
                        |> Animator.queue
                            [ Animator.event Animator.quickly viewerPart ]
              }
            , Cmd.none
            )
