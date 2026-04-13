// =====================================================
// GESTIÓN DE PRODUCTOS Y MODAL
// =====================================================

let currentProductId = 0;
let previousFocusElement = null;

/**
 * Renderiza la grilla de productos en la página
 */
function renderProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    grid.innerHTML = '';

    window.PRODUCTS_DB.forEach(product => {
        const li = document.createElement('li');
        li.className = 'neo-flat rounded-[2rem] p-5 md:p-6 flex flex-col gap-5 group';
        li.innerHTML = `
            <div class="w-full h-48 md:h-64 neo-inset rounded-3xl p-3 md:p-4 overflow-hidden flex items-center justify-center cursor-pointer" onclick="window.openProductModal(${product.id})" aria-label="Ver detalles de ${product.name}" role="button" tabindex="0" onkeypress="if(event.key === 'Enter') window.openProductModal(${product.id})">
                <img src="${product.image}" alt="Imagen de ${product.name}" class="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500">
            </div>
            <div class="flex-1 flex flex-col">
                <h2 class="text-xl md:text-2xl font-bold leading-tight" style="color: var(--text-main);" data-speak="Producto: ${product.name}">${product.name}</h2>
                <p class="text-2xl md:text-3xl font-black mt-2 mb-3" style="color: var(--accent);" aria-label="Precio: ${product.price} pesos" data-speak="Precio: ${product.price} pesos">$${product.price} MXN</p>
                <p class="font-medium text-sm md:text-base leading-relaxed mb-6 flex-1" style="color: var(--text-muted);" data-speak="${product.description}">${product.description}</p>
                <div class="flex flex-col sm:flex-row gap-3 md:gap-4 mt-auto">
                    <button class="neo-button flex-1 py-3 md:py-4 rounded-2xl font-bold flex items-center justify-center" style="color: var(--text-main);" onclick="window.openProductModal(${product.id})" aria-label="Ver detalles" data-speak="Ver detalles de ${product.name}">Detalles</button>
                    <button class="neo-button neo-button-primary flex-1 py-3 md:py-4 rounded-2xl font-bold flex items-center justify-center gap-2" onclick="window.addToCart(${product.id}); window.openCartModal();" aria-label="Comprar ${product.name}" data-speak="Comprar ${product.name}">
                        <i data-lucide="shopping-cart" class="w-5 h-5" aria-hidden="true"></i> Comprar
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(li);
    });

    lucide.createIcons();
}

/**
 * Abre el modal de detalles del producto
 * @param {number} productId - ID del producto a mostrar
 */
function openProductModal(productId) {
    const product = window.PRODUCTS_DB.find(p => p.id === productId);
    if (product) {
        currentProductId = productId;
        previousFocusElement = document.activeElement;

        const modal = document.getElementById('product-modal');
        document.getElementById('modal-product-image').src = product.image;
        document.getElementById('modal-product-image').alt = `Imagen ampliada de ${product.name}`;
        document.getElementById('modal-product-name').textContent = product.name;
        document.getElementById('modal-product-price').textContent = `$${product.price} MXN`;
        document.getElementById('modal-product-description').textContent = product.fullDescription;

        document.getElementById('modal-product-name').setAttribute('data-speak', product.name);
        document.getElementById('modal-product-price').setAttribute('data-speak', `Precio: ${product.price} pesos`);
        document.getElementById('modal-product-description').setAttribute('data-speak', product.fullDescription);

        modal.classList.remove('hidden');

        if(window.isTTSActive) window.speakText(`Modal de detalles abierto para ${product.name}`);

        setTimeout(() => document.getElementById('modal-product-name').focus(), 50);
    }
}

/**
 * Cierra el modal de detalles del producto
 */
function closeProductModal() {
    const modal = document.getElementById('product-modal');
    modal.classList.add('hidden');
    if (previousFocusElement) previousFocusElement.focus();
    if(window.isTTSActive) window.speakText(`Regresando al catálogo`);
}

/**
 * Maneja la tecla ESCAPE para cerrar modales
 */
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('product-modal');
    if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
        closeProductModal();
    }
});

// Exportar funciones al objeto window
window.renderProducts = renderProducts;
window.openProductModal = openProductModal;
window.closeProductModal = closeProductModal;
window.currentProductId = currentProductId;
