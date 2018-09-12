"use strict";

// Put the timeouts in an array to delete them later on in a loop.
const timeouts = [];
// Show the first slide from the container.
let slideStart = 1;
// Button that starts / stops the slideshow.
const buttonControl = document.getElementsByClassName("button--control")[0];
// Hide content that isn't the first block.
imageSlide();
// Executes when a key is being held down.
document.onkeydown = arrowSlide;

// Moves the slides based on the keyboard input value.
function arrowSlide (arrow) {
    const arrowKey = arrow.keyCode;
    if(arrowKey == "37") {
        imageSlide(slideStart -= 1);
    } else if (arrowKey == "39") {
        imageSlide(slideStart += 1);
    }
}

// Moves the slides with the mouse for the next / previous slide.
function changeSlide(s) {
    imageSlide(slideStart += s);
}

// Changes the display of the slides that are found.
function imageSlide(s) {
    let i;
    const slideAmount = document.getElementsByClassName("slideshow");
    // If the value goes over the length of the divs, it will go back to the first.
    if (s > slideAmount.length) {
        slideStart = 1;
        // If the value goes under 1, it will go back to the last.
    } else if (s < 1) {
        slideStart = slideAmount.length;
    }
    // Hides every slide that's in the array.
    for ( i = 0; i < slideAmount.length; i++ ) {
        slideAmount[i].style.display = "none";
    }
    /* Display current slide ([0][1][2][3])
       Subtracts 1 from the current array value. */
    slideAmount[slideStart-1].style.display = "block";
}


// Start the automatic slideshow.
function startSlide() {
    let n;
    const slideAmount = document.getElementsByClassName("slideshow");
    // Nearly same function for imageSlide, although this one uses a timer.
    for ( n = 0; n < slideAmount.length; n++ ) {
        slideAmount[n].style.display = "none";
    }
    slideStart++;
    if ( slideStart > slideAmount.length ) {
        slideStart = 1;
    }
    slideAmount[slideStart-1].style.display = "block";
    // Keeps adding more items to the array and returns the updated length.
    timeouts.push(setTimeout(startSlide, 2000));
    // Edit the attributes of the button for usability.
    buttonControl.setAttribute("onclick", "pauseSlide();");
    buttonControl.textContent = "pause";
    console.log("Playing the slideshow");
}

// Pause the automatic slideshow.
function pauseSlide() {
    // Remove the data from the array to stop the looping of the slideshow.
    for ( let t = 0; t < timeouts.length; t++ ) {
        clearTimeout(timeouts[t]);
    }
    // Edit the attributes of the button for usability.
    buttonControl.setAttribute("onclick", "startSlide();");
    buttonControl.textContent = "start";
    console.log("Stopped the slideshow");
}
