module Projects.DavidZwitser exposing (data)

import Date
import Element exposing (rgb255)
import Project exposing (Client(..), Medium(..), Tool(..))
import Time exposing (Month(..))


data : Project.Project
data =
    let
        age =
            Date.diff Date.Years (Date.fromCalendarDate 1998 Oct 8) (Date.fromCalendarDate 2025 Oct 17)
    in
    { id = "about"
    , variables =
        { date = Date.fromCalendarDate 1998 Oct 8
        , hoursSpent = Date.diff Date.Days (Date.fromCalendarDate 1998 Oct 8) (Date.fromCalendarDate 2025 Oct 17)
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
        , processDescription = "I have always been fascinated by combining technology with creativity. I started out studying Game Development at the MediaCollage Amsterdam and afterwards studied Image and Media Technology at HKU. I would also love to study philosophy still. I'm now working as a freelance artist where I'm doing very intersting jobs and exhibiting my own works. Besides that I love teaching."
        , context = "I was born in Haarlem in the Netherlands and am " ++ String.fromInt age ++ " years old. I now live in Utrecht where I have a studio at de Oudegracht together with 6 other wonderfull makers. We also sometimes try to be a collective and work together under the name `Wildgroei`."

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
            { fileName = "in_code.jpeg"
            , description = ""
            }
        , finalFootage =
            [ Project.Image { fileName = "in_code.jpeg", description = "David Zwitser" }
            , Project.Custom
                [ { textDescription = "Instagram: @Coelepinda", href = "https://www.instagram.com/coelepinda/" }
                , { textDescription = "Youtube: David Zwitser", href = "https://www.youtube.com/@davidzwitser/videos" }
                , { textDescription = "Email: talk@davidzwitser.com", href = "mailto:talk@davidzwitser.com" }
                , { textDescription = "Studio adress: Oudegracht 371 3511 PG", href = "https://maps.app.goo.gl/fSWAYYDFYP343BUU9" }
                ]
            , Project.Image { fileName = "pf.jpg", description = "On the road" }
            , Project.Image { fileName = "interview.jpg", description = "At the HKU exposition talking about work" }
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
