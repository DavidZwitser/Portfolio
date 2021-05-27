module Projects.CONFINED_SPACE exposing (..)

import Date exposing (fromCalendarDate)
import Project exposing (Client(..), Goal(..), Theme(..), Tool(..))
import Time exposing (Month(..))


data : Project.Project
data =
    { id = "confined_space"
    , isFullProject = True
    , variables =
        { date = Date.fromCalendarDate 15 Jan 2020
        , hoursSpent = 320
        , teamSize = 4
        , endResultRating = 9
        , learnedRating = 9.5
        , client = Cinedans
        }
    , text =
        { name = "CONFINED SPACE"

        --
        , description = "A tactile intimate experience in which you get embraced by a breathing slowly moving inflatable."
        , context = "A school challenge where we made an installation in collaboration with the Cinedance festival with the goal of it being displayed at the festival."

        --
        , goal = "The goal of our project is to create an intimate shut out environment where you can be alone with yourself."
        , myRoll = "We did a lot of brainstorming together, I made the wooden frame together with a teammate and created the breathing motion."

        --
        , outcome = "The outcome is a very interesting, out of my general comfort-zone piece which I absolutely loved to work on and turned out really great."
        , whatILearned = "I learned thinking in analogue material and inflatable structures. I also learned to think in tactile experiences."

        --
        , couldHaveGoneBetter = "We had a very long process with a lot of setbacks and long rethink sessions, though in the end that helped the final product get even better."
        , whatWentGood = "We came out of the process with a very interesting valuable installation."
        }
    , sources =
        { folderName = "CONFINED_SPACE"

        --
        , thumbnail = "Spacious.jpg"
        , images =
            [ "Holy_tube.jpg"
            , "Intensiteit_van_de_ervaring.jpg"
            , "Edge.jpg"
            , "Full_standalone.jpg"
            , "Inside_tha_tube.jpg"
            , "Holo.jpg"
            , "Tube.jpg"
            , "Deep_dive.jpg"
            ]
        , embedVideo = Just "https://www.youtube.com/embed/vSZDguIEcEE"
        , localVideo = Nothing
        , linkToProject = Nothing
        }
    , tags =
        { goals =
            [ Create
            , Entertain
            , Educate
            ]
        , toolStack =
            [ Processing
            , Woodwork
            , Building
            ]
        , themes =
            [ Interactive
            , Analogue
            , Tactile
            ]
        }
    }
