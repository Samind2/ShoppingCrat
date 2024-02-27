const cart = {};

document.querySelectorAll(".order-button").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.getAttribute("data-product-id");
    const price = parseFloat(button.getAttribute("data-price"));
    const productName = button.parentElement.querySelector("h3").textContent;

    if (!cart[productId]) {
      cart[productId] = {
        quantity: 1,
        price: price,
        name: productName,
      };
    } else {
      cart[productId].quantity++;
    }
    updateCartDisplay();
  });
});

function updateCartDisplay() {
  const orderItemsElement = document.querySelector(".order-items");
  const orderTotalElement = document.getElementById("order-total");
  orderItemsElement.innerHTML = "";

  let totalPrice = 0;
  for (const productId in cart) {
    const item = cart[productId];
    const itemTotalPrice = item.quantity * item.price;
    totalPrice += itemTotalPrice;

    const orderItemElement = document
      .getElementById("order-item-template")
      .cloneNode(true);
    orderItemElement.removeAttribute("id");
    orderItemElement.style.display = "block";
    orderItemElement.querySelector(".item-name").textContent = item.name;
    orderItemElement.querySelector(".item-quantity").textContent =
      item.quantity;
    orderItemElement.querySelector(".item-price").textContent = item.price;
    orderItemsElement.appendChild(orderItemElement);
  }

  orderTotalElement.textContent = totalPrice;
}

document.getElementById("checkout-button").addEventListener("click", () => {
  alert("Thank you for your order!");
  cart = {};
  updateCartDisplay();
});
