module Viewers.ProjectsViewer.CenterView.FootageViewer exposing (..)

import Animator
import Element exposing (..)
import Element.Background as Background
import Element.Events as Events
import Element.Font as Font
import Embed.Youtube as YTEmbed
import Embed.Youtube.Attributes as YTAttributes
import Html exposing (audio, iframe, source, video)
import Html.Attributes as Attributes
import Html.Keyed as Keyed
import Json.Encode
import Project exposing (..)
import Types exposing (Msg)


footageView : Animator.Timeline Project -> Animator.Timeline Int -> Bool -> Maybe Project.Footage -> Element Msg
footageView projectTransition footageTransition muted possibleFootage =
    let
        project =
            Animator.current projectTransition

        footageIndex =
            Animator.current footageTransition
    in
    case possibleFootage of
        Just footage ->
            el
                [ width fill
                , height fill
                , alpha <|
                    Animator.move projectTransition
                        (\currProject ->
                            if project.id == currProject.id then
                                Animator.at 1

                            else
                                Animator.at 0
                        )
                , inFront
                    (case footage of
                        Project.Image data ->
                            el
                                [ width fill
                                , height fill
                                , alpha <|
                                    Animator.move footageTransition
                                        (\currFootage ->
                                            if currFootage == footageIndex then
                                                Animator.at 1

                                            else
                                                Animator.at 0
                                        )

                                -- footageTransitionAnimation footageTransition footageIndex 0 1
                                , Background.uncropped <| Project.getFootagePath data project
                                ]
                                none

                        Project.Video data ->
                            Element.html
                                (Keyed.node "video_footage" [] <|
                                    [ ( data.fileName
                                      , video
                                            [ Attributes.controls False
                                            , Attributes.loop True
                                            , Attributes.id data.fileName
                                            , Attributes.preload "auto"
                                            , Attributes.autoplay True

                                            -- , onClick ToggleAutoplay
                                            , Attributes.style "width" "100%"
                                            , Attributes.property "muted" (Json.Encode.bool muted)
                                            , Attributes.style "height" "55vh"
                                            ]
                                            [ source [ Attributes.src <| Project.getFootagePath data project ] []
                                            ]
                                      )
                                    ]
                                )

                        Project.YoutubeEmbedded data ->
                            Element.html <|
                                YTEmbed.toHtml <|
                                    YTEmbed.attributes [ YTAttributes.height 500 ] <|
                                        YTEmbed.fromString data.fileName

                        Project.VimeoEmbedded data ->
                            Element.html <|
                                iframe
                                    [ Attributes.style "width" "100%"
                                    , Attributes.style "height" "100%"
                                    , Attributes.src <| data.fileName
                                    , Attributes.property "frameborder" (Json.Encode.string "0")
                                    , Attributes.property "allowfullscreen" (Json.Encode.string "true")
                                    ]
                                    []

                        Project.Audio data ->
                            el [ width fill, height fill, centerX, centerY, spacing 10 ] <|
                                Element.html <|
                                    audio
                                        [ Attributes.controls True
                                        , Attributes.autoplay True
                                        , Attributes.style "width" "100%"
                                        , Attributes.style "height" "55%"
                                        , Attributes.property "muted" (Json.Encode.bool muted)
                                        ]
                                        [ source [ Attributes.src <| Project.getFootagePath data project ] []
                                        ]

                        Project.Custom urls ->
                            column [ width fill, height fill, spacing 20 ]
                                (urls
                                    |> List.map
                                        (\{ textDescription, href } ->
                                            el
                                                [ width fill
                                                , pointer
                                                , Events.onClick (Types.OpenExternalPage href)
                                                , Font.size 15
                                                , Font.center
                                                , centerY
                                                ]
                                            <|
                                                text textDescription
                                        )
                                )
                    )
                ]
                none

        Nothing ->
            Element.none
