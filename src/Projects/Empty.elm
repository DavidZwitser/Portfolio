module Projects.Empty exposing (data)

import Date exposing (fromCalendarDate)
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
        , endResultRating = 0
        , learnedRating = 0
        , client = None
        }
    , text =
        { name = ""

        --
        , description = ""
        , context = ""

        --
        , goal = ""
        , myRole = ""

        --
        , outcome = ""
        , whatILearned = ""

        --
        , couldHaveGoneBetter = ""
        , whatWentGood = ""
        }
    , sources =
        { folderName = ""
        , thumbnail = ""
        , images = []
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
