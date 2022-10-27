module ProjectsViewerPage exposing (..)

import Animator exposing (..)
import Animator.Inline exposing (..)
import Debug exposing (..)
import Dict exposing (Dict)
import Element exposing (..)
import Element.Background as Background
import Element.Border as Border
import Element.Events exposing (onClick)
import Element.Font exposing (Font, justify)
import Element.Input exposing (button)
import Html exposing (a, button, col, div, label, nav)
import Html.Attributes exposing (scope, style)
import List exposing (length)
import Project exposing (Project)
import Types exposing (..)


navButton : Maybe Msg -> Element Msg
navButton msg =
    Element.Input.button [ centerX, centerY ]
        { onPress = msg
        , label =
            el
                [ Element.width <| px 50
                , Element.height <| px 50
                , Border.innerShadow
                    { offset = ( 0, 0 )
                    , size = 1
                    , blur = 5
                    , color = rgb 0.2 0.2 0.2
                    }
                , Border.rounded 5
                , spacing 20
                , Element.Font.center
                , paddingXY 50 50
                ]
            <|
                Element.text
                    (if msg == (Just <| NavigateTroughProjects Right) then
                        ">"

                     else
                        "<"
                    )
        }


projectViewerPage : Model -> Float -> Element Msg
projectViewerPage model vmin =
    row [ Element.width fill, Element.height fill ]
        [ -- Project window
          navButton <| Just <| NavigateTroughProjects Left
        , el
            [ width fill ]
            (projectViewer model.currentProject vmin)
        , navButton <| Just <| NavigateTroughProjects Right
        ]


projectViewer : Project -> Float -> Element Msg
projectViewer project vmin =
    column
        [ Element.width <| px <| round <| 0.7 * vmin
        , Background.color <| rgb 1 1 1
        , centerX
        ]
    <|
        [ el styleTitle (text project.text.name)
        , Element.image [ width fill, height <| px 200, Border.shadow { offset = ( 0, 0 ), size = 1, blur = 5, color = rgb 0.2 0.2 0.2 } ] { src = Project.getImagePath project.sources.thumbnail project, description = "" }
        , paragraph [ Element.Font.size 9 ] <| [ text project.text.description ]
        , el styleSubtitle <| text "Context"
        , paragraph styleParagraph [ text project.text.context ]
        , el styleSubtitle <| text "Goal"
        , paragraph styleParagraph [ text project.text.goal ]
        , el styleSubtitle <| text "Role"
        , paragraph styleParagraph [ text project.text.myRole ]
        , el styleSubtitle <| text "What went good"
        , paragraph styleParagraph [ text project.text.whatWentGood ]
        , el styleSubtitle <| text "Could have gone better"
        , paragraph styleParagraph [ text project.text.couldHaveGoneBetter ]
        , el styleSubtitle <| text "Learned"
        , paragraph styleParagraph [ text project.text.whatILearned ]
        , el styleSubtitle <| text "Outcome"
        , paragraph styleParagraph [ text project.text.outcome ]
        ]


styleTitle : List (Attribute msg)
styleTitle =
    [ Element.Font.size 45 ]


styleSubtitle : List (Attribute msg)
styleSubtitle =
    [ Element.Font.size 17, Element.Font.color <| rgb 0.3 0.3 0.3 ]


styleParagraph : List (Attribute msg)
styleParagraph =
    [ Element.Font.size 9 ]
