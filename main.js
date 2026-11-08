
"use strict";

/* =========================================
   ELORA — STORE DATA
========================================= */

const PRODUCTS = [
  {
    id: 1,
    name: "The Signature Blazer",
    category: "Women",
    type: "Blazers",
    price: 18500,
    oldPrice: 22000,
    badge: "BESTSELLER",
    description: "A refined tailored blazer with a timeless silhouette, structured shoulders and carefully considered details. Designed to elevate everyday dressing.",
    sizes: ["XS", "S", "M", "L", "XL"],
    color: "Black",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=900",
      "https://images.unsplash.com/photo-1548624149-f1a7d3f4e5c7?w=900"
    ]
  },
  {
    id: 2,
    name: "Classic Linen Shirt",
    category: "Women",
    type: "Shirts",
    price: 8900,
    oldPrice: null,
    badge: "NEW ARRIVAL",
    description: "A relaxed linen shirt made for effortless everyday elegance. Lightweight fabric, clean lines and a versatile fit.",
    sizes: ["XS", "S", "M", "L"],
    color: "Ivory",
    images: [
      "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=900",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=900"
    ]
  },
  {
    id: 3,
    name: "The Modern Trouser",
    category: "Women",
    type: "Trousers",
    price: 12500,
    oldPrice: null,
    badge: "",
    description: "A modern tailored trouser with a fluid drape and a flattering straight-leg shape. An essential piece for a considered wardrobe.",
    sizes: ["XS", "S", "M", "L", "XL"],
    color: "Beige",
    images: [
      "https://images.unsplash.com/photo-1506629905607-d9a6e4c6f2e0?w=900",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=900"
    ]
  },
  {
    id: 4,
    name: "Evening Satin Dress",
    category: "Women",
    type: "Dresses",
    price: 16900,
    oldPrice: 19500,
    badge: "LIMITED",
    description: "An elegant satin dress designed for special occasions. Its understated finish and graceful silhouette make a lasting impression.",
    sizes: ["XS", "S", "M", "L"],
    color: "Brown",
    images: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=900",
      "https://images.unsplash.com/photo-1566206091558-7f218b696731?w=900"
    ]
  },
  {
    id: 5,
    name: "Premium Knit Sweater",
    category: "Men",
    type: "Knitwear",
    price: 14500,
    oldPrice: null,
    badge: "NEW",
    description: "A refined knitwear essential with a soft feel and timeless design. Made for versatile layering.",
    sizes: ["S", "M", "L", "XL"],
    color: "Cream",
    images: [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=900",
      "https://images.unsplash.com/photo-1627225924765-552d49cf47ad?w=900"
    ]
  },
  {
    id: 6,
    name: "Essential Tailored Coat",
    category: "Men",
    type: "Outerwear",
    price: 24500,
    oldPrice: 28000,
    badge: "BESTSELLER",
    description: "A sophisticated outerwear piece featuring a clean tailored shape and versatile styling. A timeless addition to your collection.",
    sizes: ["S", "M", "L", "XL"],
    color: "Camel",
    images: [
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=900",
      "https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=900"
    ]
  },
  {
    id: 7,
    name: "Minimal Everyday Shirt",
    category: "Men",
    type: "Shirts",
    price: 9500,
    oldPrice: null,
    badge: "",
    description: "A versatile shirt with a modern fit, refined construction and understated styling.",
    sizes: ["S", "M", "L", "XL"],
    color: "White",
    images: [
      "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?w=900",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=900"
    ]
  },
  {
    id: 8,
    name: "Relaxed Linen Trousers",
    category: "Men",
    type: "Trousers",
    price: 11900,
    oldPrice: null,
    badge: "NEW ARRIVAL",
    description: "Relaxed tailoring meets refined simplicity in these versatile linen trousers.",
    sizes: ["S", "M", "L", "XL"],
    color: "Sand",
    images: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=900",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900"
    ]
  }
];


/* =========================================
   HELPERS
========================================= */

const $ = (selector, parent = document) =>
  parent.querySelector(selector);

const $$ = (selector, parent = document) =>
  [...parent.querySelectorAll(selector)];

const money = amount =>
  new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0
  }).format(amount);

