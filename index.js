
let searchOpenedHamburger = false;

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const menuOverlay = document.getElementById('menuOverlay');
  const searchBtn = document.getElementById('searchBtn');
  const searchOverlay = document.getElementById('searchOverlay');

  // MENU: Toggle overlay
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();

    const isMenuOpen = menuOverlay.classList.contains('active');
    const isSearchOpen = searchOverlay.classList.contains('active');

if (isSearchOpen) {
  searchOverlay.classList.remove('active');
  document.body.classList.remove('search-active');
  hamburger.classList.remove('active');
  searchOpenedHamburger = false;

  // ✅ Re-show the "Menu" text when search is closed
  const menuText = hamburger.querySelector('.Menu-Text');
  if (menuText) menuText.style.display = 'inline';

  return;
}


    // Toggle menu
    menuOverlay.classList.toggle('active');
    hamburger.classList.toggle('active', menuOverlay.classList.contains('active'));

    // Hide the "Menu" text when clicked
const menuText = hamburger.querySelector('.Menu-Text');
menuText.style.display = menuOverlay.classList.contains('active') ? 'none' : 'inline';

  });

  // SEARCH: Open overlay
  searchBtn.addEventListener('click', () => {
    document.body.classList.add('search-active');
    searchOverlay.classList.add('active');

    // Show X on hamburger when search is active
    hamburger.classList.add('active');
    searchOpenedHamburger = true;

    // Hide menu if it was open
    menuOverlay.classList.remove('active');

     // ✅ Hide "Menu" text when search is opened
  const menuText = hamburger.querySelector('.Menu-Text');
  if (menuText) menuText.style.display = 'none';
  });

  // Clicking a menu link closes menu
  document.querySelectorAll('#menuOverlay a').forEach(link => {
    link.addEventListener('click', () => {
      menuOverlay.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });
}); 

  /*===========================================
     Elementet shfaqen masi tbojsh scroll   
  =============================================*/
          
  const scrollElements = document.querySelectorAll('.hidden-scroll');

  const elementInView = (el, offset = 100) => {
    const elementTop = el.getBoundingClientRect().top;
    return elementTop <= (window.innerHeight - offset);
  };

  const showScrollElement = (element) => {
    element.classList.add('show-on-scroll');
  };

  const hideScrollElement = (element) => {
    element.classList.remove('show-on-scroll');
  };

  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el)) {
        showScrollElement(el);
      } else {
        hideScrollElement(el);
      }
    });
  };

  window.addEventListener('scroll', () => {
    handleScrollAnimation();
  });


  
  //================================
  //           Video 
  //================================




/*===========================
   Hide Cart when clicking search
============================*/
const cartDiv = document.querySelector('.Cart');
const searchOverlay = document.getElementById('searchOverlay');
const observer = new MutationObserver(() => {
  const isVisible = searchOverlay.classList.contains('active');
  cartDiv.style.display = isVisible ? 'none' : 'flex';
});

// Start observing class changes on the search overlay
if (searchOverlay && cartDiv) {
  observer.observe(searchOverlay, { attributes: true, attributeFilter: ['class'] });
}

 function showAddedToCartMessage() {
    const message = document.createElement('div');
    message.textContent = 'Added to Cart';
    message.style.position = 'fixed';
    message.style.top = '20px';
    message.style.right = '20px';
    message.style.backgroundColor = '#d4edda';
    message.style.color = '#155724';
    message.style.padding = '10px 20px';
    message.style.border = '1px solid #c3e6cb';
    message.style.borderRadius = '5px';
    message.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.2)';
    message.style.zIndex = '9999';
    message.style.fontFamily = 'sans-serif';
    message.style.transition = 'opacity 0.3s ease';

    document.body.appendChild(message);

    setTimeout(() => {
      message.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(message);
      }, 300);
    }, 1500);
  }

  function updateCartCount(increment = false) {
    let count = parseInt(localStorage.getItem('cartCount')) || 0;
    if (increment) {
      count++;
      localStorage.setItem('cartCount', count);
      showAddedToCartMessage();
    }
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
      cartCountElement.textContent = count;
      cartCountElement.style.display = count > 0 ? 'inline-block' : 'none';
    }
  }

  // Run on page load to sync cart number
  document.addEventListener('DOMContentLoaded', () => {
    updateCartCount(false);
  });

  // Set up Add to Cart buttons (only if they exist)
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      updateCartCount(true);
    });
  });


  /*=========================
     Cart Overlay
  ==========================*/
