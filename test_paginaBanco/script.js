var cartItems = [];

function addToCart(productId) {
  var product = {
    id: productId,
    name: getProductById(productId),
    price: productId === 1 ? 10.00 : 15.00,
    quantity: 1
  };
  var existingItem = cartItems.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.push(product);
  }
  updateCart();
}

function removeFromCart(productId) {
  var existingItem = cartItems.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity--;
    if (existingItem.quantity === 0) {
      cartItems = cartItems.filter(item => item.id !== productId);
    }
  }
  updateCart();
}

function getProductById(productId) {
  var productNames = {
    1: "Caderno Tilibra Azul",
    2: "Caderno Tilibra Amarelo"
  };
  return productNames[productId] || "Produto " + productId;
}
function updateCart() {
  var cartItemsElement = document.getElementById("cart-items");
  cartItemsElement.innerHTML = "";

  cartItems.forEach(item => {
    var li = document.createElement("li");
    li.innerText = item.name + " - Quantidade: " + item.quantity;
    cartItemsElement.appendChild(li);
  });
}

function checkout() {
  fetch('/checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cartItems)
  })
    .then(response => {
      if (response.ok) {
        alert("Pedido finalizada! Dados enviados para o servidor.");
        cartItems = [];
        updateCart();
      } else {
        alert("Erro ao finalizar o pedido. Tente novamente mais tarde.");
      }
    })
    .catch(error => {
      console.error('Erro ao finalizar a compra:', error);
      alert("Erro ao finalizar o pedido. Tente novamente mais tarde.");
    });
}