const getProduct = id =>
  PRODUCTS.find(product => product.id === Number(id));

function getCart() {
  try {
    return JSON.parse(localStorage.getItem("elora-cart")) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem("elora-cart", JSON.stringify(cart));
  updateCartCount();
}

function cartQuantity() {
  return getCart().reduce((total, item) => total + item.quantity, 0);
}

function cartSubtotal() {
  return getCart().reduce((total, item) => {
    const product = getProduct(item.id);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);
}

function updateCartCount() {
  $$(".cart-count").forEach(el => {
    el.textContent = cartQuantity();
  });
}

let toastTimer;

function showToast(message) {
  const toast = $("#toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}


/* =========================================
   SHARED HEADER AND FOOTER
========================================= */

function renderSharedLayout() {
  const announcement = $("#announcement");
  const header = $("#site-header");
  const footer = $("#site-footer");

  if (announcement) {
    announcement.innerHTML = `
      <div class="announcement">
        Complimentary delivery on orders above PKR 20,000
      </div>
    `;
  }

  if (header) {
    header.innerHTML = `
      <header class="site-header">
        <div class="container navbar">

          <button class="menu-toggle" id="menuToggle"
            aria-label="Open navigation">☰</button>

          <nav class="nav-left">
            <a class="nav-link" href="shop.html">Shop</a>
            <a class="nav-link" href="shop.html?category=Women">Women</a>
            <a class="nav-link" href="shop.html?category=Men">Men</a>
          </nav>

          <a class="brand" href="index.html">
            ÉLORA
            <small>THE ART OF DRESSING</small>
          </a>

          <div class="nav-right">
            <a class="nav-link desktop-about" href="about.html">Our Story</a>
            <a class="icon-link" href="shop.html" aria-label="Search">⌕</a>
            <a class="icon-link" href="cart.html" aria-label="Shopping bag">
              ♧ <span class="cart-count">0</span>
            </a>
          </div>

          <nav class="mobile-menu" id="mobileMenu">
            <a href="index.html">Home</a>
            <a href="shop.html">Shop All</a>
            <a href="shop.html?category=Women">Women</a>
            <a href="shop.html?category=Men">Men</a>
            <a href="about.html">Our Story</a>
            <a href="contact.html">Contact</a>
          </nav>

        </div>
      </header>
    `;
  }

  if (footer) {
    footer.innerHTML = `
      <footer class="site-footer">
        <div class="container">

          <div class="footer-grid">
            <div>
              <div class="footer-brand">ÉLORA</div>
              <p class="footer-description">
                A considered approach to modern dressing.
                Timeless essentials, refined details and
                effortless sophistication.
              </p>
            </div>

            <div class="footer-column">
              <h4>Explore</h4>
              <a href="shop.html">Shop All</a>
              <a href="shop.html?category=Women">Women</a>
              <a href="shop.html?category=Men">Men</a>
              <a href="shop.html?sort=newest">New Arrivals</a>
            </div>

            <div class="footer-column">
              <h4>Information</h4>
              <a href="about.html">Our Story</a>
              <a href="contact.html">Contact</a>
              <a href="cart.html">Shopping Bag</a>
              <a href="checkout.html">Checkout</a>
            </div>

            <div class="footer-column">
              <h4>Customer Care</h4>
              <a href="contact.html">Get in Touch</a>
              <a href="contact.html">Shipping Questions</a>
              <a href="contact.html">Returns & Exchanges</a>
            </div>
          </div>

          <div class="footer-bottom">
            <span>© ${new Date().getFullYear()} ÉLORA. All rights reserved.</span>
            <span>CRAFTED WITH INTENTION.</span>
          </div>

        </div>
      </footer>
    `;
  }

  updateCartCount();

  $("#menuToggle")?.addEventListener("click", () => {
    $("#mobileMenu")?.classList.toggle("open");
  });
}


/* =========================================
   PRODUCT CARD COMPONENT
========================================= */

function productCard(product) {
  return `
    <article class="product-card">

      <a class="product-image" href="product.html?id=${product.id}">
        <img src="${product.images[0]}"
          alt="${product.name}"
          loading="lazy">

        ${product.badge
          ? `<span class="product-badge">${product.badge}</span>`
          : ""}

        <button class="quick-add"
          data-quick-add="${product.id}"
          type="button">
          Quick Add +
        </button>
      </a>

      <div class="product-info">
        <span class="product-category">${product.category} / ${product.type}</span>

        <h3 class="product-name">
          <a href="product.html?id=${product.id}">${product.name}</a>
        </h3>

        <p class="product-price">
          ${money(product.price)}
          ${product.oldPrice
            ? `<span class="old-price">${money(product.oldPrice)}</span>`
            : ""}
        </p>
      </div>

    </article>
  `;
}

function renderProductGrid(products, target) {
  const container = $(target);
  if (!container) return;

  container.innerHTML = products.length
    ? products.map(productCard).join("")
    : `<div class="empty-state"><h2>No products found</h2><p>Try changing your filters.</p></div>`;
}


/* =========================================
   CART ACTIONS
========================================= */

function addToCart(id, size = "M", quantity = 1) {
  const product = getProduct(id);

  if (!product) {
    showToast("Product could not be found.");
    return;
  }

  const cart = getCart();

  const existing = cart.find(item =>
    item.id === product.id && item.size === size
  );

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      size,
      quantity
    });
  }

  saveCart(cart);
  showToast(`${product.name} added to your bag.`);
}

function changeCartQuantity(id, size, change) {
  const cart = getCart();

  const item = cart.find(item =>
    item.id === Number(id) && item.size === size
  );

  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    removeCartItem(id, size);
    return;
  }

  saveCart(cart);
  renderCartPage();
}

