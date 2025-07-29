module Projects.BuildUpAndRelease exposing (..)

import Date
import Element exposing (rgb)
import Project exposing (Client(..), Footage(..), Medium(..), Tool(..))
import Time exposing (Month(..))


data : Project.Project
data =
    { id = "build_up_and_release"
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
        , processDescription = "This machine comes from a pattern of operation I recognice within myself. It took a while to grasp and understand it, and eventually trough the labour of the creative process I found an interaction which represents it."
        , longDescription = "After a long reflection on what drives frustrates and motivates David Zwitser, he managed to compile it to a concrete interaction. The resulting  machine is addictive, triggering and captivating. It grabs you and keep you there up untill you collect the will to forcefully seperate yourself from it. When you press its luring big red button, a minimal alarming loading bar with a percentage next to it will pop up on the screen. The noise the machine is making will slowly get louder and higher the further this loading bar travels. First it goes quickly, but the longer you stand there, holding that button, the slower it goes. At this point you have gotten this far, so why would you stop, you want to see what will happen when the loading bar is full don't you? You hold on, the bar crawls up every so slightly and you wait. Who knows, it might still reach 100%. Don't be foolish, keep on going."
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
            [ -- [ Project.Video
              --     { fileName = "process_drawn_out.mov"
              --     , description = "an overview of the creative research halfway trough the project"
              --     }
              Project.Audio
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
