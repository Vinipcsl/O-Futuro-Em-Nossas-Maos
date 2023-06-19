var cartItems = [];

function addToCart(productId) {
  var product = {
    id: productId,
    name: getProductById(productId),
    quantity: 1,
    id_produtos: document.querySelector(`[data-id-produtos="${productId}"]`).dataset.idProdutos
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
    1: "Caderno Tilibra Azul 1",
    2: "Caderno Tilibra Amarelo 2",
    3: "Caderno Tilibra Azul 3",
    4: "Caderno Tilibra Amarelo 4"
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

function insertPedido(quantidade, id_produtos) {
  const id_pedidos = generateRandomId();

  const data = {
    id_pedidos: id_pedidos,
    quantidade: quantidade,
    id_produtos: id_produtos
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  fetch('http://localhost:3000/produtos', options)
    .then(response => response.json())
    .then(data => console.log('Pedido inserido com sucesso!', data))
    .catch(error => console.error('Erro ao inserir o pedido:', error));
}

function generateRandomId() {
  return Math.floor(Math.random() * 1000);
}

function checkout() {
  if (cartItems.length === 0) {
    showMessage("Seu carrinho está vazio!");
    return;
  }

  cartItems.forEach(item => {
    var quantidade = item.quantity;
    var id_produtos = item.id_produtos;

    insertPedido(quantidade, id_produtos);
  });

  cartItems = [];
  updateCart();
  showMessage("Pedido finalizado com sucesso!");
}

function showMessage(message) {
  var messageElement = document.getElementById("checkout-message");
  messageElement.innerText = message;
}
