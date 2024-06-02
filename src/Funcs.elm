module Funcs exposing (when)

import Project exposing (Project)
import Url.Parser as Parser exposing (Parser, string)


when : Bool -> a -> a -> a
when condition trueValue falseValue =
    if condition then
        trueValue

    else
        falseValue