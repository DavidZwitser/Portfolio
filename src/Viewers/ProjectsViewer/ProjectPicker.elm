module Viewers.ProjectsViewer.ProjectPicker exposing (projectPicker)

import Animator exposing (..)
import Animator.Css exposing (style)
import Browser exposing (..)
import Browser.Navigation exposing (..)
import Element exposing (..)
import Element.Background as Background
import Element.Events as Events
import Element.Font as Font
import Element.Input exposing (button)
import Funcs exposing (styleWhen, when)
import Html
import Html.Attributes exposing (style)
import Project exposing (..)
import Projects.AllProjects exposing (projects)
import Types exposing (Model, Msg(..), ViewerPart(..))


projectPicker : List (Attribute Msg) -> Model -> Element Msg
projectPicker styles model =
    let
        toProjectTransition id off on =
            Animator.move model.projectTransition
                (\proj -> when (proj.id == id) (Animator.at on |> Animator.leaveLate 0.5) (Animator.at off))
    in
    column
        (styles
            ++ [ alignTop
               , Background.color <| rgb 0.25 0.25 0.25
               , height <| px 200
               , scrollbarY
               , Element.htmlAttribute <| Html.Attributes.style "height" "100vh"
               ]
        )
        (styleWhen (not model.onMobile)
            [ newTabLink
                [ width fill
                , height fill
                , Font.color <| rgb 1 1 1
                , Font.alignRight
                , Font.size 20
                , scrollbarY
                , padding 20
                , Background.color <| rgb 0.5 0.7 0.5
                ]
              <|
                { url = "https://www.instagram.com/coelepinda/", label = text "running experimentations" }
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
    let
        url =
            model.url
    in
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
                , htmlAttribute (Html.Attributes.style "user-select" "none")
                , Font.bold
                ]
                (text (when model.onMobile "^" "<"))
        ]
        [ button [ width fill, height fill, focused [ alpha 1 ] ]
            { onPress = Just <| Types.LinkClicked (Browser.Internal { url | fragment = Just project.id })
            , label =
                row
                    [ mouseOver [ Element.alpha <| toProjectTransition project.id 0.8 1 ]
                    , scale <| toProjectTransition project.id 1 0.92
                    , width <| fillPortion 5
                    , height fill
                    , Background.color <| rgb 0.15 0.15 0.15
                    , padding 50
                    , when (Animator.current model.projectTransition /= project) pointer (alpha 1)
                    ]
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

                            -- , htmlAttribute (Html.Attributes.style "draggable" "false")
                            , htmlAttribute (Html.Attributes.style "user-select" "none")
                            , Background.color <| rgb 0.9 0.9 0.9
                            , Font.color <| rgb 0.2 0.2 0.2
                            ]
                            [ text project.text.name ]
                        , image
                            [ height <| px (when model.onMobile 400 228)
                            , width fill
                            , Background.color <| rgb 0.1 0.1 0.1
                            , htmlAttribute (Html.Attributes.draggable "flase")
                            , clip
                            , centerX
                            ]
                            { src = Project.getFootagePath project.sources.thumbnail project, description = project.sources.thumbnail.description }
                        ]
                    ]
            }
        ]
