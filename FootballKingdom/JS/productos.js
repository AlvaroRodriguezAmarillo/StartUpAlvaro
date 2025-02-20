document.addEventListener("DOMContentLoaded", function () {
    let selectedSize = null;
    let quantity = 1;

    // Capturar talla seleccionada
    const sizeButtons = document.querySelectorAll(".size-buttons button");
    sizeButtons.forEach(button => {
        button.addEventListener("click", function () {
            // Quitar selección previa
            sizeButtons.forEach(btn => btn.classList.remove("selected"));
            // Marcar la nueva talla
            this.classList.add("selected");
            selectedSize = this.textContent;
        });
    });

    // Capturar cantidad seleccionada (si existe)
    function updateQuantity(value) {
        quantity = Math.max(1, quantity + value);
        const quantityElement = document.getElementById("quantity");
        if (quantityElement) {
            quantityElement.textContent = quantity;
        }
    }

    const decreaseButton = document.querySelector(".quantity-selector button:first-child");
    const increaseButton = document.querySelector(".quantity-selector button:last-child");

    if (decreaseButton && increaseButton) {
        decreaseButton.addEventListener("click", function () {
            updateQuantity(-1);
        });

        increaseButton.addEventListener("click", function () {
            updateQuantity(1);
        });
    }

    // Detectar nombre y precio del producto desde el HTML
    const productNameElement = document.querySelector(".product-info h1");
    const productPriceElement = document.querySelector(".price .new-price");

    if (!productNameElement || !productPriceElement) {
        console.error("Error: No se encontró el nombre o el precio del producto.");
        return;
    }

    const productName = productNameElement.textContent.trim();
    const productPrice = parseFloat(productPriceElement.textContent.replace("€", "").replace(",", "."));

    // Evento para añadir al carrito
    document.querySelector(".add-to-cart").addEventListener("click", function () {
        if (!selectedSize) {
            alert("Por favor, selecciona una talla.");
            return;
        }

        // Verificar si el producto es personalizable
        const nameInput = document.querySelector(".name-input");
        const numberInput = document.querySelector(".dorsal-input");

        let product = {
            name: productName,
            size: selectedSize,
            quantity: quantity,
            price: productPrice.toFixed(2) // Asegurar dos decimales
        };

        // Si hay campos de personalización, agregarlos al producto
        if (nameInput && numberInput) {
            const playerName = nameInput.value.trim();
            const playerNumber = numberInput.value.trim();

            if (!playerName || !playerNumber) {
                alert("Por favor, ingresa un nombre y un dorsal.");
                return;
            }

            product.customName = playerName;
            product.customNumber = playerNumber;
        }

        // Guardar en localStorage
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));

        // Redirigir al carrito
        window.location.href = "carrito.html";
    });
});