function removeCartItem(id, size) {
  const cart = getCart().filter(item =>
    !(item.id === Number(id) && item.size === size)
  );

  saveCart(cart);
  renderCartPage();
  showToast("Item removed from your bag.");
}


/* =========================================
   HOME PAGE
========================================= */

function renderHome() {
  const app = $("#app");
  if (!app) return;

  const featured = PRODUCTS.slice(0, 4);

  app.innerHTML = `

    <section class="hero">
      <div class="hero-bg"
        style="background-image:url('https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1800')">
      </div>
      <div class="hero-overlay"></div>

      <div class="hero-content">
        <p class="hero-kicker">THE NEW SEASON — 2026</p>
        <h1>Elegance in<br><em>every detail.</em></h1>
        <p class="hero-description">
          Discover a refined collection of timeless pieces
          designed for the art of modern dressing.
        </p>
        <a href="shop.html" class="btn btn-white">
          Discover the Collection ↗
        </a>
      </div>
    </section>

    <section class="section container">
      <div class="section-head">
        <div>
          <p class="section-kicker">CURATED FOR YOU</p>
          <h2 class="section-title">Explore the collections</h2>
        </div>
        <a href="shop.html" class="text-link">View All Collections ↗</a>
      </div>

      <div class="category-grid">
        <a href="shop.html?category=Women" class="category-card">
          <img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800" alt="Women's collection" loading="lazy">
          <div class="category-caption">
            <span>THE COLLECTION</span>
            <h3>Women</h3>
          </div>
        </a>

        <a href="shop.html?category=Men" class="category-card">
          <img src="https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800" alt="Men's collection" loading="lazy">
          <div class="category-caption">
            <span>REFINED ESSENTIALS</span>
            <h3>Men</h3>
          </div>
        </a>

        <a href="shop.html?sort=newest" class="category-card">
          <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800" alt="New season collection" loading="lazy">
          <div class="category-caption">
            <span>JUST ARRIVED</span>
            <h3>New Season</h3>
          </div>
        </a>
      </div>
    </section>

    <section class="section container">
      <div class="section-head">
        <div>
          <p class="section-kicker">THE EDIT</p>
          <h2 class="section-title">Considered essentials.</h2>
          <p class="section-note">Pieces worth keeping. Designed to be worn beyond the season.</p>
        </div>
        <a href="shop.html" class="text-link">Shop All Pieces ↗</a>
      </div>

      <div class="product-grid" id="featuredProducts"></div>
    </section>

    <section class="container">
      <div class="promo-banner">
        <div class="promo-image">
          <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000" alt="ÉLORA seasonal collection" loading="lazy">
        </div>
        <div class="promo-copy">
          <p class="section-kicker">A DIFFERENT PERSPECTIVE</p>
          <h2>Less, but<br>better.</h2>
          <p>
            We believe in thoughtful design, quality details
            and pieces that become part of your story.
          </p>
          <a href="about.html" class="text-link">Discover Our Story ↗</a>
        </div>
      </div>
    </section>

    <section class="section container">
      <div class="section-head">
        <div>
          <p class="section-kicker">THE ÉLORA SELECTION</p>
          <h2 class="section-title">A wardrobe, reimagined.</h2>
        </div>
      </div>
      <div class="product-grid" id="moreProducts"></div>
    </section>

    <section class="newsletter">
      <p class="section-kicker">STAY IN THE KNOW</p>
      <h2>Letters from ÉLORA.</h2>
      <p>Discover new arrivals, thoughtful edits and exclusive updates.</p>
      <form class="newsletter-form" id="newsletterForm">
        <input type="email" name="email" placeholder="Your email address" required>
        <button type="submit">SUBSCRIBE ↗</button>
      </form>
    </section>
  `;

  renderProductGrid(featured, "#featuredProducts");
  renderProductGrid(PRODUCTS.slice(4, 8), "#moreProducts");
}


