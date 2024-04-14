const modal = document.getElementById("modal");
const modalShow = document.getElementById("show-modal");
const modalCloseIcon = document.getElementById("close-icon");
const bookmarkForm = document.getElementById("bookmark-form");
const websiteNameEl = document.getElementById("website-name");
const websiteUrlEl = document.getElementById("website-url");
const bookmarksContainer = document.getElementById("bookmarks-container");
const bookmarksForm = document.getElementById("bookmark-form");

let bookmarks = [];

const deleteBookmark = (url) => {
    bookmarks.forEach((bookmark, idx) => {
        if (bookmark.url === url) {
            bookmarks.slice(idx, 1);
        }
    });

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
};

const buildBookmarks = () => {
    bookmarksContainer.textContent = "";

    bookmarks.forEach(bookmark => {
        const { name, url } = bookmark;
        // Bookmark Item
        const item = document.createElement("div");
        item.classList.add("item", "card");

        // Trash(Close) Icon
        const closeIcon = document.createElement("i");
        closeIcon.classList.add("fa-solid", "fa-trash");
        closeIcon.style.color = "#e11d48";
        closeIcon.setAttribute("title", "Delete Bookmark");
        closeIcon.setAttribute("onclick", `deleteBookmark("${url}")`);

        // Link and Favicon container 
        const linkInfo = document.createElement("div");
        linkInfo.classList.add("name");

        // Favicon
        const favicon = document.createElement("img");
        favicon.setAttribute("src", `https://s2.googleusercontent.com/s2/favicons?domain=${url}`);
        favicon.setAttribute("alt", "Favicon");

        // Link
        const link = document.createElement("a");
        link.setAttribute("href", `${url}`);
        link.setAttribute("target", "_blank");
        link.textContent = name;

        // Appending everything to Bookmarks Container
        linkInfo.append(favicon, link);
        item.append(linkInfo, closeIcon);
        bookmarksContainer.appendChild(item);
    });
};

const fetchBookmarks = () => {
    if (localStorage.getItem("bookmarks")) {
        bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    } else {
        bookmarks = [
            {
                name: "Google",
                url: "https://google.com"
            }
        ];

        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
    buildBookmarks();
};

const validate = (websiteName, websiteUrl) => {
    const pattern = /(https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
    const regex = new RegExp(pattern);

    if (!websiteName || !websiteUrl) {
        alert("Please fill both fields!");
        return false;
    }

    if (!websiteUrl.match(regex)) {
        alert("Please provide a valid web address!");
        return false;
    }

    return true;
};

const showModalHandler = () => {
    modal.classList.add("show-modal");
    websiteNameEl.focus();
};

const storeBookmarksHandler = (event) => {
    event.preventDefault();
    const nameValue = websiteUrlEl.value;
    let urlValue = websiteUrlEl.value;

    if (!urlValue.includes("http://") && !urlValue.includes("https://")) {
        urlValue = `https://${urlValue}`;
    }

    if (!validate(nameValue, urlValue)) {
        return false;
    }

    const bookmark = { name: nameValue, url: urlValue };
    bookmarks.push(bookmark);

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();

    bookmarkForm.reset();
    websiteNameEl.focus();
};

// Event Listeners
modalShow.addEventListener("click", showModalHandler);
modalCloseIcon.addEventListener("click", () => modal.classList.remove("show-modal"));
bookmarksForm.addEventListener("submit", storeBookmarksHandler);

addEventListener("click", event => event.target === modal ? modal.classList.remove("show-modal") : false);

// On Load to pre-populate the data
fetchBookmarks();