const whatsappNumber = '+573143652462';

async function loadProducts() {
    try {
        const response = await fetch('products.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading products:', error);
        return {
            windows: [],
            office: [],
            antivirus: []
        };
    }
}

function displayProducts(products, category) {
    const container = document.getElementById('products-container');
    container.innerHTML = '';

    products[category].forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
    <img src="${product.imagen}" alt="${product.nombre}" class="product-image">
    <div class="product-name">${product.nombre}</div>
    <div class="product-price">${product.precio}</div>
    <div class="product-code">Código: ${product.codigo}</div>
    <button class="whatsapp-button" onclick="buyProduct('${product.nombre}', '${product.codigo}')">
        💬 Comprar por WhatsApp
    </button>
`;
        
        container.appendChild(productCard);
    });
}

function buyProduct(productName, productCode) {
    const message = `¡Hola! Me interesa: ${productName} (Código: ${productCode}). ¿Podemos proceder con la compra?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

// Inicializar pestañas
document.addEventListener('DOMContentLoaded', async function() {
    const products = await loadProducts();
    
    // Mostrar Windows por defecto
    displayProducts(products, 'windows');
    
    // Configurar botones de pestañas
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase active de todos los botones
            document.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            // Mostrar productos de la categoría seleccionada
            const category = this.getAttribute('data-category');
            displayProducts(products, category);
        });
    });

});
