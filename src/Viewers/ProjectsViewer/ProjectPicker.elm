module Viewers.ProjectsViewer.ProjectPicker exposing (projectPicker)

import Animator exposing (..)
import Element exposing (..)
import Element.Background as Background
import Element.Events as Events
import Element.Font as Font
import Project exposing (..)
import Types exposing (Msg, ViewerPart)


projectPicker : List (Attribute Msg) -> List Project -> Timeline ViewerPart -> Element Msg
projectPicker styles projects viewerPart =
    column
        (styles
            ++ [ scrollbarY
               , alignTop

               --    , Element.Border.width 5
               , width fill
               , height fill

               --    , height <| px <| round <| vmin * 0.9
               --    , spacing 5
               ]
        )
        (projects
            |> List.map
                (\project ->
                    row
                        ([ mouseOver [ Element.alpha 0.8, Element.scale 0.98 ]
                         , Events.onClick <| Types.ProjectClicked project
                         , width fill
                         , height fill
                         , pointer
                         , Background.color <| rgb 0.15 0.15 0.15
                         , padding 50
                         , Element.scale 0.95
                         ]
                         -- ++ (if model.currentProject == project then
                         --         [ Element.scale 1.1 ]
                         --     else
                         --         []
                         --    )
                        )
                        [ column
                            [ width <| fillPortion 2
                            , inFront <|
                                paragraph
                                    [ alpha <|
                                        Animator.move viewerPart
                                            (\state ->
                                                case state of
                                                    Types.ProjectPicker ->
                                                        Animator.at 1

                                                    _ ->
                                                        Animator.at 0
                                            )
                                    , Font.size 13
                                    , clip
                                    , Font.color <| rgb 0.8 0.8 0.8
                                    , padding 15
                                    , width <| fillPortion 1
                                    ]
                                    [ text project.text.shortDescription ]
                            ]
                            [ image
                                [ width fill
                                , height <| px 500
                                , Background.color <| rgb 0.1 0.1 0.1
                                , clip
                                ]
                                { src = Project.getImagePath project.sources.thumbnail project Project.Final, description = "" }
                            , paragraph
                                [ width fill
                                , height fill
                                , Font.size 12
                                , Font.center
                                , padding 5
                                , Background.color <| rgb 0.1 0.1 0.1
                                , Font.color <| rgb 0.9 0.9 0.9
                                ]
                              <|
                                [ text project.text.name ]
                            ]
                        ]
                )
        )
