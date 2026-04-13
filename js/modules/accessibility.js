// =====================================================
// LÓGICA DE ACCESIBILIDAD Y AJUSTES
// =====================================================

// Variables de estado TTS
let synth = window.speechSynthesis;
let activeUtterance = null;

/**
 * Activa/desactiva el tema de alto contraste
 */
function toggleHighContrast() {
    const isHighContrast = document.getElementById('toggle-contrast').checked;
    if (isHighContrast) document.body.classList.add('high-contrast');
    else document.body.classList.remove('high-contrast');
}

/**
 * Activa/desactiva la fuente para dislexia
 */
function toggleDyslexicFont() {
    const isDyslexic = document.getElementById('toggle-dyslexia').checked;
    if (isDyslexic) document.body.classList.add('dyslexic-font');
    else document.body.classList.remove('dyslexic-font');
}

/**
 * Ajusta el tamaño global del texto
 * @param {number} step - Incremento en pasos de 2px (positivo para agrandar, negativo para achiquitar)
 */
function adjustTextSize(step) {
    window.currentSize += (step * 2);
    if (window.currentSize < 12) window.currentSize = 12;
    if (window.currentSize > 26) window.currentSize = 26;

    document.documentElement.style.setProperty('--base-font-size', `${window.currentSize}px`);
    if (window.isTTSActive) window.speakText(`Tamaño de texto ajustado`);
}

/**
 * Activa/desactiva el lector de voz (TTS - Text-to-Speech)
 */
function toggleTTS() {
    window.isTTSActive = document.getElementById('toggle-tts').checked;
    const banner = document.getElementById('tts-active-banner');

    if (window.isTTSActive) {
        banner.classList.remove('hidden');
        window.speakText("Lector de voz activado. Navegue por los elementos para escucharlos.");
    } else {
        banner.classList.add('hidden');
        if (synth.speaking) synth.cancel();
    }
}

/**
 * Sintetiza y reproduce el texto usando Web Speech API
 * @param {string} text - Texto a leer en voz alta
 */
function speakText(text) {
    if (!window.isTTSActive || !text) return;
    if (synth.speaking) synth.cancel();

    activeUtterance = new SpeechSynthesisUtterance(text);
    activeUtterance.lang = 'es-MX';
    activeUtterance.rate = 1.0;
    synth.speak(activeUtterance);
}

/**
 * Maneja eventos de mouseover y focus para TTS
 * @param {Event} e - Evento de mouse/focus
 */
function handleTTSInteraction(e) {
    if (!window.isTTSActive) return;
    const target = e.target;
    const readableElement = target.closest('[data-speak], a, button, h1, h2, h3, label, p, img, .credit-capsule');

    if (readableElement) {
        readableElement.classList.add('tts-highlight');
        let textToRead = "";
        if (readableElement.hasAttribute('data-speak')) textToRead = readableElement.getAttribute('data-speak');
        else if (readableElement.hasAttribute('aria-label')) textToRead = readableElement.getAttribute('aria-label');
        else if (readableElement.tagName === 'IMG') textToRead = "Imagen: " + readableElement.alt;
        else textToRead = readableElement.innerText || readableElement.textContent;

        if (textToRead && textToRead.trim().length > 1) window.speakText(textToRead.trim());
    }
}

/**
 * Maneja eventos de mouseout y focusout para remover highlight TTS
 * @param {Event} e - Evento de mouse/focus
 */
function handleTTSMouseOut(e) {
    if (!window.isTTSActive) return;
    const target = e.target;
    const readableElement = target.closest('[data-speak], a, button, h1, h2, h3, label, p, img, .credit-capsule');
    if (readableElement) readableElement.classList.remove('tts-highlight');
}

// Event listeners para TTS
document.addEventListener('mouseover', handleTTSInteraction);
document.addEventListener('focusin', handleTTSInteraction);
document.addEventListener('mouseout', handleTTSMouseOut);
document.addEventListener('focusout', handleTTSMouseOut);

// Exportar funciones al objeto window
window.toggleHighContrast = toggleHighContrast;
window.toggleDyslexicFont = toggleDyslexicFont;
window.adjustTextSize = adjustTextSize;
window.toggleTTS = toggleTTS;
window.speakText = speakText;
