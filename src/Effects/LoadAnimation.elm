module Effects.LoadAnimation exposing (..)

import Animator
import Element exposing (..)
import Element.Background exposing (..)


loadFadein : Animator.Timeline Bool -> Element msg
loadFadein pageLoaded =
    if Animator.arrived pageLoaded then
        none

    else
        el
            [ Element.width fill
            , Element.height fill
            , Element.Background.color <| rgb255 0 0 0
            , transparent True
            , alpha <|
                Animator.move pageLoaded <|
                    \loaded ->
                        if loaded then
                            Animator.at 0

                        else
                            Animator.at 1
            ]
            none
