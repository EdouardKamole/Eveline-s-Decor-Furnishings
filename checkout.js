document.addEventListener("DOMContentLoaded", () => {
  const paymentMethodSelect = document.getElementById("payment-method");
  const creditCardInfo = document.getElementById("credit-card-info");
  const paypalInfo = document.getElementById("paypal-info");
  const bankTransferInfo = document.getElementById("bank-transfer-info");

  paymentMethodSelect.addEventListener("change", (event) => {
    const selectedMethod = event.target.value;

    // Hide all payment details
    creditCardInfo.classList.add("d-none");
    paypalInfo.classList.add("d-none");
    bankTransferInfo.classList.add("d-none");

    // Show selected payment method details
    if (selectedMethod === "credit-card") {
      creditCardInfo.classList.remove("d-none");
    } else if (selectedMethod === "paypal") {
      paypalInfo.classList.remove("d-none");
    } else if (selectedMethod === "bank-transfer") {
      bankTransferInfo.classList.remove("d-none");
    }
  });

  document
    .getElementById("checkout-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const selectedMethod = paymentMethodSelect.value;

      if (selectedMethod === "credit-card") {
        const cardNumber = document.getElementById("card-number").value;
        const cardName = document.getElementById("card-name").value;
        const expiryDate = document.getElementById("expiry-date").value;
        const cvv = document.getElementById("cvv").value;

        if (cardNumber && cardName && expiryDate && cvv) {
          alert("Order placed successfully with Credit Card!");
          // Proceed to payment processing
          // For actual payment, you would integrate with a payment gateway here
        } else {
          alert("Please fill out all credit card fields.");
        }
      } else if (selectedMethod === "paypal") {
        alert("You will be redirected to PayPal to complete your payment.");
        // Redirect to PayPal payment page (for actual implementation)
      } else if (selectedMethod === "bank-transfer") {
        alert("Bank transfer instructions have been provided.");
        // Provide bank transfer details (for actual implementation)
      } else {
        alert("Please select a payment method.");
      }
    });
});
