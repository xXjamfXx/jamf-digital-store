const whatsappNumber = '+573143652462';

async function loadProducts() {
    try {
        const response = await fetch('products.json');
        const data = await response.json();
        return data.products; 
    } catch (error) {
        console.error('Error loading products:', error);
        return [];
    }
}

function filterProducts(category) {
   
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    
  
    event.target.classList.add('active');
    
   
    displayProductsByCategory(category);
}

function displayProductsByCategory(category) {
    loadProducts().then(products => {
        const container = document.getElementById('products-container');
        container.innerHTML = '';

        const filteredProducts = products.filter(product => product.category === category);
        
        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            productCard.innerHTML = `
    <img src="${product.image}" alt="${product.name}" class="product-image">
    <div class="product-name">${product.name}</div>
    <div class="product-price">${product.price}</div>
    <div class="product-description">${product.description}</div> 
    <div class="product-code">Código: ${product.code}</div>
    <button class="whatsapp-button" onclick="buyProduct('${product.name}', '${product.code}')">
        💬 Comprar por WhatsApp
    </button>
`;
            
            container.appendChild(productCard);
        });
    });
}

function buyProduct(productName, productCode) {
    const message = `¡Hola! Me interesa: ${productName} (Código: ${productCode}). ¿Podemos proceder con la compra?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}


document.addEventListener('DOMContentLoaded', function() {
    displayProductsByCategory('soporte');
});



