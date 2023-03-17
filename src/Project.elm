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
    , thumbnail : FootageMetadata
    , footage : List Footage
    , externalLink : Maybe String
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


type FootageAbout
    = Final
    | Process


type Footage
    = Image FootageMetadata
    | Video FootageMetadata
    | YoutubeEmbedded FootageMetadata
    | VimeoEmbedded FootageMetadata


unpackFootage : Footage -> FootageMetadata
unpackFootage footage =
    case footage of
        Image data ->
            data

        Video data ->
            data

        YoutubeEmbedded data ->
            data

        VimeoEmbedded data ->
            data


type alias FootageMetadata =
    { fileName : String
    , description : String
    , footageAbout : FootageAbout
    }


type alias Project =
    { id : String
    , variables : ProjectVariables
    , text : ProjectText
    , sources : ProjectSources
    , tags : ProjectTags
    }


getFootagePath : FootageMetadata -> Project -> String
getFootagePath footage project =
    "../media/images/projects/" ++ project.sources.folderName ++ "/" ++ footage.fileName
