module Viewers.ProjectsViewer.ProjectsViewer exposing (projectViewer)

import Animator exposing (..)
import Animator.Inline exposing (..)
import Element as Element exposing (..)
import Element.Background as Background
import Element.Events as Events
import Element.Font as Font
import Element.Input as Events
import Palette.Generative exposing (..)
import Project exposing (Footage(..), Medium(..))
import Types exposing (..)
import Viewers.ProjectsViewer.CenterView.CenterView exposing (centerViewer)
import Viewers.ProjectsViewer.Description exposing (description)
import Viewers.ProjectsViewer.ProjectPicker exposing (projectPicker)


activeViewPartAnimation : Model -> ViewerPart -> Float -> Float -> Float
activeViewPartAnimation model viewPart from to =
    Animator.move model.activeViewerPart <|
        \state ->
            if state == viewPart then
                Animator.at to

            else
                Animator.at from


projectViewer : Model -> Element Msg
projectViewer model =
    let
        activeViewPart =
            Animator.current model.activeViewerPart

        flowDirection =
            if model.onMobile then
                column

            else
                row

        partBanner partName part =
            el
                ([ Font.color <| rgb 1 1 1
                 , centerY
                 , centerX
                 , alpha <| activeViewPartAnimation model part 1 0
                 ]
                    ++ (if model.onMobile then
                            [ Font.size 60 ]

                        else
                            [ Element.rotate <| pi * 0.5, Font.size 30 ]
                       )
                )
            <|
                text partName

        partTitle partName part =
            el
                [ padding 5
                , if part == ProjectPicker then
                    alignRight

                  else
                    alignLeft
                , if model.onMobile then
                    Font.size 60

                  else
                    Font.size 30
                , Font.color <| rgb 0.9 0.9 0.9
                , alpha <| activeViewPartAnimation model part 0 1
                ]
            <|
                text partName

        partSize part =
            if not model.onMobile then
                [ width (fill |> (maximum <| round <| activeViewPartAnimation model part 80 400)) ]

            else
                [ height (fill |> (maximum <| round <| activeViewPartAnimation model part 80 (toFloat model.screenSize.h))) ]

        partColor part =
            Background.color <| rgba 0.3 0.3 (activeViewPartAnimation model part 0.7 0.5) 1
    in
    flowDirection [ width fill, height fill ]
        [ {- DESCRIPTION column -}
          column
            -- overwriting the width or height fills based on device
            (([ width fill, height fill ] ++ partSize Description)
                ++ [ alignLeft
                   , partColor Description
                   , inFront <| partBanner "DESCRIPTION" Description
                   ] ++ (if model.onMobile then
                        [Events.onClick <| NewPagePartHovered Description]
                    else
                        [Events.onMouseEnter <| NewPagePartHovered Description])
            )
            [ partTitle "DESCRIPTION" Description
            , description
                [ height fill
                , width fill
                , alpha <| activeViewPartAnimation model Description 0 1
                ]
                model.projectTransition
                model.onMobile
                model.activeViewerPart
            ]

        {- CENTER VIEWER element -}
        , flowDirection
            ((if not model.onMobile then
                [ Events.onMouseEnter <| NewPagePartHovered Description
                , paddingXY (round <| activeViewPartAnimation model Background 25 200) 25
                ]

              else
                []
             )
                ++ [ height fill, width fill, centerX, clipX ]
            )
            [ centerViewer
                [ width fill
                , centerY
                , padding 50
                ]
                model.projectTransition
                model.footageTransition
                model.footageAbout
                model.footageMuted
                model.onMobile
            ]

        {- PROJECT PICKER element -}
        , column
            (([ width fill, height fill ] ++ partSize ProjectPicker)
                ++ [ alignRight
                   , partColor ProjectPicker
                   , inFront <| partBanner "PROJECT PICKER" ProjectPicker
                   ] ++ (if model.onMobile then
                        [Events.onClick <| NewPagePartHovered ProjectPicker]
                    else
                        [Events.onMouseEnter <| NewPagePartHovered ProjectPicker])

            )
          <|
            [ partTitle "PROJECT PICKER" ProjectPicker
            , projectPicker
                [ width fill
                , height fill
                , alpha <| activeViewPartAnimation model ProjectPicker 0 1
                ]
                model.allProjects
                model.onMobile
                model.projectTransition
            ]
        ]
