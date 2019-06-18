var gl = null;
var c;
var ctx;

function Awake() {
    c = document.getElementById("myCanvas");
    // gl = initWebGL(c);
    console.log(gl);

    if (gl) {
        gl.clearColor(0.5, 0.5, 0.5, 0.9);
        gl.enable(gl.DEPTH_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.viewport(0, 0, c.width, c.height);
    } else ctx = c.getContext("2d");

    Start();
}

function initWebGL(canvas) {
    gl = null;

    try {
        // Try to grab the standard context. If it fails, fallback to experimental.
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    } catch (e) {}

    // If we don't have a GL context, give up now
    if (!gl) {
        alert("Unable to initialize WebGL. Your browser may not support it.");
        gl = null;
    }

    return gl;
}