document.getElementById('cartBtn').addEventListener('click', () => {
document.getElementById('customCartOverlay').style.display = 'block';
});

document.getElementById('closeCustomCart').addEventListener('click', () => {
  document.getElementById('customCartOverlay').style.display = 'none';
});

function calculateTotals() {
  const items = document.querySelectorAll('.cart-item');
  let subtotal = 0;

  items.forEach(item => {
    subtotal += parseFloat(item.dataset.price);
  });

  const tax = +(subtotal * 0.18).toFixed(2);
  const shipping = subtotal > 100 ? 0 : 5;
  const total = (subtotal + tax + shipping).toFixed(2);

  document.getElementById('customSubtotal').textContent = `${subtotal.toFixed(2)} €`;
  document.getElementById('customTax').textContent = `${tax} €`;
  document.getElementById('customShipping').textContent = `${shipping.toFixed(2)} €`;
  document.getElementById('customTotal').textContent = `${total} €`;
}

// Hook into your existing "Add to Cart"
     const watchData = [
  {
    id: "baume",
    title: "Baume Custom Timepiece Small Second",
    price: "$399.99",
    image: "img/baume.jpg"
  },
  {
    id: "elegant",
    title: "Elegant Chronograph 42mm",
    price: "$449.99",
    image: "img/elegant.jpg"
  },
  {
    id: "midnight",
    title: "Midnight Silver Heritage",
    price: "$499.99",
    image: "img/midnight.jpg"
  }
];

//==================================
//  When we click Add To cart Function
//==================================  
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("add-to-cart")) {
    const productId = e.target.dataset.id;
    const product = watchData.find(p => p.id === productId);

    if (product) {
      const item = {
        id: product.id,
        name: product.title,
        price: parseFloat(product.price.replace("$", "")),
        image: product.image
      };

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(item);
      localStorage.setItem("cart", JSON.stringify(cart));

      updateCustomCartOverlay();
      document.getElementById("customCartOverlay").style.display = "block";
    }
  }
});
function updateCustomCartOverlay() {
  const cartItemsContainer = document.getElementById("customCartItems");
  const subtotalEl = document.getElementById("customSubtotal");
  const taxEl = document.getElementById("customTax");
  const shippingEl = document.getElementById("customShipping");
  const totalEl = document.getElementById("customTotal");

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartItemsContainer.innerHTML = ""; // clear previous content

  let subtotal = 0;

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}" width="60" />
      <div class="item-info">
        <h4>${item.name}</h4>
        <p>${(parseFloat(item.price) || 0).toFixed(2)} €</p>
        <button class="delete-item-btn" data-index="${index}">Fshije</button>
      </div>
    `;

    cartItemsContainer.appendChild(div);
    subtotal += parseFloat(item.price) || 0;
  });

  const tax = +(subtotal * 0.18).toFixed(2);
  const shipping = cart.length > 0 ? 5 : 0;
  const total = (
    (Number(subtotal) || 0) +
    (Number(tax) || 0) +
    (Number(shipping) || 0)
  ).toFixed(2);

  subtotalEl.textContent = `${subtotal.toFixed(2)} €`;
  taxEl.textContent = `${tax.toFixed(2)} €`;
  shippingEl.textContent = `${shipping.toFixed(2)} €`;
  totalEl.textContent = `${total} €`;

  // Add event listeners for delete buttons
  document.querySelectorAll('.delete-item-btn').forEach(button => {
    button.addEventListener('click', function () {
      const index = parseInt(this.dataset.index);
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.splice(index, 1); // remove item from cart
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCustomCartOverlay();
      updateCartCount();
    });
  });
}

// Close cart overlay button
document.getElementById("closeCustomCart").addEventListener("click", () => {
  document.getElementById("customCartOverlay").style.display = "none";
});

// Update cart overlay on page load
document.addEventListener("DOMContentLoaded", updateCustomCartOverlay);



// Rifresko shportën
/*function updateCustomCartOverlay() {
  const cartItemsContainer = document.getElementById("customCartItems");
  const subtotalEl = document.getElementById("customSubtotal");
  const taxEl = document.getElementById("customTax");
  const shippingEl = document.getElementById("customShipping");
  const totalEl = document.getElementById("customTotal");

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartItemsContainer.innerHTML = "";

  let subtotal = 0;

  cart.forEach(item => {
    subtotal += item.price;

    cartItemsContainer.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" width="60" />
        <div>
          <h4>${item.name}</h4>
          <p>${item.price.toFixed(2)} €</p>
        </div>
      </div>
    `;
  });

  const tax = subtotal * 0.18;
  const shipping = cart.length > 0 ? 3.00 : 0.00;
  const total = (
  (Number(subtotal) || 0) +
  (Number(tax) || 0) +
  (Number(shipping) || 0)
).toFixed(2);

  subtotalEl.textContent = subtotal.toFixed(2) + " €";
  taxEl.textContent = tax.toFixed(2) + " €";
  shippingEl.textContent = shipping.toFixed(2) + " €";
  totalEl.textContent = total.toFixed(2) + " €";
}

