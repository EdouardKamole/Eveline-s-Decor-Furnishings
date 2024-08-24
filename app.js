document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    if (email === "test@example.com" && password === "password123") {
      message.textContent = "Login successfully";
      message.style.color = "green";
      // Redirect to another page or show additional content
    } else {
      message.textContent = "Invalid email or password";
      message.style.color = "red";
    }
  });
