module Projects.DavidZwitser exposing (data)

import Date
import Debug exposing (toString)
import Element exposing (rgb255)
import Project exposing (Client(..), Medium(..), Tool(..))
import Time exposing (Month(..))


data : Project.Project
data =
    let
        age =
            24
    in
    { id = "david_zwitser"
    , variables =
        { date = Date.fromCalendarDate 0 Jan 0
        , hoursSpent = age * 365
        , teamSize = 1
        , teamMates = Nothing
        , client = None
        , clientLink = Nothing
        , color = rgb255 82 75 65
        }
    , text =
        { name = "About"

        --
        , shortDescription = "A guy who is trying his best to understand the world in different ways."
        , longDescription = "Hello, I am David. I am a starting artist with my roots in programming. My mainly focus on interactive installations but venture out to all types of ways of making."
        , processDescription = "I have always been interested in combining technology andc reativity. Thus I studied both Game Development at the MediaCollage Amsterdam and Image and Media Technology at HKU. To feed my curiousity of thinking even more I will be studiying philosophy next year. "
        , context = "I am born in Haarlem in the Netherlands and am " ++ toString age ++ " years old."

        --
        , philosophy = "The philosophy behind myself is that I am a weird self improving machine."
        , myRole = ""

        --
        , interestingDetails = Nothing
        , reflection = "Mirror"
        }
    , sources =
        { folderName = "DavidZwitser"
        , thumbnail =
            { fileName = "pf.jpg"
            , description = ""
            , footageAbout = Project.Final
            }
        , footage = [ Project.Image { fileName = "pf.jpg", description = "", footageAbout = Project.Final } ]
        , externalLink = Nothing
        }
    , tags =
        { toolStack = []
        , medium = Human
        }
    }
