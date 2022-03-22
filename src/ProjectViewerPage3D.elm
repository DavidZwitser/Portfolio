module ProjectViewerPage3D exposing (..)

import Angle
import Animator.Css exposing (offset)
import Array
import Axis3d exposing (Axis3d)
import Block3d exposing (Block3d)
import Camera3d
import Color exposing (Color)
import Dict exposing (Dict)
import Direction3d
import Element exposing (..)
import Element.Background
import Element.Border
import Html exposing (Html, math, s)
import Length exposing (Length, Meters)
import List.Extra exposing (iterate)
import Luminance exposing (Luminance)
import LuminousFlux exposing (..)
import Pixels exposing (Pixels)
import Plane3d exposing (Plane3d)
import Point3d
import Project exposing (Project)
import Projects.CONFINED_SPACE
import Projects.LifeLike
import Projects.MovingUp
import Quantity exposing (Quantity)
import Scene3d exposing (Entity)
import Scene3d.Light exposing (..)
import Scene3d.Material as Material exposing (Material, Texture)
import Scene3d.Mesh exposing (Textured)
import Sphere3d exposing (Sphere3d, boundingBox)
import Task exposing (Task)
import Triangle3d exposing (Triangle3d)
import TriangularMesh exposing (TriangularMesh)
import Types exposing (GridElementData, Model, Msg(..), Pages(..), TextureStatus(..), textures)
import Vector3d exposing (Vector3d)
import Viewpoint3d


projectViewer : List GridElementData -> Dict String TextureStatus -> Element Msg
projectViewer gridData textures =
    let
        size =
            1000
    in
    Element.el
        [ centerX
        , centerY
        , Element.width fill
        , height fill
        , Element.Background.color <| rgb 0.2 0.2 0.2
        , Element.inFront <|
            el
                [ Element.width fill
                , Element.height fill
                , clip
                , centerX
                , centerY

                -- , Element.Background.color <| rgb 0.4 0.4 0.4
                ]
                none
        ]
    <|
        Debug.log "hi" <|
            html (scene (viewGrid textures gridData) size)


textureLoaders : List (Cmd Msg)
textureLoaders =
    List.map loadTextureTask gridElements


loadTextureTask : String -> Cmd Msg
loadTextureTask texture =
    Task.attempt (\result -> TextureLoaded ( result, texture )) (Material.load texture)


texDictToTexStatus : Dict String TextureStatus -> String -> TextureStatus
texDictToTexStatus textures name =
    Maybe.withDefault (NameNotFound <| name ++ " not found as a texture name") (Dict.get name textures)


gridElements : List String
gridElements =
    let
        projects =
            [ Projects.CONFINED_SPACE.data
            , Projects.LifeLike.data
            , Projects.MovingUp.data
            ]
    in
    List.map (Project.getImagePath "thumb_texture.jpg") projects


initialGridPositions : List GridElementData
initialGridPositions =
    moveGridPositions 0 ( 0, 0 ) <| gridPositions 0 gridElements


viewGrid : Dict String TextureStatus -> List GridElementData -> List (Scene3d.Entity coordinates)
viewGrid textures gridData =
    gridElements
        |> List.map (texDictToTexStatus textures)
        |> List.map (gridItem 1)
        |> entitiesOnGridData gridData


gridItem : Float -> TextureStatus -> Entity coordinates
gridItem size tex =
    Scene3d.quadWithShadow (getPotentialTextureMaterial tex)
        (Point3d.meters 0 -size -size)
        (Point3d.meters 0 size -size)
        (Point3d.meters 0 size size)
        (Point3d.meters 0 -size size)



-- Scene3d.quadWithShadow <|
--     Scene3d.Mesh.texturedFaces <|
--         TriangularMesh.indexed
--             (Array.fromList
--                 [ { position = Point3d.centimeters 10 10 0, normal = Vector3d.unitless 0 0 0, uv = ( 0, 0 ) }
--                 , { position = Point3d.centimeters 10 10 0, normal = Vector3d.unitless 0 0 0, uv = ( 0, 0 ) }
--                 , { position = Point3d.centimeters 10 10 0, normal = Vector3d.unitless 0 0 0, uv = ( 0, 0 ) }
--                 , { position = Point3d.centimeters 10 10 0, normal = Vector3d.unitless 0 0 0, uv = ( 0, 0 ) }
--                 ]
--             )
--             [ ( 0, 1, 2 ), ( 0, 2, 3 ), ( 0, 0, 0 ), ( 0, 0, 0 ) ]


getPotentialTextureMaterial : TextureStatus -> Material.Textured coordinates
getPotentialTextureMaterial status =
    case status of
        LoadingTexture ->
            Material.matte Color.white

        LoadedTexture tex ->
            Material.texturedEmissive tex (Luminance.nits 40002)

        Error err ->
            Material.matte Color.red

        NameNotFound name ->
            Material.matte Color.grey


