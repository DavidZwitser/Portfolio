module Viewers.ProjectsViewer.ProjectPicker exposing (projectPicker)

import Animator exposing (..)
import Element exposing (..)
import Element.Background as Background
import Element.Events as Events
import Element.Font as Font
import Element.Input exposing (OptionState(..))
import Project exposing (..)
import Types exposing (Msg(..))


projectPicker : List (Attribute Msg) -> List Project -> Bool -> Animator.Timeline Project -> Element Msg
projectPicker styles projects onMobile projectTransition =
    let
        toProjectTransition id off on =
            Animator.move projectTransition
                (\proj ->
                    if proj.id == id then
                        Animator.at on
                            |> Animator.leaveLate 0.5

                    else
                        Animator.at off
                )
    in
    column
        (styles
            ++ [ scrollbarY
               , alignTop
               , Background.color <| rgb 0.25 0.25 0.25
               , height fill
               ]
        )
        ((if not onMobile then
            [ el
                [ height fill
                , width fill
                , Font.color <| rgb 1 1 1
                , Font.alignRight
                , Font.size 20
                , padding 10
                , pointer
                , Events.onClick <| OpenExternalPage "https://www.instagram.com/coelepinda/"
                , Background.color <| rgb 0.5 0.7 0.5
                ]
              <|
                text "running experimentations"
            ]

          else
            []
         )
            ++ (projects
                    |> List.map
                        (\project ->
                            projectButton onMobile toProjectTransition project
                        )
               )
        )


projectButton : Bool -> (String -> Float -> Float -> Float) -> Project -> Element Msg
projectButton onMobile toProjectTransition project =
    row
        [ width fill
        , height fill
        , inFront <|
            el
                [ alpha <| toProjectTransition project.id 0 1
                , Font.color <| rgb 0.8 0.8 0.8
                , Background.color <| rgb 0.3 0.3 0.3
                , paddingXY (round <| toProjectTransition project.id 0 20) 20
                , centerY
                , Font.bold
                ]
            <|
                text
                    (if onMobile then
                        "^"

                     else
                        "<"
                    )
        ]
        [ -- Pointing arrow when project is selected
          row
            [ mouseOver [ Element.alpha 0.8 ]
            , Events.onClick <| Types.ProjectClicked project
            , scale <| toProjectTransition project.id 1 0.92
            , width <| fillPortion 5
            , height fill
            , pointer
            , Background.color <| rgb 0.15 0.15 0.15
            , padding 50
            ]
            [ column
                [ fillPortion 2
                    |> maximum
                        (if onMobile then
                            400

                         else
                            228
                        )
                    |> width
                , centerX
                ]
                [ paragraph
                    ((if onMobile then
                        [ Font.size 30 ]

                      else
                        [ Font.size 18 ]
                     )
                        ++ [ width fill
                           , height fill
                           , Font.alignRight
                           , padding 5
                           , Background.color <| rgb 0.1 0.1 0.1
                           , Font.color <| rgb 0.9 0.9 0.9
                           ]
                    )
                  <|
                    [ text project.text.name ]
                , image
                    ((if onMobile then
                        [ height <| px 400 ]

                      else
                        [ height <| px 228 ]
                     )
                        ++ [ width fill
                           , Background.color <| rgb 0.1 0.1 0.1
                           , clip
                           , centerX
                           ]
                    )
                    { src = Project.getFootagePath project.sources.thumbnail project, description = project.sources.thumbnail.description }
                ]
            ]
        ]
