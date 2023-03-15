module Project exposing (..)

import Date exposing (Date)
import Element exposing (Color)


type Client
    = Azerion
    | HKU
    | MediaCollege
    | Cinedans
    | None


type alias ProjectVariables =
    { date : Date
    , hoursSpent : Int
    , teamSize : Int
    , teamMates : Maybe (List ( String, String ))
    , client : Client
    , clientLink : Maybe String
    , color : Color
    }


type alias ProjectText =
    { name : String
    , context : String
    , shortDescription : String
    , longDescription : String
    , processDescription : String
    , myRole : String
    , philosophy : String
    , interestingDetails : Maybe String
    , reflection : String
    }


type alias ProjectSources =
    { folderName : String
    , thumbnail : String
    , resultImages : List ( String, String )
    , processImages : List ( String, String )
    , embedVideo : Maybe String
    , localVideo : Maybe String
    , linkToProject : Maybe String
    }


type Tool
    = Touchdesigner
    | Python
    | Elm
    | DavinciResolve
    | Typescript
    | Processing
    | Blender
    | Houdini
    | SuperCollider
    | Krita
    | AffinityDesigner
    | AffinityPublisher
    | AffinityPhoto
    | Twine
    | Phaser
    | Webpack
    | RaspberryPI
    | Arduino
    | Networking
    | ProjectionMapping
    | Filming
    | Building
    | Woodwork


toolToString : Tool -> String
toolToString tool =
    case tool of
        Touchdesigner ->
            "touchdesigner"

        Python ->
            "python"

        Elm ->
            "elm"

        DavinciResolve ->
            "davici resolve"

        Typescript ->
            "typescript"

        Processing ->
            "processing"

        Blender ->
            "blender"

        Houdini ->
            "houdini"

        SuperCollider ->
            "supercollider"

        Krita ->
            "krita"

        AffinityDesigner ->
            "affinity designer"

        AffinityPhoto ->
            "affinity photo"

        AffinityPublisher ->
            "affinity publisher"

        Twine ->
            "Twine"

        Phaser ->
            "Phaser"

        Webpack ->
            "Webpack"

        RaspberryPI ->
            "raspberry PI"

        Arduino ->
            "arduino"

        Networking ->
            "networking"

        ProjectionMapping ->
            "projection mapping"

        Filming ->
            "filming"

        Building ->
            "building"

        Woodwork ->
            "woodwork"



-- type Genre
--     = Puzzle
--     | Philosophical
--     | Inspirational
--     | Daily
--     | Drama
--     | Interactive
--     | Adventure
--     | Generative
--     | Tactile
--     | Analogue


type Medium
    = Installation
    | Game
    | AudioVisual
    | Human


mediumToString : Medium -> String
mediumToString medium =
    case medium of
        Installation ->
            "installation"

        Game ->
            "game"

        AudioVisual ->
            "audiovisual"

        Human ->
            "human"


type alias ProjectTags =
    { toolStack : List Tool
    , medium : Medium
    }


type alias Project =
    { id : String
    , isFullProject : Bool
    , variables : ProjectVariables
    , text : ProjectText
    , sources : ProjectSources
    , tags : ProjectTags
    }


type TypeOfImage
    = Final
    | Process


getImagePath : String -> Project -> TypeOfImage -> String
getImagePath image project typeOfImage =
    let
        subfolderName =
            if typeOfImage == Final then
                "result"

            else
                "process"
    in
    "../media/images/projects/" ++ project.sources.folderName ++ "/" ++ subfolderName ++ "/" ++ image