indexToRingNumber : Int -> Int -> Int
indexToRingNumber potentialPosition targetElementNumber =
    let
        snappedElementNumber =
            6 * (2 ^ potentialPosition - 1)
    in
    if snappedElementNumber >= targetElementNumber then
        potentialPosition

    else
        indexToRingNumber (potentialPosition + 1) targetElementNumber


entitiesOnGridData : List GridElementData -> List (Scene3d.Entity coordinates) -> List (Scene3d.Entity coordinates)
entitiesOnGridData dataList elementList =
    List.map2
        (\data ell ->
            ell
                |> Scene3d.translateBy (Vector3d.meters data.pos.x data.pos.y data.pos.z)
                |> Scene3d.rotateAround (Axis3d.through (Point3d.meters 0 0 0) Direction3d.z) (Angle.degrees 0)
                |> Scene3d.scaleAbout (Point3d.meters 0 0 0) data.scale
        )
        dataList
        elementList


gridPositions : Int -> List String -> List GridElementData
gridPositions iteration copies =
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

        ittToRing =
            indexToRingNumber 0

        ringNumber =
            ittToRing iteration

        countInRing =
            ittToRing iteration * 6

        indexInRing =
            iteration - ittToRing iteration

        sinMappedPos =
            pi * 2 / toFloat countInRing * toFloat indexInRing

        position =
            { x = 0
            , y = noNaN (sinusify sinMappedPos (toFloat ringNumber * 2.5) 0)
            , z = noNaN (cosinusify sinMappedPos (toFloat ringNumber * 2.5) 0)
            }

        -- rotation =
        --     Angle.degrees 1
        scale =
            0.4

        -- + (toFloat <| List.length copies) * 0.02
    in
    case copies of
        [] ->
            []

        data :: rest ->
            { pos = position, rot = { x = 0, y = 0, z = 0 }, scale = scale }
                :: gridPositions (iteration + 1) rest


moveGridPositions : Int -> ( Float, Float ) -> List GridElementData -> List GridElementData
moveGridPositions iteration ( moveX, moveY ) oldData =
    case oldData of
        [] ->
            []

        old :: rest ->
            let
                position =
                    { x = 5 - (abs old.pos.y + abs old.pos.z) * 0.7
                    , y = old.pos.y + moveX * 0.01
                    , z = old.pos.z + -moveY * 0.01
                    }
            in
            { pos = position
            , rot = { x = 0, y = 0, z = 0 }
            , scale = 0.7
            }
                :: moveGridPositions (iteration + 1) ( moveX, moveY ) rest


itemClosestToCenter : Maybe { x : Float, y : Float } -> List GridElementData -> Maybe { x : Float, y : Float }
itemClosestToCenter smallestFound items =
    case items of
        [] ->
            smallestFound

        curr :: rest ->
            let
                smallestFoundDist =
                    Maybe.map (\smallest -> abs (smallest.x ^ 2 + smallest.y ^ 2)) smallestFound

                currentDist =
                    Just <| abs (curr.pos.y ^ 2 + curr.pos.z ^ 2)

                currIsSmallest =
                    Maybe.map2 (\smallFoundDist currDist -> smallFoundDist > currDist) smallestFoundDist currentDist == Just True

                smallestDist =
                    if currIsSmallest == True || smallestFoundDist == Nothing then
                        Just { x = curr.pos.y, y = curr.pos.z }

                    else
                        smallestFound
            in
            itemClosestToCenter smallestDist rest


itemClosestToCenterWithDefaults : List GridElementData -> { x : Float, y : Float }
itemClosestToCenterWithDefaults items =
    Maybe.withDefault { x = 0, y = 0 } <| itemClosestToCenter Nothing items


snapGridTo : { x : Float, y : Float } -> List GridElementData -> ( List GridElementData, Bool )
snapGridTo momentum items =
    let
        itemDistance =
            itemClosestToCenterWithDefaults items

        snapSpeed =
            8

        arrived =
            abs itemDistance.x + abs itemDistance.y < 0.01
    in
    ( moveGridPositions 0 ( -itemDistance.x * snapSpeed * momentum.x, itemDistance.y * snapSpeed * momentum.y ) items, arrived )


scene : List (Scene3d.Entity coordinates) -> Int -> Html Msg
scene loadedGrid dimensions =
    Scene3d.sunny
        { camera = camera
        , clipDepth = Length.centimeters 0.5
        , dimensions = ( Pixels.int dimensions, Pixels.int dimensions )
        , background = Scene3d.transparentBackground
        , entities = loadedGrid ++ [ groundPlane 0 ]
        , shadows = False
        , upDirection = Direction3d.z
        , sunlightDirection = Direction3d.yz (Angle.degrees 50)
        }


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
                { eyePoint = Point3d.meters 8 0 0
                , focalPoint = Point3d.origin
                , upDirection = Direction3d.positiveZ
                }
        , verticalFieldOfView = Angle.degrees 60
        }
