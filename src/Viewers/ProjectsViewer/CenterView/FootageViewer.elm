module Viewers.ProjectsViewer.CenterView.FootageViewer exposing (..)

import Animator
import Browser exposing (..)
import Element exposing (..)
import Element.Background as Background
import Element.Events as Events
import Element.Font as Font
import Embed.Youtube as YTEmbed
import Embed.Youtube.Attributes as YTAttributes
import Funcs exposing (when)
import Html exposing (audio, iframe, source, video)
import Html.Attributes as Attributes exposing (style)
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

        footageWrapper footageEl =
            el
                [ width fill
                , height fill
                , alpha <|
                    Animator.move projectTransition
                        (\currProject -> Animator.at (when (project.id == currProject.id) 1 0))
                , inFront footageEl
                ]
                none

        footage =
            possibleFootage
                |> Maybe.withDefault (Custom [ { textDescription = "Footage not found", href = "" } ])
    in
    footageWrapper
        (case footage of
            Project.Image data ->
                el
                    [ width fill
                    , height fill
                    , alpha <|
                        Animator.move footageTransition
                            (\currFootage -> when (currFootage == footageIndex) (Animator.at 1) (Animator.at 0))

                    -- footageTransitionAnimation footageTransition footageIndex 0 1
                    , Background.uncropped <| Project.getFootagePath data project
                    ]
                    none

            Project.Video data ->
                el
                    [ width fill, height fill ]
                    (Element.html
                        (Keyed.node "video_footage" [] <|
                            [ ( data.fileName
                              , video
                                    [ Attributes.controls False
                                    , Attributes.loop True
                                    , Attributes.id data.fileName
                                    , Attributes.preload "auto"
                                    , Attributes.autoplay True
                                    , style "position" "absolute"
                                    , style "top" "50%"
                                    , style "left" "50%"
                                    , style "transform" "translate(-50%, -50%)"
                                    , style "width" "100%"
                                    , style "height" "100%"
                                    , style "object-fit" "contain"
                                    , Attributes.property "muted" (Json.Encode.bool muted)
                                    ]
                                    [ source [ Attributes.src <| Project.getFootagePath data project ] []
                                    ]
                              )
                            ]
                        )
                    )

            Project.YoutubeEmbedded data ->
                el [ width fill, height <| px 600, centerY ] <|
                    Element.html <|
                        YTEmbed.toHtml <|
                            YTEmbed.attributes [ YTAttributes.height 600, YTAttributes.modestBranding ] <|
                                YTEmbed.fromString data.fileName

            Project.VimeoEmbedded data ->
                Element.html <|
                    iframe
                        [ style "position" "absolute"
                        , style "top" "50%"
                        , style "left" "50%"
                        , style "transform" "translate(-50%, -50%)"
                        , style "width" "100%"
                        , style "height" "100%"
                        , style "object-fit" "contain"
                        , Attributes.src <| data.fileName
                        , Attributes.property "frameborder" (Json.Encode.string "0")
                        , Attributes.property "allowfullscreen" (Json.Encode.string "true")
                        ]
                        []

            Project.Audio data ->
                el [ width fill, height fill ] <|
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
                                    , Events.onClick <| Types.LinkClicked <| Browser.External href
                                    , Font.size 15
                                    , Font.center
                                    , centerY
                                    ]
                                <|
                                    text textDescription
                            )
                    )
        )
