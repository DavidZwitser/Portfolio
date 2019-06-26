/* Load scss files */
import '../css/index.scss';

/* Import animation library */
// import anime from '../../node_modules/animejs/lib/anime.es.js';
// /// <reference path="../definitions/index.d.ts" />

window.onhashchange = hashChanged;
window.addEventListener('load', hashChanged);

window.addEventListener('resize', resized);

function hashChanged()
{
    let hash = window.location.hash;

    let navbar = document.getElementById("navigation-bar");
    let navbar_links = document.getElementById('navigation-bar-links');
    let navbar_back = document.getElementById('navigation-bar-back-button');

    if (hash == '')
    {
        window.location.hash = 'page-home';
    }
    
    if (hash == '#page-home')
    {
        navbar.style.top = "94vh";
        navbar_links.style.display = 'block';
        navbar_back.style.display = 'none';
    }
    else
    {
        navbar.style.top = '0%';
        navbar_links.style.display = 'none';
        navbar_back.style.display = 'block';
    }
}

import MouseEventsHandler from './mouseEvents';

let mouse: MouseEventsHandler = new MouseEventsHandler();

mouse.draggingCallback.push(() => {
    grid.rePosition(mouse.velocityX, mouse.velocityY, true);
});
mouse.mosueUpCallback.push(() => {
    grid.letGoOfGrid(mouse.velocityX, mouse.velocityY);
})

function resized()
{
    grid.rePosition();
}

import ContentBase from './content/contentBase';
import GridView from './viewers/gridView';
import PreviewPane from './viewers/previewPane';

