"use strict";

var aside_active = false;

function enableOverlay() {
    document.getElementById("overlay").style.visibility = "visible";
    document.getElementById("overlay").style.opacity = "1";
}

function disabledOverlay() {
    document.getElementById("overlay").style.opacity = "";
    document.getElementById("overlay").style.visibility = "";
}

function enableAside(aside) {
    aside.style.transform = "translateX(0px)";
    aside_active = true;
}

function disableAside(aside) {
    aside.style.transform = "";
    aside_active = false;
}

document.getElementById("navbar-toggler").addEventListener("click", function() {
    var aside = document.getElementsByTagName("aside");
    if(aside[0] != null) {
        if(aside_active) {
            disableAside(aside[0]);
            disabledOverlay();
        } else {
            enableAside(aside[0]);
            enableOverlay();
        }
    }
});

document.getElementById("overlay").addEventListener("click", function() {
    var aside = document.getElementsByTagName("aside");
    if(aside[0] != null) {
        if(aside_active) {
            disableAside(aside[0]);
            disabledOverlay();
        }
    }
});