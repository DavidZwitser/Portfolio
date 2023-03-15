module Viewers.ProjectsViewer.Description exposing (description)

import Animator exposing (Timeline)
import Element exposing (..)
import Element.Background as Background
import Element.Border as Border
import Element.Font as Font
import Project exposing (Project)
import Types exposing (ViewerPart)


description : List (Attribute msg) -> Timeline Project -> Timeline ViewerPart -> Element msg
description styles projectTransition viewerPart =
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
            (quote
                ++ [ width fill ]
            )
          <|
            [ text (""" " """ ++ project.text.shortDescription ++ """ " """) ]
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
            (subtitleParagraphPair Left "Context" project.text.context
                ++ subtitleParagraphPair Right "Description" project.text.longDescription
                ++ subtitleParagraphPair Left "Process" project.text.processDescription
                ++ subtitleParagraphPair Right "Philosophy behind it" project.text.philosophy
                ++ subtitleParagraphPair Left "Reflections" project.text.reflection
            )
        ]


type Align
    = Left
    | Right


subtitleParagraphPair : Align -> String -> String -> List (Element msg)
subtitleParagraphPair align titleText paragraphText =
    if paragraphText == "" then
        [ none ]

    else
        [ paragraph [ width fill, padding 10 ]
            [ paragraph (styleSubtitle align) [ text titleText ]
            , paragraph (styleParagraph align) [ text paragraphText ]
            ]
        ]


getAlign : Align -> Attribute msg
getAlign align =
    if align == Left then
        Font.alignLeft

    else
        Font.alignRight


styleSubtitle : Align -> List (Attribute msg)
styleSubtitle align =
    [ getAlign align, padding 3, Font.size 22, Font.color <| rgb 0.7 0.7 0.7 ]


quote : List (Attribute msg)
quote =
    [ padding 8, Font.size 15, Font.color <| rgb 0.4 0.4 0.4 ]


styleParagraph : Align -> List (Attribute msg)
styleParagraph align =
    [ getAlign align, Font.size 11, padding 3, Font.color <| rgb 1 1 1 ]
