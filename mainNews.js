const NEWS_API = "https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=us&max=18&apikey=8c6266cb52d9f64bb6110ef7582882b7";

async function loadThreeColNews() {
    const left = document.getElementById('left-news');
    const middle = document.getElementById('middle-news');
    const right = document.getElementById('right-news');
    if (!left || !middle || !right) return;
    try {
        const res = await fetch(NEWS_API);
        const data = await res.json();
        if (!data.articles || data.articles.length === 0) {
            left.innerHTML = middle.innerHTML = right.innerHTML = '<p>No live news available.</p>';
            return;
        }
        // Distribute articles
        const articles = data.articles;
        const colSize = Math.ceil(articles.length / 3);
        const leftArticles = articles.slice(0, colSize);
        const middleArticles = articles.slice(colSize, colSize * 2);
        const rightArticles = articles.slice(colSize * 2);
        left.innerHTML = leftArticles.map(article => newsItemHTML(article)).join('');
        middle.innerHTML = middleArticles.map(article => newsItemHTML(article)).join('');
        right.innerHTML = rightArticles.map(article => newsItemHTML(article)).join('');
    } catch (err) {
        left.innerHTML = middle.innerHTML = right.innerHTML = '<p>Error loading live news.</p>';
    }
}

function newsItemHTML(article) {
    return `<div class="news-item">
        <img src="${article.image || 'https://via.placeholder.com/600'}" alt="News Image">
        <h3>${article.title}</h3>
        <p>${article.description || ''}</p>
        <a href="${article.url}" target="_blank">Read More</a>
    </div>`;
}

window.addEventListener('DOMContentLoaded', loadThreeColNews); 
window.addEventListener('DOMContentLoaded', loadMainNews); 