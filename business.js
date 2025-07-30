const BUSINESS_API = "https://newsdata.io/api/1/latest?apikey=pub_240aa4563f1d4e3fb38e1f8645ff4b56&q=business";

let totalArticles = [];
let currentPage = 1;
const articlesPerPage = 8;

async function fetchBusinessNews() {
    try {
        const response = await fetch(BUSINESS_API);
        const data = await response.json();
        if (!data.results || data.results.length === 0) {
            document.getElementById("news-container").innerHTML = "<p>No business news found.</p>";
            return;
        }
        totalArticles = data.results;
        displayBusinessNews();
        setupBusinessPagination();
    } catch (error) {
        document.getElementById("news-container").innerHTML = "<p>Error fetching business news.</p>";
    }
}

function displayBusinessNews() {
    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = "";

    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    const articlesToShow = totalArticles.slice(startIndex, endIndex);

    articlesToShow.forEach((article, index) => {
        const newsItem = document.createElement("div");
        newsItem.classList.add("news-item");
        newsItem.style.gridColumn = index === 0 ? "span 2" : "span 1";

        newsItem.innerHTML = `
            <img src="${article.image_url || 'https://via.placeholder.com/300'}" alt="News Image">
            <h3>${article.title}</h3>
            <p>${article.description || article.content || "No description available."}</p>
            <a href="${article.link}" target="_blank">Read More</a>
        `;
        newsContainer.appendChild(newsItem);
    });
}

function setupBusinessPagination() {
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = "";
    const totalPages = Math.ceil(totalArticles.length / articlesPerPage);
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.innerText = i;
        pageButton.classList.add("page-btn");
        if (i === currentPage) pageButton.classList.add("active");
        pageButton.addEventListener("click", () => {
            currentPage = i;
            displayBusinessNews();
            setupBusinessPagination();
        });
        paginationContainer.appendChild(pageButton);
    }
}

fetchBusinessNews(); 