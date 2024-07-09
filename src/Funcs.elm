module Funcs exposing (styleWhen, when)


when : Bool -> a -> a -> a
when condition trueValue falseValue =
    if condition then
        trueValue

    else
        falseValue


styleWhen : Bool -> List a -> List a
styleWhen condition trueValue =
    if condition then
        trueValue

    else
        []