/* =========================================
   SHOP PAGE: SEARCH + FILTER + SORT
========================================= */

function renderShop() {
  const app = $("#app");
  if (!app) return;

  const params = new URLSearchParams(location.search);
  const initialCategory = params.get("category") || "All";
  const initialSort = params.get("sort") || "featured";

  app.innerHTML = `
    <section class="container page-banner">
      <p class="breadcrumb">HOME / SHOP</p>
      <h1 class="page-heading">The Collection</h1>
      <p class="page-subtitle">A considered edit of modern wardrobe essentials.</p>
    </section>

    <section class="container shop-layout">

      <aside class="shop-sidebar">
        <h3>Refine Your Edit</h3>

        <div class="filter-group">
          <p class="eyebrow">CATEGORY</p>

          ${["All", "Women", "Men"].map(category => `
            <label class="filter-option">
              <input type="radio" name="category"
                value="${category}"
                ${initialCategory === category ? "checked" : ""}>
              ${category === "All" ? "All Products" : category}
            </label>
          `).join("")}
        </div>

        <div class="filter-group">
          <p class="eyebrow">PRICE RANGE</p>
          <input class="price-input" type="range"
            id="priceFilter" min="5000" max="30000"
            step="1000" value="30000">
          <p id="priceValue" class="section-note">Up to PKR 30,000</p>
        </div>

        <div class="filter-group">
          <p class="eyebrow">SEARCH</p>
          <input class="search-input" id="shopSearch"
            type="search" placeholder="Search pieces...">
        </div>
      </aside>

      <div>
        <div class="shop-toolbar">
          <p id="productCount">All products</p>
          <select id="sortProducts" aria-label="Sort products">
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>

        <div class="product-grid" id="shopProducts"></div>
      </div>

    </section>
  `;

  const sortSelect = $("#sortProducts");
  sortSelect.value = initialSort;

  function applyFilters() {
    const selected = $('input[name="category"]:checked')?.value || "All";
    const maxPrice = Number($("#priceFilter").value);
    const query = $("#shopSearch").value.trim().toLowerCase();
    const sort = sortSelect.value;

    $("#priceValue").textContent = `Up to ${money(maxPrice)}`;

    let results = PRODUCTS.filter(product => {
      const categoryMatch =
        selected === "All" || product.category === selected;

      const priceMatch = product.price <= maxPrice;

      const searchMatch =
        `${product.name} ${product.type} ${product.category}`
          .toLowerCase().includes(query);

      return categoryMatch && priceMatch && searchMatch;
    });

    if (sort === "price-low") results.sort((a, b) => a.price - b.price);
    if (sort === "price-high") results.sort((a, b) => b.price - a.price);
    if (sort === "name") results.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "newest") results.reverse();

    $("#productCount").textContent = `${results.length} pieces found`;
    renderProductGrid(results, "#shopProducts");
  }

  $$('input[name="category"]').forEach(input => {
    input.addEventListener("change", applyFilters);
  });

  $("#priceFilter").addEventListener("input", applyFilters);
  $("#shopSearch").addEventListener("input", applyFilters);
  sortSelect.addEventListener("change", applyFilters);

  applyFilters();
}


