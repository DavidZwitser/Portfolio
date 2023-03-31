module Projects.PersonalSharedPhysicsl exposing (..)

import Date
import Element exposing (rgb)
import Project exposing (Client(..), Footage(..), FootageAbout, Medium(..), Tool(..))
import Time exposing (Month(..))


data : Project.Project
data =
    { id = ""
    , variables =
        { date = Date.fromCalendarDate 2019 Jan 19
        , hoursSpent = 40
        , teamSize = 1
        , teamMates = Nothing
        , client = None
        , clientLink = Nothing
        , color = rgb 1 1 1
        }
    , text =
        { name = "PersonalSharedPhysical"

        --
        , shortDescription = "Exploring a theory of three different separated realities."
        , longDescription = "An installation based on a theory about our world being separated into three different realms: our Personal internal world, our Shared communal world and the Physical nearly unquantifiable world. It consisted of a single dial which you can rotate to the left or right, to scroll trough an attempt to visualise these different realities. The personal one shows a full grown tree with colors offset from those of reality and my own music playing; the shared one is an as neutral view of the world and the tree as possible, making it follow the rules we expect and all cohere to; and finally the physical one is represented by the data behind the tree, going into more and more abstract versions of it, finally ending in a single pixel of data."
        , processDescription = ""
        , context = "This project was part of an exposition I did the first half a year of my education at the HKU."

        --
        , philosophy = ""
        , myRole = ""

        --
        , interestingDetails = Nothing
        , reflection = ""
        }
    , sources =
        { folderName = "PersonalSharedPhysical"
        , thumbnail = { fileName = "thumb_texture.jpg", description = "" }
        , finalFootage =
            [ Project.YoutubeEmbedded { fileName = "oseUdJMYaFk", description = "" }
            , Project.Image
                { fileName = "Personal_smalltree.jpg"
                , description = ""
                }
            , Project.Image
                { fileName = "Personal.jpg"
                , description = ""
                }
            , Project.Image
                { fileName = "Physical_3d.jpg"
                , description = ""
                }
            , Project.Image
                { fileName = "Physical_chop.jpg"
                , description = ""
                }
            , Project.Image
                { fileName = "Physical_dat.jpg"
                , description = ""
                }
            , Project.Image
                { fileName = "Physical_pixels.jpg"
                , description = ""
                }
            , Project.Image
                { fileName = "Shared.jpg"
                , description = ""
                }
            ]
        , processFootage = []
        , externalLink = Just ""
        }
    , tags =
        { toolStack = []
        , medium = Installation
        }
    }
