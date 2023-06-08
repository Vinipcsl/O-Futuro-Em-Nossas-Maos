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

function checkout() {
  
  if (cartItems.length === 0) {
    showMessage("Seu carrinho está vazio!");
    return;
  }

  //Envia os dados do carrinho para o banco de dados
  cartItems.forEach(item => {
    var id_pedido = item.id;
    var quantidade = item.quantity;
    var produto = item.name;

    //Chama a função insertPedido() para inserir o pedido no banco de dados
    insertPedido(id_pedido, quantidade, produto);
  });

  //limpar o carrinho
  cartItems = [];
  updateCart();
  showMessage("Pedido finalizado com sucesso!");
}

function showMessage(message) {
  var messageElement = document.getElementById("checkout-message");
  messageElement.innerText = message;
}
