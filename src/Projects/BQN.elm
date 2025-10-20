module Projects.BQN exposing (data)

import Date
import Element exposing (rgb)
import Project exposing (Client(..), Medium(..), Tool(..))
import Time exposing (Month(..))
import Types exposing (Msg)


data : Project.Project
data =
    { id = "BQN"
    , variables =
        { date = Date.fromCalendarDate 2023 Jul 1
        , hoursSpent = 0
        , teamSize = 0
        , teamMates = Nothing
        , client = None
        , clientLink = Nothing
        , color = rgb 1 1 1
        }
    , text =
        { name = "BQN explorations"

        --
        , shortDescription = "A bunch of things I did around this programming language I fell in love with."
        , longDescription = "I found BQN, a very unique programming language with a lot of body and history behind it, which taught me to a lot of new ways to think about programming and algorithms. It inspired me to do a whole bunch of things which are viewable in this image galery."
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
        { folderName = "BQN"
        , thumbnail = { fileName = "language2.jpg", description = "" }
        , finalFootage =
            [ Project.Image { fileName = "language2.jpg", description = "A short view of what the language looks like (it's the top line)" }
            , Project.YoutubeEmbedded { fileName = "crz6kn71RXY?si=rlrkvI5d3pWIfd4l", description = "A live coding tool experiment I worked on in BQN with my own custom editor using an inmplementation of raylib in BQN (Rayed-BQN)" }
            , Project.Video { fileName = "Particles.mov", description = "A fun particle system which throws around BQN characters, also in Rayed-BQN" }
            , Project.YoutubeEmbedded { fileName = "tOZde7zrsLM?si=_BpcA8dnz4yQYi64", description = "Writing snake in 8 minutes in BQN" }
            , Project.Image { fileName = "youtube.png", description = "A series of youtube videos on my channel about this language, me working in it, giving tutorials and my ideas around it!" }
            , Project.YoutubeEmbedded { fileName = "nrSst9keXO8?si=k1KgPkV1OlEteqKT", description = "Me being allowed to talk on my favoroute poscast which is about languages like this" }
            , Project.Image { fileName = "workshop_adverticement.png", description = "The promotion for a workshop I gave about this language" }
            , Project.Image { fileName = "workshop_image.jpg", description = "An image of that workshop!" }
            , Project.YoutubeEmbedded { fileName = "57oi4hBBlj0?si=zvy5WZU-Le0zR4zu", description = "A livestream looking at the code behind the text editor for the live-coding tool and making some more progress" }
            , Project.Video { fileName = "LiveCoder2.mov", description = "Another video of that LiveCoding tool. I like the LFO interactive system I made to quickly and intuitively add movements" }
            , Project.Video { fileName = "astroids.mov", description = "A astroids replica I made in Rayed-BQN" }
            , Project.Video { fileName = "snake.mov", description = "A snake replica I made in Rayed-BQN" }
            , Project.Image { fileName = "language_extension_zed.png", description = "An extension I made for the ZED code editor to run BQN. Here I learned about LSP's and TreeSitter!" }
            ]
        , processFootage = []
        , externalLink = Just "https://github.com/DavidZwitser/BQN-Experiments"
        }
    , tags =
        { toolStack = []
        , medium = TechnicalExploration
        }
    }
