module Projects.CanWorld exposing (data)

import Date
import Element exposing (rgb255)
import Project exposing (Client(..), Footage(..), Medium(..), Tool(..))
import Time exposing (Month(..))


data : Project.Project
data =
    { id = "can_world"
    , variables =
        { date = Date.fromCalendarDate 2020 Sep 15
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
        , longDescription = "This was a collaboration project between me and a conservatory student named Can Yursten. This was my first time working together with a musician and I am quite glad with how it audio and visuals go together."
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
        , thumbnail = { fileName = "noisy_noise.jpg", description = "" }
        , finalFootage =
            [ Project.YoutubeEmbedded { fileName = "eSeoGAsGSIQ", description = "" }
            , Project.Image { fileName = "smeer.jpg", description = "" }
            , Project.Image { fileName = "starting_noise.jpg", description = "" }
            , Project.Image { fileName = "floating_paper.jpg", description = "" }
            ]
        , processFootage = []
        , externalLink = Nothing
        }
    , tags =
        { toolStack = []
        , medium = AudioVisual
        }
    }
