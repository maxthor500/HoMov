// get the elements to
const body = document.querySelector("body");
const toggleBtn = document.getElementById("toggle-btn");
const navbar = document.getElementById("navbar");
const searchBtn = document.getElementById("search-btn");
const footer = document.getElementById("footer");
const dropdownMenu = document.getElementById("dropdown-menu");

// dark mode function
const darkModeClass = (arr) => {
    arr.map((element) => {
        element.classList.toggle("dark-mode");
    });
};

// dark mode event listener
toggleBtn.addEventListener("click", (e) => {
    let darkModeElements = [body, navbar, toggleBtn, searchBtn, footer, dropdownMenu];
    darkModeClass(darkModeElements);
    e.preventDefault();
});

// loadXMLDoc from https://stackoverflow.com/questions/24070741/getelementsbytagname-comes-up-undefined
const loadXMLDoc = (filename) => {
    let xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } 
    xhr.open("GET",filename,false);
    xhr.send();
    return xhr.responseXML;
}

const xmlDoc = loadXMLDoc("./movies.xml");

// get all the images in the XML file in an array
const images = new Array();

for (let i=0; i<4; i++) {
    images[i] = new XMLSerializer().serializeToString(xmlDoc.getElementsByTagName("IMAGE")[i].childNodes[0]);
}

const videos = new Array();
for (let i=0; i<4; i++) {
    videos[i] = new XMLSerializer().serializeToString(xmlDoc.getElementsByTagName("VIDEO")[i].childNodes[0]);
}

$("#movie-trailer").attr("src", videos[2]);

function Movie(id, genre, actor, name, location, price) {
    this.id = id;
    this.genre = genre;
    this.actor = actor;
    this.name = name;
    this.location = location;
    this.price = price;
}

// create an array of objects which contain the movies data to render in the table
const movies = new Array();

for (let i=0; i<4; i++) {
    let id = new XMLSerializer().serializeToString(xmlDoc.getElementsByTagName("ID")[i].childNodes[0]);
    let genre = new XMLSerializer().serializeToString(xmlDoc.getElementsByTagName("GENRE")[i].childNodes[0]);
    let actor = new XMLSerializer().serializeToString(xmlDoc.getElementsByTagName("ACTOR")[i].childNodes[0]);
    let name = new XMLSerializer().serializeToString(xmlDoc.getElementsByTagName("NAME")[i].childNodes[0]);
    console.log(name)
    let nameLink = name.replace("<![CDATA[", "").replace("]]>", "");
    console.log(nameLink)
    let location = new XMLSerializer().serializeToString(xmlDoc.getElementsByTagName("SHOWING")[i].childNodes[0]);
    let price = new XMLSerializer().serializeToString(xmlDoc.getElementsByTagName("COST")[i].childNodes[0]);
    let movie = new Movie(id, genre, actor, nameLink, location, price);
    movies.push(movie);
}


const bodyTable = document.getElementById("body-table");

// function to render a row of table with all the data of movie required
const renderTableRow = (id, genre, actor, name, location, price) => {
    const tr = document.createElement("tr");
    bodyTable.appendChild(tr);
    createAndAppendData("th", tr, id, true);
    createAndAppendData("td", tr, genre, false);
    createAndAppendData("td", tr, actor, false);
    createAndAppendData("td", tr, name, false);
    createAndAppendData("td", tr, location, false);
    createAndAppendData("td", tr, price, false);
}

// helper function for render table row
const createAndAppendData = (element, parent, content, hasAttribute) => {
    const row = document.createElement(element);
    if (hasAttribute) {
        row.setAttribute("scope", "row");
    }
    row.innerHTML = content;  
    parent.appendChild(row);
}

// loop in the array movies and render the table rows
for (let key in movies) {
    const movie = movies[key]
    renderTableRow(movie.id, movie.genre, movie.actor, movie.name, movie.location, movie.price);
}

// let v1 = window.location.search;
// let lastChar = v1.substr(v1.length - 1); // => "1"
// let choice = parseInt(lastChar);



// $("#movie-cover").attr("src", images[3]);
