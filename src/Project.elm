module Project exposing (..)

import Date exposing (Date)
import Element exposing (..)


type Client
    = Azerion
    | HKU
    | MediaCollege
    | Cinedans
    | EXboot
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
    , finalFootage : List Footage
    , processFootage : List Footage
    , externalLink : Maybe String
    }


type Tool
    = Touchdesigner
    | GOLANG
    | Pneumatics
    | PureData
    | Database
    | DataAnalysis
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

        Pneumatics ->
            "pneumatics"

        PureData ->
            "pure data"

        GOLANG ->
            "golang"

        Database ->
            "database"

        DataAnalysis ->
            "data analysis"

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


type alias URl =
    { textDescription : String
    , href : String
    }


type Footage
    = Image FootageMetadata
    | Video FootageMetadata
    | YoutubeEmbedded FootageMetadata
    | VimeoEmbedded FootageMetadata
    | Audio FootageMetadata
    | Custom (List URl)


unpackFootage : Footage -> Maybe FootageMetadata
unpackFootage footage =
    case footage of
        Image data ->
            Just data

        Video data ->
            Just data

        YoutubeEmbedded data ->
            Just data

        VimeoEmbedded data ->
            Just data

        Audio data ->
            Just data

        Custom _ ->
            Nothing


type alias FootageMetadata =
    { fileName : String
    , description : String
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
    "../media/projects/" ++ project.sources.folderName ++ "/" ++ footage.fileName


getAppropriateFootage : FootageAbout -> Project -> List Footage
getAppropriateFootage about project =
    if about == Final then
        project.sources.finalFootage

    else
        project.sources.processFootage
