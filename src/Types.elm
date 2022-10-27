module Types exposing (..)

import Animator exposing (Timeline)
import Browser
import Color exposing (Color)
import Dict exposing (Dict)
import Project exposing (Project)
import Time exposing (Month, Posix, toDay, toHour)
import Url


type LoaderStatus
    = Start
    | Animating
    | Finished


type Pages
    = Home
    | Projects
    | About
    | Contact


type alias Model =
    { screenSize : { width : Int, height : Int }

    -- Navigation
    , page : Timeline Pages
    , loaded : Animator.Timeline LoaderStatus

    -- List project viewer
    , currentProject : Project
    , lastProject : Project
    , transitionProject : Timeline TransitionType
    , allProjects : List Project
    }


type Msg
    = AdjustScreenSize { width : Int, height : Int }
    | Tick Time.Posix
    | Loaded LoaderStatus
    | UrlChanged Url.Url
    | LinkClicked Browser.UrlRequest
    | MouseMovedOverBackground
    | NavigateTroughProjects Direction
    | ChangePage Pages
    | GetViewportScopes
    | ViewProject Project


type TransitionType
    = In
    | Out
    | Idle


type Direction
    = Right
    | Left
