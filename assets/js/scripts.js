// initialize variables for dark mode
const body = document.querySelector("body");
const toggleBtn = document.getElementById("toggle-btn");
const navbar = document.getElementById("navbar");
const searchBtn = document.getElementById("search-btn");
const footer = document.getElementById("footer");
const dropdownMenu = document.getElementById("dropdown-menu");

// initialize variable for the show table
const bodyTable = document.getElementById("body-table");

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
    xhr.open("GET", filename, false);
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

// loop in the array and render the table rows
const showTable = (arr) => {
    for (let key in arr) {
        const rowMovie = arr[key]
        rowMovie.renderTableRow();
    }
}

// load the table with all the movies when the page is load
pushMovies();
showTable(movies);

// when click the search button the table filters the user input
$("#search-btn").on("click", function(e){
    showTable(movies);

    const searchFor = $("#search-input").val().toLowerCase();
    let results = [];

    for(let i=0; i<movies.length;i++) {
        // get the movie's name from the anchor tag
        const nameMovie = document.getElementById(String(i+1)).textContent.toLocaleLowerCase();
        
        if(movies[i].genre.toLowerCase().indexOf(searchFor) > -1 ||
                movies[i].actor.toLowerCase().indexOf(searchFor) > -1 || 
                movies[i].location.toLowerCase().indexOf(searchFor) > -1 ||
                nameMovie.indexOf(searchFor) > -1) {
            results.push(movies[i])
        } 
    }

    // remove the previous table from the DOM
    Movie.cleanTable()

    // render the table with the user input results
    if(results.length == 0) {
        $("#movies-table").after("<div id='no-found' class='container'>No Results Found</div>");
    } else {
        showTable(results)
    }
    e.preventDefault()
});

// when press enter in the input the click event of the search button is triggered
$('#search-input').keypress(function (e) {
    let key = e.which;
    if(key == 13) {
        $('#search-btn').click();
        return false;  
    }
}); 
  



// let v1 = window.location.search;
// let lastChar = v1.substr(v1.length - 1); // => "1"
// let choice = parseInt(lastChar);



// $("#movie-cover").attr("src", images[3]);
