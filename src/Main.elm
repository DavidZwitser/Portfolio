module Main exposing (..)

import Animator exposing (..)
import Browser
import Browser.Dom exposing (getViewport)
import Browser.Events as BEvents
import Browser.Navigation exposing (load)
import Debug exposing (..)
import Effects.LoadAnimation
import Element exposing (..)
import Element.Background as Background
import Element.Font
import List
import List.Extra exposing (..)
import Project exposing (..)
import Projects.BuildUpAndRelease
import Projects.CONFINED_SPACE
import Projects.CanWorld
import Projects.CuddleKing2000
import Projects.DavidZwitser
import Projects.LifeLike
import Projects.PersonalSharedPhysicsl
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
                    [ animator |> Animator.toSubscription Tick model
                    , BEvents.onResize (\w h -> GotNewScreenSize w h)
                    ]
        }


init : () -> Url.Url -> Browser.Navigation.Key -> ( Model, Cmd Msg )
init _ _ _ =
    ( { loaded = Animator.init False
      , allProjects =
            [ Projects.DavidZwitser.data
            , Projects.CuddleKing2000.data
            , Projects.BuildUpAndRelease.data
            , Projects.CONFINED_SPACE.data
            , Projects.LifeLike.data
            , Projects.PersonalSharedPhysicsl.data
            , Projects.CanWorld.data
            ]
      , activeViewerPart = Animator.init Description
      , projectTransition = Animator.init Projects.DavidZwitser.data
      , footageTransition = Animator.init 0
      , footageAbout = Animator.init Project.Final
      , footageMuted = False
      , footageAutoplay = True
      , onMobile = False
      , screenSize = { w = 0, h = 0 }
      }
    , Cmd.batch
        [ Task.perform PageLoaded (Task.succeed True)
        , Task.attempt
            (\result ->
                case result of
                    Ok viewport ->
                        GotNewScreenSize (round viewport.viewport.width) (round viewport.viewport.height)

                    Err _ ->
                        GotNewScreenSize 0 0
            )
            getViewport
        ]
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
        |> Animator.watchingWith
            .projectTransition
            (\newTransition model -> { model | projectTransition = newTransition })
            (\_ -> False)
        |> Animator.watchingWith
            .footageTransition
            (\newTransition model -> { model | footageTransition = newTransition })
            (\_ -> False)
        |> Animator.watchingWith
            .footageAbout
            (\newFootageAbout model -> { model | footageAbout = newFootageAbout })
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

        GotNewScreenSize w h ->
            ( { model | onMobile = w < h, screenSize = { w = w, h = h } }, Cmd.none )

        PageLoaded _ ->
            ( { model | loaded = model.loaded |> Animator.go Animator.verySlowly True }, Cmd.none )

        UrlChanged _ ->
            ( model, Cmd.none )

        LinkClicked _ ->
            ( model, Cmd.none )

        ProjectClicked project ->
            ( { model
                | footageTransition = model.footageTransition |> Animator.go Animator.slowly 0
                , projectTransition =
                    model.projectTransition
                        |> Animator.go Animator.slowly project
                , footageAbout =
                    model.footageAbout
                        |> Animator.go Animator.immediately Project.Final
              }
            , Cmd.none
            )

        NextFootageClicked dir ->
            let
                currProjectImagesAmount =
                    model.projectTransition
                        |> Animator.current
                        |> Project.getAppropriateFootage (Animator.current model.footageAbout)
                        |> List.length

                currImageIndex =
                    model.footageTransition
                        |> Animator.current

                newImageIndex =
                    clamp 0 currProjectImagesAmount <|
                        if dir == Right then
                            currImageIndex + 1

                        else
                            currImageIndex - 1
            in
            ( { model | footageTransition = model.footageTransition |> Animator.go Animator.quickly newImageIndex }, Cmd.none )

        FootageIndexClicked index ->
            ( { model | footageTransition = model.footageTransition |> Animator.go Animator.quickly index }, Cmd.none )

        NewPagePartHovered viewerPart ->
            ( { model
                | activeViewerPart =
                    model.activeViewerPart
                        |> Animator.queue
                            [ Animator.event Animator.slowly viewerPart ]
              }
            , Cmd.none
            )

        NewFootageTypeClicked newImageType ->
            ( { model
                | footageAbout = model.footageAbout |> Animator.go Animator.quickly newImageType
                , footageTransition = model.footageTransition |> Animator.go Animator.immediately 0
              }
            , Cmd.none
            )

        ToggleMute ->
            ( { model | footageMuted = not model.footageMuted }, Cmd.none )

        ToggleAutoplay ->
            ( { model | footageAutoplay = not model.footageAutoplay }, Cmd.none )

        SetAutoplay value ->
            ( { model | footageMuted = value }, Cmd.none )

        OpenExternalPage url ->
            ( model, load url )
