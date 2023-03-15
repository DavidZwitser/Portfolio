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
    , imageTransition : Timeline Int
    , activeViewerPart : Timeline ViewerPart
    , imageType : Timeline Project.TypeOfImage
    }


type Msg
    = Tick Time.Posix
    | PageLoaded Bool
    | UrlChanged Url.Url
    | LinkClicked Browser.UrlRequest
    | ProjectClicked Project
    | NextImageClicked Direction
    | ImageIndexClicked Int
    | NewPagePartHovered ViewerPart
    | NewImageTypeClicked Project.TypeOfImage


type Direction
    = Right
    | Left
