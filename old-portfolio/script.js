"use strict";

console.log("Awesome youre looking at my code :). \nYes i made this site without any plug-ins  \nand yes the banner image is a screenshot of the code that powers this site :) \nI made this site from scratch in an atempt to show off my programming skills so I hope it was worth the offort! \nTake a look around and try to figure out if the JavaScript code is readable or not :p ");


var OnScroll = {}; // On window Scroll
var OnResize = {}; // On Screen resize
var Update = {}; //Constand loop
var Start = {}; // After initialisation
var mainSelf = this;

function exeDelegate(obj) {
    for (var key in obj) {
        obj[key]();
    }
}


//----Scroll-event----\\
function scroll() {
    exeDelegate(OnScroll);
}
window.onscroll = scroll;

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\    

//----Resize-objects-on-window-resize----\\
var oldHeight = window.innerHeight;
var oldWidth = window.innerWidth;
var resizeToleration = 70;

function resize(forcedResize) {

    if (forcedResize == true || Math.abs(window.innerHeight - oldHeight) > resizeToleration ||
        Math.abs(window.innerWidth - oldWidth) > resizeToleration ) {
            exeDelegate(OnResize);
            oldHeight = window.innerHeight;
            oldWidth = window.innerWidth;
        }
};

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

//----Elements that resize with screensize----\\
var fullScreenObjects = document.getElementsByClassName("resize");
OnResize["updateSizes"] = function () {
    for (var i = 0; i < fullScreenObjects.length; i++) {
        fullScreenObjects[i].style.width = window.innerWidth + "px";
        fullScreenObjects[i].style.height = window.innerHeight + "px";
    }
}


//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

var ScrollVars = {
    scrollingObjects: {}
}
var idCounter = 0;

//----Handeling-the-scrolling-objects----\\
function scrollToPos(_obj, _pos, _scrollSmoothness, _doneScrolling) {

    if (typeof _obj.id == 'undefined') {
        _obj.id = "id:" + idCounter++;
        if (idCounter > 30) idCounter = 0;
    }

    if (!Update.scrollToPos) Update["scrollToPos"] = scrollObjects;

    
    ScrollVars.scrollingObjects[_obj.id] = {
        obj: _obj,
        targetTop: _pos,
        scrollSmoothness: _scrollSmoothness,
        cancleScroll: false,
        doneScrolling: _doneScrolling
    }
}




//----The-scroll-loop-that-gets-activated-when-needed----\\
function scrollObjects() {
    var objCount = 0;

    for (var i in ScrollVars.scrollingObjects) {
        objCount++;
        var scrollObj = ScrollVars.scrollingObjects[i];
        var distanceToTarget = scrollObj.targetTop - scrollObj.obj.scrollPos;
        var scrollVelocity = distanceToTarget / scrollObj.scrollSmoothness;

        if (distanceToTarget > 0.5 || distanceToTarget < -0.5 || scrollObj.cancleScroll) {
            if (scrollVelocity > 1 || scrollVelocity < -1)
                scrollObj.obj.scrollPos += scrollVelocity;
            else scrollObj.obj.scrollPos += distanceToTarget > 0 ? 1 : -1;
        } else {

            scrollObj.obj.scrollPos = scrollObj.targetTop;
            try { scrollObj.doneScrolling(); } 
            catch (err) {}
            delete ScrollVars.scrollingObjects[scrollObj.obj.id];
        }
    }

    if (objCount <= 0) {
        delete Update["scrollToPos"];
    }
}


var frameCount = 0;

window.addEventListener('load', function () {
    //--Executeing the resize to ready everything for load--\\;
    exeDelegate(OnResize);
    //---Starting start :)---\\
    exeDelegate(Start);
    //---Starting loop---\\
    ! function loop() {
        frameCount++;
        exeDelegate(Update);
        window.requestAnimationFrame(loop);
    }();
    //delete Start;

});