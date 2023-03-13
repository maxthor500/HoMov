// get the current URL last character 
const v1 = window.location.search;
const lastChar = v1.substring(v1.length - 1); // => "1"
const choice = parseInt(lastChar);

// get all the images, videos and plot in the XML file in an array
const images = new Array();
const videos = new Array();
const plots = new Array();

for (let i=0; i<4; i++) {
    images[i] = new XMLSerializer().serializeToString(xmlDoc.getElementsByTagName("IMAGE")[i].childNodes[0]);
    videos[i] = new XMLSerializer().serializeToString(xmlDoc.getElementsByTagName("VIDEO")[i].childNodes[0]);
    plots[i] = new XMLSerializer().serializeToString(xmlDoc.getElementsByTagName("PLOT")[i].childNodes[0]);
}

// function to swap the movie's data depending on the URL
const swapMovieData = () => {
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
    if (lastCharacter >=0 && lastCharacter < 4) {
        window.location.href = removeLastChar + next;
    }
    
    // return to the first movie when you are on the last movie
    if (lastCharacter === 3) {
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
    if (lastCharacter > 0 && lastCharacter < 4) {
        window.location.href = removeLastChar + prev;
    }
    
    // return to the last movie when you are on the first movie
    if (lastCharacter === 0) {
        window.location.href = removeLastChar + 3;
    }
}

// load the movie's data when the page loads
window.onload = () => {
    swapMovieData();
}
