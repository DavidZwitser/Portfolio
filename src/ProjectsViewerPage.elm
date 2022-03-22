module ProjectsViewerPage exposing (..)

import Animator exposing (..)
import Animator.Inline exposing (..)
import Debug exposing (..)
import Dict exposing (Dict)
import Element exposing (..)
import Element.Background as Background
import Element.Border as Border
import Element.Events exposing (onClick)
import Element.Font exposing (Font, justify)
import Element.Input exposing (..)
import Html exposing (a, button, div, label)
import Html.Attributes exposing (..)
import Project exposing (Project)
import ProjectViewerPage3D exposing (projectViewer)
import Types exposing (..)


navButton : Maybe Msg -> Element Msg
navButton msg =
    Element.Input.button [ centerX, centerY ]
        { onPress = msg
        , label =
            el
                [ Element.width <| px 50
                , Element.height <| px 50
                , Border.innerShadow
                    { offset = ( 0, 0 )
                    , size = 1
                    , blur = 5
                    , color = rgb 0.2 0.2 0.2
                    }
                , Border.rounded 5
                , spacing 20
                , Element.Font.center
                , paddingXY 50 50
                ]
            <|
                Element.text
                    (if msg == (Just <| NavigateTroughProjects Right) then
                        ">"

                     else
                        "<"
                    )
        }


projectViewerPage : Model -> Float -> Element Msg
projectViewerPage model vmin =
    row [ Element.width fill, Element.height fill ]
        [ -- Project window
          let
            scopeViewerSize =
                0.4
          in
          row
            [ Element.width <| px <| round (vmin * scopeViewerSize)
            , Element.height <| px <| round (vmin * scopeViewerSize)
            , centerX
            , centerY
            , Border.rounded 20
            , Border.shadow
                { offset = ( 4, 4 )
                , size = 5
                , blur = 10
                , color = rgb 0.8 0.8 0.8
                }
            , Background.color <| rgba 0.4 0.4 0.4 0.2
            ]
          <|
            [ -- navButton <| Just <| NavigateTroughProjects Right
              row
                [ Element.width fill, Element.height fill ]
                [ let
                    circleSizeMultiplier =
                        0.35
                  in
                  el
                    [ Element.width <| px <| round <| circleSizeMultiplier * vmin
                    , Element.height <| px <| round <| circleSizeMultiplier * vmin
                    , centerX
                    , centerY
                    , htmlAttribute <| Html.Attributes.style "clip-path" ("circle(" ++ toString (vmin * (circleSizeMultiplier * 0.5)) ++ "px at center)")
                    , inFront <|
                        el
                            [ centerX
                            , centerY
                            , htmlAttribute <| Html.Attributes.style "pointer-events" "none"
                            , Element.width fill
                            , Element.height fill
                            , Border.color <| rgba 1 1 1 0.1
                            , Border.rounded 400
                            , Border.innerShadow
                                { offset = ( 0, 0 )
                                , size = 0.5
                                , blur = 20
                                , color = rgb 0.2 0.2 0.2
                                }
                            ]
                            none
                    ]
                  <|
                    row
                        [ Element.width fill

                        -- , Element.height <| px <| round <| circleSizeMultiplier * vmin
                        -- , Element.explain Debug.todo
                        , paddingXY 50 100
                        , centerY
                        , centerX
                        , scrollbarX
                        , Background.color <| rgb 0.9 0.9 0.9
                        , htmlAttribute <| Html.Attributes.style "scroll-snap-type" "both mandatory"
                        , htmlAttribute <| Html.Attributes.style "perspective" "1px"
                        ]
                    <|
                        List.map (\proj -> projectIcon (circleSizeMultiplier * 0.4) vmin proj) model.allProjects

                -- projectViewer gridData textures
                ]

            -- , navButton <| Just <| NavigateTroughProjects Left
            ]
        ]


projectIcon : Float -> Float -> Project -> Element Msg
projectIcon insideCircleSize vmin project =
    el
        [ Element.width <| px <| round <| vmin * insideCircleSize
        , Element.height <| px <| round <| vmin * insideCircleSize
        , paddingXY (round <| vmin * insideCircleSize * 1.3) 0

        -- , Element.width fill
        , htmlAttribute <| Html.Attributes.style "scroll-snap-align" "center"
        , inFront <|
            el
                [ Background.color <| rgba 0.1 0.1 0.1 0
                , Element.Font.color <| rgb 0.8 0.8 0.8
                , clip
                , htmlAttribute <| Html.Attributes.style "transform" "translateZ(0.1px) scale(1.1)"
                , htmlAttribute <| Html.Attributes.style "z-index" "1"

                -- , Element.width fill
                -- , Element.height fill
                -- , htmlAttribute <| Html.Attributes.style "transform" "translateZ(0px)"
                , Element.Font.size <| round <| vmin * 0.12 * insideCircleSize
                , Background.color <| rgb 0.3 0.3 0.3

                -- , Element.width fill
                -- , Border.rounded 80
                , Element.Font.alignLeft
                , Element.Font.center
                , centerY
                , centerX
                , Element.Font.bold
                ]
            <|
                Element.text project.text.name
        ]
    <|
        image
            [ Element.width <| px <| round <| vmin * insideCircleSize

            -- , Element.height <| px <| round <| vmin * insideCircleSize
            -- , Border.width 5
            , Border.color <| rgb 0.8 0.8 0.8
            , centerY
            , centerX
            , clip
            , Border.rounded <| round <| vmin * insideCircleSize * 0.1
            , Border.shadow
                { offset = ( 3, 3 )
                , size = 5
                , blur = 4
                , color = rgb 0.4 0.4 0.4
                }

            -- , htmlAttribute <| Html.Attributes.style "transform" "translateZ(0.3px) scale(0.7)"
            ]
            { src = Project.getImagePath project.sources.thumbnail project, description = "Project image" }


projectViewer : Element Msg
projectViewer =
    el [] <| Element.text "hi"
