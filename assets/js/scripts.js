// initialize variables for dark mode
const body = document.querySelector("body");
const toggleBtn = document.getElementById("toggle-btn");
const navbar = document.getElementById("navbar");
const searchBtn = document.getElementById("search-btn");
const footer = document.getElementById("footer");
const dropdownMenu = document.getElementById("dropdown-menu");
const card = document.getElementsByClassName("card");

// initialize variable for the show table
const bodyTable = document.getElementById("body-table");


// dark mode function
const darkModeClass = (arr) => {
    arr.map((element) => {
        if (element) {
            element.classList.toggle("dark-mode");
        }
    });
};

// element which the dark mode is applied
const darkModeElements = [body, navbar, toggleBtn, searchBtn, footer, dropdownMenu];

for (let i=0; i<card.length; i++) {
    darkModeElements.push(card[i]);
}

// Get the value of the "dark" item from the local storage
let setDarkMode = localStorage.getItem('dark-mode');

// dark mode event listener
toggleBtn.addEventListener("click", () => {
     // Get the value of the "dark" item from the local storage on every click
     setDarkMode = localStorage.getItem('dark-mode');

     if (setDarkMode !== "on") {
         darkModeClass(darkModeElements);
         // Set the value of the item to "on" when dark mode is on
         setDarkMode = localStorage.setItem('dark-mode', 'on');
     } else {
         darkModeClass(darkModeElements);
         // Set the value of the item to "null" when dark mode if off
         setDarkMode = localStorage.setItem('dark-mode', null);
     }
});

// Check dark mode is on or off on page reload
if (setDarkMode === 'on') {
    darkModeClass(darkModeElements);
}

// loadXMLDoc from https://stackoverflow.com/questions/24070741/getelementsbytagname-comes-up-undefined
const loadXMLDoc = (filename) => {
    let xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } 
    xhr.open("GET", filename, false);
    xhr.send();
    return xhr.responseXML;
}

const xmlDoc = loadXMLDoc("./movies.xml");

// class object to add the movies in an array
class Movie {
    constructor(id, genre, actor, name, location, price) {
        this.id = id;
        this.genre = genre;
        this.actor = actor;
        this.name = name;
        this.location = location;
        this.price = price;
    }

    // function to render a row of table with all the data of movie required
    renderTableRow = () => {
        const tr = document.createElement("tr");
        bodyTable.appendChild(tr);
        this.createAndAppendData("th", tr, this.id, true);
        this.createAndAppendData("td", tr, this.genre, false);
        this.createAndAppendData("td", tr, this.actor, false);
        this.createAndAppendData("td", tr, this.name, false);
        this.createAndAppendData("td", tr, this.location, false);
        this.createAndAppendData("td", tr, this.price, false);
    }

    // helper function for render table row
    createAndAppendData = (tag, parent, content, hasAttribute) => {
        const row = document.createElement(tag);
        if (hasAttribute) {
            row.setAttribute("scope", "row");
        }
        row.innerHTML = content;  
        parent.appendChild(row);
    }

    static cleanTable() {
        bodyTable.textContent = "";
    }
}

// create an array of objects which contain the movies data to render in the table
const movies = new Array();

const pushMovies = () => {
    // loop in the xml doc
    for (let i=0; i<4; i++) {
        let id = new XMLSerializer().serializeToString(xmlDoc.getElementsByTagName("ID")[i].childNodes[0]);
        let genre = new XMLSerializer().serializeToString(xmlDoc.getElementsByTagName("GENRE")[i].childNodes[0]);
        let actor = new XMLSerializer().serializeToString(xmlDoc.getElementsByTagName("ACTOR")[i].childNodes[0]);
        let name = new XMLSerializer()
                    .serializeToString(xmlDoc.getElementsByTagName("NAME")[i].childNodes[0])
                    .replace("<![CDATA[", "").replace("]]>", "");
        let location = new XMLSerializer().serializeToString(xmlDoc.getElementsByTagName("SHOWING")[i].childNodes[0]);
        let price = new XMLSerializer().serializeToString(xmlDoc.getElementsByTagName("COST")[i].childNodes[0]);
        let movie = new Movie(id, genre, actor, name, location, price);
        movies.push(movie);
    }
}

pushMovies();

// loop in the array and render the table rows
const showTable = (arr) => {
    for (let key in arr) {
        const rowMovie = arr[key]
        rowMovie.renderTableRow();
    }
}

// helped function to filter the movies
const filterTable = (searchFor) => {
    let results = [];

    for(let i=0; i<movies.length;i++) {
        // get the movie's name from the anchor tag
        const nameMovie = document.getElementById(String(i+1)).textContent.toLocaleLowerCase();

        // split actor and title to allow the research also just one word
        const actorSplitted = movies[i].actor.toLocaleLowerCase().split(' ');
        const nameSplitted = nameMovie.split(' ');

        if(movies[i].genre.toLowerCase().indexOf(searchFor) > -1 ||
                movies[i].actor.toLowerCase().indexOf(searchFor) > -1 || 
                movies[i].location.toLowerCase().indexOf(searchFor) > -1 ||
                nameMovie.indexOf(searchFor) > -1 ||
                actorSplitted[0].indexOf(searchFor) > -1 ||
                actorSplitted[1].indexOf(searchFor) > -1 ||
                nameSplitted[0].indexOf(searchFor) > -1 ||
                nameSplitted[1].indexOf(searchFor) > -1) {
            results.push(movies[i])
        } 
    }
    
    // remove the previous table from the DOM
    Movie.cleanTable()
    $("#no-found").remove();

    // render the table with the user input results
    if(results.length == 0) {
        $("#movies-table").after("<div id='no-found' class='container'>No Results Found</div>");   
    } else {
        showTable(results)
    }
}

// when click the search button the table filters the user input
$("#search-btn").on("click", function(e){
    const searchFor = $("#search-input").val().toLowerCase();
    filterTable(searchFor);
    e.preventDefault();
});

// when press enter in the input the click event of the search button is triggered
$('#search-input').keypress(function (e) {
    let key = e.which;
    if(key == 13) {
        $('#search-btn').click();
        return false;  
    }
}); 

// append to the dropdown menu every movie
for(let i=0; i<movies.length; i++) {
    $('#dropdown-menu').append("<li>" + movies[i].name + "</li>");
    $('#' + String(i+1)).addClass("dropdown-item");
}

