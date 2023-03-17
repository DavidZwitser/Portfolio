module Viewers.ProjectsViewer.FootageViewer exposing (footageViewer)

import Animator
import Element exposing (..)
import Element.Background as Background
import Element.Events as Events
import Element.Font as Font exposing (center)
import Element.Input as Input
import Html exposing (source, video)
import Html.Attributes as Attributes
import List.Extra
import Palette.Cubehelix exposing (..)
import Palette.Generative exposing (..)
import Project exposing (Project, mediumToString)
import SolidColor exposing (..)
import Types exposing (Msg(..))


toolstackDisplay : Project.ProjectTags -> List (Element Msg)
toolstackDisplay tags =
    tags.toolStack
        |> List.map
            (\tool ->
                el
                    [ Background.color <| rgb 0.2 0.2 0.2 ]
                    (text <| Project.toolToString tool)
            )


mediumLabel : Project.ProjectTags -> Element Msg
mediumLabel tags =
    el
        [ center
        , alignRight
        , alignTop
        , Font.size 15
        , Background.color <| rgb255 254 80 0
        , Font.color <| rgb 1 1 1
        , padding 5
        , spacing 20
        , moveDown 6
        ]
    <|
        text (mediumToString tags.medium)


variablesDisplay : Project.ProjectVariables -> Element Msg
variablesDisplay variables =
    column [ width fill, height fill, Font.size 12 ]
        [ el [ alignRight ] <| text <| ("team size: " ++ (Debug.toString <| variables.teamSize))
        , el [ alignRight ] <| text <| ("Hours spent: " ++ (Debug.toString <| variables.hoursSpent))
        ]


typeOfFootageSelector currTypeOfImage =
    [ Project.Final, Project.Process ]
        |> List.map
            (\imageTypeButton ->
                Input.button
                    [ centerY
                    , width fill
                    , height fill
                    , Font.center
                    , Background.color <|
                        if currTypeOfImage == imageTypeButton then
                            rgb 0.5 0.5 0.5

                        else
                            rgb 0.3 0.3 0.3
                    ]
                    { onPress = Just <| NewFootageTypeClicked imageTypeButton
                    , label =
                        text
                            (if imageTypeButton == Project.Final then
                                "final"

                             else if imageTypeButton == Project.Process then
                                "process"

                             else
                                ""
                            )
                    }
            )


footageNavigationButtons : Bool -> Types.Direction -> String -> Element Msg
footageNavigationButtons isVisible dir str =
    Input.button
        [ Background.color <| rgb 0.2 0.2 0.2
        , centerY
        , height <| px 200
        , width <| px <| 30
        , padding 15
        , alpha
            (if isVisible then
                1

             else
                0
            )
        , transparent <| not isVisible
        , if dir == Types.Left then
            Font.alignLeft

          else
            Font.alignRight
        , Font.color <| rgb 0.5 0.5 0.5
        ]
    <|
        { onPress = Just <| Types.NextFootageClicked dir
        , label = text str
        }


transitionAnimation : Animator.Timeline state -> (state -> Bool) -> Float -> Float -> Float
transitionAnimation transition condition from to =
    Animator.move transition
        (\state ->
            if condition state then
                Animator.at to

            else
                Animator.at from
        )


projectTransitionAnimation : Animator.Timeline Project -> Project -> Float -> Float -> Float
projectTransitionAnimation transition openProject from to =
    transitionAnimation transition (\currProject -> currProject.id == openProject.id) from to


footageTransitionAnimation : Animator.Timeline Int -> Int -> Float -> Float -> Float
footageTransitionAnimation transition currFootage from to =
    transitionAnimation transition (\stateFootage -> currFootage == stateFootage) from to


footageView projectTransition footageTransition possibleFootage =
    let
        project =
            Animator.current projectTransition

        footageIndex =
            Animator.current footageTransition
    in
    case possibleFootage of
        Just footage ->
            case footage of
                Project.Image data ->
                    el
                        [ width fill
                        , height fill
                        , alpha <| projectTransitionAnimation projectTransition project 0 1
                        , inFront <|
                            el
                                [ width fill
                                , height fill
                                , alpha <| footageTransitionAnimation footageTransition footageIndex 0 1
                                , Background.uncropped <| Project.getFootagePath data project
                                ]
                                none
                        ]
                    <|
                        none

                Project.Video data ->
                    Element.html
                        (video [ Attributes.controls True, Attributes.loop True, Attributes.style "width" "100%", Attributes.style "height" "60vh" ]
                            [ source [ Attributes.src <| Project.getFootagePath data project ] []
                            ]
                        )

                Project.YoutubeEmbedded _ ->
                    Element.none

                Project.VimeoEmbedded _ ->
                    Element.none

        Nothing ->
            Element.none


