const resultsNav = document.getElementById("results-nav");
const favoritesNav = document.getElementById("favorites-nav");
const imagesContainer = document.querySelector(".images-container");
const saveConfirmed = document.querySelector(".save-confirmed");
const loader = document.querySelector(".loader");

const apiKey = "DEMO_KEY";
const count = 5;
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];
let favorites = {};

const showContent = (page) => {
    scrollTo({ top: 0, behavior: "instant" });

    if (page === "results") {
        resultsNav.classList.remove("hidden");
        favoritesNav.classList.add("hidden");
    } else {
        resultsNav.classList.add("hidden");
        favoritesNav.classList.remove("hidden");
    }

    loader.classList.add("hidden");
};

const removeFromFavorites = (itemUrl) => {
    if (favorites[itemUrl]) {
        delete favorites[itemUrl];
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateContent("favorites");
    }
};

const saveToFavorites = (itemUrl) => {
    resultsArray.forEach(result => {
        if (result.url.includes(itemUrl) && !favorites[itemUrl]) {
            favorites[itemUrl] = result;

            // SHOWING SAVE CONFIRMATION
            saveConfirmed.hidden = false;
            setTimeout(() => saveConfirmed.hidden = true, 2000);

            // SET FAVORITES TO LOCAL STORAGE
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
    })
};

const createDOMNodes = (page) => {
    const currentArray = page === "results" ? resultsArray : Object.values(favorites);

    currentArray.forEach(result => {
        // CARD
        const card = document.createElement('div');
        card.classList.add("card");

        // LINK
        const link = document.createElement("a");
        link.href = result.hdurl;
        link.title = "View Full Image";
        link.target = "_blank";

        // IMAGE
        const image = document.createElement("img");
        image.src = result.url;
        image.alt = "NASA Picture of the Day!";
        image.loading = "lazy";
        image.classList.add("card-img-top");

        // CARD BODY
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        // TITLE FAVORITES TEXT
        const cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title");
        cardTitle.textContent = result.title;

        const saveText = document.createElement("p");
        saveText.classList.add("clickable");
        if (page === "results") {
            saveText.textContent = "Add to Favorites";
            saveText.setAttribute("onclick", `saveToFavorites("${result.url}")`);
        } else {
            saveText.textContent = "Remove to Favorites";
            saveText.setAttribute("onclick", `removeFromFavorites("${result.url}")`);
        }

        const cardText = document.createElement("p");
        cardText.classList.add("card-text");
        cardText.textContent = result.explanation;

        // COPYRIGHT INFO
        const footer = document.createElement("small");
        footer.classList.add("text-muted");

        const date = document.createElement("strong");
        date.textContent = result.date;

        const copyrightText = document.createElement("span");
        copyrightText.textContent = result.copyright ? ` ${result.copyright}` : "";

        // APPENDING ALL THE ELEMENTS
        footer.append(date, copyrightText);
        cardBody.append(cardTitle, saveText, cardText, footer);
        link.appendChild(image);
        card.append(link, cardBody);
        imagesContainer.appendChild(card);
    })
};

const updateContent = (page) => {
    if (localStorage.getItem("favorites")) {
        favorites = JSON.parse(localStorage.getItem("favorites"));
    }

    imagesContainer.textContent = "";
    createDOMNodes(page);
    showContent(page);
};

const getNASAPictures = async () => {
    loader.classList.remove("hidden");

    try {
        const response = await fetch(apiUrl);
        resultsArray = await response.json();

        updateContent("results");
    } catch (error) {
        console.log(error);
    }
};

getNASAPictures();