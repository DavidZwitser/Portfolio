module Projects.BuildUpAndRelease exposing (..)

import Date
import Element exposing (rgb)
import Project exposing (Client(..), Footage(..), Medium(..), Tool(..))
import Time exposing (Month(..))


data : Project.Project
data =
    { id = "BuildUpAndRelease"
    , variables =
        { date = Date.fromCalendarDate 2022 Jun 30
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
        , shortDescription = "Experience the pointlessness and frustration behind our constant desire to want and accumulate."
        , processDescription = "This machine comes from a pattern of operation I recognice within myself. It took a while to grasp and understand it, and eventually trough the magic of the creative process I found a perfect simple interaction which represents it."
        , longDescription = "A long reflection on what drives frustrates and motivates me has brought me to a very simple interaction which reflects it perfectly. The interactive machine throws you right in. It's addictive, triggering and very effective. It grabs you and keep you there up untill you decide to forcefully seperate yourself. When you press the blinking button, a loading bar with a percentage next to it will pop up, and the frequiency of the humming sound which the machine was making will start to rise. The loading bar will start out growing quite fast, but the further you get, the slower it goes, all the while the sound gets harsher and harsher. At this point you have gotten this far, so why would you stop, you want to see what will happen when the loading bar is full. You hold on, the bar crawls up every so slightly slower each time and you wait, and wait, who knows, it might still reach 100%. Don't be a fool, keep on going."
        , context = "This was my graduation artwork at Image and Media Technology at the HKU."

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
            }
        , finalFootage =
            [ Project.Video
                { fileName = "OmDeHoek.mov"
                , description = "installation at HKU exposure"
                }
            , Project.Video
                { fileName = "DeUI.mov"
                , description = "close-up of the UI"
                }
            , Project.Image
                { fileName = "InHetHokje.jpg"
                , description = "people using the machine"
                }
            , Project.Video
                { fileName = "Aankleding.mov"
                , description = "a bit deconstructed"
                }
            , Project.Video
                { fileName = "Losgelaten.mov"
                , description = "release"
                }
            ]
        , processFootage =
            [ Project.Video
                { fileName = "process_drawn_out.mov"
                , description = "an overview of the creative research halfway trough the project"
                }
            , Project.Audio
                { fileName = "philosophy_behind_it.wav"
                , description = "a snipped of the ideas that were going trough my head during the creation process"
                }
            , Project.Image
                { fileName = "small_sketches.jpg"
                , description = "some small sketches giving an idea of what the installation could look like"
                }
            , Project.Video
                { fileName = "rene_tryout.mov"
                , description = "an early prototype used by a teacher during class"
                }
            , Project.Video
                { fileName = "test.mov"
                , description = "a later prototype trying out different visuals"
                }
            , Project.Image
                { fileName = "Ben_tryout.PNG"
                , description = "a prototype version"
                }
            , Project.Video
                { fileName = "behind_the_prototype.mov"
                , description = "behind the prototype version"
                }
            , Project.Image
                { fileName = "project_scetches.jpg"
                , description = "building plans I created in Fusion 360"
                }
            , Project.Image
                { fileName = "cluttered_proress.jpg"
                , description = "a view of working on the internals of the machine"
                }
            , Project.Video
                { fileName = "glueing_the_case.mov"
                , description = "a view of constructing the case of the machine"
                }
            , Project.Video
                { fileName = "moving_with_bakfiets.mov"
                , description = "moving the machine around"
                }
            , Project.Image
                { fileName = "Thuis.jpg"
                , description = "final touches"
                }
            ]
        , externalLink = Nothing
        }
    , tags =
        { toolStack = [ Project.RaspberryPI, Project.Woodwork, Project.Pneumatics, Project.PureData ]
        , medium = Installation
        }
    }