overviewFootage projectTransition footageTransition footageToShow =
    let
        project =
            Animator.current projectTransition

        footageIndex =
            Animator.current footageTransition
    in
    Element.column
        [ width fill
        , centerX
        , centerY
        , height fill
        ]
        (footageToShow
            |> List.indexedMap
                (\i footage ->
                    case footage of
                        Project.Image data ->
                            image
                                [ width fill
                                , height fill
                                , clipY
                                , centerX
                                , centerY
                                , padding 5
                                , pointer
                                , alpha <| footageTransitionAnimation footageTransition footageIndex 0 1
                                , Events.onClick <| FootageIndexClicked i
                                ]
                                { description = data.description, src = Project.getFootagePath data project }

                        Project.Video _ ->
                            Element.none

                        Project.YoutubeEmbedded _ ->
                            Element.none

                        Project.VimeoEmbedded _ ->
                            Element.none
                )
        )


footageViewer : List (Attribute Msg) -> Animator.Timeline Project -> Animator.Timeline Int -> Animator.Timeline Project.FootageAbout -> Element Msg
footageViewer importStyles projectTransition footageTransition footageType =
    let
        project =
            Animator.current projectTransition

        footageIndex =
            Animator.current footageTransition

        currTypeOfFootage =
            Animator.current footageType

        footageToShow =
            project.sources.footage
                |> List.filter
                    (\footage ->
                        (Project.unpackFootage footage).footageAbout == currTypeOfFootage
                    )

        amountOfFootageInProject =
            List.length footageToShow

        atFootageOverview =
            footageIndex == amountOfFootageInProject
    in
    column
        (importStyles
            ++ [ Background.color <| rgb 0.1 0.1 0.1
               , centerX
               , Font.color <| rgb 0.8 0.8 0.8
               , height fill
               ]
        )
    <|
        [ -- Top information row
          row
            [ width fill, paddingXY 0 20 ]
            [ -- title and toolstack column
              column [ width fill, height fill ]
                [ let
                    titleLength =
                        toFloat <| String.length project.text.name

                    titleAnimation =
                        projectTransitionAnimation projectTransition project 1 titleLength
                  in
                  -- Title
                  el
                    [ Font.size 45, alignLeft, alignTop ]
                    (project.text.name
                        |> String.left (round titleAnimation)
                        |> text
                    )

                -- Tags
                , row [ Font.size 8, spacing 6, alignTop ] <| toolstackDisplay project.tags
                ]

            -- Medium and variables column
            , column [ width fill, height fill, spacing 20 ]
                [ mediumLabel project.tags
                , variablesDisplay project.variables
                ]
            ]
        , if List.length project.sources.footage > 0 then
            row [ width fill, height <| px 30 ] <| typeOfFootageSelector currTypeOfFootage

          else
            none

        -- Image part
        , row [ width fill, height fill, paddingXY 0 15 ]
            [ -- Nav button left
              footageNavigationButtons (footageIndex > 0) Types.Left "<"
            , if not atFootageOverview then
                -- Standard image
                footageToShow
                    |> List.Extra.getAt footageIndex
                    |> footageView projectTransition footageTransition

              else
                -- Image overview
                overviewFootage projectTransition footageTransition footageToShow

            -- Nav button right
            , footageNavigationButtons
                (footageIndex
                    < (if amountOfFootageInProject > 1 then
                        amountOfFootageInProject

                       else
                        0
                      )
                )
                Types.Right
                ">"
            ]

        -- Image selector dots
        , row
            [ centerX
            , alpha <|
                if amountOfFootageInProject > 1 then
                    0.8

                else
                    0
            ]
          <|
            let
                footageSelectorDot associatedFootageIndex character =
                    el
                        [ centerX
                        , centerY
                        , padding 15
                        , Events.onClick <| FootageIndexClicked associatedFootageIndex
                        , pointer
                        ]
                    <|
                        text character
            in
            (footageToShow
                |> List.indexedMap
                    (\i _ ->
                        if i == footageIndex then
                            -- Selected image dot
                            footageSelectorDot i "✚"

                        else
                            -- Unselected image dot
                            footageSelectorDot i "⚬"
                    )
            )
                ++ [ -- Imgage overview dot
                     footageSelectorDot amountOfFootageInProject "⠶"
                   ]
        ]
