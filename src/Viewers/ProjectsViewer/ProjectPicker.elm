module Viewers.ProjectsViewer.ProjectPicker exposing (projectPicker)

import Animator exposing (..)
import Browser exposing (..)
import Browser.Navigation exposing (..)
import Element exposing (..)
import Element.Background as Background
import Element.Events as Events
import Element.Font as Font
import Funcs exposing (styleWhen, when)
import Project exposing (..)
import Projects.AllProjects exposing (projects)
import Types exposing (Model, Msg(..))


projectPicker : List (Attribute Msg) -> Model -> Element Msg
projectPicker styles model =
    let
        toProjectTransition id off on =
            Animator.move model.projectTransition
                (\proj -> when (proj.id == id) (Animator.at on |> Animator.leaveLate 0.5) (Animator.at off))
    in
    column
        (styles
            ++ [ scrollbarY
               , alignTop
               , Background.color <| rgb 0.25 0.25 0.25
               , height fill
               ]
        )
        (styleWhen (not model.onMobile)
            [ el
                [ height fill
                , width fill
                , Font.color <| rgb 1 1 1
                , Font.alignRight
                , Font.size 20
                , padding 10
                , pointer
                , Events.onClick <| Types.LinkClicked <| Browser.External "https://www.instagram.com/coelepinda/"
                , Background.color <| rgb 0.5 0.7 0.5
                ]
              <|
                text "running experimentations"
            ]
            ++ (projects
                    |> List.map
                        (\project ->
                            projectButton model toProjectTransition project
                        )
               )
        )


projectButton : Model -> (String -> Float -> Float -> Float) -> Project -> Element Msg
projectButton model toProjectTransition project =
    row
        [ width fill
        , height fill
        , pointer
        , inFront <|
            el
                [ alpha <| toProjectTransition project.id 0 1
                , Font.color <| rgb 0.8 0.8 0.8
                , Background.color <| rgb 0.3 0.3 0.3
                , paddingXY (round <| toProjectTransition project.id 0 20) 20
                , centerY
                , Font.bold
                ]
                (text (when model.onMobile "^" "<"))
        ]
        [ let
            url =
                model.url
          in
          row
            ([ mouseOver [ Element.alpha 0.8 ]
             , scale <| toProjectTransition project.id 1 0.92
             , width <| fillPortion 5
             , height fill
             , Background.color <| rgb 0.15 0.15 0.15
             , padding 50
             ]
                ++ styleWhen (Animator.current model.activeViewerPart == Types.ProjectPicker)
                    [ Events.onClick <| Types.LinkClicked <| Browser.Internal { url | fragment = Just project.id } ]
            )
            [ column
                [ fillPortion 2
                    |> maximum (when model.onMobile 400 228)
                    |> width
                , centerX
                ]
                [ paragraph
                    [ Font.size <| when model.onMobile 30 18
                    , width fill
                    , height fill
                    , Font.alignRight
                    , padding 5
                    , Background.color <| rgb 0.1 0.1 0.1
                    , Font.color <| rgb 0.9 0.9 0.9
                    ]
                    [ text project.text.name ]
                , image
                    [ height <| px (when model.onMobile 400 228)
                    , width fill
                    , Background.color <| rgb 0.1 0.1 0.1
                    , clip
                    , centerX
                    ]
                    { src = Project.getFootagePath project.sources.thumbnail project, description = project.sources.thumbnail.description }
                ]
            ]
        ]
