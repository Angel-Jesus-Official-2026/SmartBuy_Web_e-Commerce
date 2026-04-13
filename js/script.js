// =====================================================
// SCRIPT PRINCIPAL - PUNTO DE ENTRADA
// =====================================================

/**
 * Inicializa la aplicación cuando el DOM está listo
 */
function initializeApp() {
    // Crear iconos de Lucide
    lucide.createIcons();

    // Actualizar año en footer
    document.getElementById('copyright-year').innerHTML = '&copy; ' + new Date().getFullYear();

    // Renderizar productos
    window.renderProducts();

    // Inicializar detalles de pago
    window.togglePaymentDetails();
}

// Esperar a que el DOM esté completamente cargado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
