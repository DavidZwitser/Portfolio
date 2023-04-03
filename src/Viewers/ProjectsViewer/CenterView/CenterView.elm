module Viewers.ProjectsViewer.CenterView.CenterView exposing (centerViewer)

import Animator
import Animator.Css exposing (opacity)
import Date
import Element exposing (..)
import Element.Background as Background
import Element.Events as Events
import Element.Font as Font exposing (center)
import Element.Input as Input
import List.Extra
import Palette.Cubehelix exposing (..)
import Palette.Generative exposing (..)
import Project exposing (Footage(..), FootageAbout(..), Project, getAppropriateFootage, mediumToString)
import SolidColor exposing (..)
import Types exposing (Msg(..))
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
        [ el [ alignRight ] <| text <| ("team size: " ++ (String.fromInt <| variables.teamSize))
        , el [ alignRight ] <| text <| ("Hours spent: " ++ (String.fromInt <| variables.hoursSpent))
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


footageNavigationButtons : Types.Direction -> Bool -> Bool -> Animator.Timeline Int -> String -> Element Msg
footageNavigationButtons dir onDesktop clickable footageTransition str =
    Input.button
        ((if onDesktop then
            [ width <| px 30 ]

          else
            [ width <| px 60 ]
         )
            ++ [ Background.color <| rgb 0.2 0.2 0.2
               , centerY
               , alpha <| transitionAnimation footageTransition (\_ -> clickable) 0 1
               , height <| px 100
               , padding 10
               , if dir == Types.Left then
                    Font.alignLeft

                 else
                    Font.alignRight
               , Font.color <| rgb 0.5 0.5 0.5
               ]
        )
    <|
        { onPress =
            if clickable then
                Just <| Types.NextFootageClicked dir

            else
                Nothing
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


centerViewer : List (Attribute Msg) -> Animator.Timeline Project -> Animator.Timeline Int -> Animator.Timeline Project.FootageAbout -> Bool -> Bool -> Element Msg
centerViewer importStyles projectTransition footageTransition footageType muted isPortrait =
    let
        project =
            Animator.current projectTransition

        footageIndex =
            Animator.current footageTransition

        currFootageAbout =
            Animator.current footageType

        footageToShow =
            project
                |> getAppropriateFootage currFootageAbout

        amountOfFootageInProject =
            List.length footageToShow

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
                        getAppropriateFootage currFootageAbout project
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
              footageNavigationButtons Types.Left (not isPortrait) (footageIndex > 0) footageTransition "<"
            , -- Standard image
              footageToShow
                |> List.Extra.getAt footageIndex
                |> footageView projectTransition footageTransition muted

            -- Nav button right
            , footageNavigationButtons Types.Right (not isPortrait) (footageIndex < amountOfFootageInProject - 1) footageTransition ">"
            ]

        -- Image selector dots
        , row
            [ centerX
            , alpha <|
                if amountOfFootageInProject > 1 then
                    0.8

                else
                    0
            , spacing 30
            ]
          <|
            let
                footageSelectorDot associatedFootageIndex character =
                    el
                        [ centerX
                        , centerY
                        , height <| px <| 30
                        , Events.onClick <| FootageIndexClicked associatedFootageIndex
                        , Font.size <| round <| transitionAnimation footageTransition (\state -> state == associatedFootageIndex) 20 30

                        -- , Background.color <| rgba 0.3 0.3 0.3 (transitionAnimation footageTransition (\state -> state == associatedFootageIndex) 0 1)
                        , Font.bold
                        , pointer
                        ]
                    <|
                        text character
            in
            footageToShow
                |> List.indexedMap
                    (\i footage ->
                        footageSelectorDot i
                            (case footage of
                                Image _ ->
                                    "⎅"

                                Video _ ->
                                    "⌲"

                                YoutubeEmbedded _ ->
                                    "⇱"

                                VimeoEmbedded _ ->
                                    "⇱"

                                Audio _ ->
                                    "⍩"

                                Custom _ ->
                                    "⎁"
                            )
                    )
        , el
            [ Font.size
                (if isPortrait then
                    20

                 else
                    10
                )
            , centerX
            , Font.center
            , padding 10
            ]
          <|
            text
                (footageToShow
                    |> List.Extra.getAt footageIndex
                    |> Maybe.andThen
                        (\footage ->
                            footage
                                |> Project.unpackFootage
                                |> Maybe.andThen (\footageMetadata -> Just <| footageMetadata.description)
                        )
                    |> Maybe.withDefault "Contact information"
                )
        ]
