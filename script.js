// meals and drinks details
const foods = JSON.parse(localStorage.getItem("foods")) || [
  { id: 1, name: "Beef Burgrt", price: 1.5, type: "meal" },
  { id: 2, name: "Chicken Burger", price: 1.5, type: "meal" },
  { id: 3, name: "Beef Shawarma", price: 1.0, type: "meal" },
  { id: 4, name: "Chicken Shawarma", price: 1.0, type: "meal" },
  { id: 5, name: "Fries", price: 0.7, type: "meal" },
  { id: 6, name: "Salad", price: 0.5, type: "meal" },
  { id: 7, name: "Orange juice", price: 1.2, type: "drink" },
  { id: 8, name: "Mango juice", price: 1.2, type: "drink" },
  { id: 9, name: "Tea", price: 0.1, type: "drink" },
  { id: 10, name: "Black coffee", price: 1.0, type: "drink" },
];

localStorage.setItem("foods", JSON.stringify(foods));

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// add to cart
function addToCart(id) {
  let item = foods.find(f => f.id === id);
  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
}

function loadCart() {
  const list = document.getElementById("cart-items");
  const total = document.getElementById("total");
  let sum = 0;
  list.innerHTML = "";

  cart.forEach((item, index) => {
    sum += item.price;
    list.innerHTML += `
      <div class="card">
        ${item.name} - ${item.price} O.R
        <button onclick="removeItem(${index})">❌drop</button>
      </div>
    `;
  });
  total.innerText = sum;
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function confirmOrder() {
  localStorage.setItem("orders", JSON.stringify(cart));
  localStorage.removeItem("cart");
  alert("✅ your order has been sent, please pick up in 10 minutes");
  window.location.href = "index.html";
}

function loadAdminOrders() {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const list = document.getElementById("admin-orders");

  list.innerHTML = "";
  orders.forEach(item => {
    list.innerHTML += `
      <div class="card">
        ${item.name} - ${item.price} O.R
        <select>
          <option>under preparation</option>
          <option>ready</option>
          <option> received, thank you</option>
        </select>
      </div>
    `;
  });
}

const password = "uni2025";
function loginAdmin() {
  const input = prompt("enter the password:");
  if(input === password){
    window.location.href = "admin.html";
  } else {
    alert("incorrect password");
  }
}
