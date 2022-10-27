module ProjectsViewerPage exposing (..)

import Animator exposing (..)
import Animator.Css exposing (fontSize)
import Animator.Inline exposing (..)
import Debug exposing (..)
import Dict exposing (Dict)
import Element exposing (..)
import Element.Background as Background
import Element.Border as Border
import Element.Events exposing (onClick)
import Element.Font exposing (Font, justify)
import Element.Input exposing (button)
import Html exposing (a, button, col, div, label)
import Html.Attributes exposing (scope, style)
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
    column [ Element.width fill, Element.height fill ]
        [ -- Project window
          el [ width fill ] (projectViewer model.currentProject vmin)
        , let
            scopeViewerSize =
                0.3
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
                        scopeViewerSize * 0.75
                  in
                  el
                    [ Element.width <| px <| round <| circleSizeMultiplier * vmin
                    , Element.height <| px <| round <| circleSizeMultiplier * vmin
                    , centerX
                    , centerY
                    , htmlAttribute <| Html.Attributes.style "clip-path" ("circle(" ++ toString (vmin * (circleSizeMultiplier * 0.5)) ++ "px at center)")
                    , inFront <|
                        Element.Input.button
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
                            { onPress = Just <| GetViewportScopes
                            , label = text ""
                            }
                    ]
                  <|
                    row
                        [ Element.width fill
                        , Element.height <| px <| round <| circleSizeMultiplier * vmin

                        -- , Element.explain Debug.todo
                        , paddingXY 0 (round (vmin * scopeViewerSize * 0.5))
                        , centerY

                        -- , centerX
                        , scrollbarX

                        -- , clipY
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
        , htmlAttribute <| Html.Attributes.style "scroll-snap-align" "start end"
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


projectViewer : Project -> Float -> Element Msg
projectViewer project vmin =
    column
        [ Element.width <| px <| round <| 0.7 * vmin
        , Background.color <| rgb 1 1 1
        , centerX
        ]
    <|
        [ el styleTitle (text project.text.name)
        , Element.image [ width fill, Border.shadow { offset = ( 0, 0 ), size = 1, blur = 5, color = rgb 0.2 0.2 0.2 } ] { src = Project.getImagePath project.sources.thumbnail project, description = "" }
        , paragraph [ Element.Font.size 9 ] <| [ text project.text.description ]
        , el styleSubtitle <| text "Context"
        , paragraph styleParagraph [ text project.text.context ]
        , el styleSubtitle <| text "Goal"
        , paragraph styleParagraph [ text project.text.goal ]
        , el styleSubtitle <| text "Role"
        , paragraph styleParagraph [ text project.text.myRole ]
        , el styleSubtitle <| text "What went good"
        , paragraph styleParagraph [ text project.text.whatWentGood ]
        , el styleSubtitle <| text "Could have gone better"
        , paragraph styleParagraph [ text project.text.couldHaveGoneBetter ]
        , el styleSubtitle <| text "Learned"
        , paragraph styleParagraph [ text project.text.whatILearned ]
        , el styleSubtitle <| text "Outcome"
        , paragraph styleParagraph [ text project.text.outcome ]
        ]


styleTitle : List (Attribute msg)
styleTitle =
    [ Element.Font.size 45 ]


styleSubtitle : List (Attribute msg)
styleSubtitle =
    [ Element.Font.size 17, Element.Font.color <| rgb 0.3 0.3 0.3 ]


styleParagraph : List (Attribute msg)
styleParagraph =
    [ Element.Font.size 9 ]
