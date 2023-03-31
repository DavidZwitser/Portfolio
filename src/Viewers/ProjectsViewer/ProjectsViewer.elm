module Viewers.ProjectsViewer.ProjectsViewer exposing (projectViewer)

import Angle exposing (degrees)
import Animator exposing (..)
import Animator.Inline exposing (..)
import Color exposing (white)
import Debug exposing (..)
import Element as Element exposing (..)
import Element.Background as Background
import Element.Border as Border
import Element.Events as Events
import Element.Font as Font
import Element.Input as Events
import Palette.Cubehelix exposing (..)
import Palette.Generative exposing (..)
import Project exposing (Medium(..))
import Types exposing (..)
import Viewers.ProjectsViewer.CenterView.CenterView exposing (centerViewer)
import Viewers.ProjectsViewer.Description exposing (description)
import Viewers.ProjectsViewer.ProjectPicker exposing (projectPicker)


activeViewpartAnimation model viewPart from to =
    Animator.move model.activeViewerPart <|
        \state ->
            if state == viewPart then
                Animator.at to
                    |> Animator.leaveSmoothly 0.5

            else
                Animator.at from
                    |> Animator.leaveSmoothly 0.5


projectViewer : Model -> Element Msg
projectViewer model =
    let
        headerStyle =
            [ Font.color <| rgb 0.8 0.8 0.8, Font.size 30, padding 15 ]
    in
    row
        [ width fill
        , height fill
        ]
        [ column
            [ width (fill |> (maximum <| round <| activeViewpartAnimation model Description 80 400))
            , height fill
            , alignLeft
            , Events.onMouseEnter <| NewPagePartHovered Description

            -- , Events.onMouseLeave <| NewPagePartHovered Background
            , Background.color <| rgba 0.3 0.3 (activeViewpartAnimation model Description 0.7 0.5) 1
            , inFront <|
                el
                    [ Element.rotate <| pi * 0.5
                    , Font.color <| rgb 1 1 1
                    , centerY
                    , centerX
                    , alpha <| activeViewpartAnimation model Description 1 0
                    ]
                <|
                    text "DESCRIPTION"
            ]
            [ el [ padding 5, Font.size 30, Font.color <| rgb 0.9 0.9 0.9, alpha <| activeViewpartAnimation model Description 0 1 ] <| text "DESCRPTION"
            , description [ height fill, width fill, alpha <| activeViewpartAnimation model Description 0 1 ] model.projectTransition model.activeViewerPart
            ]
        , column
            [ height fill
            , width fill
            , centerX
            , clipX
            , Events.onMouseEnter <| NewPagePartHovered Description

            -- , Events.onClick <| NewPagePartHovered Background
            , paddingXY (round <| activeViewpartAnimation model Background 25 200) 25
            ]
            [ centerViewer [ width fill, centerY, padding 50 ] model.projectTransition model.footageTransition model.footageAbout model.footageMuted
            ]
        , column
            [ height fill
            , alignRight
            , width (fill |> (maximum <| round <| activeViewpartAnimation model ProjectPicker 80 350))
            , Events.onMouseEnter <| NewPagePartHovered ProjectPicker

            -- , Events.onMouseLeave <| NewPagePartHovered Background
            , Background.color <| rgba 0.3 0.3 (activeViewpartAnimation model ProjectPicker 0.7 0.5) 1
            , inFront <|
                el
                    [ Element.rotate <| pi * -0.5
                    , Font.color <| rgb 1 1 1
                    , centerY
                    , centerX
                    , alpha <| activeViewpartAnimation model ProjectPicker 1 0
                    ]
                <|
                    text "PROJECT PICKER"
            ]
            [ el [ alignRight, padding 5, Font.size 30, Font.color <| rgb 0.9 0.9 0.9, alpha <| activeViewpartAnimation model ProjectPicker 0 1 ] <| text "PROJECT PICKER"
            , projectPicker [ width fill, height fill, alpha <| activeViewpartAnimation model ProjectPicker 0 1 ] model.allProjects model.projectTransition
            ]
        ]
