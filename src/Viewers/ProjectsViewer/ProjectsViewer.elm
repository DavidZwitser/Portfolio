module Viewers.ProjectsViewer.ProjectsViewer exposing (projectViewer)

import Animator exposing (..)
import Animator.Inline exposing (..)
import Debug exposing (..)
import Element as Element exposing (..)
import Element.Events as Events
import Element.Font as Font
import Element.Input as Events
import Palette.Cubehelix exposing (..)
import Palette.Generative exposing (..)
import Project exposing (Theme(..))
import Types exposing (..)
import Viewers.ProjectsViewer.Description exposing (description)
import Viewers.ProjectsViewer.ImageViewer exposing (imageViewer)
import Viewers.ProjectsViewer.ProjectPicker exposing (projectPicker)


grow model viewPart =
    Animator.move model.activeViewerPart <|
        \state ->
            if state == viewPart then
                Animator.at 400

            else
                Animator.at 300


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
            [ width <| px <| round <| grow model Description
            , height fill
            , alignLeft
            , Events.onMouseEnter <| NewPagePartHovered Description
            , Events.onMouseLeave <| NewPagePartHovered Background
            ]
            [ el (alignLeft :: headerStyle) <| text "DESCRIPTION"
            , description [ height fill, width fill ] model.currentProject model.activeViewerPart
            ]
        , column
            [ height fill
            , centerX
            , clipX
            , width <| px <| 800
            ]
            [ el (centerX :: headerStyle) <| text "IMAGES"
            , imageViewer [ width fill, centerY, padding 50 ] model.currentProject model.imageIndex
            ]
        , column
            [ height fill
            , alignRight
            , width <| px <| round <| grow model ProjectPicker
            , Events.onMouseEnter <| NewPagePartHovered ProjectPicker
            , Events.onMouseLeave <| NewPagePartHovered Background
            ]
            [ el (alignRight :: headerStyle) <| text "PROJECT PICKER"
            , projectPicker [ width fill, height fill ] model.allProjects model.activeViewerPart
            ]
        ]
