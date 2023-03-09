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


type alias Model =
    { loaded : Timeline Bool

    -- List project viewer
    , currentProject : Project
    , allProjects : List Project

    -- in project viewer
    , imageIndex : Int
    , activeViewerPart : Timeline ViewerPart
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


type Direction
    = Right
    | Left
