// =====================================================
// FUNCIONES AUXILIARES (Utils)
// =====================================================

/**
 * Genera un ID único para las órdenes
 * @returns {string} ID único en formato ORD-[timestamp]-[random]
 */
function generateOrderId() {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substr(2, 9).toUpperCase();
    return `ORD-${timestamp}-${random}`;
}

/**
 * Formatea una fecha al formato DD/MM/YYYY HH:MM AM/PM
 * @param {Date} date - Fecha a formatear
 * @returns {string} Fecha formateada
 */
function formatDate(date) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', period: 'short' };
    return date.toLocaleString('es-MX', options);
}

/**
 * Obtiene el nombre legible del método de pago
 * @param {string} method - Código del método de pago
 * @returns {string} Nombre formateado del método
 */
function getPaymentMethodDisplay(method) {
    const methods = {
        'tarjeta': 'Tarjeta de Crédito',
        'paypal': 'PayPal',
        'cripto': 'Criptomoneda',
        'world': 'WORLD',
        'oxxo': 'OXXO Pay',
        'spei': 'Transferencia SPEI',
        'deposito': 'Depósito Bancario'
    };
    return methods[method] || method;
}

/**
 * Extrae detalles específicos del método de pago seleccionado
 * @param {string} method - Código del método de pago
 * @returns {object} Detalles del método de pago
 */
function getPaymentDetails(method) {
    const details = {};
    switch(method) {
        case 'tarjeta':
            const cardNumber = document.getElementById('cardNumber').value || '';
            return {
                method: 'Tarjeta de Crédito',
                last4: cardNumber.slice(-4) || 'XXXX'
            };
        case 'cripto':
            return {
                method: 'Criptomoneda',
                type: document.getElementById('cryptoType').value || 'Bitcoin'
            };
        case 'deposito':
            return {
                method: 'Depósito Bancario',
                bank: document.getElementById('bankSelect').value || 'Por confirmar'
            };
        default:
            return { method: getPaymentMethodDisplay(method) };
    }
}

// Exportar funciones al objeto window
window.generateOrderId = generateOrderId;
window.formatDate = formatDate;
window.getPaymentMethodDisplay = getPaymentMethodDisplay;
window.getPaymentDetails = getPaymentDetails;
