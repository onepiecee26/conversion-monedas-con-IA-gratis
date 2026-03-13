class CurrencyConverter {
    constructor() {
        this.apiKey = 'demo-key'; // Usaremos demo-key para pruebas
        this.baseUrl = 'https://api.exchangerate-api.com/v4/latest';
        this.rates = {};
        this.init();
    }

    async init() {
        this.bindEvents();
        await this.loadExchangeRates();
        this.updatePopularRates();
        this.updateLastUpdateTime();
        
        // Actualizar cada 30 minutos
        setInterval(() => this.loadExchangeRates(), 30 * 60 * 1000);
        setInterval(() => this.updateLastUpdateTime(), 60000);
    }

    bindEvents() {
        document.getElementById('conversionForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.convertCurrency();
        });

        document.getElementById('fromCurrency').addEventListener('change', () => this.convertCurrency());
        document.getElementById('toCurrency').addEventListener('change', () => this.convertCurrency());
        document.getElementById('amount').addEventListener('input', () => this.convertCurrency());
    }

    async loadExchangeRates() {
        try {
            // Para producción, usa tu propia API key de https://www.exchangerate-api.com/
            // Por ahora usaremos datos simulados pero realistas
            this.simulateExchangeRates();
            this.updateLastUpdateTime();
        } catch (error) {
            console.error('Error al cargar tasas de cambio:', error);
            this.showError('Error al cargar las tasas de cambio. Usando datos anteriores.');
        }
    }

    simulateExchangeRates() {
        // Tasas simuladas pero realistas (respecto al USD)
        const baseRates = {
            USD: 1.0,
            EUR: 0.85 + (Math.random() - 0.5) * 0.02, // ±1% variación
            GBP: 0.73 + (Math.random() - 0.5) * 0.02,
            JPY: 110.0 + (Math.random() - 0.5) * 4,
            CHF: 0.92 + (Math.random() - 0.5) * 0.02,
            CAD: 1.25 + (Math.random() - 0.5) * 0.04,
            AUD: 1.35 + (Math.random() - 0.5) * 0.04,
            CNY: 6.45 + (Math.random() - 0.5) * 0.15,
            MXN: 20.0 + (Math.random() - 0.5) * 0.8,
            COP: 3800 + (Math.random() - 0.5) * 150
        };

        // Normalizar tasas
        this.rates = {};
        Object.keys(baseRates).forEach(currency => {
            this.rates[currency] = baseRates[currency] / baseRates.USD;
        });

        // Guardar en localStorage para persistencia
        localStorage.setItem('exchangeRates', JSON.stringify(this.rates));
        localStorage.setItem('ratesTimestamp', Date.now().toString());
    }

    async convertCurrency() {
        const fromCurrency = document.getElementById('fromCurrency').value;
        const toCurrency = document.getElementById('toCurrency').value;
        const amount = parseFloat(document.getElementById('amount').value);

        if (isNaN(amount) || amount <= 0) {
            this.hideResult();
            return;
        }

        const rate = this.getExchangeRate(fromCurrency, toCurrency);
        const result = amount * rate;

        this.displayResult(amount, fromCurrency, result, toCurrency, rate);
    }

    getExchangeRate(from, to) {
        if (from === to) return 1;
        
        // Si no tenemos las tasas, intentar cargarlas del localStorage
        if (Object.keys(this.rates).length === 0) {
            const storedRates = localStorage.getItem('exchangeRates');
            if (storedRates) {
                this.rates = JSON.parse(storedRates);
            } else {
                this.simulateExchangeRates();
            }
        }

        // Convertir a través de USD como moneda base
        const fromRate = this.rates[from] || 1;
        const toRate = this.rates[to] || 1;
        
        return toRate / fromRate;
    }

    displayResult(amount, fromCurrency, result, toCurrency, rate) {
        const resultDiv = document.getElementById('result');
        const resultText = document.getElementById('resultText');
        const exchangeRate = document.getElementById('exchangeRate');

        resultText.textContent = `${result.toFixed(2)} ${toCurrency}`;
        exchangeRate.textContent = `1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`;
        
        resultDiv.classList.remove('hidden');
        
        // Añadir animación
        resultDiv.style.opacity = '0';
        resultDiv.style.transform = 'translateY(10px)';
        setTimeout(() => {
            resultDiv.style.transition = 'all 0.3s ease';
            resultDiv.style.opacity = '1';
            resultDiv.style.transform = 'translateY(0)';
        }, 100);
    }

    hideResult() {
        document.getElementById('result').classList.add('hidden');
    }

    updatePopularRates() {
        const popularPairs = [
            { from: 'USD', to: 'EUR' },
            { from: 'EUR', to: 'USD' },
            { from: 'USD', to: 'GBP' },
            { from: 'EUR', to: 'GBP' }
        ];

        const container = document.getElementById('popularRates');
        container.innerHTML = '';

        popularPairs.forEach(pair => {
            const rate = this.getExchangeRate(pair.from, pair.to);
            const trend = Math.random() > 0.5 ? 'up' : 'down';
            const trendIcon = trend === 'up' ? 'fa-arrow-up' : 'fa-arrow-down';
            const trendClass = trend === 'up' ? 'trend-up' : 'trend-down';
            
            const div = document.createElement('div');
            div.className = 'flex items-center justify-between p-2 bg-gray-50 rounded';
            div.innerHTML = `
                <div class="flex items-center">
                    <span class="text-sm font-medium">1 ${pair.from}</span>
                    <i class="fas fa-arrow-right mx-2 text-gray-400 text-xs"></i>
                    <span class="text-sm">${pair.to}</span>
                </div>
                <div class="flex items-center">
                    <span class="text-sm font-semibold">${rate.toFixed(4)}</span>
                    <i class="fas ${trendIcon} ml-2 ${trendClass} text-xs"></i>
                </div>
            `;
            container.appendChild(div);
        });
    }

    updateLastUpdateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('es-ES');
        const dateString = now.toLocaleDateString('es-ES');
        
        document.getElementById('lastUpdate').textContent = `${dateString} ${timeString}`;
        document.getElementById('footerUpdate').textContent = `${dateString} ${timeString}`;
    }

    showError(message) {
        // Crear notificación temporal
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    // Método para obtener datos históricos (simulados) para el gráfico
    getHistoricalData(days = 7) {
        const data = [];
        const labels = [];
        
        for (let i = days - 1; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            labels.push(date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }));
            
            // Simular variación histórica
            const baseRate = 0.85;
            const variation = (Math.random() - 0.5) * 0.04; // ±2% variación
            data.push(baseRate + variation);
        }
        
        return { labels, data };
    }
}

// Inicializar el conversor cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.currencyConverter = new CurrencyConverter();
});