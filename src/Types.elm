module Types exposing (..)

import Animator exposing (Timeline)
import Browser
import Project exposing (Project)
import Time
import Url


type ViewerPart
    = Description
    | ProjectPicker
    | Background


type Transition from to
    = Start from to


type alias Model =
    { loaded : Timeline Bool

    -- List project viewer
    , projectTransition : Timeline Project
    , allProjects : List Project

    -- in project viewer
    , footageTransition : Timeline Int
    , activeViewerPart : Timeline ViewerPart
    , footageAbout : Timeline Project.FootageAbout
    , footageMuted : Bool
    , footageAutoplay : Bool
    }


type Msg
    = Tick Time.Posix
    | PageLoaded Bool
    | UrlChanged Url.Url
    | LinkClicked Browser.UrlRequest
    | ProjectClicked Project
    | NextFootageClicked Direction
    | FootageIndexClicked Int
    | NewPagePartHovered ViewerPart
    | NewFootageTypeClicked Project.FootageAbout
    | ToggleMute
    | ToggleAutoplay
    | SetAutoplay Bool
    | OpenExternalPage String


type Direction
    = Right
    | Left
