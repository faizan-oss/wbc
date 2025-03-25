const API_KEY = "88d122e1bc50484f9055b2a38e5f92bc"; // Replace with your API key
const API_URL = `https://newsapi.org/v2/everything?q=sports&apiKey=${API_KEY}`;

let currentPage = 1;
const articlesPerPage = 8; // More data per page
let totalArticles = []; // Store fetched articles
let maxPages = 10; // Limit pagination to 10 pages

async function fetchNews() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        totalArticles = data.articles.slice(0, articlesPerPage * maxPages); // Limit data to 10 pages

        displayNews();
        setupPagination();
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}

function displayNews() {
    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = "";

    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    const articlesToShow = totalArticles.slice(startIndex, endIndex);

    articlesToShow.forEach((article, index) => {
        const newsItem = document.createElement("div");
        newsItem.classList.add("news-item");
        newsItem.style.gridColumn = index === 0 ? "span 2" : "span 1"; // Make the first column wider

        newsItem.innerHTML = `
            <img src="${article.urlToImage || 'https://via.placeholder.com/300'}" alt="News Image">
            <h3>${article.title}</h3>
            <p>${article.description || "No description available."}</p>
            <a href="${article.url}" target="_blank">Read More</a>
        `;
        newsContainer.appendChild(newsItem);
    });
}

function setupPagination() {
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = "";

    for (let i = 1; i <= maxPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.innerText = i;
        pageButton.classList.add("page-btn");
        if (i === currentPage) {
            pageButton.classList.add("active");
        }
        pageButton.addEventListener("click", () => {
            currentPage = i;
            displayNews();
            updatePaginationUI();
        });
        paginationContainer.appendChild(pageButton);
    }

    updatePaginationUI();
}

function updatePaginationUI() {
    document.querySelectorAll(".page-btn").forEach(button => {
        button.classList.remove("active");
        if (parseInt(button.innerText) === currentPage) {
            button.classList.add("active");
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    fetchNews();
});
