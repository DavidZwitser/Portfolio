module Viewers.ProjectsViewer.ImageViewer exposing (imageViewer)

import Element exposing (..)
import Element.Background as Background
import Element.Border as Border
import Element.Events as Events
import Element.Font as Font
import Element.Input as Input
import List.Extra
import Palette.Cubehelix exposing (..)
import Palette.Generative exposing (..)
import Project exposing (Project)
import SolidColor exposing (..)
import Types exposing (Msg)


imageViewer : List (Attribute Msg) -> Project -> Int -> Element Msg
imageViewer styles project imageIndex =
    let
        _ =
            project.variables.color

        extrC =
            Element.toRgb project.variables.color

        solidColor =
            SolidColor.fromRGB ( extrC.red * 255, extrC.green * 255, extrC.blue * 255 )

        solidToEl ( r, g, b ) =
            Element.fromRgb { red = r / 255, green = g / 255, blue = b / 255, alpha = 1 }

        palette =
            Palette.Cubehelix.generateAdvanced 4
                { start = solidColor
                , rotationDirection = BGR
                , rotations = 1.5
                , gamma = 1.0
                }

        _ =
            solidToEl <| SolidColor.toRGB <| Maybe.withDefault solidColor (List.Extra.getAt 4 palette)

        _ =
            solidToEl <| SolidColor.toRGB <| Maybe.withDefault solidColor (List.Extra.getAt 2 palette)

        -- solidToEl <| SolidColor.toRGB <| complementary solidColor
    in
    column
        (styles
            ++ [ Background.color <| rgb 0.1 0.1 0.1
               , centerX
               , Font.color <| rgb 0.8 0.8 0.8
               , width fill
               ]
        )
    <|
        [ row
            [ width fill ]
            [ column [ width fill, height fill ]
                [ el styleTitle (text project.text.name)
                , wrappedRow [ spacing 8, Font.size 8, Font.color <| rgb 0.9 0.9 0.9 ]
                    [ row [ spacing 4 ] (project.tags.toolStack |> List.map (\tool -> el [ Background.color <| rgb 0.2 0.2 0.2 ] (text <| Project.toolToString tool)))
                    , row [ spacing 4 ] (project.tags.goals |> List.map (\goal -> el [ Background.color <| rgb 0.25 0.25 0.25 ] (text <| Project.goalToString goal)))
                    , row [ spacing 4 ] (project.tags.themes |> List.map (\theme -> el [ Background.color <| rgb 0.3 0.3 0.3 ] (text <| Project.themeToString theme)))
                    ]
                ]
            , column [ width fill, height fill, Font.size 12, padding 30 ]
                [ el [ alignRight ] <| text <| ("team size: " ++ (Debug.toString <| project.variables.teamSize))
                , el [ alignRight ] <| text <| ("Hours spent: " ++ (Debug.toString <| project.variables.hoursSpent))
                ]
            ]

        -- , Element.image
        --     [ width fill
        --     , height <| px 250
        --     , scrollbarY
        --     --
        --     ]
        --     { src =
        --         Project.getImagePath project.sources.thumbnail project Project.Final
        --     , description = ""
        --     }
        -- , row [ width fill ]
        --     (List.map
        --         (\obj ->
        --             Element.Input.button
        --                 [ width fill
        --                 , Element.Font.center
        --                 , Background.color <| obj.color
        --                 , Element.Font.size 20
        --                 , padding 10
        --                 , Element.Font.color <| rgb 0.2 0.2 0.2
        --                 ]
        --             <|
        --                 { onPress = obj.message, label = text obj.name }
        --         )
        --         [ { name = "view", message = Just <| ChangeProjectSubject Final, color = extraColor2 }
        --         , { name = "process", message = Just <| ChangeProjectSubject Process, color = extraColor1 }
        --         ]
        --     )
        , row [ width fill, paddingXY 0 15 ]
            (List.indexedMap
                (\i p ->
                    if i == imageIndex then
                        el
                            [ width fill
                            , height fill
                            , Background.uncropped <| Project.getImagePath p project Project.Final
                            , inFront <|
                                Input.button [ Background.color <| rgb 0.2 0.2 0.2, centerY, alignLeft, Font.color <| rgb 0.5 0.5 0.5 ]
                                    { onPress =
                                        Just <|
                                            Types.NextImageClicked Types.Left
                                    , label = text "<"
                                    }
                            , inFront <|
                                Input.button [ Background.color <| rgb 0.2 0.2 0.2, centerY, alignRight, Font.color <| rgb 0.5 0.5 0.5 ]
                                    { onPress =
                                        Just <|
                                            Types.NextImageClicked Types.Right
                                    , label = text ">"
                                    }
                            ]
                        <|
                            image
                                [ alpha 0, width fill ]
                                { description = "", src = Project.getImagePath p project Project.Final }

                    else
                        Element.none
                )
                project.sources.resultImages
            )
        , row [ width <| px <| 300, centerX, alpha 0.8 ] <|
            List.indexedMap
                (\i _ ->
                    let
                        size =
                            if imageIndex == i then
                                15

                            else
                                10
                    in
                    el [ centerX, padding 15 ] <|
                        el
                            [ width <| px size
                            , height <| px size
                            , Events.onClick <| Types.ImageIndexClicked i
                            , pointer
                            , centerX
                            , Border.rounded 40
                            , Background.color <| rgb 0.4 0.4 0.4
                            ]
                            none
                )
                project.sources.resultImages
        , row [ width fill, height <| px 50, alpha 0.8 ] <|
            List.indexedMap
                (\i _ ->
                    el
                        [ width <| px 50
                        , height <| px 50
                        , clipY
                        , Events.onClick <| Types.ImageIndexClicked i
                        , pointer
                        ]
                        none
                )
                project.sources.processImages
        ]


styleTitle : List (Attribute msg)
styleTitle =
    [ Font.size 45 ]
