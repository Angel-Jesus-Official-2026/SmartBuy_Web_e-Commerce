// =====================================================
// GESTIÓN DE CHECKOUT Y ÓRDENES
// =====================================================

/**
 * Actualiza el resumen de compra en la vista de checkout
 */
function updateCheckoutSummary() {
    const itemsList = document.getElementById('checkout-items-list');
    const subtotalSpan = document.getElementById('checkout-subtotal');
    const totalSpan = document.getElementById('checkout-total');
    const discountLine = document.getElementById('checkout-discount-line');
    const discountAmount = document.getElementById('checkout-discount-amount');

    if (!itemsList) return;

    // Mostrar items del carrito
    if (window.cart.length === 0) {
        itemsList.innerHTML = '<p style="color: var(--text-muted);" class="text-sm">No hay items en el carrito</p>';
        subtotalSpan.textContent = '$0 MXN';
        totalSpan.textContent = '$0 MXN';
        discountLine.classList.add('hidden');
    } else {
        itemsList.innerHTML = window.cart.map(item => `
            <div class="flex justify-between items-center py-2" style="color: var(--text-muted);" class="text-sm">
                <span>${item.quantity}x ${item.product.name}</span>
                <span>$${(parseInt(item.product.price.replace(/,/g, '')) * item.quantity).toLocaleString()}</span>
            </div>
        `).join('');

        const subtotal = window.calculateCartSubtotal();
        const discount = Math.floor(subtotal * (window.discountPercentage / 100));
        const total = subtotal - discount;

        subtotalSpan.textContent = '$' + subtotal.toLocaleString() + ' MXN';
        totalSpan.textContent = '$' + total.toLocaleString() + ' MXN';

        if (window.discountPercentage > 0) {
            discountLine.classList.remove('hidden');
            discountAmount.textContent = '-$' + discount.toLocaleString() + ' MXN';
        } else {
            discountLine.classList.add('hidden');
        }
    }
}

/**
 * Muestra u oculta los detalles de pago según el método seleccionado
 */
function togglePaymentDetails() {
    const method = document.querySelector('input[name="payment"]:checked').value;

    document.querySelectorAll('.payment-detail-block').forEach(el => {
        el.classList.add('hidden-detail');
        el.querySelectorAll('.req-input').forEach(input => input.removeAttribute('required'));
    });

    const activeBlock = document.getElementById(`details-${method}`);
    if(activeBlock) {
        activeBlock.classList.remove('hidden-detail');
        activeBlock.querySelectorAll('.req-input').forEach(input => input.setAttribute('required', 'true'));
    }

    if(window.isTTSActive) {
        window.speakText(`Has seleccionado el método de pago: ${method}`);
    }
}

/**
 * Renderiza el resumen de la orden en la página de confirmación
 */