/* =========================================
   PRODUCT DETAIL PAGE
========================================= */

let selectedSize = "M";
let selectedQuantity = 1;

function renderProductDetail() {
  const app = $("#app");
  if (!app) return;

  const params = new URLSearchParams(location.search);
  const product = getProduct(params.get("id") || 1);

  if (!product) {
    app.innerHTML = `
      <div class="empty-state">
        <h2>Product not found</h2>
        <a href="shop.html" class="btn btn-dark">Back to Shop</a>
      </div>
    `;
    return;
  }

  selectedSize = product.sizes.includes("M") ? "M" : product.sizes[0];
  selectedQuantity = 1;

  app.innerHTML = `
    <div class="container">
      <p class="breadcrumb" style="margin-top:35px">
        HOME / SHOP / ${product.category.toUpperCase()} / ${product.name.toUpperCase()}
      </p>

      <section class="product-layout">

        <div>
          <div class="gallery-main">
            <img id="mainProductImage"
              src="${product.images[0]}"
              alt="${product.name}">
          </div>

          <div class="gallery-thumbs">
            ${product.images.map((image, index) => `
              <button class="gallery-thumb ${index === 0 ? "active" : ""}"
                data-image="${image}" aria-label="View image ${index + 1}">
                <img src="${image}" alt="${product.name} view ${index + 1}">
              </button>
            `).join("")}
          </div>
        </div>

        <div>
          <p class="product-detail-category">${product.category} / ${product.type}</p>
          <h1 class="product-detail-title">${product.name}</h1>
          <p class="product-detail-price">${money(product.price)}</p>

          <p class="product-detail-description">
            ${product.description}
          </p>

          <span class="option-label">Colour — ${product.color}</span>
          <div class="color-options">
            <span class="color-dot active" style="background:#292821"></span>
            <span class="color-dot" style="background:#d8c9ad"></span>
            <span class="color-dot" style="background:#e7e2d7"></span>
          </div>

          <span class="option-label">Select Size</span>
          <div class="size-options" id="sizeOptions">
            ${product.sizes.map(size => `
              <button class="size-btn ${size === selectedSize ? "active" : ""}"
                data-size="${size}">${size}</button>
            `).join("")}
          </div>

          <span class="option-label">Quantity</span>
          <div class="quantity-row">
            <div class="quantity-control">
              <button id="quantityMinus" aria-label="Decrease quantity">−</button>
              <span id="quantityValue">1</span>
              <button id="quantityPlus" aria-label="Increase quantity">+</button>
            </div>
          </div>

          <button class="add-cart-btn" id="addProductToCart">
            ADD TO SHOPPING BAG — ${money(product.price)}
          </button>

          <div class="product-points">
            ✓ Complimentary delivery above PKR 20,000<br>
            ✓ Secure checkout experience<br>
            ✓ Customer care available for assistance
          </div>
        </div>

      </section>

      <section class="section">
        <div class="section-head">
          <div>
            <p class="section-kicker">COMPLETE THE EDIT</p>
            <h2 class="section-title">You may also like.</h2>
          </div>
        </div>
        <div class="product-grid" id="relatedProducts"></div>
      </section>
    </div>
  `;

  renderProductGrid(
    PRODUCTS.filter(item => item.id !== product.id).slice(0, 4),
    "#relatedProducts"
  );

  $$("[data-image]").forEach(button => {
    button.addEventListener("click", () => {
      $("#mainProductImage").src = button.dataset.image;
      $$(".gallery-thumb").forEach(item => item.classList.remove("active"));
      button.classList.add("active");
    });
  });

  $$("[data-size]").forEach(button => {
    button.addEventListener("click", () => {
      selectedSize = button.dataset.size;
      $$(".size-btn").forEach(item => item.classList.remove("active"));
      button.classList.add("active");
    });
  });

  $("#quantityMinus").addEventListener("click", () => {
    selectedQuantity = Math.max(1, selectedQuantity - 1);
    $("#quantityValue").textContent = selectedQuantity;
  });

  $("#quantityPlus").addEventListener("click", () => {
    selectedQuantity = Math.min(10, selectedQuantity + 1);
    $("#quantityValue").textContent = selectedQuantity;
  });

  $("#addProductToCart").addEventListener("click", () => {
    addToCart(product.id, selectedSize, selectedQuantity);
  });
}


