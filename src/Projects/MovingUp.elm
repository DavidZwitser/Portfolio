module Projects.MovingUp exposing (data)

import Date exposing (fromCalendarDate)
import Project exposing (Client(..), Goal(..), Theme(..), Tool(..))
import Time exposing (Month(..))


data : Project.Project
data =
    { id = ""
    , isFullProject = True
    , variables =
        { date = Date.fromCalendarDate 25 Nov 2017
        , hoursSpent = 320
        , teamSize = 2
        , endResultRating = 8
        , learnedRating = 9
        , client = OrangeGames
        }
    , text =
        { name = "Moving Up"

        --
        , description = "A physics based skill game where you balance a ball on a bar and try to get to the end of puzzle like levels or reach a new highscore in endless mode."
        , context = "I created this game at an internship at OrangeGames (now merged with Azerion). I worked together with another intern where I did most of the ground work and he did most of the level design."

        --
        , goal = "The goal of this project was to learn how to make a game in a professional environment within a high profile scrumm based team."
        , myRoll = "I did the core of the game mechanics (movement, holes spawning, scores, animations and menus). My teammate did most of the level design and some features."

        --
        , outcome = "The outcome is a very relaxing and visually pleasing puzzle game in which you can waste a ton of your valuable time."
        , whatILearned = "This project teached me a lot about the planning and resource spending within a professional work environment. It also showed me the power of having smart and capable people within your reach and how to deal with problems that come along the way of any project."

        --
        , couldHaveGoneBetter = "The project didn't move for quite a while since our team needed all our time for moving our catalogue to a new platform. This caused the planning to be somewhat twisted."
        , whatWentGood = "Working with my planning worked perfect and all the bugs and improvements were piped through our scrumm board which kept everything nice and clear."
        }
    , sources =
        { folderName = "MovingUp"
        , thumbnail = "endless_mode.jpg"
        , images =
            [ "level_select.jpg"
            , "endless_mode.jpg"
            , "level12.jpg"
            , "startscreen.jpg"
            , "level16.jpg"
            , "pausemenu.jpg"
            ]
        , embedVideo = Just "https://www.youtube.com/embed/AYHFLWNOQzc"
        , localVideo = Nothing
        , linkToProject = Just "http://spele.nl/moving-up-spel/"
        }
    , tags =
        { goals = [ Educate, Create ]
        , toolStack = [ Typescript, Phaser, Webpack ]
        , themes = [ Adventure, Puzzle, Interactive ]
        }
    }
