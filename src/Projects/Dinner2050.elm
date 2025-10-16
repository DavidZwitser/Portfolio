module Projects.Dinner2050 exposing (data)

import Date
import Element exposing (rgb)
import Project exposing (Client(..), Medium(..), Tool(..))
import Time exposing (Month(..))
import Types exposing (Msg)


data : Project.Project
data =
    { id = "Dinner2050"
    , variables =
        { date = Date.fromCalendarDate 2023 Dec 1
        , hoursSpent = 0
        , teamSize = 0
        , teamMates = Nothing
        , client = Tellart
        , clientLink = Just "https://www.tellart.com/projects/dinner-in-2050-at-cop28/"
        , color = rgb 1 1 1
        }
    , text =
        { name = "Dinner 2050"

        --
        , shortDescription = "An interactive installation at COP28 in Dubai"
        , longDescription = "I got to assist as a TouchDesigner developer on this interactive installation at the climate conference COP28 in Dubai in 2023. I worked on the GLSL based animations and the overal system. I got to implement my StateCircuits in an actual application and designed a modular animation COMP sequencer. It was a very valuable and educational experience."
        , processDescription = "I got to mostly help on-site in Dubai, implementing and optimizing the system. We had seperate designers and producers, which allowed me to totally focus on technical execution and implementation."
        , context = ""

        --
        , philosophy = ""
        , myRole = ""

        --
        , interestingDetails = Nothing
        , reflection = ""
        }
    , sources =
        { folderName = "Dinner2050"
        , thumbnail = { fileName = "dinner-in-2050-your-dish.jpg", description = "" }
        , finalFootage =
            [ Project.Image { fileName = "dinner-in-2050-your-dish.jpg", description = "A nice picture of the installation with me in the front" }
            , Project.Image { fileName = "dinner-in-2050.jpg", description = "The nice wooden structure the installation was in" }
            , Project.VimeoEmbedded { fileName = "https://player.vimeo.com/video/933313136", description = "A video of the user experience of the installation" }
            , Project.Image { fileName = "animation_stack.png", description = "The animation stack system (sadly I cant show a picture of the StateCircuits implementation)" }
            ]
        , processFootage = []
        , externalLink = Nothing
        }
    , tags =
        { toolStack = []
        , medium = Installation
        }
    }
