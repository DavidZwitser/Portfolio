module Projects.DavidZwitser exposing (data)

import Date
import Element exposing (rgb255)
import Project exposing (Client(..), Medium(..), Tool(..))
import Time exposing (Month(..))


data : Project.Project
data =
    let
        age =
            25
    in
    { id = "about"
    , variables =
        { date = Date.fromCalendarDate 1998 Oct 8
        , hoursSpent = age * 365
        , teamSize = 1
        , teamMates = Nothing
        , client = None
        , clientLink = Nothing
        , color = rgb255 82 75 65
        }
    , text =
        { name = "About"

        --
        , shortDescription = "The maker of this portfolio and the works in it."
        , longDescription = "Hello, I am David. I am an installation artist and creative technologist. My works are often meditations on my internal world or our external world. I'm very interested in interactivity as a deep story telling technique and love programming. I do all sorts of experiments that try to push the digital world towards expressivness."
        , processDescription = "I have always been fascinated by combining technology with creativity. I started out studying Game Development at the MediaCollage Amsterdam and afterwards studied Image and Media Technology at HKU. I would also love to study philosophy still. I'm now working as a freelance artist where I'm doing very intersting jobs and exhibiting my own works. Besides that I'm also teaching."
        , context = "I was born in Haarlem in the Netherlands and am " ++ String.fromInt age ++ " years old."

        --
        , philosophy = "" -- "I try to be very critical when taking on believes or presumptions. I try to reflect very critically on the things I do and strive to be physically, intellectually and emotionally connected with myself and the world around me."
        , myRole = ""

        --
        , interestingDetails = Nothing
        , reflection = ""
        }
    , sources =
        { folderName = "DavidZwitser"
        , thumbnail =
            { fileName = "pf.jpg"
            , description = ""
            }
        , finalFootage =
            [ Project.Image { fileName = "pf.jpg", description = "David Zwitser making a picture on a very dangerous road" }
            , Project.Custom
                [ { textDescription = "@Coelepinda", href = "https://www.instagram.com/coelepinda/" }
                , { textDescription = "talk@davidzwitser.com", href = "mailto:talk@davidzwitser.com" }
                , { textDescription = "Slachtstraat 19", href = "https://goo.gl/maps/H4bLNdehU1HGRw8b6" }
                , { textDescription = "3512AD Utrecht", href = "https://goo.gl/maps/H4bLNdehU1HGRw8b6" }
                ]
            , Project.Image { fileName = "aan_het_werk.jpg", description = "David Zwitser working behind his laptop" }
            , Project.Image { fileName = "floating.jpg", description = "David Zwitser floating in a void" }
            , Project.Image { fileName = "interview.jpg", description = "David Zwitser at the HKU exposition talking about his work" }
            ]
        , processFootage =
            []
        , externalLink = Nothing
        }
    , tags =
        { toolStack = []
        , medium = Human
        }
    }
