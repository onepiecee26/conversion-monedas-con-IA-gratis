class AIAdvisor {
    constructor() {
        this.conversationHistory = [];
        this.marketData = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadMarketData();
        this.generateInitialAdvice();
    }

    bindEvents() {
        document.getElementById('getAdvice').addEventListener('click', () => {
            this.generateAdvice();
        });
    }

    async loadMarketData() {
        // Simular datos de mercado
        this.marketData = {
            volatility: Math.random() * 0.02, // Volatilidad del 0-2%
            trend: Math.random() > 0.5 ? 'bullish' : 'bearish',
            economicEvents: this.generateEconomicEvents(),
            supportLevel: 0.82 + (Math.random() - 0.5) * 0.01,
            resistanceLevel: 0.88 + (Math.random() - 0.5) * 0.01
        };
    }

    generateEconomicEvents() {
        const events = [
            { name: 'Reunión de la Fed', impact: 'high', date: 'En 3 días' },
            { name: 'Datos de empleo', impact: 'medium', date: 'Mañana' },
            { name: 'Inflación Eurozona', impact: 'medium', date: 'En 5 días' }
        ];
        return events.sort(() => Math.random() - 0.5).slice(0, 2);
    }

    generateInitialAdvice() {
        const initialAdvice = [
            "Hola! Soy tu asesor de divisas. Te ayudo a tomar decisiones inteligentes sobre cuándo cambiar tu dinero.",
            "💡 Tip: Cambiar divisas en horarios de menor volatilidad (temprano en la mañana) puede ofrecer mejores tasas.",
            "📊 Los martes y miércoles suelen ser los mejores días para cambiar divisas por mayor liquidez en el mercado."
        ];

        const randomAdvice = initialAdvice[Math.floor(Math.random() * initialAdvice.length)];
        this.addMessage(randomAdvice, 'ai', false);
    }

    async generateAdvice() {
        const button = document.getElementById('getAdvice');
        const originalText = button.innerHTML;
        
        // Mostrar estado de carga
        button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Analizando mercado...';
        button.disabled = true;

        // Simular análisis de IA
        await new Promise(resolve => setTimeout(resolve, 2000));

        const fromCurrency = document.getElementById('fromCurrency').value;
        const toCurrency = document.getElementById('toCurrency').value;
        const amount = parseFloat(document.getElementById('amount').value) || 100;

        const advice = this.analyzeMarket(fromCurrency, toCurrency, amount);
        this.addMessage(advice, 'ai', true);

        // Restaurar botón
        button.innerHTML = originalText;
        button.disabled = false;
    }

    analyzeMarket(fromCurrency, toCurrency, amount) {
        const currentRate = window.currencyConverter.getExchangeRate(fromCurrency, toCurrency);
        const volatility = Math.random() * 0.02;
        const trend = this.analyzeTrend(fromCurrency, toCurrency);
        const recommendation = this.generateRecommendation(currentRate, volatility, trend, fromCurrency, toCurrency);
        
        return recommendation;
    }

    analyzeTrend(fromCurrency, toCurrency) {
        // Simular análisis de tendencia
        const trends = ['bullish', 'bearish', 'sideways'];
        const currentTrend = trends[Math.floor(Math.random() * trends.length)];
        
        const trendStrength = Math.random();
        const strength = trendStrength > 0.7 ? 'strong' : trendStrength > 0.4 ? 'moderate' : 'weak';
        
        return { direction: currentTrend, strength: strength };
    }

    generateRecommendation(currentRate, volatility, trend, fromCurrency, toCurrency) {
        const recommendations = [];
        
        // Análisis de volatilidad
        if (volatility < 0.005) {
            recommendations.push("📈 El mercado está relativamente estable hoy. Es un buen momento para cambiar si necesitas hacerlo pronto.");
        } else if (volatility > 0.015) {
            recommendations.push("⚠️ Alta volatilidad detectada. Considera esperar unas horas para una mejor tasa.");
        }

        // Análisis de tendencia
        if (trend.direction === 'bullish' && trend.strength === 'strong') {
            recommendations.push(`🚀 La tendencia de ${fromCurrency}/${toCurrency} es alcista. Si vas a cambiar ${fromCurrency} a ${toCurrency}, considera hacerlo pronto.`);
        } else if (trend.direction === 'bearish' && trend.strength === 'strong') {
            recommendations.push(`📉 Tendencia bajista fuerte. Si vas a cambiar ${toCurrency} a ${fromCurrency}, podrías esperar un poco más.`);
        }

        // Eventos económicos
        const upcomingEvents = this.marketData.economicEvents;
        if (upcomingEvents.length > 0) {
            const event = upcomingEvents[0];
            const impactEmoji = event.impact === 'high' ? '🔴' : '🟡';
            recommendations.push(`${impactEmoji} Evento importante: ${event.name} (${event.date}). Podría afectar las tasas.`);
        }

        // Recomendaciones específicas por divisa
        const currencyTips = this.getCurrencySpecificTips(fromCurrency, toCurrency);
        recommendations.push(currencyTips);

        // Niveles técnicos
        const support = this.marketData.supportLevel;
        const resistance = this.marketData.resistanceLevel;
        if (currentRate <= support) {
            recommendations.push(`💰 ¡Buena oportunidad! El tipo de cambio está cerca del nivel de soporte (${support.toFixed(4)}).`);
        } else if (currentRate >= resistance) {
            recommendations.push(`⚠️ El tipo de cambio está cerca del nivel de resistencia (${resistance.toFixed(4)}). Podría revertir.`);
        }

        // Agregar consejo de timing
        const timeAdvice = this.getTimeAdvice();
        recommendations.push(timeAdvice);

        return recommendations.join('\\n\\n');
    }

    getCurrencySpecificTips(fromCurrency, toCurrency) {
        const tips = {
            'USD-EUR': '💶 El par USD/EUR es más activo durante la sesión europea (8:00-16:00 CET).',
            'EUR-USD': '💵 El EUR/USD suele ser más volátil durante las primeras horas de la sesión europea.',
            'USD-GBP': '🇬🇧 El USD/GBP puede ser afectado por noticias del Reino Unido. Evita cambiar justo antes de anuncios del Banco de Inglaterra.',
            'GBP-USD': '💷 El GBP/USD es conocido por su volatilidad. Considera órdenes limitadas si esperas una mejor tasa.'
        };

        const pair = `${fromCurrency}-${toCurrency}`;
        return tips[pair] || `💡 Considera el horario de apertura de los mercados de ${fromCurrency} y ${toCurrency} para obtener mejores tasas.`;
    }

    getTimeAdvice() {
        const now = new Date();
        const hour = now.getHours();
        
        if (hour < 8) {
            return "🌅 Las primeras horas de la mañana suelen tener menor volatilidad y spreads más estrechos.";
        } else if (hour >= 14 && hour <= 18) {
            return "⏰ Estás en el horario de mayor actividad del mercado (sobrelape de sesiones europea y americana).";
        } else if (hour >= 22 || hour < 6) {
            return "🌙 Es horario asiático. El mercado podría ser menos líquido con spreads más amplios.";
        }
        
        return "🕐 Considera cambiar durante la sesión europea o americana para mejor liquidez.";
    }

    addMessage(content, sender, animate = true) {
        const container = document.getElementById('aiAdvice');
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'flex items-start space-x-3';
        
        const iconDiv = document.createElement('div');
        iconDiv.className = 'w-8 h-8 rounded-full flex items-center justify-center';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'flex-1';
        
        const messageP = document.createElement('p');
        messageP.className = 'text-sm text-gray-700';
        messageP.textContent = content;
        
        if (sender === 'ai') {
            iconDiv.className += ' bg-purple-100';
            iconDiv.innerHTML = '<i class="fas fa-robot text-purple-600 text-sm"></i>';
            messageP.innerHTML = content.replace(/\\n/g, '<br>');
        } else {
            iconDiv.className += ' bg-blue-100';
            iconDiv.innerHTML = '<i class="fas fa-user text-blue-600 text-sm"></i>';
        }
        
        contentDiv.appendChild(messageP);
        messageDiv.appendChild(iconDiv);
        messageDiv.appendChild(contentDiv);
        
        container.appendChild(messageDiv);
        
        if (animate) {
            messageDiv.style.opacity = '0';
            messageDiv.style.transform = 'translateY(10px)';
            setTimeout(() => {
                messageDiv.style.transition = 'all 0.3s ease';
                messageDiv.style.opacity = '1';
                messageDiv.style.transform = 'translateY(0)';
            }, 100);
        }
        
        // Scroll al último mensaje
        container.scrollTop = container.scrollHeight;
    }

    // Método para obtener señales de trading (simuladas)
    getTradingSignals() {
        const signals = [
            { type: 'BUY', strength: 'STRONG', confidence: 75 },
            { type: 'HOLD', strength: 'MODERATE', confidence: 60 },
            { type: 'SELL', strength: 'WEAK', confidence: 45 }
        ];
        
        return signals[Math.floor(Math.random() * signals.length)];
    }

    // Análisis de sentimiento del mercado
    analyzeMarketSentiment() {
        const sentiments = ['BULLISH', 'BEARISH', 'NEUTRAL'];
        const currentSentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
        
        const confidence = Math.floor(Math.random() * 30) + 60; // 60-90% confianza
        
        return {
            sentiment: currentSentiment,
            confidence: confidence,
            reasoning: 'Basado en el análisis técnico y fundamentales del mercado'
        };
    }

    // Generar alertas personalizadas
    generateAlerts(userPreferences) {
        const alerts = [];
        
        // Alertas de volatilidad
        if (this.marketData.volatility > 0.015) {
            alerts.push({
                type: 'volatility',
                message: '⚠️ Alta volatilidad detectada. Considera estrategias de cobertura.',
                priority: 'high'
            });
        }
        
        // Alertas de tendencia
        const trend = this.analyzeTrend('USD', 'EUR');
        if (trend.strength === 'strong') {
            alerts.push({
                type: 'trend',
                message: `📊 Tendencia ${trend.direction} fuerte detectada en USD/EUR`,
                priority: 'medium'
            });
        }
        
        return alerts;
    }
}

// Inicializar el asesor IA
document.addEventListener('DOMContentLoaded', () => {
    window.aiAdvisor = new AIAdvisor();
});