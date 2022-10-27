module Project exposing (..)

import Date exposing (Date)


type Client
    = OrangeGames
    | HKU
    | MediaCollege
    | Cinedans
    | None


type alias ProjectVariables =
    { date : Date
    , hoursSpent : Int
    , teamSize : Int
    , endResultRating : Float
    , learnedRating : Float
    , client : Client
    }


type alias ProjectText =
    { name : String
    , description : String
    , myRole : String
    , goal : String
    , outcome : String
    , context : String
    , whatWentGood : String
    , couldHaveGoneBetter : String
    , whatILearned : String
    }


type alias ProjectSources =
    { folderName : String
    , thumbnail : String
    , images : List String
    , embedVideo : Maybe String
    , localVideo : Maybe String
    , linkToProject : Maybe String
    }


type Goal
    = Entertain
    | Educate
    | Create


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


type Theme
    = Puzzle
    | Philosophical
    | Inspirational
    | Daily
    | Drama
    | Interactive
    | Adventure
    | Generative
    | Tactile
    | Analogue


type alias ProjectTags =
    { goals : List Goal
    , toolStack : List Tool
    , themes : List Theme
    }


type alias Project =
    { id : String
    , isFullProject : Bool
    , variables : ProjectVariables
    , text : ProjectText
    , sources : ProjectSources
    , tags : ProjectTags
    }


getImagePath : String -> Project -> String
getImagePath image project =
    "../media/images/projects/" ++ project.sources.folderName ++ "/" ++ image
