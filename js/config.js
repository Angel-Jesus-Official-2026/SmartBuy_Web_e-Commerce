// =====================================================
// SMARTBUY E-COMMERCE CONFIGURATION
// Database and constants exported as globals in window
// =====================================================

window.PRODUCTS_DB = [
    { id: 1, name: "Laptop Nebula 14", price: "24,999", image: "images/1-laptop.jpg", description: "Equipo de trabajo ligero con pantalla antirreflejo y chasis de aluminio.", fullDescription: "La Laptop Nebula 14 es la compañera ideal para profesionales en movimiento. Procesador de última generación, 16 GB de RAM y SSD de 1TB. Batería de 18 horas." },
    { id: 2, name: "Auriculares Pulse ANC", price: "3,499", image: "images/2-auriculares.jpg", description: "Cancelación de ruido activa y micrófono dual con IA.", fullDescription: "Sumérgete en tu música. Bloquea hasta el 95% del sonido ambiental. El micrófono dual con IA garantiza llamadas cristalinas. 40 horas de reproducción." },
    { id: 3, name: "Lámpara Aura Desk", price: "1,299", image: "images/3-lampara.jpg", description: "Iluminación adaptable para tu escritorio con diseño industrial.", fullDescription: "La iluminación perfecta para tu escritorio que protege tus ojos de la fatiga visual. Cuenta con niveles de brillo ajustables y luz cálida/fría." },
    { id: 4, name: "Teclado Mecánico Nimbus", price: "2,150", image: "images/4-teclado.jpg", description: "Switches táctiles silenciosos y retroiluminación inteligente.", fullDescription: "Ideal para programadores y escritores. Diseño ergonómico TKL, switches lubricados de fábrica y conexión Bluetooth 5.0 para 3 dispositivos." },
    { id: 5, name: "Ratón ErgoPro", price: "1,800", image: "images/5-raton.jpg", description: "Ratón vertical ergonómico para prevenir túnel carpiano.", fullDescription: "El Ratón ErgoPro posiciona tu mano en un ángulo natural de apretón de manos, reduciendo la tensión muscular. Sensor láser de alta precisión." },
    { id: 6, name: "Monitor UltraView 34\"", price: "12,500", image: "images/6-monitor.jpg", description: "Monitor ultra-ancho curvo 4K ideal para multitarea.", fullDescription: "Expande tu espacio de trabajo. Resolución UWQHD, tasa de refresco de 144Hz y colores precisos sRGB al 99%. Incluye altavoces estéreo integrados." },
    { id: 7, name: "Silla Ergofit Elite", price: "6,900", image: "images/7-silla.jpg", description: "Silla de oficina con soporte lumbar dinámico y malla transpirable.", fullDescription: "Diseñada para 10+ horas de uso continuo. Cuenta con soporte lumbar adaptable, reposabrazos 4D y mecanismo de inclinación sincronizado." },
    { id: 8, name: "Hub USB-C Multipuerto", price: "950", image: "images/8-hub-usb.png", description: "Expande tus conexiones con HDMI, USB-A, Ethernet y Lector SD.", fullDescription: "La navaja suiza de la conectividad. Un solo cable te da acceso a pantallas externas 4K, red gigabit y carga passthrough de 100W." },
    { id: 9, name: "Base de Carga Inalámbrica", price: "850", image: "images/10-altavoz.jpg", description: "Carga rápida Qi simultánea para teléfono, reloj y auriculares.", fullDescription: "Mantén tu escritorio sin cables. Soporta carga rápida de 15W y tiene un diseño neomórfico que combina con cualquier entorno." },
    { id: 10, name: "Altavoz Inteligente Echo", price: "2,200", image: "images/10-altavoz.jpg", description: "Sonido envolvente 360° y asistente virtual integrado.", fullDescription: "Controla tu hogar inteligente con la voz, reproduce música con graves profundos y agudos nítidos. Diseño cilíndrico minimalista." },
    { id: 11, name: "Tablet Pro 11\"", price: "15,999", image: "images/11-tablet.jpg", description: "Potencia de una PC en una tableta ultraligera con lápiz digital.", fullDescription: "Pantalla Liquid Retina a 120Hz. Perfecta para diseño gráfico, toma de notas o entretenimiento en movimiento. Incluye Stylus magnético." },
    { id: 12, name: "Funda de Cuero Premium", price: "1,100", image: "images/12-funda.jpg", description: "Funda protectora para laptops de 13 y 14 pulgadas.", fullDescription: "Hecha de cuero vegano resistente al agua con interior de microfibra suave que protege tu equipo contra rasguños y golpes diarios." },
    { id: 13, name: "Soporte Ajustable Aluminio", price: "799", image: "images/13-soporte.png", description: "Eleva tu laptop a la altura de tus ojos para mejor postura.", fullDescription: "Soporte plegable y ultraligero. Mejora la ventilación del equipo y previene dolores de cuello al elevar la pantalla al nivel óptimo." },
    { id: 14, name: "Webcam 4K Studio Pro", price: "2,850", image: "images/14-webcam.png", description: "Cámara de alta resolución con anillo de luz para videollamadas.", fullDescription: "Hazte notar en tus reuniones virtuales. Sensor 4K real, corrección automática de luz y micrófonos estéreo duales con reducción de ruido." },
    { id: 15, name: "Micrófono Condensador", price: "2,500", image: "images/15-microfono.jpg", description: "Calidad de estudio para podcasts, streaming y locución.", fullDescription: "Captura de voz cálida y cristalina. Patrón polar cardioide que aísla el ruido de fondo. Conexión USB plug & play con soporte anti-vibración." },
    { id: 16, name: "Reloj Inteligente Vita", price: "4,100", image: "images/16-reloj.jpg", description: "Monitoriza tu salud, ritmo cardíaco y oxígeno en sangre.", fullDescription: "Tu compañero de salud diario. Pantalla OLED brillante, cuerpo de titanio, resistencia al agua 5ATM y autonomía de 7 días." },
    { id: 17, name: "Batería Portátil 20000mAh", price: "1,450", image: "images/17-bateria.jpg", description: "Carga rápida para tus dispositivos donde quiera que vayas.", fullDescription: "Carga un smartphone hasta 5 veces o una laptop una vez completa gracias a su puerto USB-C Power Delivery de 65W. Diseño delgado." },
    { id: 18, name: "Disco Externo 2TB SSD", price: "3,890", image: "images/18-disco-ssd.png", description: "Almacenamiento ultra-rápido y resistente contra caídas.", fullDescription: "Transferencias a velocidad de la luz (hasta 1050 MB/s). Su diseño recubierto de goma lo hace resistente al agua, polvo y caídas extremas." },
    { id: 19, name: "Mochila Antirrobo Tech", price: "1,700", image: "images/19-mochila.jpg", description: "Compartimentos ocultos, puerto USB y material impermeable.", fullDescription: "Viaja seguro. Las cremalleras están ocultas a la espalda. Cuenta con protección RFID, tejido a prueba de cortes e interior acolchado para laptops de 15.6\"." },
    { id: 20, name: "Gafas de Luz Azul", price: "600", image: "images/20-gafas.jpg", description: "Protege tus ojos de la radiación digital de las pantallas.", fullDescription: "Elimina la fatiga visual y los dolores de cabeza. Lentes con recubrimiento especial anti-reflejante que filtra hasta el 98% de la luz azul dañina." }
];

window.DISCOUNT_CODES = {
    'DESCUENTO10': 10,
    'DESCUENTO20': 20,
    'BIENVENIDA15': 15,
    'TECH50': 50
};

window.APP_VERSION = '1.0';

// Initialize cart state
if (!window.cart) window.cart = [];
if (!window.discountCode) window.discountCode = '';
if (!window.discountPercentage) window.discountPercentage = 0;
if (!window.currentOrder) window.currentOrder = null;
if (!window.isTTSActive) window.isTTSActive = false;
if (!window.currentSize) window.currentSize = 16;
