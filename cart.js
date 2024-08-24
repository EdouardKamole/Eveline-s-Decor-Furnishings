document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");

  function renderCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
      cartTotalElement.textContent = "$0.00";
      return;
    }

    let total = 0;

    cart.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.className = "col-md-12 mb-3";
      cartItem.innerHTML = `
                <div class="card">
                    <div class="card-body d-flex align-items-center">
                        <img src="${item.image}" class="card-img-left" alt="${item.name}" style="width: 100px; height: 100px; object-fit: cover;" />
                        <div class="ml-3">
                            <h5 class="card-title">${item.name}</h5>
                            <p class="card-text">$${item.price}</p>
                            <div class="d-flex align-items-center">
                                <button class="btn btn-secondary btn-sm quantity-decrease" data-id="${item.id}">-</button>
                                <input type="text" class="form-control mx-2 quantity-input" value="${item.quantity}" readonly style="width: 60px;" />
                                <button class="btn btn-secondary btn-sm quantity-increase" data-id="${item.id}">+</button>
                                <button class="btn btn-danger btn-sm ml-3 remove-item" data-id="${item.id}">Remove</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
      cartItemsContainer.appendChild(cartItem);

      total += item.price * item.quantity;
    });

    cartTotalElement.textContent = `$${total.toFixed(2)}`;

    document
      .querySelectorAll(".quantity-decrease")
      .forEach((button) => button.addEventListener("click", adjustQuantity));
    document
      .querySelectorAll(".quantity-increase")
      .forEach((button) => button.addEventListener("click", adjustQuantity));
    document
      .querySelectorAll(".remove-item")
      .forEach((button) => button.addEventListener("click", removeItem));
  }

  function adjustQuantity(event) {
    const button = event.target;
    const productId = button.getAttribute("data-id");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = cart.find((p) => p.id === parseInt(productId));

    if (button.classList.contains("quantity-decrease")) {
      if (product.quantity > 1) {
        product.quantity -= 1;
      }
    } else if (button.classList.contains("quantity-increase")) {
      product.quantity += 1;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }

  function removeItem(event) {
    const button = event.target;
    const productId = button.getAttribute("data-id");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart = cart.filter((p) => p.id !== parseInt(productId));
    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();
  }

  renderCart();
});
