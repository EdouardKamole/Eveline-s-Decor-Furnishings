document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const responseMessage = document.getElementById("response-message");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;

    // Display a thank you message
    responseMessage.innerHTML = `
            <div class="alert alert-success">
                Thank you for sending the message, ${name}. We'll get back to you later.
            </div>
        `;
    responseMessage.style.display = "block";

    // Clear the form fields
    form.reset();
  });
});