/* =========================================
   CART PAGE
========================================= */

function renderCartPage() {
  const app = $("#app");
  if (!app) return;

  const cart = getCart();

  if (!cart.length) {
    app.innerHTML = `
      <section class="container page-banner">
        <p class="breadcrumb">HOME / SHOPPING BAG</p>
        <h1 class="page-heading">Your Shopping Bag</h1>
      </section>

      <div class="container empty-state">
        <h2>Your bag is waiting.</h2>
        <p>Discover pieces selected for a more considered wardrobe.</p>
        <a href="shop.html" class="btn btn-dark">Explore the Collection ↗</a>
      </div>
    `;
    return;
  }

  const subtotal = cartSubtotal();
  const delivery = subtotal >= 20000 ? 0 : 500;

  app.innerHTML = `
    <section class="container page-banner">
      <p class="breadcrumb">HOME / SHOPPING BAG</p>
      <h1 class="page-heading">Your Shopping Bag</h1>
      <p class="page-subtitle">${cartQuantity()} items in your bag.</p>
    </section>

    <section class="container cart-layout">
      <div>
        ${cart.map(item => {
          const product = getProduct(item.id);
          if (!product) return "";

          return `
            <article class="cart-item">
              <img src="${product.images[0]}" alt="${product.name}">

              <div>
                <span class="product-category">${product.category}</span>
                <h3>${product.name}</h3>
                <p>Size: ${item.size}</p>
                <p>${money(product.price)}</p>

                <div class="quantity-control" style="width:max-content;margin-top:12px">
                  <button data-cart-change="${product.id}|${item.size}|-1">−</button>
                  <span>${item.quantity}</span>
                  <button data-cart-change="${product.id}|${item.size}|1">+</button>
                </div>

                <button class="remove-btn"
                  data-remove="${product.id}|${item.size}">
                  Remove
                </button>
              </div>

              <strong>${money(product.price * item.quantity)}</strong>
            </article>
          `;
        }).join("")}
      </div>

      <aside class="cart-summary">
        <h3>Order Summary</h3>

        <div class="summary-line">
          <span>Subtotal</span><span>${money(subtotal)}</span>
        </div>

        <div class="summary-line">
          <span>Delivery</span>
          <span>${delivery === 0 ? "Complimentary" : money(delivery)}</span>
        </div>

        <div class="summary-line summary-total">
          <span>Total</span><span>${money(subtotal + delivery)}</span>
        </div>

        <a href="checkout.html" class="btn btn-dark full-btn">
          Proceed to Checkout ↗
        </a>

        <a href="shop.html" class="text-link">Continue Shopping</a>
      </aside>
    </section>
  `;

  $$("[data-cart-change]").forEach(button => {
    button.addEventListener("click", () => {
      const [id, size, change] = button.dataset.cartChange.split("|");
      changeCartQuantity(id, size, Number(change));
    });
  });

  $$("[data-remove]").forEach(button => {
    button.addEventListener("click", () => {
      const [id, size] = button.dataset.remove.split("|");
      removeCartItem(id, size);
    });
  });
}


/* =========================================
   CHECKOUT PAGE
========================================= */

