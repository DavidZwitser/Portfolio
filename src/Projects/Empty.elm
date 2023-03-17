module Projects.Empty exposing (data)

import Date
import Element exposing (rgb)
import Project exposing (Client(..), Medium(..), Tool(..))
import Time exposing (Month(..))


data : Project.Project
data =
    { id = ""
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
        , thumbnail = { fileName = "", description = "", footageAbout = Project.Final }
        , footage = []
        , externalLink = Just ""
        }
    , tags =
        { toolStack = []
        , medium = Installation
        }
    }
