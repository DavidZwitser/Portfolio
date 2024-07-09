module Types exposing (..)

import Animator exposing (Timeline)
import Browser
import Browser.Navigation exposing (Key)
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
    , url : Url.Url
    , key : Key

    -- List project viewer
    , projectTransition : Timeline Project
    , allProjects : List Project

    -- in project viewer
    , footageTransition : Timeline Int
    , activeViewerPart : Timeline ViewerPart
    , footageAbout : Timeline Project.FootageAbout
    , hovered : Timeline ViewerPart
    , footageMuted : Bool
    , footageAutoplay : Bool
    , onMobile : Bool
    , screenSize : { w : Int, h : Int }
    }


type Msg
    = TimeTick Time.Posix
    | PageLoaded Bool
    | UrlChanged Url.Url
    | LinkClicked Browser.UrlRequest
    | NextFootageClicked Direction
    | FootageIndexClicked Int
    | NewHover ViewerPart
    | NewPagePartActive ViewerPart
    | NewFootageTypeClicked Project.FootageAbout
    | ToggleMute
    | ToggleAutoplay
    | SetAutoplay Bool
    | GotNewScreenSize Int Int


type Direction
    = Right
    | Left
