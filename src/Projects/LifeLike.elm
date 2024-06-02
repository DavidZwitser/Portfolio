module Projects.LifeLike exposing (data)

import Date
import Element exposing (rgb255)
import Project exposing (Client(..), Medium(..), Tool(..))
import Time exposing (Month(..))


data : Project.Project
data =
    { id = "life_like"
    , variables =
        { date = Date.fromCalendarDate 2019 Jun 10
        , hoursSpent = 320
        , teamSize = 1
        , teamMates = Nothing
        , client = HKU
        , clientLink = Just "https://www.hku.nl/studeren-aan-hku/media/image-and-media-technology"
        , color = rgb255 29 100 65
        }
    , text =
        { name = "Life Like"

        --
        , shortDescription = "A quest to answer the question if life and conciousness come about trough logic and can thus be simulated by computers."
        , longDescription = "I found the computer algorithm named Reaction Diffusion and tried to bring it into the real world. The algorithm is projected onto a pilar from 4 sides. With sensors on all sides it is able to detect physical presence. If you give it space, it will flourish and grow, but if you come to close, it'll have a harder time. With this I attempt to put ourselves in front of an algorithm in a fairer way then trough a screen and see if our human senses perceive it as something of our organic world."
        , processDescription = ""
        , context = "This was the final test of my propaeduitic year."

        --
        , philosophy = "It's a case on materialism. Showing the viewer that life might simply come from complexity and can thus be simulated by a computer."
        , myRole = ""

        --
        , interestingDetails = Just "The result is a physical multi media installation which has a unique effect on the viewer."
        , reflection = "I learned a lot about algorithms and the results they produce. I also learned to work with many different techniques. The techniques I used were: a Raspberry PI with networking to send sensor data, video mapping on a cube, GLSL code to run the algorithm very efficiently, physical painting and building to create a good projection area and place for the projectors and generating organic sounding sounds from the algorithm data. I also learned to go through a creative process very consciously and dig deep to find the things that really resonate to me."

        --
        -- , couldHaveGoneBetter = "The end result could have use a bit more polishing. For example I decided to leave the sensors out in the open which resulted in the user to interact with the sensor directly instead of being fully emersed by the projection."
        -- , whatWentGood = "I stitched everything together very well and it all worked according to plan."
        }
    , sources =
        { folderName = "LifeLike"
        , thumbnail = { fileName = "Front_projection.jpg", description = "" }
        , finalFootage =
            [ Project.Image { fileName = "Life_action.jpg", description = "" }
            , Project.Image { fileName = "Sensors.jpg", description = "" }
            , Project.Image { fileName = "Sensors_top.jpg", description = "" }
            , Project.Image { fileName = "Front_projection.jpg", description = "" }
            , Project.Image { fileName = "Process_behind.jpg", description = "" }
            ]
        , processFootage = []
        , externalLink = Nothing
        }
    , tags =
        { toolStack = [ Touchdesigner, RaspberryPI, ProjectionMapping, Networking ]
        , medium = Installation
        }
    }
