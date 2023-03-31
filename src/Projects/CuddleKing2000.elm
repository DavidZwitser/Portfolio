module Projects.CuddleKing2000 exposing (..)

import Date
import Element exposing (rgb)
import Project exposing (Client(..), Footage(..), Medium(..), Tool(..))
import Time exposing (Month(..))


data : Project.Project
data =
    { id = "cuddleking2000"
    , variables =
        { date = Date.fromCalendarDate 2023 Feb 1
        , hoursSpent = 1500
        , teamSize = 2
        , teamMates = Nothing
        , client = None
        , clientLink = Just "setup.nl"
        , color = rgb 1 1 1
        }
    , text =
        { name = "CuddleKing2000"

        --
        , shortDescription = "Awkwardness is outdated. Optimize your dating life by training to give the ultimate first date greeting hug!"
        , longDescription = "Based on the question if social friction in our modern world is outdated and should be fully optimized with technology, we tried to optimise one of the most awkward interactions there is. Dating. We set our focus on the first impression: the greeting hug. This machine sports a huggable torso suspended with ropes in a metal frame. When you hug it, a whole bunch of sensors will start collecting data about what you are doing. It wil calculate patterns from it and compare those to the hugs given to it earlier. As a result you will get feedback on how your first date hug compares to the optimum. It'll show you if you hugged for too long or not, where your hands were on the back and where they should have been and how much the pressure you exerted deviates from the optimal pressure you should give. We presented this machine at the mall in Utrecht (Hoog Catherijne), posing as a real startup company trying to get this into the market. Through this we wanted to see how people would react to something as extreme as quantifying and optimising something as subjective and emotional as a hug. Does the market still want to retain the human softness and uncertainty in our interactions or are we ready for the full digitising of everything or do we and love. If we must beleive our Hoog Catherijne visitors, it will be the latter."
        , processDescription = "This project has a rich creative process. From interviewing a whole bunch of pub owners to researching about dating coaches. Throughout I made a whole lot of tests and experiments and trough this we got to our final product."
        , context = "I made this installation during my internship at SETUP Utrecht."

        --
        , philosophy = ""
        , myRole = ""

        --
        , interestingDetails = Nothing
        , reflection = ""
        }
    , sources =
        { folderName = "CuddleKing2000"
        , thumbnail = { fileName = "HUG.jpg", description = "" }
        , finalFootage =
            [ Project.Image { fileName = "HUG.jpg", description = "someone using the Cuddle King during an exposition in Hoog Catherijne" }
            , Project.Image { fileName = "bonnetje.jpg", description = "a view of the receipt that is printed for you after using the machine" }
            , Project.Image { fileName = "top_down_hug.jpg", description = "someone using the Cuddle King as seen form above" }
            , Project.Video { fileName = "hearth_view_hoog_catherijne.mov", description = "a view of the spot where we presented the Cuddle King 2000 in Hoog Catherijne" }
            , Project.Image { fileName = "over_shoulder_picture.jpg", description = "an over the shoulder view of someone using the Cuddle King" }
            , VimeoEmbedded { fileName = "https://player.vimeo.com/video/794884983?h=0f62f716df", description = "a video showing the exposition in Hoog Catherijne" }
            ]
        , processFootage =
            [ VimeoEmbedded { fileName = "https://player.vimeo.com/video/787529568?h=74d7acfb02", description = "a video showing a bit of the creative process" }
            , Project.Image { fileName = "prototype.jpg", description = "a prototype version with the torso" }
            , Project.Image { fileName = "cloth_tryout.jpg", description = "Juliette Mout trying out different cloths to dress the torso" }
            , Project.Video { fileName = "hug_hands_moving.mov", description = "a snapshot of the process of making the real time hug simulation arms" }
            , Project.Image { fileName = "notitites.jpg", description = "a view of some notes I made during the creative process" }
            , Project.Video { fileName = "reconstructing_hug.mov", description = "digitally reconstructing a hug to get to understand how the movements go" }
            , Project.Video { fileName = "torso_wired_up_tryout.mov", description = "a first stage of the torso with sensors on it" }
            , Project.Video { fileName = "oogcontact_experiment.mov", description = "an experiment about making eye contact during a date" }
            , Project.Video { fileName = "afstand_experiment.mov", description = "experimenting with the effect of distance and movement during a date" }
            , Project.Image { fileName = "barmannen_data.jpg", description = "data collected from interviewing pub owners in Utrecht" }
            ]
        , externalLink = Just ""
        }
    , tags =
        { toolStack = [ Project.Touchdesigner, Project.Python, Project.Arduino, Project.GOLANG, Project.DataAnalysis ]
        , medium = Installation
        }
    }