function renderCheckout() {
  const app = $("#app");
  if (!app) return;

  const cart = getCart();

  if (!cart.length) {
    app.innerHTML = `
      <div class="container empty-state">
        <h2>Your shopping bag is empty.</h2>
        <a href="shop.html" class="btn btn-dark">Shop Now</a>
      </div>
    `;
    return;
  }

  const subtotal = cartSubtotal();
  const delivery = subtotal >= 20000 ? 0 : 500;
  const total = subtotal + delivery;

  app.innerHTML = `
    <section class="container page-banner">
      <p class="breadcrumb">HOME / SHOPPING BAG / CHECKOUT</p>
      <h1 class="page-heading">Complete Your Order</h1>
      <p class="page-subtitle">Please enter your delivery details below.</p>
    </section>

    <section class="container checkout-layout">

      <form class="checkout-form" id="checkoutForm">

        <h2>Contact Information</h2>
        <div class="form-grid">

          <div class="form-field">
            <label for="firstName">First Name *</label>
            <input id="firstName" name="firstName" required>
          </div>

          <div class="form-field">
            <label for="lastName">Last Name *</label>
            <input id="lastName" name="lastName" required>
          </div>

          <div class="form-field">
            <label for="email">Email Address *</label>
            <input id="email" name="email" type="email" required>
          </div>

          <div class="form-field">
            <label for="phone">Phone Number *</label>
            <input id="phone" name="phone" type="tel" required>
          </div>

          <div class="form-field full">
            <label for="address">Street Address *</label>
            <input id="address" name="address" required>
          </div>

          <div class="form-field">
            <label for="city">City *</label>
            <input id="city" name="city" required>
          </div>

          <div class="form-field">
            <label for="postal">Postal Code</label>
            <input id="postal" name="postal">
          </div>

        </div>

        <h2>Payment Method</h2>

        <label class="payment-option">
          <input type="radio" name="payment" value="Cash on Delivery" checked>
          <span>Cash on Delivery (COD)</span>
        </label>

        <label class="payment-option">
          <input type="radio" name="payment" value="Bank Transfer">
          <span>Bank Transfer — confirmation required</span>
        </label>

        <p class="section-note" style="margin-top:15px">
          Demo checkout only. No payment is collected by this website.
        </p>

        <button type="submit" class="btn btn-dark full-btn">
          Place Demo Order — ${money(total)}
        </button>

      </form>

      <aside class="checkout-summary">
        <h3>Your Order</h3>

        ${cart.map(item => {
          const product = getProduct(item.id);
          if (!product) return "";

          return `
            <div class="checkout-product">
              <img src="${product.images[0]}" alt="${product.name}">
              <div>
                <strong>${product.name}</strong>
                <small>Size ${item.size} · Qty ${item.quantity}</small>
              </div>
              <span>${money(product.price * item.quantity)}</span>
            </div>
          `;
        }).join("")}

        <div class="summary-line">
          <span>Subtotal</span><span>${money(subtotal)}</span>
        </div>

        <div class="summary-line">
          <span>Delivery</span>
          <span>${delivery ? money(delivery) : "Free"}</span>
        </div>

        <div class="summary-line summary-total">
          <span>Total</span><span>${money(total)}</span>
        </div>
      </aside>

    </section>
  `;

  $("#checkoutForm").addEventListener("submit", event => {
    event.preventDefault();

    if (!event.currentTarget.reportValidity()) return;

    const formData = new FormData(event.currentTarget);
    const customer = Object.fromEntries(formData.entries());

    const order = {
      reference: "ELR-" + Date.now().toString().slice(-8),
      customer,
      items: cart,
      total,
      date: new Date().toISOString()
    };

    // Demo order is stored only in this browser.
    localStorage.setItem("elora-last-order", JSON.stringify(order));
    localStorage.removeItem("elora-cart");

    app.innerHTML = `
      <section class="container success-panel">
        <p class="section-kicker">ORDER RECEIVED</p>
        <h1>Thank you for choosing ÉLORA.</h1>
        <p>
          Your demo order reference is
          <strong>${order.reference}</strong>.
          This is a frontend demonstration, not a real submitted order.
        </p>
        <a href="shop.html" class="btn btn-dark">Continue Exploring ↗</a>
      </section>
    `;

    updateCartCount();
  });
}


/* =========================================
   ABOUT PAGE
========================================= */

