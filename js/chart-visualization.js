class ChartVisualization {
    constructor() {
        this.chart = null;
        this.historicalData = null;
        this.init();
    }

    init() {
        this.loadHistoricalData();
        this.createChart();
        this.bindEvents();
        
        // Actualizar gráfico cuando cambien las divisas
        document.getElementById('fromCurrency').addEventListener('change', () => this.updateChart());
        document.getElementById('toCurrency').addEventListener('change', () => this.updateChart());
    }

    bindEvents() {
        // Agregar controles de período
        const periods = ['7d', '30d', '90d'];
        periods.forEach(period => {
            const button = document.createElement('button');
            button.textContent = period;
            button.className = 'px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded mr-2';
            button.addEventListener('click', () => this.changePeriod(period));
            
            // Agregar al contenedor del gráfico
            const chartContainer = document.getElementById('trendChart').parentElement;
            const controlsDiv = document.createElement('div');
            controlsDiv.className = 'flex justify-end mb-2';
            controlsDiv.appendChild(button);
            
            if (!chartContainer.querySelector('.period-controls')) {
                controlsDiv.className = 'period-controls flex justify-end mb-2';
                chartContainer.insertBefore(controlsDiv, chartContainer.firstChild);
            }
        });
    }

    loadHistoricalData() {
        // Simular datos históricos
        this.historicalData = this.generateHistoricalData(7);
    }

    generateHistoricalData(days) {
        const labels = [];
        const data = [];
        const volumes = [];
        
        const now = new Date();
        const baseRate = 0.85; // EUR/USD base rate
        
        for (let i = days - 1; i >= 0; i--) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);
            
            labels.push(date.toLocaleDateString('es-ES', { 
                month: 'short', 
                day: 'numeric' 
            }));
            
            // Simular datos realistas con volatilidad
            const trend = Math.sin(i * 0.5) * 0.02;
            const noise = (Math.random() - 0.5) * 0.01;
            const rate = baseRate + trend + noise;
            
            data.push(rate);
            volumes.push(Math.random() * 1000 + 500);
        }
        
        return { labels, data, volumes };
    }

    createChart() {
        const ctx = document.getElementById('trendChart').getContext('2d');
        
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0.05)');

        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.historicalData.labels,
                datasets: [{
                    label: 'Tipo de Cambio',
                    data: this.historicalData.data,
                    borderColor: 'rgb(59, 130, 246)',
                    backgroundColor: gradient,
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: 'rgb(59, 130, 246)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: 'rgb(59, 130, 246)',
                        borderWidth: 1,
                        cornerRadius: 6,
                        displayColors: false,
                        callbacks: {
                            title: function(context) {
                                return `Fecha: ${context[0].label}`;
                            },
                            label: function(context) {
                                return `Tasa: ${context.parsed.y.toFixed(4)}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        display: true,
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#6b7280',
                            font: {
                                size: 11
                            }
                        }
                    },
                    y: {
                        display: true,
                        grid: {
                            color: 'rgba(107, 114, 128, 0.1)'
                        },
                        ticks: {
                            color: '#6b7280',
                            font: {
                                size: 11
                            },
                            callback: function(value) {
                                return value.toFixed(4);
                            }
                        }
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                },
                elements: {
                    point: {
                        hoverBackgroundColor: 'rgb(59, 130, 246)',
                        hoverBorderColor: '#fff',
                        hoverBorderWidth: 3
                    }
                }
            }
        });
    }

    updateChart() {
        if (!this.chart) return;
        
        const fromCurrency = document.getElementById('fromCurrency').value;
        const toCurrency = document.getElementById('toCurrency').value;
        
        // Generar nuevos datos basados en las divisas seleccionadas
        this.historicalData = this.generateHistoricalData(7);
        
        // Actualizar el gráfico
        this.chart.data.labels = this.historicalData.labels;
        this.chart.data.datasets[0].data = this.historicalData.data;
        this.chart.update('active');
    }

    changePeriod(period) {
        let days;
        switch(period) {
            case '7d': days = 7; break;
            case '30d': days = 30; break;
            case '90d': days = 90; break;
            default: days = 7;
        }
        
        this.historicalData = this.generateHistoricalData(days);
        
        if (this.chart) {
            this.chart.data.labels = this.historicalData.labels;
            this.chart.data.datasets[0].data = this.historicalData.data;
            this.chart.update('active');
        }
    }

    addTechnicalIndicators() {
        if (!this.historicalData || !this.chart) return;
        
        // Calcular media móvil simple de 5 días
        const sma5 = this.calculateSMA(this.historicalData.data, 5);
        
        // Calcular niveles de soporte y resistencia
        const { support, resistance } = this.calculateSupportResistance(this.historicalData.data);
        
        // Agregar líneas al gráfico
        this.chart.data.datasets.push({
            label: 'SMA 5 días',
            data: sma5,
            borderColor: 'rgb(239, 68, 68)',
            borderWidth: 1,
            fill: false,
            pointRadius: 0,
            tension: 0.4
        });
        
        this.chart.update();
    }

    calculateSMA(data, period) {
        const sma = [];
        for (let i = 0; i < data.length; i++) {
            if (i < period - 1) {
                sma.push(null);
            } else {
                const sum = data.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
                sma.push(sum / period);
            }
        }
        return sma;
    }

    calculateSupportResistance(data) {
        const min = Math.min(...data);
        const max = Math.max(...data);
        const range = max - min;
        
        return {
            support: min + range * 0.15,
            resistance: max - range * 0.15
        };
    }

    // Método para agregar un segundo dataset con volumen
    addVolumeChart() {
        if (!this.historicalData || !this.chart) return;
        
        this.chart.data.datasets.push({
            label: 'Volumen',
            data: this.historicalData.volumes,
            type: 'bar',
            backgroundColor: 'rgba(34, 197, 94, 0.3)',
            borderColor: 'rgb(34, 197, 94)',
            borderWidth: 1,
            yAxisID: 'y1'
        });
        
        // Agregar segundo eje Y para el volumen
        this.chart.options.scales.y1 = {
            type: 'linear',
            display: false,
            position: 'right',
            grid: {
                drawOnChartArea: false,
            }
        };
        
        this.chart.update();
    }

    // Exportar datos del gráfico
    exportChartData() {
        if (!this.historicalData) return;
        
        const data = {
            labels: this.historicalData.labels,
            rates: this.historicalData.data,
            timestamp: new Date().toISOString(),
            currencyPair: `${document.getElementById('fromCurrency').value}/${document.getElementById('toCurrency').value}`
        };
        
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `currency-data-${data.currencyPair}-${Date.now()}.json`;
        link.click();
    }

    // Método para cargar datos de una API externa (si estuviera disponible)
    async loadExternalData(apiUrl, days = 7) {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            
            // Procesar datos externos y actualizar el gráfico
            this.processExternalData(data, days);
        } catch (error) {
            console.error('Error al cargar datos externos:', error);
            // Usar datos simulados como fallback
            this.historicalData = this.generateHistoricalData(days);
        }
    }

    processExternalData(externalData, days) {
        // Este método procesaría datos reales de una API
        // Por ahora, usaremos los datos simulados
        this.historicalData = this.generateHistoricalData(days);
    }

    // Agregar anotaciones al gráfico
    addAnnotations() {
        if (!this.chart) return;
        
        const annotations = {
            line1: {
                type: 'line',
                yMin: 0.85,
                yMax: 0.85,
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 2,
                borderDash: [5, 5],
                label: {
                    display: true,
                    content: 'Nivel Clave'
                }
            }
        };
        
        this.chart.options.plugins.annotation = {
            annotations: annotations
        };
        
        this.chart.update();
    }
}

// Inicializar la visualización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.chartVisualization = new ChartVisualization();
});