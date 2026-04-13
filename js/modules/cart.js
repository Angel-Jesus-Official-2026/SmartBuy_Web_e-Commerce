// =====================================================
// GESTIÓN DEL CARRITO DE COMPRAS
// =====================================================

/**
 * Agrega un producto al carrito o aumenta su cantidad
 * @param {number} productId - ID del producto
 */
function addToCart(productId) {
    const product = window.PRODUCTS_DB.find(p => p.id === productId);
    if (!product) return;

    const existingItem = window.cart.find(item => item.productId === productId);
    if (existingItem) {
        if (existingItem.quantity < 99) existingItem.quantity++;
    } else {
        window.cart.push({ productId, quantity: 1, product });
    }
    updateCartUI();
    if(window.isTTSActive) window.speakText(`${product.name} agregado al carrito`);
}

/**
 * Elimina un producto del carrito completamente
 * @param {number} productId - ID del producto a eliminar
 */
function removeFromCart(productId) {
    window.cart = window.cart.filter(item => item.productId !== productId);
    updateCartUI();
}

/**
 * Actualiza la cantidad de un producto en el carrito
 * @param {number} productId - ID del producto
 * @param {number} quantity - Nueva cantidad
 */
function updateCartQuantity(productId, quantity) {
    const item = window.cart.find(item => item.productId === productId);
    if (item) {
        if (quantity < 1) removeFromCart(productId);
        else if (quantity > 99) item.quantity = 99;
        else item.quantity = quantity;
        updateCartUI();
    }
}

/**
 * Calcula el subtotal del carrito
 * @returns {number} Subtotal en pesos
 */
function calculateCartSubtotal() {
    return window.cart.reduce((total, item) => {
        const price = parseInt(item.product.price.replace(/,/g, ''));
        return total + (price * item.quantity);
    }, 0);
}

/**
 * Calcula el total del carrito con descuentos aplicados
 * @returns {number} Total en pesos
 */
function calculateCartTotal() {
    const subtotal = calculateCartSubtotal();
    const discount = Math.floor(subtotal * (window.discountPercentage / 100));
    return subtotal - discount;
}

/**
 * Aplica un código de descuento al carrito
 * @param {string} code - Código de descuento
 * @returns {boolean} true si el código es válido, false en caso contrario
 */
function applyDiscount(code) {
    if (window.DISCOUNT_CODES[code]) {
        window.discountCode = code;
        window.discountPercentage = window.DISCOUNT_CODES[code];
        updateCartUI();
        if(window.isTTSActive) window.speakText(`Código ${code} aplicado. Descuento de ${window.discountPercentage} por ciento`);
        return true;
    }
    if(window.isTTSActive) window.speakText(`Código inválido`);
    return false;
}

/**
 * Actualiza la interfaz del carrito (contador en header y modal)
 */
function updateCartUI() {
    const count = window.cart.reduce((sum, item) => sum + item.quantity, 0);
    const countElement = document.getElementById('cart-count');
    if (countElement) countElement.textContent = count;
    renderCartModal();
}

/**
 * Abre el modal del carrito
 */
function openCartModal() {
    const modal = document.getElementById('cart-modal');
    if (modal) {
        modal.classList.remove('hidden');
        if(window.isTTSActive) window.speakText('Carrito abierto');
    }
}

/**
 * Cierra el modal del carrito
 */
function closeCartModal() {
    const modal = document.getElementById('cart-modal');
    if (modal) {
        modal.classList.add('hidden');
        if(window.isTTSActive) window.speakText('Carrito cerrado');
    }
}

/**
 * Renderiza el contenido del modal del carrito
 */
