module Projects.CanWorld exposing (data)

import Date
import Element exposing (rgb255)
import Project exposing (Client(..), Footage(..), Medium(..), Tool(..))
import Time exposing (Month(..))


data : Project.Project
data =
    { id = "can_world"
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
        , thumbnail = { fileName = "noisy_noise.jpg", description = "", footageAbout = Project.Final }
        , footage =
            [ Project.Image { fileName = "smeer.jpg", description = "", footageAbout = Project.Final }
            , Project.Image { fileName = "starting_noise.jpg", description = "", footageAbout = Project.Final }
            , Project.Image { fileName = "floating_paper.jpg", description = "", footageAbout = Project.Final }
            ]
        , externalLink = Nothing
        }
    , tags =
        { toolStack = []
        , medium = AudioVisual
        }
    }
