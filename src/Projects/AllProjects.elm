module Projects.AllProjects exposing (defaultProject, projects)

import Project
import Projects.BQN
import Projects.BuildUpAndRelease
import Projects.CONFINED_SPACE
import Projects.CanWorld
import Projects.CuddleKing2000
import Projects.DavidZwitser
import Projects.Dinner2050
import Projects.LifeLike
import Projects.PersonalSharedPhysicsl
import Projects.PledgeStation
import Projects.StateCircuits
import Projects.WhooshWhoosh
import Projects.WorkInProgress


projects : List Project.Project
projects =
    [ Projects.DavidZwitser.data
    , Projects.PledgeStation.data
    , Projects.CuddleKing2000.data
    , Projects.Dinner2050.data
    , Projects.WorkInProgress.data
    , Projects.StateCircuits.data
    , Projects.BQN.data
    , Projects.WhooshWhoosh.data
    , Projects.BuildUpAndRelease.data
    , Projects.CONFINED_SPACE.data
    , Projects.LifeLike.data
    , Projects.PersonalSharedPhysicsl.data
    , Projects.CanWorld.data
    ]


defaultProject : Project.Project
defaultProject =
    Projects.DavidZwitser.data
