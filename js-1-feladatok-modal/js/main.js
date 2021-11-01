// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var okbutton = document.getElementById("okbtn");
var cancelbutton = document.getElementById("cbtn");

function fade(element) {
    var op = 1;
    var timer = setInterval(function() {
        if (op <= 0.1) {
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50);
}

function unfade(element) {
    var op = 0.1;
    element.style.display = 'block';
    var timer = setInterval(function() {
        if (op >= 1) {
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 10);
}

// When the user clicks on the button, open the modal
btn.onclick = function() {
    unfade(modal);
}
okbutton.onclick = function() {
    fade(modal);
}

cancelbutton.onclick = function() {
    fade(modal);
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    fade(modal);
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        fade(modal);
    }
}