module Viewers.ProjectsViewer.Description exposing (description)

import Animator exposing (Timeline)
import Element exposing (..)
import Element.Background as Background
import Element.Font as Font
import Funcs exposing (when)
import Project exposing (Project)
import Types exposing (ViewerPart)


description : List (Attribute msg) -> Timeline Project -> Bool -> Timeline ViewerPart -> Element msg
description importStyles projectTransition isPortrait viewerPart =
    let
        project =
            projectTransition
                |> Animator.current

        subtitleAttributes align =
            when isPortrait [ Font.size 30 ] [ Font.size 22 ]
                ++ [ alignToFontAlign align
                   , padding 3
                   , Font.color <| rgb 0.7 0.7 0.7
                   ]

        paragraphAttributes align =
            when isPortrait [ Font.size 12 ] [ Font.size 11 ]
                ++ [ alignToFontAlign align
                   , padding 3
                   , Font.color <| rgb 1 1 1
                   ]

        quiteAttributes =
            when isPortrait [ Font.size 20 ] [ Font.size 15 ]
                ++ [ padding 8
                   , Font.color <| rgb 0.4 0.4 0.4
                   ]

        subtitleParagraphPair align titleText paragraphText =
            if paragraphText == "" then
                [ none ]

            else
                [ paragraph [ width fill, padding 10 ]
                    [ paragraph (subtitleAttributes align) [ text titleText ]
                    , paragraph (paragraphAttributes align) [ text paragraphText ]
                    ]
                ]

        alignToFontAlign align =
            when (align == Left) Font.alignLeft Font.alignRight
    in
    paragraph
        (importStyles
            ++ [ alignTop
               , height fill
               , width fill
               , Background.color <| rgb 0.25 0.25 0.25
               , scrollbarY
               , Font.color <| rgb 0.15 0.15 0.15
               ]
        )
        [ column
            [ padding 3
            , width fill
            , alpha <|
                (Animator.move viewerPart <|
                    \state ->
                        case state of
                            Types.Description ->
                                Animator.at 1
                                    |> Animator.leaveLate 1

                            _ ->
                                Animator.at 0
                                    |> Animator.arriveSmoothly 1
                )
            , alignTop
            ]
            -- The texts
            (column (quiteAttributes ++ [ width fill ]) [ text project.text.shortDescription ]
                :: subtitleParagraphPair Left "Context" project.text.context
                ++ subtitleParagraphPair Right "Description" project.text.longDescription
                ++ subtitleParagraphPair Left "Process" project.text.processDescription
                ++ subtitleParagraphPair Right "Philosophy behind it" project.text.philosophy
                ++ subtitleParagraphPair Left "Reflections" project.text.reflection
            )
        ]


type Align
    = Left
    | Right
