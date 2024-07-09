module Viewers.ProjectsViewer.CenterView.FootageOverviewer exposing (..)

import Animator
import Element exposing (..)
import Element.Events as Events
import Funcs exposing (when)
import Html exposing (source, video)
import Html.Attributes as Attributes exposing (style)
import Html.Events as HtmlEvents
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
                                        (\currFootage -> Animator.at (when (currFootage == footageIndex) 1 0))
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
                                    , style "allign-self" "center"
                                    , style "width" "100%"
                                    , style "padding" "5px"
                                    , style "flex-basis" "0px"
                                    , style "min-height" "10vh"
                                    , style "object-fit" "cover"
                                    , style "cursor" "pointer"
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
