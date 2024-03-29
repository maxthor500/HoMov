// get the current URL last character 
const v1 = window.location.search;
const lastChar = v1.substring(v1.length - 1); // => "1a"
const choice = parseInt(lastChar);

// get all the images, videos and plot in the XML file in an array
const images = new Array();
const videos = new Array();
const plots = new Array();

// populate the arrays images, video and plots
for (let i=0; i<movies.length; i++) {
    images[i] = new XMLSerializer().serializeToString(xmlDoc.getElementsByTagName("IMAGE")[i].childNodes[0]);
    videos[i] = new XMLSerializer().serializeToString(xmlDoc.getElementsByTagName("VIDEO")[i].childNodes[0]);
    plots[i] = new XMLSerializer().serializeToString(xmlDoc.getElementsByTagName("PLOT")[i].childNodes[0]);
}

// function to swap the movie's data depending on the URL
const showMovieData = () => {
    $("#listing").toggleClass("d-none");
    const title = document.getElementById("movie-title");
    title.innerHTML = movies[choice].name;
    title.firstChild.style.textDecoration = "none";
    title.firstChild.style.color = "#D6A419";
    const img = document.getElementById("movie-cover");
    img.src = images[choice];
    const altAttribute = images[choice].split("/")[3];
    img.setAttribute("alt", altAttribute)
    const plot = document.getElementById("plot");
    plot.textContent = plots[choice];
    const video = document.getElementById("movie-trailer");
    const source = document.createElement('source');
    source.setAttribute("src", videos[choice]);
    source.setAttribute('type', 'video/mp4');
    video.appendChild(source);
    video.play();
}

// function for the next button
const nextMovie = () => {
    // get the current url
    const currentHref = window.location.href;
    // divide the url removing the last char
    const removeLastChar = currentHref.substring(0, currentHref.length - 1);
    // increment the last char
    const lastCharacter = parseInt(currentHref.substring(currentHref.length - 1));
    const next = lastCharacter + 1;
    // join the strings to update the URL with the next movie
    if (lastCharacter >=0 && lastCharacter < movies.length) {
        window.location.href = removeLastChar + next;
    }
    
    // return to the first movie when you are on the last movie
    if (lastCharacter === (movies.length-1)) {
        window.location.href = removeLastChar + 0;
    }
}

// function for the previous button
const prevMovie = () => {
    // get the current url
    const currentHref = window.location.href;
    // divide the url removing the last char
    const removeLastChar = currentHref.substring(0, currentHref.length - 1);
    // decrease the last char
    const lastCharacter = parseInt(currentHref.substring(currentHref.length - 1));
    const prev = lastCharacter - 1;
    // join the strings to update the URL with the previous movie
    if (lastCharacter > 0 && lastCharacter < movies.length) {
        window.location.href = removeLastChar + prev;
    }
    
    // return to the last movie when you are on the first movie
    if (lastCharacter === 0) {
        window.location.href = removeLastChar + 3;
    }
}

// toggle class display: none
const displayForm = () => {
    // get the current url
    const currentHref = window.location.href;
    // divide the url removing the last char
    const removeLastChar = currentHref.split("?");
    
    if (removeLastChar[1] === "booking") {
        addOptionsToForm();
        $("#booking").toggleClass("d-none");
    } else if (removeLastChar[1] === "login") {
        $("#login").toggleClass("d-none");
    } else if (removeLastChar[1] === "signup") {
        $("#signup").toggleClass("d-none");
    }

}


// helper function from https://www.w3schools.com/js/js_cookies.asp
const getCookie = (cookieName) => {
    let name = cookieName + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

// add the movies to the Select form
const addOptionsToForm = () => {
    const movieIdCookie = parseInt(getCookie("movie_id"));
    // if click the Book from a movie page, autofill the form with the movie name
    // otherwise "Select a movie"
    if (!Number.isInteger(movieIdCookie)) {
        $('#movie-options').append("<option disabled selected value=''>Select a movie</option>");
    } else {
        $('#movie-options').append("<option value='" + movieIdCookie + "selected'>" + movies[movieIdCookie].name + "</option>");
    }
    for (let i=0; i<movies.length; i++) {
        if (i != movieIdCookie) {
            $('#movie-options').append("<option value='" + i + "'>" + movies[i].name + "</option>");
        }
    }
}

// how to prevent the confirm form resubmission dialog
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href)
}

// function to create the cookie took from the course and updated with new syntax
const createCookie = (name,value,days) => {
    let expires; 

    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); 
        expires ="; expires=" + date.toGMTString(); 			
    }
    else {
        expires = ""; 
    }

    document.cookie = encodeURI(name) + "=" + 
                        encodeURI(value) + 
                        expires + "; path=/";
}

window.onload = () => {
    if (Number.isInteger(choice)) {
        showMovieData();
    }

    displayForm();
}

function spanQuestion(id) {
    const firstRandom = Math.floor(Math.random() * 21);
    const secondRandom = Math.floor(Math.random() * 21);
    const sum = firstRandom + secondRandom;
    const captcha = document.getElementById(id);
    captcha.textContent = "What is " + firstRandom + " + " + secondRandom + "?";

    return sum;
}

const sumSignup = spanQuestion("captcha-answer-signup");
const sumBook = spanQuestion("captcha-answer-book");


// function to validate the captcha 
function checkAnswer(id, sum){
    const answer = document.getElementById(id).value;
    if (answer === sum) {
        return true;
    } 

    return false;
}

// function to confirm the form took from the course 
const confirm = () => {
    const form = document.getElementById("booking-form");
    let isValid = false;
    if (checkAnswer("captcha-input-book", sumBook)) {
        isValid = true;
    }
    console.log(isValid)
    if (form.checkValidity() && isValid) {
        const datePicker = new Date($("#date-picker").val());
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        const emailName = document.getElementById("email").value;
        const movieOptions = $("#movie-options option:selected").val();
        const optionId = Array.from(movieOptions)[0];
        const movieSelected = $(movies[optionId].name)[0].innerHTML;
        createCookie("movie_booked", movieSelected, datePicker);
        alert(movieSelected + " is booked for " + datePicker.toLocaleDateString("en-GB", options) + " and email address: " + emailName);
    }
}

// function to prevent form submission if the passwords do not match
$('#submit-signup').click(function(){
    const password = $('#new-password').val();
    const repeatPassword = $('#repeat-password').val();
    if(password !== repeatPassword){
        $("#errors").text('Passwords do not match');
        return false;
    }
    if (!checkAnswer("captcha-input-signup", sumSignup)) {
        $("#errors").text("Incorrect answer, please try again.");
        return false;
    }
    // submit form
});