function renderOrderSummary() {
    if (!window.currentOrder) return;

    const summaryDiv = document.getElementById('order-summary-display');
    if (!summaryDiv) return;

    summaryDiv.innerHTML = `
        <div class="neo-flat p-6 md:p-8 rounded-[2rem] space-y-6">
            <div class="text-center">
                <p class="text-sm font-bold" style="color: var(--text-muted);" data-speak="Número de orden">Número de Orden</p>
                <p class="text-2xl font-bold" style="color: var(--accent);" data-speak="${window.currentOrder.orderId}">${window.currentOrder.orderId}</p>
                <p class="text-sm mt-2" style="color: var(--text-muted);" data-speak="${window.currentOrder.timestamp}">${window.currentOrder.timestamp}</p>
            </div>

            <div class="border-t border-b border-gray-300 py-4 space-y-3">
                <h3 class="font-bold text-lg" style="color: var(--text-main);" data-speak="Datos de envío">Datos de Envío</h3>
                <div style="color: var(--text-muted);">
                    <p class="font-bold" style="color: var(--text-main);" data-speak="${window.currentOrder.customer.name}">${window.currentOrder.customer.name}</p>
                    <p class="text-sm mt-1 whitespace-pre-wrap" data-speak="${window.currentOrder.customer.address}">${window.currentOrder.customer.address}</p>
                </div>
            </div>

            <div class="border-b border-gray-300 pb-4">
                <h3 class="font-bold text-lg mb-3" style="color: var(--text-main);" data-speak="Resumen de compra">Resumen de Compra</h3>
                <div class="space-y-2 text-sm" style="color: var(--text-muted);">
                    ${window.currentOrder.items.map(item => `
                        <div class="flex justify-between items-center" data-speak="${item.name} cantidad ${item.quantity} precio ${item.price}">
                            <span>${item.quantity}x ${item.name}</span>
                            <span class="font-bold">$${(parseInt(item.price.replace(/,/g, '')) * item.quantity).toLocaleString()}</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="space-y-2">
                <div class="flex justify-between items-center" style="color: var(--text-muted);">
                    <span data-speak="Subtotal">Subtotal</span>
                    <span>$${window.currentOrder.totals.subtotal.toLocaleString()} MXN</span>
                </div>
                <div class="flex justify-between items-center" style="color: var(--text-muted);">
                    <span data-speak="Envío Gratis">Envío</span>
                    <span data-speak="Gratis">Gratis</span>
                </div>
                ${window.currentOrder.totals.discountPercentage > 0 ? `
                    <div class="flex justify-between items-center text-green-600" data-speak="Descuento">
                        <span data-speak="Descuento ${window.currentOrder.totals.discountPercentage} por ciento">Descuento (${window.currentOrder.totals.discountPercentage}%)</span>
                        <span>-$${window.currentOrder.totals.discount.toLocaleString()} MXN</span>
                    </div>
                ` : ''}
                <div class="flex justify-between items-center font-bold text-lg border-t border-gray-300 pt-2" style="color: var(--text-main);">
                    <span data-speak="Total">Total</span>
                    <span style="color: var(--accent);" data-speak="$${window.currentOrder.totals.total} MXN">$${window.currentOrder.totals.total.toLocaleString()} MXN</span>
                </div>
            </div>

            <div class="border-t border-gray-300 pt-4">
                <h3 class="font-bold text-lg mb-2" style="color: var(--text-main);" data-speak="Método de pago">Método de Pago</h3>
                <p style="color: var(--text-muted);" data-speak="${window.currentOrder.payment.method}">${window.currentOrder.payment.method}</p>
            </div>

            <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                <p class="font-bold text-blue-900 text-sm" data-speak="Tu pedido será entregado en 3 a 5 días hábiles">Tu pedido será entregado en 3 a 5 días hábiles</p>
                <p class="text-xs text-blue-700 mt-2" data-speak="Recibirás un email de confirmación y el número de rastreo">Te enviaremos un email de confirmación con el número de rastreo</p>
            </div>
        </div>
    `;

    // Actualizar visualizador del recibo
    window.updateReceiptViewer();
}

/**
 * Actualiza el contenido del recibo HTML (versión para visualizar/imprimir)
 */
function updateReceiptViewer() {
    if (!window.currentOrder) return;

    // Llenar año dinámicamente
    const year = new Date().getFullYear();
    const yearElement = document.getElementById('receipt-year');
    if (yearElement) {
        yearElement.textContent = year;
    }

    // Llenar datos básicos del recibo
    document.getElementById('receipt-order-id').textContent = window.currentOrder.orderId;
    document.getElementById('receipt-order-date').textContent = window.currentOrder.timestamp;
    document.getElementById('receipt-customer-name').textContent = window.currentOrder.customer.name;
    document.getElementById('receipt-customer-address').textContent = window.currentOrder.customer.address;

    // Llenar items con mejor formato
    const itemsList = window.currentOrder.items.map(item => {
        const itemTotal = parseInt(item.price.replace(/,/g, '')) * item.quantity;
        return `<div class="flex justify-between items-start border-b pb-2 mb-2">
            <div>
                <p class="font-semibold">${item.quantity}x ${item.name}</p>
                <p class="text-xs" style="color: var(--text-muted);">$${item.price} MXN c/u</p>
            </div>
            <p class="font-bold">$${itemTotal.toLocaleString()} MXN</p>
        </div>`;
    }).join('');
    document.getElementById('receipt-items-list').innerHTML = itemsList;

    // Llenar totales
    document.getElementById('receipt-subtotal').textContent = '$' + window.currentOrder.totals.subtotal.toLocaleString() + ' MXN';
    document.getElementById('receipt-total').textContent = '$' + window.currentOrder.totals.total.toLocaleString() + ' MXN';

    // Mostrar descuento si aplica
    const discountLine = document.getElementById('receipt-discount-line');
    if (window.currentOrder.totals.discountPercentage > 0) {
        discountLine.classList.remove('hidden');
        document.getElementById('receipt-discount-amount').textContent = '-$' + window.currentOrder.totals.discount.toLocaleString() + ' MXN (' + window.currentOrder.totals.discountPercentage + '% off)';
    } else {
        discountLine.classList.add('hidden');
    }

    // Llenar método de pago
    document.getElementById('receipt-payment-method').textContent = window.currentOrder.payment.method;
}

/**
 * Maneja el envío del formulario de checkout
 * @param {Event} event - Evento del formulario
 */
function handleCheckoutSubmit(event) {
    event.preventDefault();

    // Validar que el carrito no esté vacío
    if (window.cart.length === 0) {
        alert('Tu carrito está vacío. Agrega productos para continuar.');
        window.switchView('catalog');
        return;
    }

    if (!event.target.checkValidity()) {
        event.target.reportValidity();
        return;
    }

    // CAPTURAR DATOS DEL PEDIDO ANTES DE LIMPIAR CARRITO
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    const orderData = {
        orderId: window.generateOrderId(),
        timestamp: window.formatDate(new Date()),
        customer: {
            name: document.getElementById('fullName').value,
            address: document.getElementById('address').value
        },
        items: window.cart.map(item => ({
            productId: item.productId,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            subtotal: parseInt(item.product.price.replace(/,/g, '')) * item.quantity
        })),
        payment: {
            method: window.getPaymentMethodDisplay(paymentMethod),
            details: window.getPaymentDetails(paymentMethod)
        },
        totals: {
            subtotal: window.calculateCartSubtotal(),
            discount: Math.floor(window.calculateCartSubtotal() * (window.discountPercentage / 100)),
            discountCode: window.discountCode || 'N/A',
            discountPercentage: window.discountPercentage,
            total: window.calculateCartTotal(),
            shippingCost: 0
        }
    };

    // Guardar orden actual
    window.currentOrder = orderData;

    // LUEGO limpiar carrito
    window.cart = [];
    window.discountPercentage = 0;
    window.discountCode = '';
    window.updateCartUI();

    // Renderizar resumen y navegar
    setTimeout(() => {
        window.renderOrderSummary();
        window.switchView('confirmation');
    }, 50);

    event.target.reset();
}

/**
 * Descarga el recibo como PDF
 */
function downloadPDF() {
    if (!window.currentOrder) {
        alert('No hay orden para descargar');
        return;
    }

    const element = document.getElementById('receipt-viewer');
    const opt = {
        margin: 10,
        filename: `recibo-${window.currentOrder.orderId}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
    };
    html2pdf().set(opt).from(element).save();
}

// Event listener para inicializar detalles de pago al cargar
document.addEventListener('DOMContentLoaded', togglePaymentDetails);

// Exportar funciones al objeto window
window.updateCheckoutSummary = updateCheckoutSummary;
window.togglePaymentDetails = togglePaymentDetails;
window.renderOrderSummary = renderOrderSummary;
window.updateReceiptViewer = updateReceiptViewer;
window.handleCheckoutSubmit = handleCheckoutSubmit;
window.downloadPDF = downloadPDF;
