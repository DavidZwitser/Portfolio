module Viewers.ProjectsViewer.CenterView.CenterView exposing (centerViewer)

import Animator
import Date
import Element exposing (..)
import Element.Background as Background
import Element.Events as Events
import Element.Font as Font exposing (center)
import Element.Input as Input
import List.Extra
import Palette.Cubehelix exposing (..)
import Palette.Generative exposing (..)
import Project exposing (Footage(..), FootageAbout(..), Project, getApropiateFootage, mediumToString)
import SolidColor exposing (..)
import Types exposing (Msg(..))
import Viewers.ProjectsViewer.CenterView.FootageOverviewer exposing (overviewFootage)
import Viewers.ProjectsViewer.CenterView.FootageViewer exposing (footageView)


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
    column [ width fill, height fill, Font.size 12, spacing 1 ]
        [ el [ alignRight ] <| text <| ("team size: " ++ (Debug.toString <| variables.teamSize))
        , el [ alignRight ] <| text <| ("Hours spent: " ++ (Debug.toString <| variables.hoursSpent))
        , el [ alignRight ] <|
            text <|
                ("Date: "
                    ++ (variables.date
                            |> Date.toIsoString
                            |> String.split "-"
                            |> List.foldr (\str res -> res ++ str ++ "-") ""
                            |> String.dropRight 1
                       )
                )
        ]


typeOfFootageSelector : FootageAbout -> List (Element Msg)
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


footageNavigationButtons : Types.Direction -> String -> Element Msg
footageNavigationButtons dir str =
    Input.button
        [ Background.color <| rgb 0.2 0.2 0.2
        , centerY
        , height <| px 200
        , width <| px <| 30
        , padding 15
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


centerViewer : List (Attribute Msg) -> Animator.Timeline Project -> Animator.Timeline Int -> Animator.Timeline Project.FootageAbout -> Bool -> Element Msg
centerViewer importStyles projectTransition footageTransition footageType muted =
    let
        project =
            Animator.current projectTransition

        footageIndex =
            Animator.current footageTransition

        currFootageAbout =
            Animator.current footageType

        footageToShow =
            project
                |> getApropiateFootage currFootageAbout

        amountOfFootageInProject =
            List.length footageToShow

        atFootageOverview =
            footageIndex == amountOfFootageInProject

        processFootageExists =
            let
                amountOfProcessFootage =
                    project
                        |> .sources
                        |> .processFootage
                        |> List.length
            in
            amountOfProcessFootage > 0
    in
    column
        (importStyles
            ++ [ Background.color <| rgb 0.1 0.1 0.1
               , centerX
               , Font.color <| rgb 0.8 0.8 0.8
               , height fill
               , inFront <|
                    if
                        getApropiateFootage currFootageAbout project
                            |> List.foldl
                                (\footage foundAVideo ->
                                    foundAVideo
                                        || (case footage of
                                                Video _ ->
                                                    True

                                                _ ->
                                                    False
                                           )
                                )
                                False
                    then
                        Input.button [ alignLeft, alignBottom, padding 20 ]
                            { label =
                                text
                                    (if muted then
                                        "🔇"

                                     else
                                        "🔉"
                                    )
                            , onPress = Just ToggleMute
                            }

                    else
                        none
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
        , if processFootageExists then
            row [ width fill, height <| px 30 ] <| typeOfFootageSelector currFootageAbout

          else
            none

        -- Image part
        , row [ width fill, height fill, paddingXY 0 15 ]
            [ -- Nav button left
              if footageIndex > 0 then
                footageNavigationButtons Types.Left "<"

              else
                Element.none
            , if not atFootageOverview then
                -- Standard image
                footageToShow
                    |> List.Extra.getAt footageIndex
                    |> footageView projectTransition footageTransition muted

              else
                -- Image overview
                overviewFootage projectTransition footageTransition footageToShow

            -- Nav button right
            , if footageIndex < amountOfFootageInProject then
                footageNavigationButtons Types.Right ">"

              else
                Element.none
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
        , el [ Font.size 10, centerX, Font.center, padding 10 ] <|
            text
                (if atFootageOverview then
                    "overview"

                 else
                    footageToShow
                        |> List.Extra.getAt footageIndex
                        |> Maybe.andThen
                            (\footage ->
                                footage
                                    |> Project.unpackFootage
                                    |> Maybe.andThen (\footageMetadata -> Just <| footageMetadata.description)
                            )
                        |> Maybe.withDefault ""
                )
        ]
