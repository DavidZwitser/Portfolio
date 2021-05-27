module Types exposing (..)

import Animator exposing (Timeline)
import Browser
import Color exposing (Color)
import Dict exposing (Dict)
import Project exposing (Project)
import Scene3d.Material exposing (Material, Texture)
import Time exposing (Month, Posix, toDay, toHour)
import Url
import WebGL.Texture


type LoaderStatus
    = Start
    | Animating
    | Finished


type ContactInfoState
    = Closed
    | OpenedBig
    | OpenedSmall


type Pages
    = Home
    | Projects
    | About
    | Contact


type alias Model =
    { screenSize : { width : Int, height : Int }
    , loaded : Animator.Timeline LoaderStatus
    , contactInfoState : Timeline ContactInfoState
    , showingNavigationMenu : Timeline Bool
    , page : Timeline Pages
    , currentProject : Project
    , lastProject : Project
    , transitionProject : Timeline TransitionType
    , allProjects : List Project
    , textures : Dict String TextureStatus
    , lastTime : Posix
    , deltaTime : Int
    , elapsedMs : Int
    }


type TextureStatus
    = LoadingTexture
    | LoadedTexture (Scene3d.Material.Texture Color)
    | Error WebGL.Texture.Error
    | NameNotFound String


type TransitionType
    = In
    | Out
    | Idle


type Direction
    = Right
    | Left


textures =
    { pf = "../media/images/pf.jpg"
    , error = "../media/images/no_tex_found.png"
    }


type Msg
    = AdjustScreenSize { width : Int, height : Int }
    | Tick Time.Posix
    | Loaded LoaderStatus
    | UrlChanged Url.Url
    | LinkClicked Browser.UrlRequest
    | OpenContactInfo ContactInfoState
    | MouseMovedOverBackground
    | OpenNavigationMenu Bool
    | NavigateTroughProjects Direction
    | TextureLoaded ( Result WebGL.Texture.Error (Scene3d.Material.Texture Color), String )
    | SetCurrentTime Time.Posix
