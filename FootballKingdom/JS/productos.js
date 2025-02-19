document.addEventListener("DOMContentLoaded", function () {
    let selectedSize = null;
    let quantity = 1;

    // Capturar talla seleccionada
    document.querySelectorAll(".size-buttons button").forEach(button => {
        button.addEventListener("click", function () {
            document.querySelectorAll(".size-buttons button").forEach(btn => btn.classList.remove("selected"));
            this.classList.add("selected");
            selectedSize = this.textContent;
        });
    });

    // Capturar cantidad seleccionada
    function updateQuantity(value) {
        quantity = Math.max(1, quantity + value);
        document.getElementById("quantity").textContent = quantity;
    }

    document.querySelector(".quantity-selector button:first-child").addEventListener("click", function () {
        updateQuantity(-1);
    });

    document.querySelector(".quantity-selector button:last-child").addEventListener("click", function () {
        updateQuantity(1);
    });

    // Detectar nombre y precio del producto desde el HTML
    const productName = document.querySelector(".product-info h1").textContent.trim();
    const productPrice = parseFloat(document.querySelector(".price .new-price").textContent.replace("€", "").replace(",", "."));

    // Agregar al carrito
    document.querySelector(".add-to-cart").addEventListener("click", function () {
        if (!selectedSize) {
            alert("Por favor, selecciona una talla.");
            return;
        }

        const product = {
            name: productName,
            size: selectedSize,
            quantity: quantity,
            price: productPrice.toFixed(2) // Asegurar dos decimales
        };

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));

        window.location.href = "carrito.html";
    });
});
