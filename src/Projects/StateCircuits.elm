module Projects.StateCircuits exposing (data)

import Date
import Element exposing (rgb)
import Project exposing (Client(..), Medium(..), Tool(..))
import Time exposing (Month(..))
import Types exposing (Msg)


data : Project.Project
data =
    { id = "StateCircuits"
    , variables =
        { date = Date.fromCalendarDate 2023 Jun 2
        , hoursSpent = 0
        , teamSize = 0
        , teamMates = Nothing
        , client = None
        , clientLink = Nothing
        , color = rgb 1 1 1
        }
    , text =
        { name = "StateCircuits"

        --
        , shortDescription = ""
        , longDescription = "A tool I developed to handle state in TouchDesigner"
        , processDescription = ""
        , context = "https://olib.amb-service.net/component/state-circuits"

        --
        , philosophy = ""
        , myRole = ""

        --
        , interestingDetails = Nothing
        , reflection = ""
        }
    , sources =
        { folderName = "StateCircuits"
        , thumbnail = { fileName = "thumbnail.png", description = "" }
        , finalFootage =
            [ Project.Video { fileName = "teaser_reel.mov", description = "A little promotion video I made for the tool in reel form" }
            , Project.YoutubeEmbedded { fileName = "GavNvm8BLts?si=UgzH0e94hUUm8dn8", description = "A game and all the network blocks that make it work usnig StateCircuits!" }
            , Project.Video { fileName = "interact.mov", description = "Binding analogue button sounds to the network movements" }
            , Project.Video { fileName = "timer.mov", description = "The same but with a timer" }
            , Project.Video { fileName = "example_systems.mov", description = "Some more example snippets" }
            ]
        , processFootage = []
        , externalLink = Just "https://olib.amb-service.net/component/state-circuit-snippets"
        }
    , tags =
        { toolStack = []
        , medium = TechnicalExploration
        }
    }