function renderCartModal() {
    const itemsContainer = document.getElementById('cart-items');
    if (!itemsContainer) return;

    if (window.cart.length === 0) {
        itemsContainer.innerHTML = `
            <div class="text-center py-12">
                <i data-lucide="shopping-bag" class="w-16 h-16 mx-auto mb-4" style="color: var(--text-muted);" aria-hidden="true"></i>
                <p class="font-bold text-lg" style="color: var(--text-main);" data-speak="Tu carrito está vacío">Tu carrito está vacío</p>
                <p style="color: var(--text-muted);" data-speak="Agrega productos para comenzar a comprar">Agrega productos para comenzar a comprar</p>
            </div>
        `;
        document.getElementById('cart-continue-btn').disabled = true;
        document.getElementById('cart-continue-btn').style.opacity = '0.5';
        renderCartSummary();
        lucide.createIcons();
        return;
    }

    document.getElementById('cart-continue-btn').disabled = false;
    document.getElementById('cart-continue-btn').style.opacity = '1';

    itemsContainer.innerHTML = window.cart.map(item => {
        const price = parseInt(item.product.price.replace(/,/g, ''));
        const subtotal = price * item.quantity;
        return `
            <div class="neo-flat p-3 md:p-4 rounded-2xl flex flex-col sm:flex-row gap-3 md:gap-4">
                <div class="w-16 h-16 sm:w-20 sm:h-20 neo-inset rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center cursor-pointer" onclick="window.openProductModal(${item.productId}); window.closeCartModal();" role="button" tabindex="0">
                    <img src="${item.product.image}" alt="Imagen de ${item.product.name}" class="w-full h-full object-cover">
                </div>
                <div class="flex-1 min-w-0">
                    <h3 class="font-bold text-sm md:text-base truncate" style="color: var(--text-main);">${item.product.name}</h3>
                    <p style="color: var(--accent);" class="font-bold text-sm">$${item.product.price} MXN</p>
                    <div class="flex items-center gap-1 mt-2">
                        <button onclick="window.updateCartQuantity(${item.productId}, ${item.quantity - 1})" class="neo-button w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center font-bold text-xs" style="color: var(--text-main);" aria-label="Disminuir cantidad">
                            <i data-lucide="minus" class="w-3 h-3 md:w-4 md:h-4" aria-hidden="true"></i>
                        </button>
                        <span class="w-6 text-center font-bold text-sm" style="color: var(--text-main);">${item.quantity}</span>
                        <button onclick="window.updateCartQuantity(${item.productId}, ${item.quantity + 1})" class="neo-button w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center font-bold text-xs" style="color: var(--text-main);" aria-label="Aumentar cantidad">
                            <i data-lucide="plus" class="w-3 h-3 md:w-4 md:h-4" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
                <div class="flex items-center justify-between sm:flex-col sm:justify-end sm:gap-2 md:gap-3 flex-shrink-0">
                    <button onclick="window.removeFromCart(${item.productId})" class="neo-button w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center" style="color: var(--text-main);" aria-label="Eliminar producto" data-speak="Eliminar ${item.product.name}">
                        <i data-lucide="trash-2" class="w-3 h-3 md:w-4 md:h-4" aria-hidden="true"></i>
                    </button>
                    <div class="text-right">
                        <p style="color: var(--text-muted);" class="text-xs">Subtotal</p>
                        <p style="color: var(--accent);" class="font-bold text-sm">$${subtotal.toLocaleString()}</p>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    renderCartSummary();
    lucide.createIcons();
}

/**
 * Renderiza el resumen del carrito en el modal
 */
function renderCartSummary() {
    const subtotal = calculateCartSubtotal();
    const discount = Math.floor(subtotal * (window.discountPercentage / 100));
    const total = subtotal - discount;

    const summaryContainer = document.getElementById('cart-summary');
    if (!summaryContainer) return;

    summaryContainer.innerHTML = `
        <div class="space-y-4 py-4 border-t border-gray-300/30">
            <div class="flex justify-between items-center font-medium" style="color: var(--text-muted);">
                <span>Subtotal</span>
                <span>$${subtotal.toLocaleString()} MXN</span>
            </div>
            ${window.discountPercentage > 0 ? `
                <div class="flex justify-between items-center font-medium text-green-600">
                    <span>Descuento (${window.discountPercentage}%)</span>
                    <span>-$${discount.toLocaleString()} MXN</span>
                </div>
            ` : ''}
            <div class="flex justify-between items-end font-bold text-lg" style="color: var(--text-main);">
                <span>Total</span>
                <span style="color: var(--accent);" class="text-2xl">$${total.toLocaleString()} MXN</span>
            </div>
        </div>

        <div class="space-y-3 mt-6">
            <div class="flex gap-2">
                <input type="text" id="discount-code" placeholder="Código de descuento" class="neo-input rounded-xl py-2 px-3 font-medium flex-1" style="color: var(--text-main);">
                <button onclick="
                    const code = document.getElementById('discount-code').value.toUpperCase();
                    if (window.applyDiscount(code)) {
                        document.getElementById('discount-code').value = '';
                        document.getElementById('discount-code').style.borderColor = '#10b981';
                    } else {
                        document.getElementById('discount-code').style.borderColor = '#ef4444';
                        setTimeout(() => {
                            document.getElementById('discount-code').style.borderColor = '';
                        }, 1500);
                    }
                " class="neo-button px-4 rounded-xl font-bold" style="color: var(--text-main);" data-speak="Aplicar código de descuento">
                    Aplicar
                </button>
            </div>
        </div>
    `;
}

// Exportar funciones al objeto window
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.calculateCartSubtotal = calculateCartSubtotal;
window.calculateCartTotal = calculateCartTotal;
window.applyDiscount = applyDiscount;
window.updateCartUI = updateCartUI;
window.openCartModal = openCartModal;
window.closeCartModal = closeCartModal;
window.renderCartModal = renderCartModal;
window.renderCartSummary = renderCartSummary;
