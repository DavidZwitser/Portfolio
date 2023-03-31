module Viewers.ProjectsViewer.Description exposing (description)

import Animator exposing (Timeline)
import Element exposing (..)
import Element.Background as Background
import Element.Font as Font
import Project exposing (Project)
import Types exposing (ViewerPart)


description : List (Attribute msg) -> Timeline Project -> Bool -> Timeline ViewerPart -> Element msg
description styles projectTransition isPortrait viewerPart =
    let
        project =
            projectTransition
                |> Animator.current
    in
    paragraph
        (styles
            ++ [ alignTop
               , height fill
               , width fill
               , Background.color <| rgb 0.25 0.25 0.25

               --    , explain Debug.todo
               , scrollbarY
               , Font.color <| rgb 0.15 0.15 0.15
               ]
        )
        [ column
            (quote isPortrait
                ++ [ width fill ]
            )
          <|
            [ text project.text.shortDescription ]
        , column
            [ padding 3
            , width fill
            , alpha <|
                (Animator.move viewerPart <|
                    \state ->
                        case state of
                            Types.Description ->
                                Animator.at 1
                                    |> Animator.leaveLate 0.8

                            _ ->
                                Animator.at 0
                                    |> Animator.arriveSmoothly 0
                )
            , alignTop
            ]
            (subtitleParagraphPair Left "Context" project.text.context isPortrait
                ++ subtitleParagraphPair Right "Description" project.text.longDescription isPortrait
                ++ subtitleParagraphPair Left "Process" project.text.processDescription isPortrait
                ++ subtitleParagraphPair Right "Philosophy behind it" project.text.philosophy isPortrait
                ++ subtitleParagraphPair Left "Reflections" project.text.reflection isPortrait
            )
        ]


type Align
    = Left
    | Right


subtitleParagraphPair : Align -> String -> String -> Bool -> List (Element msg)
subtitleParagraphPair align titleText paragraphText isPortrait =
    if paragraphText == "" then
        [ none ]

    else
        [ paragraph [ width fill, padding 10 ]
            [ paragraph (styleSubtitle align isPortrait) [ text titleText ]
            , paragraph (styleParagraph align isPortrait) [ text paragraphText ]
            ]
        ]


getAlign : Align -> Attribute msg
getAlign align =
    if align == Left then
        Font.alignLeft

    else
        Font.alignRight


styleSubtitle : Align -> Bool -> List (Attribute msg)
styleSubtitle align isPortrait =
    [ getAlign align
    , padding 3
    , if isPortrait then
        Font.size 30

      else
        Font.size 22
    , Font.color <| rgb 0.7 0.7 0.7
    ]


quote : Bool -> List (Attribute msg)
quote isPortrait =
    [ padding 8
    , if isPortrait then
        Font.size 20

      else
        Font.size 15
    , Font.color <| rgb 0.4 0.4 0.4
    ]


styleParagraph : Align -> Bool -> List (Attribute msg)
styleParagraph align isPortrait =
    [ getAlign align
    , if isPortrait then
        Font.size 15

      else
        Font.size 11
    , padding 3
    , Font.color <| rgb 1 1 1
    ]
