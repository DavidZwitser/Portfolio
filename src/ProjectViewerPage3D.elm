module ProjectViewerPage3D exposing (..)

import Angle
import Animator.Css exposing (offset)
import Axis3d exposing (Axis3d)
import Block3d exposing (Block3d)
import Camera3d
import Color exposing (Color)
import Dict exposing (Dict)
import Direction3d
import Element exposing (..)
import Element.Background
import Element.Border
import Html exposing (Html, math)
import Length exposing (Length, Meters)
import List.Extra exposing (iterate)
import Luminance exposing (Luminance)
import LuminousFlux exposing (..)
import Pixels
import Plane3d exposing (Plane3d)
import Point3d
import Quantity exposing (Quantity)
import Scene3d
import Scene3d.Light exposing (..)
import Scene3d.Material as Material exposing (Material, Texture)
import Sphere3d exposing (Sphere3d, boundingBox)
import Task exposing (Task)
import Triangle3d exposing (Triangle3d)
import Types exposing (Model, Msg(..), TextureStatus(..), textures)
import Vector3d exposing (Vector3d)
import Viewpoint3d


projectViewer : Model -> Element Msg
projectViewer model =
    Element.el [ centerX, centerY, Element.width <| px 600, height <| px 600, Element.Border.width 2 ] <|
        --, Element.Background.color <| rgb 0.2 0.2 0.2 ] <|
        html
            (scene
                [ texDictToTexStatus textures.pf model.textures
                , texDictToTexStatus textures.pf model.textures
                , texDictToTexStatus textures.pf model.textures
                , texDictToTexStatus textures.pf model.textures
                , texDictToTexStatus textures.pf model.textures
                , texDictToTexStatus textures.pf model.textures
                , texDictToTexStatus textures.pf model.textures
                , texDictToTexStatus textures.pf model.textures
                , texDictToTexStatus textures.pf model.textures
                , texDictToTexStatus textures.pf model.textures
                , texDictToTexStatus textures.pf model.textures
                , texDictToTexStatus textures.pf model.textures
                , texDictToTexStatus textures.pf model.textures
                , texDictToTexStatus textures.pf model.textures
                , texDictToTexStatus textures.pf model.textures
                , texDictToTexStatus textures.pf model.textures
                , texDictToTexStatus textures.pf model.textures
                , texDictToTexStatus textures.pf model.textures
                , texDictToTexStatus textures.pf model.textures
                , texDictToTexStatus textures.pf model.textures
                , texDictToTexStatus textures.pf model.textures
                , texDictToTexStatus textures.pf model.textures
                , texDictToTexStatus textures.pf model.textures
                , texDictToTexStatus textures.pf model.textures
                , texDictToTexStatus textures.pf model.textures
                , texDictToTexStatus textures.pf model.textures
                , texDictToTexStatus textures.pf model.textures
                , texDictToTexStatus textures.pf model.textures
                , texDictToTexStatus textures.pf model.textures
                , texDictToTexStatus textures.pf model.textures
                , texDictToTexStatus textures.pf model.textures
                , texDictToTexStatus textures.pf model.textures
                , texDictToTexStatus textures.pf model.textures
                , texDictToTexStatus textures.pf model.textures
                , texDictToTexStatus textures.pf model.textures
                , texDictToTexStatus textures.pf model.textures
                ]
                model.elapsedMs
            )


textureLoaders : Cmd Msg
textureLoaders =
    Cmd.batch
        [ loadTextureTask textures.error
        , loadTextureTask textures.pf
        ]


loadTextureTask : String -> Cmd Msg
loadTextureTask texture =
    Task.attempt (\result -> TextureLoaded ( result, texture )) (Material.load texture)


texDictToTexStatus : String -> Dict String TextureStatus -> TextureStatus
texDictToTexStatus name textures =
    Maybe.withDefault (NameNotFound <| name ++ " not found as a texture name") (Dict.get name textures)


indexInGrid : Int -> Int -> Int
indexInGrid targetElementNumber potentialPosition =
    let
        snappedElementNumber =
            6 * (2 ^ potentialPosition - 1)
    in
    if snappedElementNumber >= targetElementNumber then
        potentialPosition

    else
        indexInGrid targetElementNumber (potentialPosition + 1)


placeInGrid : Int -> List (Scene3d.Entity coordinates) -> List (Scene3d.Entity coordinates)
placeInGrid iteration entities =
    let
        sinusify pos amp offset =
            sin pos * amp + offset

        cosinusify pos amp offset =
            cos pos * amp + offset

        noNaN value =
            if value |> isNaN then
                0

            else
                value

        index =
            toFloat <| iteration

        scale =
            6

        ringNumber =
            indexInGrid iteration 0

        countInRing =
            indexInGrid iteration 0 * 6

        indexInRing =
            iteration - indexInGrid iteration 0

        sinMappedPos =
            pi * 2 / toFloat countInRing * toFloat indexInRing

        position =
            Vector3d.meters
                0
                (noNaN
                    (sinusify
                        sinMappedPos
                        (toFloat ringNumber)
                        0
                    )
                )
                (noNaN
                    (cosinusify
                        sinMappedPos
                        (toFloat ringNumber)
                        0
                    )
                )

        -- rotation =
        --     Angle.degrees 1
        -- scale =
        --     0.2
    in
    case entities of
        [] ->
            []

        entity :: rest ->
            (entity
                |> Scene3d.translateBy position
             -- |> Scene3d.rotateAround (Axis3d.through (Point3d.meters 0 0 0) Direction3d.z) rotation
             -- |> Scene3d.scaleAbout (Point3d.meters 0 0 0) scale
            )
                :: placeInGrid (iteration + 1) rest


scene : List TextureStatus -> Int -> Html Msg
scene images time =
    Scene3d.sunny
        { camera = camera
        , clipDepth = Length.centimeters 0.5
        , dimensions = ( Pixels.int 600, Pixels.int 600 )
        , background = Scene3d.transparentBackground
        , entities =
            (placeInGrid 0 <| List.map (box 0.3) images)
                ++ [ groundPlane 0 ]
        , shadows = False
        , upDirection = Direction3d.z
        , sunlightDirection = Direction3d.yz (Angle.degrees -120)
        }


getPotentialTextureMaterial : TextureStatus -> Material.Textured coordinates
getPotentialTextureMaterial status =
    case status of
        LoadingTexture ->
            Material.matte Color.white

        LoadedTexture tex ->
            Material.texturedEmissive tex (Luminance.nits 20002)

        Error err ->
            Material.matte Color.red

        NameNotFound name ->
            Material.matte Color.grey


box : Float -> TextureStatus -> Scene3d.Entity coordinates
box size tex =
    Scene3d.quad (getPotentialTextureMaterial tex)
        (Point3d.meters 0 -size -size)
        (Point3d.meters 0 size -size)
        (Point3d.meters 0 size size)
        (Point3d.meters 0 -size size)


groundPlane size =
    Scene3d.quad
        (Material.matte Color.grey)
        (Point3d.meters -size -size 0)
        (Point3d.meters size -size 0)
        (Point3d.meters size size 0)
        (Point3d.meters -size size 0)


camera =
    Camera3d.perspective
        { viewpoint =
            Viewpoint3d.lookAt
                { eyePoint = Point3d.meters 10 0 3
                , focalPoint = Point3d.origin
                , upDirection = Direction3d.positiveZ
                }
        , verticalFieldOfView = Angle.degrees 60
        }
