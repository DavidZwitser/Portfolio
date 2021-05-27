module HomePage exposing (..)

import Animator exposing (..)
import Animator.Inline exposing (..)
import Debug exposing (..)
import Element exposing (..)
import Element.Background as Background
import Element.Border as Border
import Element.Events exposing (onClick)
import Element.Font exposing (Font, justify)
import Element.Input
import Html exposing (a, button, label)
import Html.Attributes exposing (..)
import Types exposing (..)


highlightColor : Color
highlightColor =
    rgb 0.8 0.8 0.8


highlightedText : String -> Element Msg
highlightedText inputText =
    el [ Element.Font.color highlightColor ] (Element.text inputText)


homePage : Model -> Float -> Element Msg
homePage model vmin =
    row [ centerY, Element.width fill, Element.height fill ]
        [ el [ Element.width <| fillPortion 1, Element.height fill ] none
        , column
            [ centerX
            , padding 20
            , Element.width <| px <| round (vmin * 0.5)
            , Element.height <| px <| round (vmin * 0.5)
            , clip
            , Border.shadow { offset = ( -3, 3 ), size = 1, blur = 15, color = rgb 0.2 0.2 0.2 }
            , Border.rounded 20

            -- , Element.height fill
            , Background.color <| rgb 0.75 0.75 0.75

            -- , behindContent <| paragraph [ Element.Font.color <| rgb 0.7 0.7 0.7, Element.width fill, Element.height fill, Element.Font.justify ] <| [ text "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In rhoncus tortor tellus, sit amet viverra velit consequat in. Sed pellentesque augue et vehicula bibendum. Quisque in convallis neque, a sollicitudin lectus. Donec vehicula sollicitudin felis sit amet sodales. Phasellus vulputate accumsan urna, et elementum velit semper ac. Mauris et semper justo. Nulla dignissim diam vitae facilisis cursus. Quisque ac condimentum massa. Quisque quis sagittis nibh, non tincidunt sem.\n\nProin vulputate auctor ante sed accumsan. Maecenas convallis et tortor in ultrices. Fusce condimentum malesuada lorem, id maximus purus ullamcorper ac. Phasellus libero elit, congue ut euismod at, rhoncus ut nisl. Etiam blandit ligula nec ex volutpat mattis. Nulla feugiat pretium ligula, quis varius metus. Vestibulum in blandit risus, a porta nisi. Vestibulum viverra enim id arcu scelerisque dapibus. Fusce enim sem, dignissim vel suscipit vitae, dapibus non risus. Nulla a dignissim diam. Duis placerat sit amet risus non laoreet. Nullam sapien libero, aliquam sed egestas eu, congue sit amet ex.\n\nAliquam sollicitudin mauris eu enim ultricies, et imperdiet enim blandit. Morbi pulvinar lorem eu placerat lobortis. Phasellus quis pellentesque arcu. Sed aliquet massa et egestas rutrum. Nulla blandit dictum orci, ac semper nunc semper non. Sed ultricies, massa eu porttitor convallis, urna libero ornare dolor, vitae cursus tortor urna sed elit. Aenean euismod gravida tortor, ut porta enim maximus eget. Suspendisse vehicula pellentesque nunc non congue. Fusce suscipit nisl eget varius tincidunt. Morbi eget accumsan est, nec facilisis nulla. Vestibulum sit amet massa ut nisi pharetra scelerisque. Donec lobortis, mauris nec dictum elementum, mauris lorem viverra nisl, vitae venenatis justo mi vel nisi. Nulla mollis id mauris quis viverra. Maecenas luctus ultrices pulvinar. Donec suscipit, quam vel gravida mattis, purus libero elementum tellus, ut tincidunt ligula ipsum consequat mauris.\n\nVivamus mattis tellus vel aliquam porttitor. In blandit sed leo sit amet facilisis. Quisque felis magna, luctus pellentesque vestibulum id, varius a augue. Curabitur mollis augue vitae facilisis eleifend. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi maximus risus quis ultricies efficitur. Sed et fringilla libero. Pellentesque gravida commodo mi nec tristique. Nulla erat nunc, bibendum mollis eros ut, auctor lobortis enim.\n\nInteger quis molestie tortor, tempor pharetra dui. Vestibulum tempor, ex non scelerisque blandit, nisi elit pellentesque nisl, sit amet euismod nisi lectus vitae odio. Vestibulum auctor lorem a pellentesque aliquet. Praesent id tempus libero, eu suscipit enim. Suspendisse nunc mauris, volutpat ac risus at, imperdiet tempor leo. Curabitur quis hendrerit lacus, in tincidunt eros. Nam consectetur, metus non tristique faucibus, nisl dolor rhoncus nibh, eget blandit magna lectus ut arcu. Nulla facilisi. Nulla dui felis, rutrum id efficitur a, pulvinar eget magna. Cras fermentum erat massa, vitae scelerisque ex faucibus eget. Nullam eget varius sapien, vitae posuere metus." ]
            ]
            [ el
                [ Border.rounded 250
                , centerX
                , centerY
                , Element.width fill
                , Element.height fill
                , pointer
                , Border.innerShadow { offset = ( -3, 3 ), size = 1, blur = 15, color = rgb 0.2 0.2 0.2 }
                , htmlAttribute <|
                    Animator.Inline.scale model.loaded <|
                        \status ->
                            case status of
                                Start ->
                                    Animator.at 0.5

                                Animating ->
                                    Animator.at 1

                                Finished ->
                                    Animator.at 1
                , clip
                ]
                (el
                    [ centerY
                    , centerX
                    , clip
                    , onClick (OpenNavigationMenu False)
                    , htmlAttribute <|
                        Animator.Inline.rotate model.loaded <|
                            \status ->
                                case status of
                                    Start ->
                                        Animator.at 0.2

                                    Animating ->
                                        Animator.at 0

                                    Finished ->
                                        Animator.at 0
                    ]
                    (html <|
                        Html.video
                            [ Html.Attributes.style "filter" "grayscale(1) opacity(.5)"
                            , src "../media/videos/homepage_video.mp4"
                            , autoplay True
                            , Html.Attributes.loop True
                            , Html.Attributes.style "height" "50vmin"
                            ]
                            []
                    )
                 -- { src = "../media/images/pf.JPG", description = "Profile picture" }
                )
            ]

        -- , el [ Element.width <| fillPortion 1, Element.height fill ] none
        , el [ Element.width <| fillPortion 4 ] <|
            textColumn
                [ Element.Font.alignLeft
                , centerX
                , spacing 20
                , padding 50
                , Element.Font.light
                , Element.behindContent <|
                    wrappedRow
                        [ centerX
                        , Element.Font.center
                        , Element.Font.size 50
                        , Element.width <| px <| round <| vmin * 0.5
                        , htmlAttribute <|
                            Animator.Inline.style model.showingNavigationMenu "height" (\value -> toString value ++ "vh") <|
                                \state ->
                                    if state == False then
                                        Animator.at 0

                                    else
                                        Animator.at 20
                        , htmlAttribute <|
                            Animator.Inline.opacity model.showingNavigationMenu <|
                                \state ->
                                    if state == False then
                                        Animator.at 0

                                    else
                                        Animator.at 1
                        , htmlAttribute <|
                            Animator.Inline.xy model.showingNavigationMenu <|
                                \state ->
                                    if state == False then
                                        { x = Animator.at 0, y = Animator.at 100 }

                                    else
                                        { x = Animator.at 0, y = Animator.at 0 }

                        -- , clip
                        ]
                        [ Element.Input.button [ centerX ] { onPress = Just (OpenContactInfo OpenedBig), label = text "What I make" }
                        , Element.Input.button [ centerX ] { onPress = Just (OpenContactInfo OpenedBig), label = text "What I am interested in" }
                        , Element.Input.button [ centerX ] { onPress = Just (OpenContactInfo OpenedBig), label = text "Contact me" }
                        ]

                -- , moveDown 30
                , Element.Font.color <| rgb 0.6 0.6 0.6
                ]
                [ paragraph
                    [ htmlAttribute <|
                        Animator.Inline.opacity model.showingNavigationMenu <|
                            \state ->
                                if state == False then
                                    Animator.at 1

                                else
                                    Animator.at 0
                    , htmlAttribute <|
                        Animator.Inline.xy model.showingNavigationMenu <|
                            \state ->
                                if state == False then
                                    { x = Animator.at 0, y = Animator.at 0 }

                                else
                                    { x = Animator.at 0, y = Animator.at -100 }
                    ]
                    [ none
                    , el [ Element.Font.size 40 ] <| text "David Zwitser\n"
                    , el [ Element.Font.size 30 ] <| text "Hello, "
                    , text "I am David, an "
                    , highlightedText "indipendent"
                    , text ", "
                    , highlightedText "multidisciplined"
                    , text " "
                    , highlightedText "creator"
                    , text " with "
                    , highlightedText "coding "
                    , text "as my main weapon. Want to know more?"
                    , Element.Input.button [] { onPress = Just (OpenNavigationMenu True), label = highlightedText " click here" }
                    ]
                ]
        ]
