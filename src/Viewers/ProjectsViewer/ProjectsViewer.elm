module Viewers.ProjectsViewer.ProjectsViewer exposing (projectViewer)

import Angle exposing (degrees)
import Animator exposing (..)
import Animator.Inline exposing (..)
import Color exposing (white)
import Element as Element exposing (..)
import Element.Background as Background
import Element.Border as Border
import Element.Events as Events
import Element.Font as Font
import Element.Input as Events
import Palette.Cubehelix exposing (..)
import Palette.Generative exposing (..)
import Project exposing (Footage(..), Medium(..))
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
            [ Font.color <| rgb 0.8 0.8 0.8
            , if model.isPortrait then
                Font.size 60

              else
                Font.size 30
            , padding 15
            ]

        flowDirection =
            if model.isPortrait then
                column

            else
                row
    in
    flowDirection
        [ width fill
        , height fill
        ]
        [ column
            [ width fill
            , height fill
            , if model.isPortrait then
                height (fill |> (maximum <| round <| activeViewpartAnimation model Description 80 (toFloat model.screensize.h) * 0.5))

              else
                width (fill |> (maximum <| round <| activeViewpartAnimation model Description 80 400))
            , alignLeft
            , Events.onMouseEnter <| NewPagePartHovered Description

            -- , Events.onMouseLeave <| NewPagePartHovered Background
            , Background.color <| rgba 0.3 0.3 (activeViewpartAnimation model Description 0.7 0.5) 1
            , inFront <|
                el
                    ([ Font.color <| rgb 1 1 1
                     , centerY
                     , centerX
                     , alpha <| activeViewpartAnimation model Description 1 0
                     ]
                        ++ (if model.isPortrait then
                                [ Font.size 60
                                ]

                            else
                                [ Element.rotate <| pi * 0.5, Font.size 30 ]
                           )
                    )
                <|
                    text "DESCRIPTION"
            ]
            [ el
                [ padding 5
                , if model.isPortrait then
                    Font.size 60

                  else
                    Font.size 30
                , Font.color <| rgb 0.9 0.9 0.9
                , alpha <| activeViewpartAnimation model Description 0 1
                ]
              <|
                text "DESCRPTION"
            , description [ height fill, width fill, alpha <| activeViewpartAnimation model Description 0 1 ] model.projectTransition model.isPortrait model.activeViewerPart
            ]
        , flowDirection
            ([ height fill
             , width fill
             , centerX
             , clipX
             ]
                ++ (if model.isPortrait then
                        []

                    else
                        [ Events.onMouseEnter <| NewPagePartHovered Description, paddingXY (round <| activeViewpartAnimation model Background 25 200) 25 ]
                   )
            )
            [ centerViewer [ width fill, centerY, padding 50 ] model.projectTransition model.footageTransition model.footageAbout model.footageMuted model.isPortrait
            ]
        , column
            [ width fill
            , height fill
            , if model.isPortrait then
                height (fill |> (maximum <| round <| activeViewpartAnimation model ProjectPicker 80 (toFloat model.screensize.h * 0.5)))

              else
                width (fill |> (maximum <| round <| activeViewpartAnimation model ProjectPicker 80 400))
            , alignRight
            , Events.onMouseEnter <| NewPagePartHovered ProjectPicker

            -- , Events.onMouseLeave <| NewPagePartHovered Background
            , Background.color <| rgba 0.3 0.3 (activeViewpartAnimation model ProjectPicker 0.7 0.5) 1
            , inFront <|
                el
                    ([ Font.color <| rgb 1 1 1
                     , centerY
                     , centerX
                     , alpha <| activeViewpartAnimation model ProjectPicker 1 0
                     ]
                        ++ (if model.isPortrait then
                                [ Font.size 60 ]

                            else
                                [ Element.rotate <| pi * -0.5, Font.size 30 ]
                           )
                    )
                <|
                    text "PROJECT PICKER"
            ]
            [ el
                [ alignRight
                , padding 5
                , if model.isPortrait then
                    Font.size 60

                  else
                    Font.size 30
                , Font.color <| rgb 0.9 0.9 0.9
                , alpha <| activeViewpartAnimation model ProjectPicker 0 1
                ]
              <|
                text "PROJECT PICKER"
            , projectPicker [ width fill, height fill, alpha <| activeViewpartAnimation model ProjectPicker 0 1 ] model.allProjects model.isPortrait model.projectTransition
            ]
        ]
