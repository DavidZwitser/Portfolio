module Routing exposing (urlToProject)

import Project exposing (Project)
import Projects.AllProjects exposing (defaultProject, projects)
import Url exposing (..)
import Url.Parser exposing (..)


type Route
    = Project String
    | DeadEnd


urlParser : Url.Parser.Parser (Route -> a) a
urlParser =
    Url.Parser.map Project Url.Parser.string


urlToProject : Url.Url -> Project
urlToProject url =
    let
        fragUrl =
            { url | path = Maybe.withDefault "" url.fragment, fragment = Nothing }
    in
    Url.Parser.parse urlParser fragUrl
        |> Maybe.withDefault DeadEnd
        |> routeToProject


routeToProject : Route -> Project
routeToProject route =
    case route of
        Project name ->
            List.filter (\project -> project.id == name) projects
                |> List.head
                |> Maybe.withDefault defaultProject

        _ ->
            defaultProject
