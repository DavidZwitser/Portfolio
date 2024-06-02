module Projects.CONFINED_SPACE exposing (..)

import Date
import Element exposing (rgb255)
import Project exposing (Client(..), FootageMetadata, Medium(..), Tool(..))
import Time exposing (Month(..))
import Types exposing (Msg)


data : Project.Project
data =
    { id = "confined_space"
    , variables =
        { date = Date.fromCalendarDate 2020 Jan 15
        , hoursSpent = 320
        , teamSize = 4
        , teamMates = Just [ ( "Derk Roelofsen", "https://www.instagram.com/flerk_lab/" ), ( "Joia van de Ven", "https://joiavandeven.myportfolio.com/confined-space" ), ( "Britt Vendel", "https://brittvendel.myportfolio.com/confined-space" ) ]
        , client = Cinedans
        , clientLink = Just "https://cinedans.nl"
        , color = rgb255 115 116 117
        }
    , text =
        { name = "CONFINED SPACE"

        --
        , shortDescription = "An intimate tactile experience where you step inside of an artificial bubble which tries to calm and sooth you."
        , longDescription = "A 2x2x2m hexagonal wooden frame with an inflatable cushion made of TPU constrained within it. Step inside and feel how you are slowly being pressurised and released. Experience how the see-trough inside allows you to see the holographic belly of the cushion. The experience is unique and strangely comfortable."
        , processDescription = "This project had a long and thorough process. We researched a ton of different possibilities and the work presented a lot of different new techniques to learn."
        , context = "This project was a school assignment where we collaborated with the Cinedance festival with the goal of it being displayed at an actual festival in the Eye Museum. We were selected for the festival, but sadly corona spoiled it."

        --
        , philosophy = "This pre corona installation plays with spaces inside spaces. It hides you from the rest of the world and uses all your senses to try and calm you down and give you a safe space to be in. It plays in to our world becoming increasingly more complex and intimidating due to technology endlessly enhancing our possibilities. Thus we present another technological contraption to solve this problem."
        , myRole = "The brainstorming and testing was a group effort. The construction was divided between the frame and cushion. Me and Derk designed and build the frame, and Joia and Brit designed and sowed the cushion."

        --
        , interestingDetails = Nothing
        , reflection = "I learned thinking in analogue material and inflatable structures. I also increased my ability to think in tactile experiences. The outcome is a very interesting, out of my general comfort-zone piece which I absolutely loved to work."
        }
    , sources =
        { folderName = "CONFINED_SPACE"

        --
        , thumbnail = { fileName = "Tube.jpg", description = "" }
        , finalFootage =
            [ Project.Image { fileName = "Intensiteit_van_de_ervaring.jpg", description = "" }
            , Project.YoutubeEmbedded { fileName = "vSZDguIEcEE", description = "" }
            , Project.Image { fileName = "Holy_tube.jpg", description = "" }
            , Project.Image { fileName = "Edge.jpg", description = "" }
            , Project.Image { fileName = "Full_standalone.jpg", description = "" }
            , Project.Image { fileName = "Inside_tha_tube.jpg", description = "" }
            , Project.Image { fileName = "Holo.jpg", description = "" }
            , Project.Image { fileName = "Tube.jpg", description = "" }
            , Project.Image { fileName = "Deep_dive.jpg", description = "" }
            ]
        , processFootage =
            [ Project.Video { fileName = "dancing_with_machine.mov", description = "trying out what it feels like to dance with something inanimate as part of our creative process" }
            , Project.Image { fileName = "broodzakjes_prototype.jpg", description = "using some sandwich bags to see how easy it is to make an inflatable (it is not)" }
            , Project.Video { fileName = "vacuum_yourself_experiment.mov", description = "experimenting with what it feels like to be compressed with a air sucking foot pump and\ngarbage bag" }
            , Project.Image { fileName = "inside_big_bag.jpg", description = "blowing up a very big bag and experiencing what it is to be inside it" }
            , Project.Video { fileName = "room_filling_plastics.mov", description = "using a way bigger bag" }
            , Project.Video { fileName = "pressure_release.mov", description = "making the bag breath up and down" }

            --
            , Project.Image { fileName = "green_light_presentation.jpg", description = "overview of process till then for a presentation" }
            , Project.Video { fileName = "compressed.mov", description = "another mockup of the experience, this time between two tables to create more pressure" }
            , Project.Image { fileName = "TPU_prototype.jpg", description = "first prototype using TPU material" }
            , Project.Image { fileName = "bringing_wood_to_workshop.jpg", description = "bringing fresh wood to the wood-workshop to build the frame" }
            , Project.Video { fileName = "sawing_angle.mov", description = "sawing the angles in the pillars" }
            , Project.Image { fileName = "zen_in_frame.jpg", description = "sitting zen in the newly constructed frame" }
            , Project.Video { fileName = "holographic_tpu_experiment.mov", description = "a miniature version of the materials we want to use" }
            , Project.Video { fileName = "Derk_vacuumed_in_frame_first_time.mov", description = "using plastic bag in newly build frame" }
            , Project.Image { fileName = "inside_frame_prototype.jpg", description = "me in the frame for the first time" }
            ]
        , externalLink = Nothing
        }
    , tags =
        { toolStack =
            [ Arduino
            , Woodwork
            , Building
            ]
        , medium = Installation
        }
    }
