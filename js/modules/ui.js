// =====================================================
// NAVEGACIÓN SPA (Single Page Application)
// =====================================================

/**
 * Cambia entre vistas (catálogo, configuración, checkout, confirmación)
 * @param {string} viewId - ID de la vista a activar
 */
function switchView(viewId) {
    document.querySelectorAll('.view-section').forEach(section => section.classList.remove('active'));
    const activeView = document.getElementById(viewId);
    if (!activeView) return;

    activeView.classList.add('active');

    const viewTitle = activeView.querySelector('h1');
    if (viewTitle) setTimeout(() => viewTitle.focus(), 50);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Actualizar resumen del checkout cuando se navega a esa vista
    if (viewId === 'checkout') {
        setTimeout(() => window.updateCheckoutSummary(), 100);
    }
}

// Exportar función al objeto window
window.switchView = switchView;
