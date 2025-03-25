document.addEventListener("DOMContentLoaded", () => {
    // Check if we're on the login page
    if (document.getElementById("loginForm")) {
        // Initialize login page functionality
        initializeLoginPage();
    } else {
        // Initialize main page functionality
        initializeMainPage();
    }
});

function initializeLoginPage() {
    // Password visibility toggle
    const togglePassword = document.getElementById("togglePassword");
    if (togglePassword) {
        togglePassword.addEventListener("click", function() {
            let passwordField = document.getElementById("password");
            if (passwordField.type === "password") {
                passwordField.type = "text";
                this.textContent = "Hide password";
            } else {
                passwordField.type = "password";
                this.textContent = "Show password";
            }
        });
    }

    // Check URL parameters to determine which form to show
    const urlParams = new URLSearchParams(window.location.search);
    const formType = urlParams.get('form');

    if (formType === 'login') {
        showLoginUI();
    } else if (formType === 'register') {
        showRegisterUI();
    }
}

function initializeMainPage() {
    // Mobile menu functionality
    const menuIcon = document.getElementById("bars");
    const mobileMenu = document.getElementById("mobile-menu");
    const closeMenu = document.getElementById("close-menu");

    // Login functionality
    const signInBtn = document.getElementById("sign-btn");
    const registerBtn = document.getElementById("register-btn");
    const loginModal = document.getElementById("loginModal");
    const closeModal = document.querySelector(".close");
    const loginForm = document.getElementById("loginForm");
    const loginMessage = document.getElementById("loginMessage");

    if (signInBtn) {
        signInBtn.addEventListener("click", () => {
            window.location.href = "./loginpage.html?form=login";
        });
    }

    if (registerBtn) {
        registerBtn.addEventListener("click", () => {
            window.location.href = "./loginpage.html?form=register";
        });
    }

    if (closeModal) {
        closeModal.addEventListener("click", () => {
            loginModal.style.display = "none";
            loginMessage.textContent = "";
        });
    }

    // Close login modal when clicking outside
    window.addEventListener("click", (event) => {
        if (event.target === loginModal) {
            loginModal.style.display = "none";
            loginMessage.textContent = "";
        }
    });

    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;

            // Simple validation
            if (!email || !password) {
                loginMessage.textContent = "Please fill in all fields";
                return;
            }

            // Get registered users from localStorage
            const users = JSON.parse(localStorage.getItem("users")) || {};

            // Check if user exists and password matches
            if (users[email] && users[email] === password) {
                loginMessage.textContent = "Login successful!";
                loginMessage.style.color = "green";
                
                // Store login state
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("userEmail", email);
                
                // Update UI
                signInBtn.textContent = "Sign Out";
                signInBtn.onclick = () => {
                    localStorage.removeItem("isLoggedIn");
                    localStorage.removeItem("userEmail");
                    signInBtn.textContent = "Sign In";
                    signInBtn.onclick = () => window.location.href = "./loginpage.html?form=login";
                };
                
                // Close modal after 1 second
                setTimeout(() => {
                    loginModal.style.display = "none";
                    loginMessage.textContent = "";
                }, 1000);
            } else {
                loginMessage.textContent = "Invalid email or password";
                loginMessage.style.color = "red";
            }
        });
    }

    // Check login state on page load
    if (localStorage.getItem("isLoggedIn") === "true" && signInBtn) {
        signInBtn.textContent = "Sign Out";
        signInBtn.onclick = () => {
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("userEmail");
            signInBtn.textContent = "Sign In";
            signInBtn.onclick = () => window.location.href = "./loginpage.html?form=login";
        };
    }

    // Mobile menu functionality
    if (menuIcon && mobileMenu && closeMenu) {
        menuIcon.addEventListener("click", function (event) {
            event.stopPropagation();
            mobileMenu.classList.add("show");
        });

        closeMenu.addEventListener("click", function (event) {
            event.stopPropagation();
            mobileMenu.classList.remove("show");
        });

        document.addEventListener("click", function (event) {
            if (!mobileMenu.contains(event.target) && !menuIcon.contains(event.target)) {
                mobileMenu.classList.remove("show");
            }
        });

        mobileMenu.addEventListener("click", function (event) {
            event.stopPropagation();
        });
    }

    // News API functionality
    const apiKey = "88d122e1bc50484f9055b2a38e5f92bc";
    const today = new Date().toISOString().split('T')[0];
    const url = `https://newsapi.org/v2/everything?q=tesla&from=${today}&sortBy=publishedAt&apiKey=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.articles && data.articles.length > 0) {
                displayNews(data.articles);
            } else {
                console.error("No news found");
            }
        })
        .catch(error => {
            console.error("Error fetching news:", error);
            const newsContainer = document.getElementById("news-container");
            if (newsContainer) {
                newsContainer.innerHTML = "<p>Error loading news. Please try again later.</p>";
            }
        });
}

// Function to display news articles
function displayNews(articles) {
    const newsContainer = document.getElementById("news-container");
    if (!newsContainer) return;

    newsContainer.innerHTML = ""; // Clear previous content

    articles.forEach(article => {
        const newsItem = document.createElement("div");
        newsItem.classList.add("news-item");

        newsItem.innerHTML = `
            <h2>${article.title}</h2>
            <img src="${article.urlToImage}" alt="News Image" onerror="this.onerror=null;this.src='https://via.placeholder.com/150';">
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;

        newsContainer.appendChild(newsItem);
    });
}

// Registration and Login Functions
function checkAndProceed() {
    let email = document.getElementById("email").value;
    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[email]) {
        document.getElementById("emailError").innerText = "Email already exists. Please sign in.";
    } else {
        localStorage.setItem("currentEmail", email);
        const emailForm = document.getElementById("emailForm");
        const passwordForm = document.getElementById("passwordForm");
        
        emailForm.style.display = "none";
        passwordForm.style.display = "block";
    }
}

function saveUser() {
    let email = localStorage.getItem("currentEmail");
    let password = document.getElementById("password").value;

    if (password.length < 8 || !/[a-zA-Z]/.test(password) || !/[0-9!@#$%^&*]/.test(password)) {
        alert("Password must be at least 8 characters, include a letter and a number/symbol.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || {};
    users[email] = password;
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! Please log in.");
    showLoginUI();
}

function loginUser() {
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;
    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[email] && users[email] === password) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", email);
        window.location.href = "index.html";
    } else {
        document.getElementById("loginError").innerText = "Invalid email or password.";
    }
}

function showLoginUI() {
    const emailForm = document.getElementById("emailForm");
    const passwordForm = document.getElementById("passwordForm");
    const loginForm = document.getElementById("loginForm");
    
    if (emailForm) emailForm.style.display = "none";
    if (passwordForm) passwordForm.style.display = "none";
    if (loginForm) loginForm.style.display = "block";
}

function showRegisterUI() {
    const emailForm = document.getElementById("emailForm");
    const passwordForm = document.getElementById("passwordForm");
    const loginForm = document.getElementById("loginForm");
    
    if (emailForm) emailForm.style.display = "block";
    if (passwordForm) passwordForm.style.display = "none";
    if (loginForm) loginForm.style.display = "none";
}

// Check URL parameters on login page load
window.addEventListener('load', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const formType = urlParams.get('form');
    
    if (formType === 'login') {
        showLoginUI();
    } else if (formType === 'register') {
        showRegisterUI();
    }
});
