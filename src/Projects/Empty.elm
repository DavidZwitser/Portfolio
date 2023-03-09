module Projects.Empty exposing (data)

import Date
import Element exposing (rgb)
import Project exposing (Client(..), Goal(..), Theme(..), Tool(..))
import Time exposing (Month(..))


data : Project.Project
data =
    { id = ""
    , isFullProject = True
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
        , thumbnail = ""
        , resultImages = []
        , processImages = []
        , embedVideo = Just ""
        , localVideo = Just ""
        , linkToProject = Just ""
        }
    , tags =
        { goals = []
        , toolStack = []
        , themes = []
        }
    }
