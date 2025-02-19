document.addEventListener("DOMContentLoaded", function () {
    const cartItemsContainer = document.getElementById("cart-items");
    const subtotalElement = document.getElementById("subtotal");
    const totalElement = document.getElementById("total");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function renderCart() {
        cartItemsContainer.innerHTML = "";
        let subtotal = 0;

        cart.forEach((item, index) => {
            const itemElement = document.createElement("div");
            itemElement.classList.add("cart-item");
            itemElement.innerHTML = `
                <span>${item.name}</span>
                <span>${item.size}</span>
                <span>${item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}€</span>
                <button class="remove-item" data-index="${index}">Eliminar del carrito</button>
            `;
            cartItemsContainer.appendChild(itemElement);
            subtotal += item.price * item.quantity;
        });

        subtotalElement.textContent = `${subtotal.toFixed(2)}€`;
        totalElement.textContent = `${subtotal.toFixed(2)}€`;
    }

    // Eliminar producto del carrito
    cartItemsContainer.addEventListener("click", function (e) {
        if (e.target.classList.contains("remove-item")) {
            const index = e.target.getAttribute("data-index");
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
        }
    });

    renderCart();
});
