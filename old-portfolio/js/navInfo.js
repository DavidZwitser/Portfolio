let buttonInfo = {
    wrapper :  document.getElementById("navInfo"),
    left : document.getElementById("leftInfoButotn"),
    right : document.getElementById("rightInfoButotn"),
    up : document.getElementById("upInfoButotn"),
    down : document.getElementById("downInfoButotn")
};

function activateInfoButtons (left, right, up, down) {

    buttonInfo.left.className =  left.length > 0 ? "showButtonInfo" : "hideButtonInfo";
    buttonInfo.left.innerHTML = left;

    buttonInfo.right.className = right.length > 0 ? "showButtonInfo" : "hideButtonInfo";
    buttonInfo.right.innerHTML = right;

    buttonInfo.up.className =  up.length > 0 ? "showButtonInfo" : "hideButtonInfo";
    buttonInfo.up.innerHTML = up;

    buttonInfo.down.className =  down.length > 0 ? "showButtonInfo" : "hideButtonInfo";
    buttonInfo.down.innerHTML = down;
}

function updateNavButtons () {
    switch (currentWindow) {
        case 0 : 

           activateInfoButtons("","","","about");

            break;
        case 1 :

           activateInfoButtons("","","home","contact");   

            break;
        case 2 :

           activateInfoButtons("","","about","work shower");                        

            break;
        case 3 :

           activateInfoButtons("rotate left","rotate right","contact","more information");                        

            break;
        case 4 :

           activateInfoButtons("","","wrk shower","");            
           
            break;
        default: 
            break;
    } 
}