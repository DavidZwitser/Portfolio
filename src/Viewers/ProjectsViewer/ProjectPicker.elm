module Viewers.ProjectsViewer.ProjectPicker exposing (projectPicker)

import Animator exposing (..)
import Element exposing (..)
import Element.Background as Background
import Element.Events as Events
import Element.Font as Font
import Element.Input exposing (OptionState(..))
import Project exposing (..)
import Types exposing (Msg(..), ViewerPart)


projectPicker : List (Attribute Msg) -> List Project -> Animator.Timeline Project -> Element Msg
projectPicker styles projects projectTransition =
    let
        currProject =
            projectTransition
                |> Animator.current

        toProjectTransition id off on =
            Animator.move projectTransition
                (\proj ->
                    if proj.id == id then
                        Animator.at on

                    else
                        Animator.at off
                )
    in
    column
        (styles
            ++ [ scrollbarY
               , alignTop
               , Background.color <| rgb 0.25 0.25 0.25

               --    , Element.Border.width 5
               , fill
                    |> width
               , height fill

               --    , height <| px <| round <| vmin * 0.9
               --    , spacing 5
               ]
        )
        (([ ( "running experimentations", "https://www.instagram.com/coelepinda/" ) ]
            |> List.map
                (\( description, url ) ->
                    el
                        [ height fill
                        , width fill
                        , Font.color <| rgb 1 1 1
                        , Font.alignRight
                        , Font.size 20
                        , padding 10
                        , pointer
                        , Events.onClick <| OpenExternalPage url
                        , Background.color <| rgb 0.5 0.7 0.5
                        ]
                    <|
                        text description
                )
         )
            ++ (projects
                    |> List.map
                        (\project ->
                            row [ width fill, height fill ]
                                [ el
                                    [ width (px <| round <| toProjectTransition project.id 0 30)
                                    , alpha <| toProjectTransition project.id 0 1
                                    , Font.color <| rgb 0.8 0.8 0.8
                                    , Font.center
                                    , Font.bold
                                    , inFront <| el [ width fill, height fill ] none
                                    ]
                                  <|
                                    text "<"
                                , row
                                    [ mouseOver
                                        [ Element.alpha 0.8
                                        ]
                                    , Events.onClick <| Types.ProjectClicked project
                                    , width <| fillPortion 5
                                    , height fill
                                    , pointer
                                    , Background.color <| rgb 0.15 0.15 0.15
                                    , padding 50
                                    ]
                                    [ column
                                        [ fillPortion 2
                                            |> maximum 230
                                            |> width
                                        ]
                                        [ paragraph
                                            [ width fill
                                            , height fill
                                            , Font.size 18
                                            , Font.alignRight
                                            , padding 5
                                            , Background.color <| rgb 0.1 0.1 0.1
                                            , Font.color <| rgb 0.9 0.9 0.9
                                            ]
                                          <|
                                            [ text project.text.name ]
                                        , image
                                            [ width fill
                                            , height <| px <| 200
                                            , Background.color <| rgb 0.1 0.1 0.1
                                            , clip
                                            ]
                                            { src = Project.getFootagePath project.sources.thumbnail project, description = project.sources.thumbnail.description }
                                        ]
                                    ]
                                ]
                        )
               )
        )
