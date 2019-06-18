document.addEventListener('wheel', function (e) {
    let scroll = e.wheelDeltaY < 0 ? 1 : -1;
    if (canScrollWindow == true) nextWindow(scroll);
});

var endTouchScroll = 0;
var startTouchScroll = 0;

document.addEventListener('touchstart', function (e) {
    startTouchScroll = e.changedTouches[0].clientY;                             a
});

document.addEventListener('touchend', function (e) {
    endTouchScroll = e.changedTouches[0].clientY;    

    let scroll = startTouchScroll - endTouchScroll;
    if (canScrollWindow == true) 
        nextWindow(scroll > 50 ? 1 : scroll < -50 ? -1 : 0);
});


document.onkeydown = function (e) {
    //window up key
    if (e.keyCode == 38 || e.keyCode == 87) {
        e.preventDefault();        
        nextWindow(-1);
    }
    //window down key
    if (e.keyCode == 40 || e.keyCode == 83) {
        e.preventDefault();        
        nextWindow(1);
    }
    //Space to scroll to start
    if (e.keyCode == 32) {
        scrollWindow(0);
    }

    //left to scroll rotator left
    if (e.keyCode == 39 || e.keyCode == 68) {
        e.preventDefault();        
        rotateShower(-1);
    } 
    //right to scroll rotator right
    if (e.keyCode == 37 || e.keyCode == 65) {
        e.preventDefault();        
        rotateShower(1);
    }

};
//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

//Just to rotatate the current shower
function rotateShower(dir) {
    
    if (currentWindow == 3) {
        RotateToNextPanel('shower', dir);
    }
}


//The window scrolling functionality
document.body.__defineSetter__("scrollPos", function (_val) {
    window.scrollTo(0, _val);
});
document.body.__defineGetter__("scrollPos", function() {
    return window.pageYOffset || window.scrollY || document.body.scrollTop;
})


var currentWindow = 0;
var canScrollWindow = true;
scrollWindow(0);

var windowCount = fullScreenObjects.length/2 -2;
//----Scrolling-the-windows----\\
function scrollWindow(part) {
    currentWindow = part;

    //To prevent browsers from glitching when the window doesn't scroll properly'
    if (canScrollWindow == true) {
        setTimeout(function () { canScrollWindow = true}, 1400); 
    }

    canScrollWindow = false;
    //Scroll and reset canScrollWindow when done scrolling
    scrollToPos(document.body, window.innerHeight * part, 6, function () { canScrollWindow = true} );
    updateNavButtons();

    if (part == 0) { 
        try{ ActivateProfilePicture() }  
        catch (err) { }
    }
}

function nextWindow(dir) {
    if (currentWindow + dir >= 0 && currentWindow + dir <= windowCount) {

        scrollWindow(currentWindow + dir);
    }
}