// Mbyllja e shportës
document.getElementById("closeCustomCart").addEventListener("click", () => {
  document.getElementById("customCartOverlay").style.display = "none";
});

// Me rifresku automatikisht kur hapet faqja
document.addEventListener("DOMContentLoaded", updateCustomCartOverlay);

/*=================================
    Delete button Onn cart
==================================*/
/*function updateCustomCartOverlay() {
  const cartItemsContainer = document.getElementById("customCartItems");
  const subtotalEl = document.getElementById("customSubtotal");
  const taxEl = document.getElementById("customTax");
  const shippingEl = document.getElementById("customShipping");
  const totalEl = document.getElementById("customTotal");

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartItemsContainer.innerHTML = ""; // pastro pamjen

  let subtotal = 0;

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div class="item-info">
        <h4>${item.name}</h4>
      <p>${(parseFloat(item.price) || 0).toFixed(2)} €</p>
        <button class="delete-item-btn" data-index="${index}">Fshije</button>
      </div>
    `;

    cartItemsContainer.appendChild(div);
    subtotal += item.price;
  });

  const tax = +(subtotal * 0.18).toFixed(2);
  const shipping = cart.length > 0 ? 5 : 0;
   const total = (
  (Number(subtotal) || 0) +
  (Number(tax) || 0) +
  (Number(shipping) || 0)
).toFixed(2);

  subtotalEl.textContent = `${subtotal.toFixed(2)} €`;
  taxEl.textContent = `${tax.toFixed(2)} €`;
  shippingEl.textContent = `${shipping.toFixed(2)} €`;
  totalEl.textContent = `${total} €`;

  // Aktivizo funksionin Fshije për secilën orë
  document.querySelectorAll('.delete-item-btn').forEach(button => {
    button.addEventListener('click', function () {
      const index = parseInt(this.dataset.index);
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.splice(index, 1); // largo produktin
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCustomCartOverlay();
      updateCartCount();
    });
  });
}




/*=======================
  Secili Produkt me buttonin e vet Fashije
========================*/

// Përditëso numrin e artikujve në ikonën e shportës
/*function updateCartCountFromStorage() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const count = cart.length;

  const cartCountElement = document.getElementById('cart-count');
  if (cartCountElement) {
    if (count > 0) {
      cartCountElement.textContent = count;
      cartCountElement.style.display = 'inline-block';
    } else {
      cartCountElement.style.display = 'none';
    }
  }
}*/

// Thirret kur faqja hapet
//document.addEventListener('DOMContentLoaded', updateCartCountFromStorage);

// Mundesh me e thirr këtë funksion pas çdo ndryshimi në shportë
// shembull: pas shtimit ose heqjes së një produkti
/*document.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-item-btn")) {
    const index = parseInt(e.target.getAttribute("data-index"), 10);
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (!isNaN(index)) {
      cart.splice(index, 1); // e heq produktin
      localStorage.setItem("cart", JSON.stringify(cart)); // e ruan
      e.target.closest("div").remove(); // e heq nga DOM

      updateCartCountFromStorage(); // rifreskon numrin
    }
  }
});*/


/*================================
     Cart Count Number Section
=================================*/ 
console.log(localStorage);

function getCartItems() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function updateCartCount() {
  const cartItems = getCartItems();
  const count = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    if (count > 0) {
      cartCount.textContent = count;
      cartCount.style.display = "inline-block";
    } else {
      cartCount.textContent = "";
      cartCount.style.display = "none";
    }
  }
}

document.addEventListener("DOMContentLoaded", updateCartCount);


/*======================
  Arrays on console
========================*/
function logCartInfo() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  console.log("📦 Total items in cart:", cart.length);
  console.table(cart); // e tregon listën e produkteve në formë tabele
}
logCartInfo();

/*================================
      Buy watch 
==================================*/
document.getElementById("buyNowBtn").addEventListener("click", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  // Go to buy page
  window.location.href = "buy.html";
});

