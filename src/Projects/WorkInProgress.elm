module Projects.WorkInProgress exposing (data)

import Date
import Element exposing (rgb)
import Project exposing (Client(..), Medium(..), Tool(..))
import Time exposing (Month(..))
import Types exposing (Msg)


data : Project.Project
data =
    { id = "WIP"
    , variables =
        { date = Date.fromCalendarDate 2020 Jan 1
        , hoursSpent = 0
        , teamSize = 0
        , teamMates = Nothing
        , client = None
        , clientLink = Nothing
        , color = rgb 1 1 1
        }
    , text =
        { name = "(WIP)Experiments"

        --
        , shortDescription = ""
        , longDescription = "A series of experiments I'm working on or have done (last update 20 Oct 2025). Read the descriptions on the bottom to learn more. If it says (WIP) then I still want to progress it. These are here because they don't warrant a full project."
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
        { folderName = "WorkInProgress"
        , thumbnail = { fileName = "crane.png", description = "" }
        , finalFootage =
            [ Project.Video { fileName = "crane.mov", description = "(WIP) An exploration of UX/UI (systems we design for our physical bodies to enter the digital world) as a purely esthetic device (made in TouchDesigner)." }
            , Project.Image { fileName = "crane.png", description = "(WIP) An exploration of UX/UI (systems we design for our physical bodies to enter the digital world) as a purely esthetic device (made in TouchDesigner)." }
            , Project.Image { fileName = "crane2.png", description = "(WIP) An exploration of UX/UI (systems we design for our physical bodies to enter the digital world) as a purely esthetic device (made in TouchDesigner)." }

            -- , Project.Image { fileName = "crane.png", description = "" }
            , Project.Video { fileName = "harmony.mov", description = "(WIP) A small tool for building chords. (Turn on audio with the speaker icon on the bottom left). I'll add a lot more features like chord inverstions/ voicings, a real time piano roll, a sequencer, audio filters and the likes. This was initially build to hook up to the experiment before this one. I realised that after learning music theory I could put that theory into a TD tool." }
            , Project.Video { fileName = "MixMachine.mov", description = "(WIP) After VJing for the first time and slapping down a scrappy but cool TD tool/UI for it, I got inspired to build a propper one. It's called `MixMachine` with the goal that you can drag components around to form a pipeline of little mixer components. Everything should feel intuitive and it is designed to map to finite MIDI controll inputs where you can drag your MIDI Chop channel onto a UI element where it will be auto mapped, and that mapping would be tweakable in the side menu. A bit ambitious." }
            , Project.Video { fileName = "MixMachineUI.mov", description = "(WIP) Another part of the design process of this MixMachine. (It's just fun to make playfull UI's like this)." }
            , Project.YoutubeEmbedded { fileName = "v8h79bucNh4", description = "(WIP) I'm learning to make music with Tydal Cycles, but  I used Strudl before. Live coding is such a wonderfull interface for making music." }
            , Project.Video { fileName = "strudl.mov", description = "(WIP) Another short video with Strudel" }
            , Project.Video { fileName = "kaartje.mov", description = "A small little UI world for my Buisness Card." }
            , Project.Video { fileName = "TD_Bitwig2.mov", description = "(WIP) Audio experiment with very minimal TD using Bitwig" }
            , Project.Video { fileName = "TD_Bitwig.mov", description = "(WIP) Another audio experiment with very minimal TD using Bitwig" }
            , Project.Image { fileName = "spacial_pin.png", description = "An iPhone shortcut makes a screenshot but also takes a photo of the place your phone was in in that moment" }
            ]
        , processFootage = []
        , externalLink = Nothing
        }
    , tags =
        { toolStack = []
        , medium = TechnicalExploration
        }
    }
