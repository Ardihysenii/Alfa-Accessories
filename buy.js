document.addEventListener("DOMContentLoaded", () => {
  const watchSummary = document.getElementById("watchSummary");
  const priceSummary = document.getElementById("priceSummary");
  const confirmationMessage = document.getElementById("confirmationMessage");
  const form = document.getElementById("buyerForm");

  // Merr watch ose shportën (cart)
  const cartJSON = localStorage.getItem("cart");
  const selectedWatchJSON = localStorage.getItem("selectedWatch");

  // Vendosim array e orave për shfaqje dhe llogaritje
  let watchesToShow = [];

  if (cartJSON && JSON.parse(cartJSON).length > 0) {
    watchesToShow = JSON.parse(cartJSON);
  } else if (selectedWatchJSON) {
    watchesToShow = [JSON.parse(selectedWatchJSON)];
  }

  if (watchesToShow.length === 0) {
    watchSummary.innerHTML = "<p>Your cart is empty or no watch selected.</p>";
    priceSummary.innerHTML = "";
    // Nuk kemi më shumë punë nëse nuk ka produkte
    return;
  }
  

  // Pastrojmë për shfaqje
  watchSummary.innerHTML = "";

  let subtotal = 0;
  watchesToShow.forEach(watch => {
    subtotal += parseFloat(watch.price);

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("buy-item");
    itemDiv.innerHTML = `
      <img src="${watch.image}" alt="${watch.name}" width="100" />
      <h4>${watch.name}</h4>
      <p>Price: €${parseFloat(watch.price).toFixed(2)}</p>
      <hr />
    `;
    watchSummary.appendChild(itemDiv);
  });

  const tax = +(subtotal * 0.18).toFixed(2);
  const shipping = 5;
  const total = +(subtotal + tax + shipping).toFixed(2);

  priceSummary.innerHTML = `
    <p><strong>Subtotal:</strong> €${subtotal.toFixed(2)}</p>
    <p><strong>Tax (18%):</strong> €${tax.toFixed(2)}</p>
    <p><strong>Shipping:</strong> €${shipping.toFixed(2)}</p>
    <h3><strong>Total:</strong> €${total.toFixed(2)}</h3>
  `;

  // Funksioni për submit
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Merr cart ose selectedWatch
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
      if (selectedWatchJSON) {
        cart = [JSON.parse(selectedWatchJSON)];
      }
    }

    const buyer = {
      firstName: document.getElementById("firstName").value.trim(),
      lastName: document.getElementById("lastName").value.trim(),
      email: document.getElementById("email").value.trim(),
      address: document.getElementById("address").value.trim(),
      products: cart,
      total: total.toFixed(2),
      date: new Date().toLocaleString(),
    };

    // Merr blerjet e mëparshme nga localStorage
    const purchases = JSON.parse(localStorage.getItem("purchases")) || [];

    // Shto blerjen e re
    purchases.push(buyer);

    // Ruaj në localStorage
    localStorage.setItem("purchases", JSON.stringify(purchases));
    localStorage.setItem("lastPurchase", JSON.stringify(buyer));

    // Pastron cart dhe selectedWatch
    localStorage.removeItem("cart");
    localStorage.removeItem("selectedWatch");

    // Printo në console për debug
    console.log("Purchase saved to localStorage:", buyer);
    console.log("All past purchases:", purchases);

    // Ndryshon UI pasi konfirmohet blerja
    form.style.display = "none";
    watchSummary.style.display = "none";
    priceSummary.style.display = "none";
    confirmationMessage.style.display = "block";
  });
});

// Funksioni për të shkuar në faqen kryesore
document.getElementById('closeBtn').addEventListener('click', function() {
  window.location.href = 'index.html'; // Këtu vendos URL-në e faqes home
});