//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

//----Responcive profile picture----\\


function repositionProfilePicture () {
    intro.style.top = ((window.innerHeight / 4 + document.body.scrollTop) / 6) + "px";
}
OnScroll["ProfilePicture"] = repositionProfilePicture;

var profilePicture = document.getElementById('profilePicture');
var resetTimeout;
function resetProfilePicture() {
    profilePicture.src = 'img/profilePicture.jpg';
    resetTimeout = null;
}

function ActivateProfilePicture () {
    if (resetTimeout == null) {
        profilePicture.src = 'img/profileGif.gif';
        resetTimeout = setTimeout( resetProfilePicture, 2700 );
    }
}

Start["profilePictureStart"] = function () {
    ActivateProfilePicture();
    repositionProfilePicture();
}
