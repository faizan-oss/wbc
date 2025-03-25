document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent form from refreshing the page

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    // Save to local storage
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    alert("User info saved successfully!");  
});