function renderAbout() {
  const app = $("#app");
  if (!app) return;

  app.innerHTML = `
    <section class="container page-banner">
      <p class="breadcrumb">HOME / OUR STORY</p>
      <h1 class="page-heading">A quieter kind of luxury.</h1>
      <p class="page-subtitle">The philosophy behind ÉLORA.</p>
    </section>

    <section class="container story-grid">
      <img class="story-image"
        src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000"
        alt="ÉLORA fashion editorial">

      <div class="story-copy">
        <p class="section-kicker">OUR PHILOSOPHY</p>
        <h2>Style that speaks without saying too much.</h2>
        <p>
          ÉLORA is a concept fashion label built around the idea
          of considered dressing. We believe clothing should feel
          effortless, expressive and enduring.
        </p>
        <p>
          Our visual language is inspired by understated silhouettes,
          thoughtful details and a modern interpretation of elegance.
        </p>
        <a href="shop.html" class="btn btn-dark">Explore the Collection ↗</a>
      </div>
    </section>

    <section class="newsletter">
      <p class="section-kicker">THE ÉLORA PHILOSOPHY</p>
      <h2>Buy thoughtfully. Wear beautifully.</h2>
      <p>A wardrobe should tell your story, not follow every trend.</p>
      <a href="shop.html" class="btn btn-dark">Discover ÉLORA</a>
    </section>
  `;
}


/* =========================================
   CONTACT PAGE
========================================= */

function renderContact() {
  const app = $("#app");
  if (!app) return;

  app.innerHTML = `
    <section class="container page-banner">
      <p class="breadcrumb">HOME / CONTACT</p>
      <h1 class="page-heading">We would love to hear from you.</h1>
      <p class="page-subtitle">Questions about a collection, order or collaboration?</p>
    </section>

    <section class="container contact-layout">

      <div>
        <p class="section-kicker">CUSTOMER CARE</p>
        <h2>Here to help.</h2>
        <p>
          Our customer care team can assist with product enquiries,
          order questions and general information.
        </p>
        <p style="margin-top:25px">
          <strong>Email</strong><br>
          hello@elora.example
        </p>
        <p style="margin-top:20px">
          <strong>Hours</strong><br>
          Monday – Saturday<br>
          10:00 AM – 6:00 PM
        </p>
      </div>

      <form class="contact-form" id="contactForm">

        <div class="form-field">
          <label for="contactName">Your Name *</label>
          <input id="contactName" name="name" required>
        </div>

        <div class="form-field">
          <label for="contactEmail">Email Address *</label>
          <input id="contactEmail" name="email" type="email" required>
        </div>

        <div class="form-field">
          <label for="contactSubject">Subject</label>
          <input id="contactSubject" name="subject">
        </div>

        <div class="form-field">
          <label for="contactMessage">Message *</label>
          <textarea id="contactMessage" name="message" rows="6" required></textarea>
        </div>

        <button class="btn btn-dark" type="submit">Send Enquiry ↗</button>
      </form>

    </section>
  `;

  $("#contactForm").addEventListener("submit", event => {
    event.preventDefault();

    if (!event.currentTarget.reportValidity()) return;

    showToast("Demo enquiry received. Connect a backend to receive messages.");
    event.currentTarget.reset();
  });
}


/* =========================================
   GLOBAL EVENT DELEGATION
========================================= */

document.addEventListener("click", event => {
  const quickAdd = event.target.closest("[data-quick-add]");

  if (quickAdd) {
    event.preventDefault();
    event.stopPropagation();
    addToCart(quickAdd.dataset.quickAdd, "M", 1);
  }
});

document.addEventListener("submit", event => {
  if (event.target.id === "newsletterForm") {
    event.preventDefault();

    if (!event.target.reportValidity()) return;

    showToast("Thank you for your interest in ÉLORA.");
    event.target.reset();
  }
});


/* =========================================
   INITIALIZE CORRECT PAGE
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  renderSharedLayout();

  const page = document.body.dataset.page;

  const pages = {
    home: renderHome,
    shop: renderShop,
    product: renderProductDetail,
    cart: renderCartPage,
    checkout: renderCheckout,
    about: renderAbout,
    contact: renderContact
  };

  if (pages[page]) {
    pages[page]();
  } else {
    $("#app").innerHTML = `
      <div class="empty-state">
        <h2>Page not found</h2>
        <a href="index.html" class="btn btn-dark">Go Home</a>
      </div>
    `;
  }
});
