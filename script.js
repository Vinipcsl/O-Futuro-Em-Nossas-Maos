var cartItems = [];

function addToCart(productId) {
    var product = {
        id: productId,
        name: "Produto " + productId,
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
    alert("Compra finalizada! Dados enviados para o servidor.");
    cartItems = [];
    updateCart();
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
                alert("Compra finalizada! Dados enviados para o servidor.");
                cartItems = [];
                updateCart();
            } else {
                alert("Erro ao finalizar a compra. Tente novamente mais tarde.");
            }
        })
        .catch(error => {
            console.error('Erro ao finalizar a compra:', error);
            alert("Erro ao finalizar a compra. Tente novamente mais tarde.");
        });
}
