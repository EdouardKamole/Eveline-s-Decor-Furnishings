document.addEventListener("DOMContentLoaded", () => {
  const products = [
    {
      id: 1,
      name: "Sofa",
      price: 299,
      image: "images/sofa.jpg",
      category: "living-room",
    },
    {
      id: 2,
      name: "Dining Table",
      price: 199,
      image: "images/dining-table.jpg",
      category: "living-room",
    },
    {
      id: 3,
      name: "Office Chair",
      price: 150,
      image: "images/office-chair.jpg",
      category: "office",
    },
    {
      id: 4,
      name: "Bed Frame",
      price: 350,
      image: "images/bed-frame.jpg",
      category: "bedroom",
    },
    {
      id: 5,
      name: "Coffee Table",
      price: 99,
      image: "images/coffee-table.jpg",
      category: "living-room",
    },
    {
      id: 6,
      name: "Bookshelf",
      price: 120,
      image: "images/bookshelf.jpg",
      category: "office",
    },
    {
      id: 7,
      name: "Nightstand",
      price: 85,
      image: "images/nightstand.jpg",
      category: "bedroom",
    },
    {
      id: 8,
      name: "Armchair",
      price: 220,
      image: "images/armchair.jpg",
      category: "living-room",
    },
    {
      id: 9,
      name: "Wardrobe",
      price: 450,
      image: "images/wardrobe.jpg",
      category: "bedroom",
    },
    {
      id: 10,
      name: "Desk",
      price: 250,
      image: "images/desk.jpg",
      category: "office",
    },
    {
      id: 11,
      name: "TV Stand",
      price: 180,
      image: "images/tv-stand.jpg",
      category: "living-room",
    },
    {
      id: 12,
      name: "Dresser",
      price: 320,
      image: "images/dresser.jpg",
      category: "bedroom",
    },
    {
      id: 13,
      name: "Recliner",
      price: 300,
      image: "images/recliner.jpg",
      category: "living-room",
    },
    {
      id: 14,
      name: "Dining Chair Set",
      price: 240,
      image: "images/dining-chair-set.jpg",
      category: "living-room",
    },
    {
      id: 15,
      name: "Mirror",
      price: 60,
      image: "images/mirror.jpg",
      category: "bedroom",
    },
    {
      id: 16,
      name: "Side Table",
      price: 90,
      image: "images/side-table.jpg",
      category: "living-room",
    },
    {
      id: 17,
      name: "Cushions",
      price: 40,
      image: "images/cushions.jpg",
      category: "living-room",
    },
    {
      id: 18,
      name: "Study Lamp",
      price: 70,
      image: "images/study-lamp.jpg",
      category: "office",
    },
    {
      id: 19,
      name: "Carpet",
      price: 200,
      image: "images/carpet.jpg",
      category: "living-room",
    },
    {
      id: 20,
      name: "Curtains",
      price: 80,
      image: "images/curtains.jpg",
      category: "bedroom",
    },

    {
      id: 21,
      name: "Minimalist Wall Clock",
      category: "living-room",
      price: 75,
      image: "images/minimalist-wall-clock.jpg",
    },
    {
      id: 22,
      name: "Elegant Glass Vase",
      category: "dining",
      price: 50,
      image: "images/elegant-glass-vase.jpg",
    },
    {
      id: 23,
      name: "Contemporary Desk Lamp",
      category: "office",
      price: 85,
      image: "images/contemporary-desk-lamp1.jpg",
    },

    {
      id: 24,
      name: "Industrial Bookshelf",
      category: "office",
      price: 250,
      image: "images/industrial-bookshelf.jpg",
    },
  ];

  const productGrid = document.getElementById("product-grid");

  function renderProducts(filterCategory, maxPrice) {
    productGrid.innerHTML = "";
    const filteredProducts = products.filter(
      (product) =>
        (filterCategory === "all" || product.category === filterCategory) &&
        product.price <= maxPrice
    );

    filteredProducts.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "col-md-4 mb-4";
      productCard.innerHTML = `
        <div class="card product-card">
          <img src="${product.image}" class="card-img-top" alt="${product.name}" />
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">$${product.price}</p>
            <button class="btn btn-primary add-to-cart-button" data-id="${product.id}">Add to Cart</button>
          </div>
        </div>
      `;
      productGrid.appendChild(productCard);
    });

    document.querySelectorAll(".add-to-cart-button").forEach((button) => {
      button.addEventListener("click", addToCart);
    });
  }

  function addToCart(event) {
    const button = event.target;
    const productId = button.getAttribute("data-id");
    const product = products.find((p) => p.id === parseInt(productId));

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = cart.findIndex((p) => p.id === product.id);

    if (existingProductIndex > -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Update button appearance
    button.textContent = "Added!";
    button.classList.remove("btn-primary");
    button.classList.add("btn-success");

    // Update cart count in navbar
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector(
      ".navbar-nav .nav-link[href='cart.html']"
    ).textContent = `Cart (${cartCount})`;

    // Reset button state after 1.5 seconds
    setTimeout(() => {
      button.textContent = "Add to Cart";
      button.classList.remove("btn-success");
      button.classList.add("btn-primary");
    }, 1500);
  }

  renderProducts("all", 1000);

  document.getElementById("filters").addEventListener("change", () => {
    const category = document.getElementById("category").value;
    const priceRange = document.getElementById("priceRange").value;
    document.getElementById(
      "priceRangeValue"
    ).textContent = `$0 - $${priceRange}`;
    renderProducts(category, priceRange);
  });
});
