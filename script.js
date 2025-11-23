// بيانات الوجبات
const foods = JSON.parse(localStorage.getItem("foods")) || [
  { id: 1, name: "برجر", price: 1.5, type: "وجبات" },
  { id: 2, name: "ساندويتش", price: 1, type: "وجبات" },
  { id: 3, name: "قهوة", price: 0.5, type: "مشروبات" },
];

localStorage.setItem("foods", JSON.stringify(foods));

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// إضافة للسلة
function addToCart(id) {
  let item = foods.find(f => f.id === id);
  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("تمت الإضافة للسلة");
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
        ${item.name} - ${item.price} ريال
        <button onclick="removeItem(${index})">❌ حذف</button>
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
  alert("✅ تم إرسال طلبك إلى الكافتيريا، استلمه بعد 10 دقائق");
  window.location.href = "index.html";
}

function loadAdminOrders() {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const list = document.getElementById("admin-orders");

  list.innerHTML = "";
  orders.forEach(item => {
    list.innerHTML += `
      <div class="card">
        ${item.name} - ${item.price} ريال
        <select>
          <option>قيد التحضير</option>
          <option>جاهز</option>
          <option>تم الاستلام</option>
        </select>
      </div>
    `;
  });
}

const password = "uni2025";
function loginAdmin() {
  const input = prompt("ادخل كلمة المرور:");
  if(input === password){
    window.location.href = "admin.html";
  } else {
    alert("كلمة المرور خاطئة");
  }
}