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
        { date = Date.fromCalendarDate 0 Jan 0
        , hoursSpent = 0
        , teamSize = 0
        , teamMates = Nothing
        , client = None
        , clientLink = Nothing
        , color = rgb 1 1 1
        }
    , text =
        { name = ""

        --
        , shortDescription = ""
        , longDescription = ""
        , processDescription = ""
        , context = ""

        --
        , philosophy = ""
        , myRole = ""

        --
        , interestingDetails = Nothing
        , reflection = ""
        }
    , sources =
        { folderName = ""
        , thumbnail = { fileName = "", description = "" }
        , finalFootage = []
        , processFootage = []
        , externalLink = Just ""
        }
    , tags =
        { toolStack = []
        , medium = Installation
        }
    }
