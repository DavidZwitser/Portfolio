module Projects.PledgeStation exposing (data)

import Date
import Element exposing (rgb)
import Project exposing (Client(..), Medium(..), Tool(..))
import Time exposing (Month(..))
import Types exposing (Msg)


data : Project.Project
data =
    { id = "pledge_station"
    , variables =
        { date = Date.fromCalendarDate 2025 Apr 4
        , hoursSpent = 0
        , teamSize = 0
        , teamMates = Nothing
        , client = Tellart
        , clientLink = Just "https://www.tellart.com/projects/netherlands-pavilion-at-world-expo-2025/"
        , color = rgb 0.8 0.75 0.9
        }
    , text =
        { name = "World Expo Osaka"

        --
        , shortDescription = "An installation at the end of the Dutch Pavillion's Journey at the World Expo in Osaka Japan."
        , longDescription = "I had the pleasure of working together with Tellart, where I got to help out with two pavillions. One was the Dutch pavillion where I got to develop the visual/ interactive part of an infinity mirror installation designed to leave the visitors with optimism and inpsiration. The other was the introduction projection show for the Phillipines pavillion where I got to develop tools and setup a system for that show. A product of that was a nice timeline editor, render and playout tool in TouchDesigner originally also designed to distribute real time render power between two pc's."
        , processDescription = "When I got the join the team, the idea of an infinity mirror was set, and I got to (working together with audio and hardware partners, designers, producers, all sorts) design the visual/ interactive logic for this mirror."
        , context = "This project was for the World Expo in Osaka Japan 2025. I got to travel there and implement it on site, which was a wonderfull and exciting learning experience."

        --
        , philosophy = ""
        , myRole = ""

        --
        , interestingDetails = Just "The pledge station previs originally used raymarched reflections I hand coded which simulated the infinity mirror effect more faithfully. I removed it since it was more performant to hard code simulate the infinity mirror effect. It was very educational to program tho!"
        , reflection = ""
        }
    , sources =
        { folderName = "PledgeStation"
        , thumbnail = { fileName = "use.jpg", description = "" }
        , finalFootage =
            [ Project.Image { fileName = "use.jpg", description = "A great image made by the Tellart team showing someone in front of the final installation" }
            , Project.YoutubeEmbedded { fileName = "0MrpMJxeoPc?si=BPl77dfzQk8nu6O3", description = "An interactive previs tool I made for experimenting during the pre-implementation stage" }
            , Project.Image { fileName = "prototype.jpg", description = "An image of us projecting the visual in the prototype phase" }
            , Project.Image { fileName = "pledge_network.png", description = "The Pledge Station network halfway during development (it got more structured, well named and minimal after)" }
            , Project.Image { fileName = "building.jpg", description = "A picture of the Dutch Pavillion in the World Expo" }

            -- , Project.Video { fileName = "interaction.mov", description = "" }
            , Project.Image { fileName = "PhillipinesBuilding.jpg", description = "A picture of the Phillipines Pavillion at World Expo" }
            , Project.Image { fileName = "Woven-Introduction-1-©️-Tellart.jpeg", description = "The introduction show space where I helped" }
            , Project.Video { fileName = "editor_system.mov", description = "A torn down/ renamed example of what the editor system for the introduction show looked like. It was also designed to share render power between computers" }
            ]
        , processFootage = []
        , externalLink = Nothing
        }
    , tags =
        { toolStack = []
        , medium = Installation
        }
    }
