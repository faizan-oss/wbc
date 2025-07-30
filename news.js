const API_KEY = "demo"; // GNews demo key (for production, get your own at https://gnews.io/register)
const API_URL = "https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=us&max=90&apikey=8c6266cb52d9f64bb6110ef7582882b7";

let currentPage = 1;
const pageSize = 10; // Articles per page
const maxPages = 9; // Limit to 9 pages
let allArticles = [];

async function fetchNews() {
    try {
        let response = await fetch(API_URL);
        let data = await response.json();

        if (!data.articles || data.articles.length === 0) {
            document.getElementById("news-container").innerHTML = "<p>No news found.</p>";
            return;
        }

        // Limit data to the first 9 pages only
        allArticles = data.articles.slice(0, maxPages * pageSize);
        displayNews();
        setupPagination();
    } catch (error) {
        console.error("Error fetching news:", error);
        document.getElementById("news-container").innerHTML = "<p>Error fetching news. Please try again later.</p>";
    }
}

function displayNews() {
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = startIndex + pageSize;
    let articlesToDisplay = allArticles.slice(startIndex, endIndex);

    let newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = "";

    articlesToDisplay.forEach((article, index) => {
        let newsItem = document.createElement("div");
        newsItem.classList.add("news-item");

        if (index === 0) {
            newsItem.classList.add("large-news"); // First article larger
        }

        newsItem.innerHTML = `
            <img src="${article.image || 'https://via.placeholder.com/600'}" alt="News Image">
            <h2>${article.title}</h2>
            <p>${article.description || "No description available."}</p>
            <a href="${article.url}" target="_blank">🔗 Read More</a>
        `;

        newsContainer.appendChild(newsItem);
    });

    // Update active page button
    updatePaginationUI();
}

function setupPagination() {
    let paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = "";

    for (let i = 1; i <= maxPages; i++) {
        let pageButton = document.createElement("button");
        pageButton.innerText = i;
        pageButton.classList.add("page-btn");
        pageButton.addEventListener("click", () => {
            currentPage = i;
            displayNews();
        });

        paginationContainer.appendChild(pageButton);
    }

    updatePaginationUI();
}

function updatePaginationUI() {
    let pageButtons = document.querySelectorAll(".page-btn");
    pageButtons.forEach((btn, index) => {
        btn.classList.toggle("active", index + 1 === currentPage);
    });
}

// Fetch news on page load
fetchNews();