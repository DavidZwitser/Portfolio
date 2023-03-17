module Projects.CONFINED_SPACE exposing (..)

import Date
import Element exposing (rgb255)
import Project exposing (Client(..), Medium(..), Tool(..))
import Time exposing (Month(..))


data : Project.Project
data =
    { id = "confined_space"
    , variables =
        { date = Date.fromCalendarDate 15 Jan 2020
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
        , longDescription = "A 2x2x2m hexagonal wooden frame with an inflatable cushion made of TPU constrained within it. Step inside and feel how you are slowely being pressurised and released. Experience how the see trough inside alows you to see the holographic belly of the cushion. The experience is unique and strangly comfertable."
        , processDescription = "This project had a long and thurrow process. We researched a ton of different possibilities and the work presented a lot of different new techniques to learn."
        , context = "This project was a school assignment where we collaborated with the Cinedance festival with the goal of it being displayed at an actual festival in the Eye Museum. We were selected for the festival, but sadly corona spoiled it."

        --
        , philosophy = "This pre corona installation plays with spaces inside spaces. It hides you from the rest of the world and uses all your senses to try and calm you down and give you a safe space to be in. It plays in to our world becoming increasingly more complex and intimidating due to technology endlessly enhancing our possibilities. Thus we present another technological contraption to solve this problem."
        , myRole = "The brainstorming and testing was a group efford. The construction was divided between the frame and cushion. Me and Derk designed and builed the frame, and Joia and Brit designed and sowed the cushion."

        --
        , interestingDetails = Nothing
        , reflection = "I learned thinking in analogue material and inflatable structures. I also increased my ability to think in tactile experiences. The outcome is a very interesting, out of my general comfort-zone piece which I absolutely loved to work."
        }
    , sources =
        { folderName = "CONFINED_SPACE"

        --
        , thumbnail = { fileName = "Tube.jpg", description = "", footageAbout = Project.Final }
        , footage =
            [ Project.Image { fileName = "Holy_tube.jpg", description = "", footageAbout = Project.Final }
            , Project.Image { fileName = "Intensiteit_van_de_ervaring.jpg", description = "", footageAbout = Project.Final }
            , Project.Image { fileName = "Edge.jpg", description = "", footageAbout = Project.Final }
            , Project.Image { fileName = "Full_standalone.jpg", description = "", footageAbout = Project.Final }
            , Project.Image { fileName = "Inside_tha_tube.jpg", description = "", footageAbout = Project.Final }
            , Project.Image { fileName = "Holo.jpg", description = "", footageAbout = Project.Final }
            , Project.Image { fileName = "Tube.jpg", description = "", footageAbout = Project.Final }
            , Project.Image { fileName = "Deep_dive.jpg", description = "", footageAbout = Project.Final }
            , Project.YoutubeEmbedded { fileName = "https://www.youtube.com/embed/vSZDguIEcEE", description = "", footageAbout = Project.Final }
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
