const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter-btn");
const newQuoteButton = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuote;

function toggleLoader(loaderValue, quoteContainerValue) {
    quoteContainer.hidden = quoteContainerValue;
    loader.hidden = loaderValue;
};

function newQuote() {
    toggleLoader(false, true);

    // https://type.fit/api/quotes - API
    // const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    // const quoteAuthor = `~ ${quote.author.replace(", type.fit", "")}`;

    // if (quoteAuthor) {
    //     authorText.textContent = quoteAuthor;
    // } else {
    //     authorText.textContent = "~ Unknown";
    // }

    // if (quote.text.length > 120) {
    //     quoteText.classList.add("long-quote");
    // } else {
    //     quoteText.classList.remove("long-quote");
    // }

    // quoteText.textContent = quote.text;

    // https://api.quotable.io/random - API
    quoteText.textContent = apiQuote.content;
    authorText.textContent = `~ ${apiQuote.author}`;

    toggleLoader(true, false);
};

async function getQuotes() {
    toggleLoader(false, true);
    // const apiUrl = "https://type.fit/api/quotes";
    const apiUrl = "https://api.quotable.io/random";

    try {
        const response = await fetch(apiUrl);
        apiQuote = await response.json();
        newQuote();
        toggleLoader(true, false);
    } catch (error) {
        getQuotes();
    }
};

function tweetQuote() {
    const twitterUrl = `https://twitter.com/internet/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
};

newQuoteButton.addEventListener("click", getQuotes);
twitterBtn.addEventListener("click", tweetQuote);

getQuotes();