let imageThumbnails: string[] = 
["https://scontent-amt2-1.cdninstagram.com/vp/f950364993039b058547ae33dec9bccc/5DA331A3/t51.2885-15/sh0.08/e35/c131.0.818.818/s640x640/56601208_345458552745670_1760816799713264435_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/baf3aa9a66c6e3990ac972526f5a4d5b/5DB849DD/t51.2885-15/sh0.08/e35/s640x640/55818866_830206923999158_489540841376165079_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/fb4f175f28cfbc7db93894abeb71e26b/5D15BEBC/t51.2885-15/sh0.08/e35/s640x640/53248525_804490009914462_2072878998057648288_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/0f5c1c9d61621c949c318fe94136e2c7/5D15B702/t51.2885-15/sh0.08/e35/s640x640/53740005_1190232827821567_99449782983806779_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/8f886d8a90d4dbb80af0632bc0ab44c7/5D16A89F/t51.2885-15/e35/c157.0.406.406a/53607368_793862424325970_8122562901038290661_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/8c6ffc4cf8d2465b02a14f5c6f92aced/5D15BA5C/t51.2885-15/sh0.08/e35/s640x640/53083494_624291107998989_2034682335209942544_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/082f7271c0ea17c06e5482678d20b266/5D15DF26/t51.2885-15/sh0.08/e35/s640x640/53186657_557671011396096_7584190196036353102_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/022dbb7c08434e3336ea82298caa50d3/5D1576B9/t51.2885-15/sh0.08/e35/s640x640/53302431_412716026128221_7228025170030187676_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/36b7e1d3d50aab5620d76e97c9f186ec/5D158D8A/t51.2885-15/sh0.08/e35/s640x640/53672327_2081910061904874_1587978104416503268_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/741cdae9229c477f19cdb25c9b8e11a4/5D1695B6/t51.2885-15/e35/c154.0.412.412/52838477_348327759117957_1771065589017179504_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/64470b354b68aa3fa397894d5ae57c44/5D1582CE/t51.2885-15/sh0.08/e35/s640x640/52008559_332762920682623_9199327132624910965_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/676e371e825b8e63c49e9b30c3b6c95c/5D15D64D/t51.2885-15/sh0.08/e35/s640x640/53405498_2255143994733878_1921090153327636682_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/5278f45bb4e034711918ab2cd4c4177f/5D15E399/t51.2885-15/sh0.08/e35/s640x640/53063769_270524180532417_7966933905757765268_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/9a676842c77e4e6c465a56fa02a28703/5D15BC88/t51.2885-15/e35/c171.0.378.378a/52991519_755788454804761_6780802458752192263_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/0898b0d6f79cd3387f323c5a0c58f89c/5D16A666/t51.2885-15/e35/c172.0.376.376/53179257_181756822799313_7793571346089211728_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/cb98231e9448be46fd6386f9cb14b159/5D160323/t51.2885-15/sh0.08/e35/s640x640/53706036_2074860959264576_355115609820773157_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/fb3ef103dcfd2ddf989d2a62f01ce00b/5D1601DD/t51.2885-15/sh0.08/e35/s640x640/53683218_256702005234217_4511120462389008251_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/47fc205b4f86dca4e8be9dbc4274df87/5D15DD68/t51.2885-15/e35/52527568_2167083553330938_1556451120354692972_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/e9bf5d05eabc8879d209a9468cc5e82a/5D159375/t51.2885-15/sh0.08/e35/s640x640/52995637_159454215048171_949873528127550048_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/f5beebb6e228e503ae43e34d42bbfe15/5D15A222/t51.2885-15/e35/c157.0.406.406a/52785752_121656462255724_115753911839029159_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/6fc03a1ff096e95b7233b265cdb1250b/5D158F50/t51.2885-15/sh0.08/e35/s640x640/53220835_200613747580088_2435416607332469911_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/629b25082e9a3a41119cb755aeabaf0e/5D159ECA/t51.2885-15/sh0.08/e35/s640x640/53541106_374561233097132_5827692402362511014_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/31cb2706c045d7cbfcbac72220bbdeb0/5D160825/t51.2885-15/sh0.08/e35/s640x640/52846154_313755692824717_9014823529286449248_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/db6b60b033561c78e411956f11709af4/5D15AA30/t51.2885-15/sh0.08/e35/s640x640/52846149_314980459428395_3520754257219590690_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/dd30b70afdb5f4fe620bdd801cd60f43/5D15B82E/t51.2885-15/e35/c157.0.406.406a/51880715_411018972982082_269920599574116130_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/e56c6bad9362b3e49a7129c2dba93ece/5D15762A/t51.2885-15/sh0.08/e35/s640x640/53236614_314574522748828_8043681357378278128_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/bc9918c768383503a61184964b8ca6f6/5D169B22/t51.2885-15/e35/52930058_2310376552346222_986333448770069450_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/e5f741e59986e20fed3474b9d2b1eb38/5D169FFA/t51.2885-15/sh0.08/e35/s640x640/52047746_2071687052946861_7559104937613764664_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/99a017f2fc811109ddfbe6f1412b64a7/5D15C8C3/t51.2885-15/sh0.08/e35/s640x640/51880721_2353692218008844_530837017728676262_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/265cc713c189dd89d6b6021d68d196e1/5D16A83B/t51.2885-15/sh0.08/e35/s640x640/52002821_2231539420200724_1072212557225046643_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/6d69d7ef3e14c6c649f6141aca001d64/5D158724/t51.2885-15/sh0.08/e35/s640x640/51620463_644930472631439_1782743464346664106_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/d519bb236caf61ff10732f9897752c5d/5D159C7D/t51.2885-15/sh0.08/e35/s640x640/51199306_1147014052158472_2429814228325598629_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/0a46ace5bb260344f39d5bef9f226056/5D15A6B7/t51.2885-15/sh0.08/e35/s640x640/51163635_777387979301863_7932810970845513228_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/48cb39f3eeff1a4574ebcc5605ad5256/5D15DC2D/t51.2885-15/sh0.08/e35/s640x640/51353010_325817774707308_2402645977136313125_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/6924c2d692d242c8f298fed4e995ec13/5D158020/t51.2885-15/sh0.08/e35/s640x640/51456786_393046414611052_3093476011036176656_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/8b33038f19c5b81e7649a152fcbfea1d/5D15A4C5/t51.2885-15/sh0.08/e35/s640x640/51209147_152513425746689_4739753954721286024_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/b5c9dbd638a3e9f462bacba16f86b62c/5D15C58E/t51.2885-15/sh0.08/e35/s640x640/51268488_592639941209083_1486725413968956689_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/f426bfeb392298ef3f5552b553173445/5D1613FC/t51.2885-15/sh0.08/e35/s640x640/51960954_571970499987924_63169112338512345_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/3471d7fd1b2bcea3c8eedde7241fc75a/5D15AFDA/t51.2885-15/e35/c157.0.406.406a/50196378_2897928103554304_9132479427811048065_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/eae445138cf6e388d3531379bcc59df3/5D15AAFD/t51.2885-15/e35/c126.0.468.468a/50805328_345706072825414_5068332310629193722_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/5a24058fac9d509b8409a9dd97770064/5D16905F/t51.2885-15/sh0.08/e35/s640x640/50745862_380973986036624_5774380851090982096_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/f907f853801df8c8bccbf60c06016ea0/5D159129/t51.2885-15/e35/c157.0.406.406a/50252238_2160917434161167_951500063722405255_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/ac327bee93248ed8173097e4db8a125a/5D15DEFF/t51.2885-15/e35/c157.0.406.406a/50720532_923985837810495_8039202183330892030_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/e0a0092a5528306c6dbcf0d5609b7c42/5D15B952/t51.2885-15/sh0.08/e35/s640x640/50954330_347182562793599_5827601069292404525_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/92a7d944d4e6928efec9b134a47c794b/5D158134/t51.2885-15/sh0.08/e35/s640x640/51026396_2476228402450374_7090130237694200626_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/0e30eb1db022875e5108a5f92935560e/5D157866/t51.2885-15/e35/51098326_2183429978383046_6131711909705677589_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/c91dc5025018da60df7885028ae7eb19/5D15805F/t51.2885-15/sh0.08/e35/s640x640/51630244_389849891574139_7555831174186290815_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/1daf552d15551e23c571b8a130862534/5D15A5E0/t51.2885-15/sh0.08/e35/s640x640/50828079_369710010277790_2423337637741513721_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/c997c8f9cc81c3f12e6670d9ff59ed0d/5D15E00C/t51.2885-15/sh0.08/e35/s640x640/50521893_246532662932414_3954959504332961468_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/e6b8efb217db945e4dfd3b72698ce694/5D15B0C7/t51.2885-15/sh0.08/e35/s640x640/51166008_360341917882938_7952280136245028087_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/f35c9fbc01d4d615f9a83977ab63bccc/5D16967F/t51.2885-15/sh0.08/e35/s640x640/50610885_602004890249235_7478753669984616659_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/17305439240a3ac96c63c536f6d093e8/5D1588A7/t51.2885-15/sh0.08/e35/s640x640/50324653_116752042737015_4352385127561657220_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/f04d658af8c95a210af2c0459cfa7a80/5D1578DF/t51.2885-15/e35/c157.0.406.406a/50119006_189474472009420_7332277093583327725_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/eea42ec1ed06dd07fed0fc0f8ac7f90e/5D15CF3E/t51.2885-15/sh0.08/e35/s640x640/50618319_751626348544931_6610769724811252011_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/298731204638e37a32bd4fc67055b5e2/5D16A47F/t51.2885-15/sh0.08/e35/s640x640/50221207_354506568736110_1477400794454600453_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/ed80ca15c279998464aeeadb278d0805/5D15DC1C/t51.2885-15/sh0.08/e35/s640x640/49907279_2222193181375830_8123578228589623741_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/8ae0a60bd925e94d0524283a8d7debd0/5D1593B5/t51.2885-15/sh0.08/e35/s640x640/49858148_221020908714836_2836199726824019826_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/21f52ee63af4a484bfc92173fc92f8ae/5D15954B/t51.2885-15/sh0.08/e35/s640x640/49614728_144058773258854_3448366179772955571_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/494f58b849d51f1334d4459d85136d4f/5DBA4185/t51.2885-15/sh0.08/e35/s640x640/46327281_2037801006311273_3711633420928419524_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/05926a4a3f59f3fa1232efe63589a750/5D15987F/t51.2885-15/sh0.08/e35/s640x640/49913278_231347734468577_6793155802482827558_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com","https://scontent-amt2-1.cdninstagram.com/vp/9110d7ba86979fc48cb297b114bb047e/5D15C02F/t51.2885-15/e35/50489278_171854593788774_5289121658840850355_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com"];

let videoFootageUrls: string[] = ['https://scontent.cdninstagram.com/vp/698dc1093910911928da028626ffd881/5D1579F0/t50.2886-16/54450039_321451865241940_8601119588781916160_n.mp4?_nc_ht=scontent.cdninstagram.com']

imageThumbnails.sort(() => {
    return .5 - Math.random();
});

let contents: ContentBase[] = [];
for(let i: number = imageThumbnails.length; i--;)
{
    contents.push(new ContentBase( 'Awesome', ' this is a daily', imageThumbnails[i], ['https://scontent.cdninstagram.com/vp/698dc1093910911928da028626ffd881/5D1579F0/t50.2886-16/54450039_321451865241940_8601119588781916160_n.mp4?_nc_ht=scontent.cdninstagram.com'] ));
}

let grid: GridView = new GridView(<HTMLDivElement>document.getElementById('viewer-grid'), contents);

let previewPane: PreviewPane = new PreviewPane(<HTMLDivElement> document.getElementById('viewer-preview'))

grid.rePosition();


