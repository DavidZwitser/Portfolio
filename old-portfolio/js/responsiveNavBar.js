//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

//---Navigation bar----\\

var scrollButtons = document.getElementById("scrollButtons");

    function updateTopBar() {

    if (document.body.scrollTop >= window.innerHeight - window.innerHeight / 5) {
        scrollButtons.className = "top";
    } else {
        scrollButtons.className = "side";
    }
}

OnScroll["navigationButtons"] = updateTopBar;
OnResize["navigationButtons"] = updateTopBar;