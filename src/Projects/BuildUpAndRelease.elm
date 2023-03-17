module Projects.BuildUpAndRelease exposing (..)

import Date
import Element exposing (rgb)
import Project exposing (Client(..), Footage(..), Medium(..), Tool(..))
import Time exposing (Month(..))


data : Project.Project
data =
    { id = "BuildUpAndRelease"
    , variables =
        { date = Date.fromCalendarDate 30 Jun 2022
        , hoursSpent = 1500
        , teamSize = 1
        , teamMates = Nothing
        , client = None
        , clientLink = Nothing
        , color = rgb 1 1 1
        }
    , text =
        { name = "Build Up and Release"

        --
        , shortDescription = "Experience the pointlessness and frustration behind our constant desire to want."
        , longDescription = "An installation restulting from the fruits of my inner wrokings. A long reflection on what drives frustrates and motivates me, poured into an interactive piece which throws you right in. It's addictive, effective and very triggering. It grabs you with it's claws and keep you there up untill you decide to forcefully seperate yourself."
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
        { folderName = "BuildUpAndRelease"
        , thumbnail =
            { fileName = "usage.jpg"
            , description = ""
            , footageAbout = Project.Final
            }
        , footage =
            [ Project.Video
                { fileName = "usage.mov"
                , description = ""
                , footageAbout = Project.Final
                }
            , Project.Image
                { fileName = "usage.jpg"
                , description = ""
                , footageAbout = Project.Final
                }
            ]
        , externalLink = Nothing
        }
    , tags =
        { toolStack = []
        , medium = Installation
        }
    }
