const imageContainer = document.getElementById("image-container");
const loadingSpinner = document.getElementById("loader");

const count = 5;
const apiKey = "API_KEY";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

const setAttributes = (element, attributes) => {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

const imageLoaded = () => {
    imagesLoaded++;

    if (imagesLoaded === totalImages) {
        ready = true;
        loadingSpinner.hidden = true;

    }
};

const displayPhotos = () => {
    imagesLoaded = 0;
    totalImages = photosArray.length;

    photosArray.forEach((photo) => {
        const anchorEl = document.createElement('a');
        // anchorEl.setAttribute('href', photo.links.html);
        // anchorEl.setAttribute('target', '_blank');
        setAttributes(anchorEl, {
            href: photo.links.html,
            target: "_blank"
        });

        const imageEl = document.createElement('img');
        // imageEl.setAttribute("src", photo.urls.regular);
        // imageEl.setAttribute("alt", photo.alt_description);
        // imageEl.setAttribute("title", photo.alt_description);
        setAttributes(imageEl, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        imageEl.addEventListener("load", imageLoaded);

        anchorEl.appendChild(imageEl);
        imageContainer.appendChild(anchorEl);
    });
};

const getPhotos = async () => {
    try {
        const response = await fetch(apiUrl);
        const responseData = await response.json();
        photosArray = responseData;

        displayPhotos();
    } catch (error) {
        console.log(error);
    }
};

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

getPhotos();