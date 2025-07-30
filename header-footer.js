// Function to add header to any page
function addHeader() {
    const headerHTML = `
        <div class="sticky-container">
            <header>
                <div class="left-head">
                    <i id="bars" style="margin-right: 10px; font-size: 24px;" class="fa-solid fa-bars"></i>
                    <i style="font-size: 24px;" class="fa-solid fa-magnifying-glass"></i>
                </div>
                <div class="middle-head">
                    <a href="index.html">
                        <img src="https://github.com/faizan-oss/wbc/blob/main/images/Your%20paragraph%20text%20(3).png?raw=true" alt="">
                    </a>
                </div>
                <div class="right-head">
                    <button id="register-btn">Register</button>
                    <button id="sign-btn">Sign In</button>
                </div>
            </header>
            <hr style="margin-top: 20px;">
            <div class="nav-bar">
                <a href="index.html" class="nav-link">Home</a>
                <a href="news.html" class="nav-link">News</a>
                <a href="sports.html" class="nav-link">Sports</a>
                <a href="business.html" class="nav-link">Business</a>
                <a href="#" class="nav-link">Inovation</a>
                <a href="#" class="nav-link">Culture</a>
                <a href="#" class="nav-link">Arts</a>
                <a href="#" class="nav-link">Travel</a>
                <a href="#" class="nav-link">Earth</a>
                <a href="#" class="nav-link">Audio</a>
                <a href="#" class="nav-link">Video</a>
                <a href="#" class="nav-link">Live</a>
            </div>
            <hr>
        </div>
        <div id="mobile-menu" class="mobile-nav">
            <span id="close-menu">&times;</span>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="news.html">News</a></li>
                <li><a href="sports.html">Sports</a></li>
                <li><a href="business.html">Business</a></li>
                <li><a href="#">Innovation</a></li>
                <li><a href="#">Culture</a></li>
                <li><a href="#">Arts</a></li>
                <li><a href="#">Travel</a></li>
                <li><a href="#">Earth</a></li>
                <li><a href="#">Audio</a></li>
                <li><a href="#">Video</a></li>
                <li><a href="#">Live</a></li>
            </ul>
        </div>
    `;

    // Insert header at the beginning of the body
    document.body.insertAdjacentHTML('afterbegin', headerHTML);

    // Add mobile menu functionality
    const bars = document.getElementById('bars');
    const closeMenu = document.getElementById('close-menu');
    const mobileNav = document.getElementById('mobile-menu');

    bars.addEventListener('click', () => {
        mobileNav.classList.add('show');
    });

    closeMenu.addEventListener('click', () => {
        mobileNav.classList.remove('show');
    });

    // Add active state to current page link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Function to add footer to any page
function addFooter() {
    const footerHTML = `
        <footer>
            <div class="footer-container">
                <div class="footer-logo">
                    <a href="index.html">
                        <img src="https://github.com/faizan-oss/wbc/blob/main/images/Your%20paragraph%20text%20(3).png?raw=true" alt="">
                    </a>
                </div>
                <nav class="footer-nav">
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="news.html">News</a></li>
                        <li><a href="sports.html">Sport</a></li>
                        <li><a href="business.html">Business</a></li>
                        <li><a href="#">Innovation</a></li>
                        <li><a href="#">Culture</a></li>
                        <li><a href="#">Arts</a></li>
                        <li><a href="#">Travel</a></li>
                        <li><a href="#">Earth</a></li>
                        <li><a href="#">Audio</a></li>
                        <li><a href="#">Video</a></li>
                        <li><a href="#">Live</a></li>
                        <li><a href="#">Weather</a></li>
                        <li><a href="#">BBC Shop</a></li>
                        <li><a href="#">BritBox</a></li>
                    </ul>
                </nav>
                <div class="language-selector">
                    <label>BBC in other languages ▼</label>
                </div>
                <div class="social-icons">
                    <span>Follow BBC on:</span>
                    <i class="fab fa-x"></i>
                    <i class="fab fa-facebook"></i>
                    <i class="fab fa-instagram"></i>
                    <i class="fab fa-tiktok"></i>
                    <i class="fab fa-linkedin"></i>
                    <i class="fab fa-youtube"></i>
                </div>
                <div class="footer-links">
                    <a href="#">Terms of Use</a>
                    <a href="#">About the BBC</a>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Cookies</a>
                    <a href="#">Accessibility Help</a>
                    <a href="#">Contact the BBC</a>
                    <a href="#">Advertise with us</a>
                    <a href="#">Do not share or sell my info</a>
                    <a href="#">Contact technical support</a>
                </div>
                <p class="copyright">
                    Copyright 2025 BBC. All rights reserved. The BBC is <em>not responsible</em> for the content of external sites.
                    <a href="#">Read about our approach to external linking.</a>
                </p>
            </div>
        </footer>
    `;

    // Insert footer at the end of the body
    document.body.insertAdjacentHTML('beforeend', footerHTML);
}

// Function to initialize both header and footer
function initializeHeaderFooter() {
    addHeader();
    addFooter();
}

// Call the initialization function when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializeHeaderFooter);
