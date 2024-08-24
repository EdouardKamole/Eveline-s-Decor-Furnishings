document.addEventListener("DOMContentLoaded", () => {
  const products = [
    {
      id: 1,
      name: "Modern Sofa",
      category: "living-room",
      price: 350,
      image: "images/modern-sofa.jpg",
    },
    {
      id: 2,
      name: "Wooden Dining Table",
      category: "dining",
      price: 450,
      image: "images/wooden-dining-table.jpg",
    },
    {
      id: 3,
      name: "Office Chair",
      category: "office",
      price: 150,
      image: "images/office-chair1.jpg",
    },
    {
      id: 4,
      name: "Queen Size Bed",
      category: "bedroom",
      price: 600,
      image: "images/queen-size-bed.jpg",
    },
    {
      id: 5,
      name: "Coffee Table",
      category: "living-room",
      price: 120,
      image: "images/coffee-table1.jpg",
    },
    {
      id: 6,
      name: "Bookshelf",
      category: "office",
      price: 200,
      image: "images/bookshelf.jpg",
    },
    {
      id: 7,
      name: "Dining Chair",
      category: "dining",
      price: 80,
      image: "images/dining-chair.jpg",
    },
    {
      id: 8,
      name: "Nightstand",
      category: "bedroom",
      price: 100,
      image: "images/nightstand.jpg",
    },
    {
      id: 9,
      name: "Decorative Lamp",
      category: "living-room",
      price: 50,
      image: "images/decorative-lamp.jpg",
    },
    {
      id: 10,
      name: "Office Desk",
      category: "office",
      price: 300,
      image: "images/office-desk.jpg",
    },
    {
      id: 9,
      name: "Elegant Floor Lamp",
      category: "living-room",
      price: 75,
      image: "images/elegant-floor-lamp.jpg",
    },
    {
      id: 10,
      name: "Modern Writing Desk",
      category: "office",
      price: 320,
      image: "images/modern-writing-desk.jpg",
    },
    // Add more products as needed
  ];

  const productGrid = document.getElementById("product-grid");
  const categorySelect = document.getElementById("category");
  const priceRangeInput = document.getElementById("priceRange");
  const priceRangeValue = document.getElementById("priceRangeValue");
  const searchInput = document.getElementById("search");
  const searchButton = document.getElementById("searchButton");

  function renderProducts(filterCategory, maxPrice, searchQuery) {
    productGrid.innerHTML = "";
    const filteredProducts = products.filter(
      (product) =>
        (filterCategory === "all" || product.category === filterCategory) &&
        product.price <= maxPrice &&
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    filteredProducts.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "col-md-4 mb-4";
      productCard.innerHTML = `
                <div class="card">
                  <img src="${product.image}" class="card-img-top" alt="${product.name}">
                  <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">$${product.price}</p>
                    <button class="btn btn-primary add-to-cart-button" data-id="${product.id}">Add to Cart</button>
                  </div>
                </div>
              `;
      productGrid.appendChild(productCard);
    });

    // Add click event listeners to "Add to Cart" buttons
    document.querySelectorAll(".add-to-cart-button").forEach((button) => {
      button.addEventListener("click", addToCart);
    });
  }

  function addToCart(event) {
    const productId = event.target.getAttribute("data-id");
    const product = products.find((p) => p.id === parseInt(productId));
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Animation for adding to cart
    event.target.textContent = "Added!";
    event.target.style.backgroundColor = "#28a745";
    setTimeout(() => {
      event.target.textContent = "Add to Cart";
      event.target.style.backgroundColor = "#007bff";
    }, 1500);
  }

  function updateProductDisplay() {
    const category = categorySelect.value;
    const priceRange = priceRangeInput.value;
    const searchQuery = searchInput.value;
    priceRangeValue.textContent = `$0 - $${priceRange}`;
    renderProducts(category, priceRange, searchQuery);
  }

  renderProducts("all", 1000, ""); // Initial render

  categorySelect.addEventListener("change", updateProductDisplay);
  priceRangeInput.addEventListener("input", updateProductDisplay);
  searchButton.addEventListener("click", updateProductDisplay);
});
