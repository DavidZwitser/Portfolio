module Projects.MovingUp exposing (data)

import Date
import Element exposing (rgb255)
import Project exposing (Client(..), Medium(..), Tool(..))
import Time exposing (Month(..))


data : Project.Project
data =
    { id = "movingup"
    , variables =
        { date = Date.fromCalendarDate 25 Nov 2017
        , hoursSpent = 320
        , teamSize = 2
        , teamMates = Nothing
        , client = Azerion
        , clientLink = Just "https://www.azerion.com"
        , color = rgb255 141 178 190
        }
    , text =
        { name = "Moving Up"

        --
        , shortDescription = "A physics based skill game where you balance a ball on a bar and try to get to the end of puzzle like levels or where you reach a new highscore in endless mode."
        , longDescription = ""
        , processDescription = ""
        , context = "I created this game at an internship at OrangeGames (now merged with Azerion). I worked together with another intern where I did most of the ground work and he did most of the level design."

        --
        , philosophy = "The goal of this project was to learn how to make a game in a professional environment within a high profile scrumm based team."
        , myRole = "I did the core of the game mechanics (movement, holes spawning, scores, animations and menus). My teammate did most of the level design and some features."

        --
        , interestingDetails = Just "The outcome is a very relaxing and visually pleasing puzzle game in which you can waste a ton of your valuable time."
        , reflection = "This project teached me a lot about the planning and resource spending within a professional work environment. It also showed me the power of having smart and capable people within your reach and how to deal with problems that come along the way of any project."

        --
        -- , couldHaveGoneBetter = "The project didn't move for quite a while since our team needed all our time for moving our catalogue to a new platform. This caused the planning to be somewhat twisted."
        -- , whatWentGood = "Working with my planning worked perfect and all the bugs and improvements were piped through our scrumm board which kept everything nice and clear."
        }
    , sources =
        { folderName = "MovingUp"
        , thumbnail = { fileName = "endless_mode.jpg", description = "", footageAbout = Project.Final }
        , footage =
            [ Project.Image { fileName = "level_select.jpg", description = "", footageAbout = Project.Final }
            , Project.Image { fileName = "level12.jpg", description = "", footageAbout = Project.Final }
            , Project.Image { fileName = "startscreen.jpg", description = "", footageAbout = Project.Final }
            , Project.Image { fileName = "level16.jpg", description = "", footageAbout = Project.Final }
            , Project.Image { fileName = "pausemenu.jpg", description = "", footageAbout = Project.Final }
            , Project.YoutubeEmbedded { fileName = "https://www.youtube.com/embed/AYHFLWNOQzc", description = "", footageAbout = Project.Final }
            ]
        , externalLink = Just "http://spele.nl/moving-up-spel/"
        }
    , tags =
        { toolStack = [ Typescript, Phaser, Webpack ]
        , medium = Game
        }
    }
