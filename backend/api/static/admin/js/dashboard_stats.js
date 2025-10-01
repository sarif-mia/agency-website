// Dashboard Statistics and Charts JavaScript
// Enhanced admin dashboard functionality

class DashboardManager {
    constructor() {
        this.visitorChart = null;
        this.contentChart = null;
        this.deviceChart = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeCharts();
        this.startRealTimeUpdates();
        this.setupAnimations();
    }

    setupEventListeners() {
        // Refresh button handlers
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('refresh-chart')) {
                const chartType = e.target.dataset.chart;
                this.refreshChart(chartType);
            }
        });

        // Card hover effects
        document.querySelectorAll('.stat-card').forEach(card => {
            card.addEventListener('mouseenter', this.animateCard);
            card.addEventListener('mouseleave', this.resetCard);
        });

        // Quick action analytics
        document.querySelectorAll('.action-item').forEach(item => {
            item.addEventListener('click', (e) => {
                this.trackAction(e.target.textContent.trim());
            });
        });
    }

    initializeCharts() {
        setTimeout(() => {
            this.createVisitorChart();
            this.createContentChart();
            this.createDeviceChart();
        }, 500);
    }

    createVisitorChart() {
        const ctx = document.getElementById('visitorChart');
        if (!ctx) return;

        // Sample data - in real implementation, fetch from API
        const last7Days = this.getLast7Days();
        const visitorData = {
            labels: last7Days.map(date => date.toLocaleDateString('en', { weekday: 'short' })),
            datasets: [{
                label: 'Page Views',
                data: [1250, 1890, 1540, 2100, 1820, 950, 1180],
                borderColor: '#00f5ff',
                backgroundColor: 'rgba(0, 245, 255, 0.1)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#00f5ff',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6
            }, {
                label: 'Unique Visitors',
                data: [850, 1200, 1050, 1400, 1150, 650, 780],
                borderColor: '#9966ff',
                backgroundColor: 'rgba(153, 102, 255, 0.1)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#9966ff',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6
            }]
        };

        this.visitorChart = new Chart(ctx, {
            type: 'line',
            data: visitorData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: '#ffffff',
                            font: {
                                family: 'Inter',
                                size: 12
                            },
                            usePointStyle: true,
                            padding: 20
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(26, 26, 26, 0.9)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: '#00f5ff',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: true
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            lineWidth: 1
                        },
                        ticks: {
                            color: '#b0b0b0',
                            font: {
                                family: 'Inter',
                                size: 11
                            }
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            lineWidth: 1
                        },
                        ticks: {
                            color: '#b0b0b0',
                            font: {
                                family: 'Inter',
                                size: 11
                            }
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
        });
    }

    createContentChart() {
        const ctx = document.getElementById('contentChart');
        if (!ctx) return;

        // Get data from template variables or default values
        const projects = parseInt(document.querySelector('[data-projects]')?.dataset.projects || '15');
        const blogs = parseInt(document.querySelector('[data-blogs]')?.dataset.blogs || '8');
        const services = parseInt(document.querySelector('[data-services]')?.dataset.services || '6');
        const team = parseInt(document.querySelector('[data-team]')?.dataset.team || '12');
        const testimonials = parseInt(document.querySelector('[data-testimonials]')?.dataset.testimonials || '25');

        const contentData = {
            labels: ['Projects', 'Blog Posts', 'Services', 'Team Members', 'Testimonials'],
            datasets: [{
                data: [projects, blogs, services, team, testimonials],
                backgroundColor: [
                    '#00f5ff',
                    '#9966ff',
                    '#ff6b6b',
                    '#4ecdc4',
                    '#ffd93d'
                ],
                borderWidth: 3,
                borderColor: '#1a1a1a',
                hoverBorderWidth: 4,
                hoverBorderColor: '#ffffff'
            }]
        };

        this.contentChart = new Chart(ctx, {
            type: 'doughnut',
            data: contentData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#ffffff',
                            font: {
                                family: 'Inter',
                                size: 12
                            },
                            padding: 15,
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(26, 26, 26, 0.9)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: '#00f5ff',
                        borderWidth: 1,
                        cornerRadius: 8
                    }
                },
                cutout: '60%',
                animation: {
                    animateRotate: true,
                    animateScale: true,
                    duration: 2000
                }
            }
        });
    }

    createDeviceChart() {
        const ctx = document.getElementById('deviceChart');
        if (!ctx) return;

        const deviceData = {
            labels: ['Mobile', 'Desktop', 'Tablet'],
            datasets: [{
                data: [65, 30, 5],
                backgroundColor: [
                    '#00f5ff',
                    '#9966ff',
                    '#ff6b6b'
                ],
                borderWidth: 2,
                borderColor: '#1a1a1a'
            }]
        };

        this.deviceChart = new Chart(ctx, {
            type: 'pie',
            data: deviceData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#ffffff',
                            font: {
                                family: 'Inter',
                                size: 12
                            }
                        }
                    }
                }
            }
        });
    }

    refreshChart(chartType) {
        switch (chartType) {
            case 'visitor':
                if (this.visitorChart) {
                    this.visitorChart.destroy();
                    this.createVisitorChart();
                }
                break;
            case 'content':
                if (this.contentChart) {
                    this.contentChart.destroy();
                    this.createContentChart();
                }
                break;
            case 'device':
                if (this.deviceChart) {
                    this.deviceChart.destroy();
                    this.createDeviceChart();
                }
                break;
        }
        
        // Show refresh feedback
        this.showNotification('Chart refreshed successfully!', 'success');
    }

    animateCard(event) {
        event.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
        event.currentTarget.style.boxShadow = '0 25px 50px rgba(0, 245, 255, 0.3)';
    }

    resetCard(event) {
        event.currentTarget.style.transform = 'translateY(0) scale(1)';
        event.currentTarget.style.boxShadow = '';
    }

    setupAnimations() {
        // Animate counters
        this.animateCounters();
        
        // Stagger card animations
        this.staggerCardAnimations();
        
        // Setup loading states
        this.setupLoadingStates();
    }

    animateCounters() {
        const counters = document.querySelectorAll('.stat-number[data-count]');
        
        counters.forEach((counter, index) => {
            setTimeout(() => {
                const target = parseInt(counter.getAttribute('data-count'));
                this.animateNumber(counter, target);
            }, index * 100);
        });
    }

    animateNumber(element, target) {
        let current = 0;
        const increment = target / 80;
        const duration = 2000;
        const stepTime = duration / 80;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
                this.addGlowEffect(element);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, stepTime);
    }

    addGlowEffect(element) {
        element.style.textShadow = '0 0 20px rgba(0, 245, 255, 0.8)';
        setTimeout(() => {
            element.style.textShadow = '';
        }, 1000);
    }

    staggerCardAnimations() {
        const cards = document.querySelectorAll('.stat-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease-out';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 150);
        });
    }

    setupLoadingStates() {
        const chartContainers = document.querySelectorAll('.chart-container canvas');
        chartContainers.forEach(canvas => {
            const container = canvas.parentElement;
            const loader = document.createElement('div');
            loader.className = 'chart-loader';
            loader.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading chart...';
            container.appendChild(loader);
            
            setTimeout(() => {
                loader.remove();
            }, 1500);
        });
    }

    startRealTimeUpdates() {
        // Update time every second
        this.updateTime();
        setInterval(() => this.updateTime(), 1000);
        
        // Simulate real-time data updates every 30 seconds
        setInterval(() => this.simulateDataUpdate(), 30000);
    }

    updateTime() {
        const timeElement = document.getElementById('current-time');
        if (timeElement) {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', {
                hour12: true,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            timeElement.textContent = timeString;
        }
    }

    simulateDataUpdate() {
        // Simulate small data changes
        if (this.visitorChart) {
            const datasets = this.visitorChart.data.datasets;
            datasets.forEach(dataset => {
                dataset.data = dataset.data.map(value => {
                    const change = (Math.random() - 0.5) * 100;
                    return Math.max(0, Math.round(value + change));
                });
            });
            this.visitorChart.update('none');
        }
    }

    trackAction(actionName) {
        console.log(`Quick action tracked: ${actionName}`);
        this.showNotification(`Opening ${actionName}...`, 'info');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check' : 'info'}-circle"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    getLast7Days() {
        const days = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            days.push(date);
        }
        return days;
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const dashboard = new DashboardManager();
    
    // Make dashboard globally available for debugging
    window.dashboard = dashboard;
});

// Add notification styles
const notificationStyles = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
        border: 1px solid rgba(0, 245, 255, 0.3);
        border-radius: 8px;
        padding: 15px 20px;
        color: #ffffff;
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        z-index: 10000;
        min-width: 200px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }
    
    .notification.show {
        opacity: 1;
        transform: translateX(0);
    }
    
    .notification i {
        margin-right: 10px;
        color: #00f5ff;
    }
    
    .notification-success {
        border-color: rgba(40, 167, 69, 0.3);
    }
    
    .notification-success i {
        color: #28a745;
    }
    
    .chart-loader {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #00f5ff;
        font-family: 'Inter', sans-serif;
        font-size: 14px;
    }
    
    .chart-loader i {
        margin-right: 10px;
        font-size: 16px;
    }
`;

// Inject notification styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);