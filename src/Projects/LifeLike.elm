module Projects.LifeLike exposing (data)

import Date
import Element exposing (rgb255)
import Project exposing (Client(..), Goal(..), Theme(..), Tool(..))
import Time exposing (Month(..))


data : Project.Project
data =
    { id = ""
    , isFullProject = True
    , variables =
        { date = Date.fromCalendarDate 10 Jun 2019
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
        , shortDescription = "In the search for finding simulated life, I found a computer algorithm named Reaction Diffusion and tried to bring it into the real world. The algorithm is projected onto a cube from 4 sides. The cube is equipped with sensors on all sides which makes it able to detect the physical presence of other creatures. If you give it space, it will flourish and grow, but if you come to close, it'll have a harder time."
        , longDescription = ""
        , processDescription = ""
        , context = "As the final test of the first year of my current education, we went through a long research process, finding out the things that resonate with us personally. I ended up stranding on a search for life in computers."

        --
        , philosophy = "The goal of this project is to convince the viewer that life is simply made out of complexity and can thus be simulated by a computer."
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
        , thumbnail = "Front_projection.jpg"
        , resultImages =
            [ "Life_action.jpg"
            , "Sensors.jpg"
            , "Sensors_top.jpg"
            , "Front_projection.jpg"
            , "Process_behind.jpg"
            ]
        , processImages = []
        , embedVideo = Just "'https://www.youtube.com/embed/tvdirJkZqG4"
        , localVideo = Nothing
        , linkToProject = Nothing
        }
    , tags =
        { goals = [ Educate, Create ]
        , toolStack = [ Touchdesigner, RaspberryPI, ProjectionMapping, Networking ]
        , themes = [ Philosophical ]
        }
    }
