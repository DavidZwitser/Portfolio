
gamePages = [
    "",
    document.getElementById("smartKicks").innerHTML, //1
    document.getElementById("cristales").innerHTML, //2
    document.getElementById("meanracers").innerHTML, //3
    document.getElementById("framework").innerHTML, //4
    document.getElementById("astroids").innerHTML, //5
    document.getElementById("pathFinding").innerHTML, //6
    document.getElementById("heroesJourney").innerHTML, //7
    document.getElementById("pinball").innerHTML //8
];

document.body.onresize = resize;

var infoPageDiv = document.getElementById("moreInfoPage");
function infoPage(page, dontScroll) {
    infoPageDiv.innerHTML = page;
    if (!dontScroll == true)
        scrollWindow(4);
        
    exeDelegate(OnResize);    
}

let currInfoPage = 4;
function nextInfoPage (dir) {
    currInfoPage += dir;

    if (currInfoPage > gamePages.length -1) {
        currInfoPage = 1;
    } else if (currInfoPage < 1) {
        currInfoPage = 8;
    }

    infoPage(gamePages[currInfoPage], true);
}

Start["defaultInfoPage"] = function () {
    infoPage(gamePages[4], true);
}