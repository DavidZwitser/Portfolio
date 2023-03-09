module Projects.CanWorld exposing (data)

import Date
import Element exposing (rgb255)
import Project exposing (Client(..), Goal(..), Theme(..), Tool(..))
import Time exposing (Month(..))


data : Project.Project
data =
    { id = "can_world"
    , isFullProject = True
    , variables =
        { date = Date.fromCalendarDate 15 Sep 15
        , hoursSpent = 24
        , teamSize = 2
        , teamMates = Just [ ( "Can Yursteven", "https://canyurtseven.com" ) ]
        , client = None
        , clientLink = Nothing
        , color = rgb255 151 142 120
        }
    , text =
        { name = "CanWorld"

        --
        , shortDescription = "A audio visual experience made together with Can Yursten"
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
        { folderName = "CanWorld"
        , thumbnail = "noisy_noise.jpg"
        , resultImages = [ "smeer.jpg", "starting_noise.jpg", "floating_paper.jpg" ]
        , processImages = []
        , embedVideo = Nothing
        , localVideo = Nothing
        , linkToProject = Nothing
        }
    , tags =
        { goals = []
        , toolStack = []
        , themes = []
        }
    }
