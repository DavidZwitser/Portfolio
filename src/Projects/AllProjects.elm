module Projects.AllProjects exposing (defaultProject, projects)

import Project
import Projects.BuildUpAndRelease
import Projects.CONFINED_SPACE
import Projects.CanWorld
import Projects.CuddleKing2000
import Projects.DavidZwitser
import Projects.LifeLike
import Projects.PersonalSharedPhysicsl
import Projects.WhooshWhoosh


projects : List Project.Project
projects =
    [ Projects.DavidZwitser.data
    , Projects.CuddleKing2000.data
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
