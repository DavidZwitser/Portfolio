module Projects.WhooshWhoosh exposing (data)

import Date
import Element exposing (rgb)
import Project exposing (Client(..), Medium(..), Tool(..))
import Time exposing (Month(..))
import Types exposing (Msg)


data : Project.Project
data =
    { id = "whoosh_whoosh"
    , variables =
        { date = Date.fromCalendarDate 1 May 2024
        , hoursSpent = 160
        , teamSize = 1
        , teamMates = Nothing
        , client = EXboot
        , clientLink = Nothing
        , color = rgb 1 1 1
        }
    , text =
        { name = "Whoosh Whoosh"

        --
        , shortDescription = ""
        , longDescription = "In contrast to works of its kind, it steps back from being purely an experience and shows its own code openly. It is a celebration of us humans having created this digital machinery and the power it gives us to create. With a minimal amount of nodes, a lot is going on. Besides this it is also an exploration of the relationship between the work, the software and the maker. Each tool is a canvas for the maker to draw on, and it is a shame to hide that. Lastly, for its maker, it is a conscious step back from social issues or philosophical reflection. That is why its name is purposefully non descriptive. Letting go of the endless reflecting and analysing, making something for the beauty of making."
        , processDescription = ""
        , context = "Whoosh Whoosh is an artwork that comes from a love for programming."

        --
        , philosophy = ""
        , myRole = ""

        --
        , interestingDetails = Nothing
        , reflection = ""
        }
    , sources =
        { folderName = "WhooshWhoosh"
        , thumbnail = { fileName = "DAVIDZ-Laag-2.jpg", description = "" }
        , finalFootage =
            [ Project.Image { fileName = "DAVIDZ-Laag-2.jpg", description = "" }
            , Project.Image
                { fileName = "DAVIDZ-Laag-1.jpg", description = "" }
            , Project.Image
                { fileName = "DAVIDZ-Laag-3.jpg", description = "" }
            , Project.Image
                { fileName = "DAVIDZ-Laag-5.jpg", description = "" }
            , Project.Image
                { fileName = "DAVIDZ-Laag-6.jpg", description = "" }
            ]
        , processFootage = []
        , externalLink = Just ""
        }
    , tags =
        { toolStack = []
        , medium = Installation
        }
    }
