module Viewers.ProjectsViewer.CenterView.FootageOverviewer exposing (..)

import Animator
import Element exposing (..)
import Element.Background as Background
import Element.Events as Events
import Element.Font as Font
import Embed.Youtube as YTEmbed
import Embed.Youtube.Attributes as YTAttributes
import Html exposing (audio, iframe, source, video)
import Html.Attributes as Attributes
import Html.Events as HtmlEvents
import Html.Keyed as Keyed
import Json.Encode
import Project exposing (..)
import Types exposing (..)


overviewFootage : Animator.Timeline Project -> Animator.Timeline Int -> List Footage -> Element Msg
overviewFootage projectTransition footageTransition footageToShow =
    let
        project =
            Animator.current projectTransition

        footageIndex =
            Animator.current footageTransition
    in
    Element.column
        [ width fill
        , centerX
        , centerY
        , height fill
        ]
        (footageToShow
            |> List.indexedMap
                (\i footage ->
                    case footage of
                        Project.Image data ->
                            image
                                [ width fill
                                , height fill
                                , clipY
                                , centerX
                                , centerY
                                , padding 5
                                , pointer
                                , alpha <|
                                    Animator.move footageTransition
                                        (\currFootage ->
                                            if currFootage == footageIndex then
                                                Animator.at 1

                                            else
                                                Animator.at 0
                                        )
                                , Events.onClick <| Types.FootageIndexClicked i
                                ]
                                { description = data.description, src = Project.getFootagePath data project }

                        Project.Video data ->
                            html <|
                                video
                                    [ Attributes.controls False
                                    , Attributes.id data.fileName
                                    , Attributes.preload "auto"
                                    , Attributes.autoplay False
                                    , HtmlEvents.onClick <| FootageIndexClicked i
                                    , Attributes.style "allign-self" "center"
                                    , Attributes.style "width" "100%"
                                    , Attributes.style "padding" "5px"
                                    , Attributes.style "flex-basis" "0px"
                                    , Attributes.style "min-height" "10vh"
                                    , Attributes.style "object-fit" "cover"
                                    , Attributes.style "cursor" "pointer"
                                    , Attributes.property "muted" (Json.Encode.bool True)
                                    ]
                                    [ source
                                        [ Attributes.src <| Project.getFootagePath data project
                                        , Attributes.style "max-width" "100%"
                                        , Attributes.style "width" "100%"
                                        , Attributes.style "display" "flex"
                                        , Attributes.style "flex-direction" "column"
                                        , Attributes.style "position" "relative"
                                        ]
                                        []
                                    ]

                        Project.YoutubeEmbedded _ ->
                            Element.none

                        Project.VimeoEmbedded _ ->
                            Element.none

                        Project.Audio _ ->
                            Element.none

                        Project.Custom el ->
                            Element.none
                )
        )
