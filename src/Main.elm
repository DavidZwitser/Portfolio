module Main exposing (..)

import Animator exposing (..)
import Animator.Css exposing (..)
import Animator.Inline exposing (..)
import Browser
import Browser.Dom exposing (Viewport, getViewport)
import Browser.Events exposing (onResize)
import Browser.Navigation exposing (Key)
import Debug exposing (..)
import Element exposing (..)
import Element.Background as Background
import Element.Border as Border
import Element.Events exposing (onClick)
import Element.Font exposing (Font)
import Element.Input
import Element.Region as Input
import Html exposing (button, label)
import Html.Attributes exposing (..)
import Task
import Time exposing (Month, Posix, toDay, toHour)
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


type LoaderStatus
    = Active
    | AnimatingOut
    | Hidden


type ContactInfoState
    = Closed
    | OpenedBig
    | OpenedSmall


type alias Model =
    { screenSize : { width : Int, height : Int }
    , loaded : Animator.Timeline LoaderStatus
    , page : Animator.Timeline Int
    , contactInfoState : Timeline ContactInfoState
    }


type Msg
    = AdjustScreenSize { width : Int, height : Int }
    | Tick Time.Posix
    | Loaded LoaderStatus
    | UrlChanged Url.Url
    | LinkClicked Browser.UrlRequest
    | OpenContactInfo ContactInfoState


init : () -> Url.Url -> Browser.Navigation.Key -> ( Model, Cmd Msg )
init _ _ _ =
    ( Model
        { width = 0, height = 0 }
        (Animator.init Active)
        (Animator.init 0)
        (Animator.init Closed)
    , Cmd.batch
        [ Task.perform vpToWH getViewport
        , Task.perform Loaded (Task.succeed AnimatingOut)
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
                            [ Animator.event (Animator.millis 1000) AnimatingOut
                            , Animator.event Animator.immediately Hidden
                            ]
              }
            , Cmd.none
            )

        UrlChanged url ->
            ( model, Cmd.none )

        LinkClicked request ->
            ( model, Cmd.none )

        OpenContactInfo _ ->
            ( { model
                | contactInfoState =
                    model.contactInfoState
                        |> Animator.go Animator.quickly
                            (if current model.contactInfoState == Closed then
                                OpenedBig

                             else
                                Closed
                            )
              }
            , Cmd.none
            )


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
                        Active ->
                            Animator.at 1

                        AnimatingOut ->
                            Animator.at 0

                        Hidden ->
                            Animator.at 0
        , htmlAttribute <|
            Animator.Inline.scale timelineRef <|
                \status ->
                    case status of
                        Active ->
                            Animator.at 1

                        AnimatingOut ->
                            Animator.at 1

                        Hidden ->
                            Animator.at 0
        ]
        none


mainPicture : Float -> Msg -> Animator.Timeline LoaderStatus -> Element Msg
mainPicture vmin onClickMsg loadedTimeline =
    el
        [ Border.rounded 150
        , Element.width <| px <| round <| vmin * 0.3
        , Element.height <| px <| round <| vmin * 0.3
        , pointer
        , htmlAttribute <|
            Animator.Inline.scale loadedTimeline <|
                \status ->
                    case status of
                        Active ->
                            Animator.at 2

                        AnimatingOut ->
                            Animator.at 1

                        Hidden ->
                            Animator.at 1
        , clip
        ]
        (image
            [ centerY
            , centerX
            , Element.height fill
            , scrollbars
            , onClick onClickMsg
            , htmlAttribute <|
                Animator.Inline.rotate loadedTimeline <|
                    \status ->
                        case status of
                            Active ->
                                Animator.at 0.2

                            AnimatingOut ->
                                Animator.at 0

                            Hidden ->
                                Animator.at 0
            ]
            { src = "../media/images/pf.JPG", description = "Profile picture" }
        )


contactInfo : Float -> Animator.Timeline ContactInfoState -> Element Msg
contactInfo vmin contactInfoState =
    el
        [ alignLeft
        , moveRight 25
        , Element.Font.size 25
        , spacing 7
        , clip
        , Element.width fill
        , Element.height fill
        , htmlAttribute <|
            Animator.Inline.style contactInfoState "width" (\value -> toString value ++ "vw") <|
                \state ->
                    case state of
                        Closed ->
                            Animator.at 0

                        OpenedBig ->
                            Animator.at 20

                        OpenedSmall ->
                            Animator.at 15
        , htmlAttribute <|
            Animator.Inline.opacity contactInfoState <|
                \state ->
                    case state of
                        Closed ->
                            Animator.at 0

                        OpenedBig ->
                            Animator.at 1

                        OpenedSmall ->
                            Animator.at 1
        ]
        (column [ centerY ]
            [ newTabLink [] { url = "https://github.com/DavidZwitser", label = text "Github" }
            , newTabLink [] { url = "mailto:davidzwitser@gmail.com", label = text "Mail" }
            , newTabLink [] { url = "https://www.instagram.com/coelepinda/", label = text "Instagram" }
            ]
        )


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
            [ inFront <| loadFadein model.loaded ]
          <|
            column
                [ Element.width fill
                , Element.height fill
                ]
                [ row [ centerX, centerY ]
                    [ mainPicture vmin (OpenContactInfo OpenedBig) model.loaded
                    , contactInfo vmin model.contactInfoState
                    ]
                , Element.row [ moveDown 50, centerX, spacing 50 ] [ text "hi", text "hi again" ]
                ]
        ]
    }
