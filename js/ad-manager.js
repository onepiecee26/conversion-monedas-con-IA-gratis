class AdManager {
    constructor() {
        this.adsEnabled = true;
        this.adBlockDetected = false;
        this.publisherId = 'ca-pub-1913399723778376'; // Tu ID real de AdSense
        this.init();
    }

    init() {
        this.detectAdBlock();
        this.setupFallbackAds();
        this.bindAdEvents();
        this.initializeAdsense();
    }

    // Detectar si el usuario tiene AdBlock
    detectAdBlock() {
        // Crear un elemento de prueba
        const testAd = document.createElement('div');
        testAd.innerHTML = '&nbsp;';
        testAd.className = 'adsbox';
        testAd.style.position = 'absolute';
        testAd.style.left = '-1000px';
        
        document.body.appendChild(testAd);
        
        setTimeout(() => {
            if (testAd.offsetHeight === 0) {
                this.adBlockDetected = true;
                this.showFallbackAds();
            }
            document.body.removeChild(testAd);
        }, 100);
    }

    // Inicializar Google AdSense
    initializeAdsense() {
        // Push de anuncios de AdSense
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.log('AdSense no disponible temporalmente');
        }
    }

    // Configurar anuncios alternativos para usuarios con AdBlock
    setupFallbackAds() {
        const fallbackHTML = `
            <div class="fallback-ad bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200 text-center">
                <i class="fas fa-heart text-red-500 text-2xl mb-2"></i>
                <p class="text-sm text-gray-700 mb-2">¿Te gusta este conversor gratuito?</p>
                <p class="text-xs text-gray-600">Considera desactivar AdBlock para ayudarnos a mantenerlo gratis</p>
                <div class="mt-3">
                    <button onclick="adManager.hideFallbackAd(this)" class="text-xs text-blue-600 hover:text-blue-800">
                        <i class="fas fa-times mr-1"></i>Cerrar
                    </button>
                </div>
            </div>
        `;

        // Agregar fallback a los contenedores de anuncios
        document.querySelectorAll('.adsbygoogle').forEach(adContainer => {
            const fallbackContainer = document.createElement('div');
            fallbackContainer.className = 'ad-fallback hidden';
            fallbackContainer.innerHTML = fallbackHTML;
            adContainer.parentNode.insertBefore(fallbackContainer, adContainer.nextSibling);
        });
    }

    // Mostrar anuncios alternativos
    showFallbackAds() {
        document.querySelectorAll('.ad-fallback').forEach(fallback => {
            fallback.classList.remove('hidden');
        });
        
        document.querySelectorAll('.adsbygoogle').forEach(ad => {
            ad.style.display = 'none';
        });
    }

    // Ocultar anuncio alternativo
    hideFallbackAd(button) {
        const fallback = button.closest('.fallback-ad');
        fallback.style.display = 'none';
        
        // Guardar preferencia
        localStorage.setItem('hideFallbackAds', 'true');
    }

    // Vincular eventos de anuncios
    bindAdEvents() {
        // Detectar cambios en el tamaño de ventana para anuncios responsivos
        window.addEventListener('resize', () => {
            this.handleResponsiveAds();
        });

        // Detectar cuando los anuncios se cargan
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.checkAdLoading();
            }, 2000);
        });
    }

    // Manejar anuncios responsivos
    handleResponsiveAds() {
        const isMobile = window.innerWidth < 1024;
        
        // Mostrar/ocultar anuncios según el dispositivo
        document.querySelectorAll('.mobile-ad').forEach(ad => {
            ad.style.display = isMobile ? 'block' : 'none';
        });
        
        document.querySelectorAll('.desktop-ad').forEach(ad => {
            ad.style.display = isMobile ? 'none' : 'block';
        });
    }

    // Verificar si los anuncios se cargaron correctamente
    checkAdLoading() {
        document.querySelectorAll('.adsbygoogle').forEach(ad => {
            if (ad.offsetHeight === 0) {
                // El anuncio no se cargó, mostrar fallback
                const fallback = ad.nextElementSibling;
                if (fallback && fallback.classList.contains('ad-fallback')) {
                    fallback.classList.remove('hidden');
                }
            }
        });
    }

    // Deshabilitar anuncios temporalmente (para usuarios premium por ejemplo)
    disableAds() {
        this.adsEnabled = false;
        document.querySelectorAll('.adsbygoogle, .ad-fallback').forEach(ad => {
            ad.style.display = 'none';
        });
        localStorage.setItem('adsDisabled', 'true');
    }

    // Habilitar anuncios
    enableAds() {
        this.adsEnabled = true;
        document.querySelectorAll('.adsbygoogle').forEach(ad => {
            ad.style.display = 'block';
        });
        localStorage.removeItem('adsDisabled');
        this.initializeAdsense();
    }

    // Obtener estadísticas de anuncios
    getAdStats() {
        const totalAds = document.querySelectorAll('.adsbygoogle').length;
        const loadedAds = document.querySelectorAll('.adsbygoogle[style*="height"]:not([style*="height: 0px"])').length;
        const fallbackAds = document.querySelectorAll('.ad-fallback:not(.hidden)').length;
        
        return {
            total: totalAds,
            loaded: loadedAds,
            fallback: fallbackAds,
            adBlockDetected: this.adBlockDetected
        };
    }

    // Mostrar notificación de soporte
    showSupportNotification() {
        if (localStorage.getItem('hideSupportNotification')) return;
        
        const notification = document.createElement('div');
        notification.className = 'fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-sm z-50 border border-gray-200';
        notification.innerHTML = `
            <div class="flex items-start space-x-3">
                <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-heart text-green-600 text-sm"></i>
                </div>
                <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900">¡Gracias por usar nuestro conversor!</p>
                    <p class="text-xs text-gray-600 mt-1">Los anuncios nos ayudan a mantenerlo gratuito. Considera desactivar tu bloqueador de anuncios.</p>
                    <div class="flex space-x-2 mt-3">
                        <button onclick="adManager.hideSupportNotification(this)" class="text-xs text-gray-500 hover:text-gray-700">
                            Entendido
                        </button>
                        <button onclick="adManager.neverShowSupportNotification()" class="text-xs text-gray-400 hover:text-gray-600">
                            No volver a mostrar
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-ocultar después de 10 segundos
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 10000);
    }

    // Ocultar notificación de soporte
    hideSupportNotification(button) {
        button.closest('.fixed').remove();
    }

    // No volver a mostrar notificación de soporte
    neverShowSupportNotification() {
        localStorage.setItem('hideSupportNotification', 'true');
        document.querySelector('.fixed.bottom-4.right-4').remove();
    }
}

// Inicializar el gestor de anuncios
document.addEventListener('DOMContentLoaded', () => {
    window.adManager = new AdManager();
    
    // Mostrar notificación de soporte si es apropiado
    setTimeout(() => {
        if (window.adManager.adBlockDetected) {
            window.adManager.showSupportNotification();
        }
    }, 3000);
});