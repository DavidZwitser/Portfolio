module Viewers.ProjectsViewer.ImageViewer exposing (imageViewer, toolstackDisplay, variablesDisplay)

import Animator
import Element exposing (..)
import Element.Background as Background
import Element.Events as Events
import Element.Font as Font exposing (center)
import Element.Input as Input
import Html.Attributes exposing (title)
import List.Extra
import Palette.Cubehelix exposing (..)
import Palette.Generative exposing (..)
import Project exposing (Project, mediumToString)
import SolidColor exposing (..)
import Types exposing (Msg(..), Transition)


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


typeOfImageSelector currTypeOfImage =
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
                    { onPress = Just <| NewImageTypeClicked imageTypeButton
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


imageNavigationButtons : Bool -> Types.Direction -> String -> Element Msg
imageNavigationButtons isVisible dir str =
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
        { onPress = Just <| Types.NextImageClicked dir
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


imageTransitionAnimation : Animator.Timeline Int -> Int -> Float -> Float -> Float
imageTransitionAnimation transition currImage from to =
    transitionAnimation transition (\stateImage -> currImage == stateImage) from to


standardImageView projectTransition imageTransition image =
    let
        project =
            Animator.current projectTransition

        imageIndex =
            Animator.current imageTransition
    in
    el
        [ width fill
        , height fill
        , alpha <| projectTransitionAnimation projectTransition project 0 1
        , inFront <|
            el
                [ width fill
                , height fill
                , alpha <| imageTransitionAnimation imageTransition imageIndex 0 1
                , Background.uncropped <| Project.getImagePath image project Project.Final
                ]
                none
        ]
    <|
        none


overviewImageView projectTransition imageTransition imagesToShow =
    let
        project =
            Animator.current projectTransition

        imageIndex =
            Animator.current imageTransition
    in
    Element.column
        [ width fill
        , centerX
        , centerY
        , height fill
        ]
        (imagesToShow
            |> List.indexedMap
                (\i ( overviewImage, description ) ->
                    image
                        [ width fill
                        , height fill
                        , clipY
                        , centerX
                        , centerY
                        , padding 5
                        , pointer
                        , alpha <| imageTransitionAnimation imageTransition imageIndex 0 1
                        , Events.onClick <| ImageIndexClicked i
                        ]
                        { description = description, src = Project.getImagePath overviewImage project Project.Final }
                )
        )


imageViewer : List (Attribute Msg) -> Animator.Timeline Project -> Animator.Timeline Int -> Animator.Timeline Project.TypeOfImage -> Element Msg
imageViewer importStyles projectTransition imageTransition imageType =
    let
        project =
            Animator.current projectTransition

        imageIndex =
            Animator.current imageTransition

        currTypeOfImage =
            Animator.current imageType

        imagesToShow =
            if currTypeOfImage == Project.Final then
                project.sources.resultImages

            else
                project.sources.processImages

        amountOfImagesInProject =
            List.length imagesToShow

        atImageOverview =
            imageIndex == amountOfImagesInProject
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
        , if List.length project.sources.processImages > 0 then
            row [ width fill, height <| px 30 ] <| typeOfImageSelector currTypeOfImage

          else
            none

        -- Image part
        , row [ width fill, height fill, paddingXY 0 15 ]
            [ -- Nav button left
              imageNavigationButtons (imageIndex > 0) Types.Left "<"
            , if not atImageOverview then
                -- Standard image
                imagesToShow
                    |> List.Extra.getAt imageIndex
                    |> Maybe.withDefault ( "none", "Image not found" )
                    |> Tuple.first
                    |> standardImageView projectTransition imageTransition

              else
                -- Image overview
                overviewImageView projectTransition imageTransition imagesToShow

            -- Nav button right
            , imageNavigationButtons
                (imageIndex
                    < (if amountOfImagesInProject > 1 then
                        amountOfImagesInProject

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
                if amountOfImagesInProject > 1 then
                    0.8

                else
                    0
            ]
          <|
            let
                imageSelectorDot associatedImageIndex character =
                    el
                        [ centerX
                        , centerY
                        , padding 15
                        , Events.onClick <| ImageIndexClicked associatedImageIndex
                        , pointer
                        ]
                    <|
                        text character
            in
            (imagesToShow
                |> List.indexedMap
                    (\i _ ->
                        if i == imageIndex then
                            -- Selected image dot
                            imageSelectorDot i "✚"

                        else
                            -- Unselected image dot
                            imageSelectorDot i "⚬"
                    )
            )
                ++ [ -- Imgage overview dot
                     imageSelectorDot amountOfImagesInProject "⠶"
                   ]
        ]
