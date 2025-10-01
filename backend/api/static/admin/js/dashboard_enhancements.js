// SiteGenIT Admin Dashboard Enhancements
document.addEventListener('DOMContentLoaded', function() {
    enhanceAdminDashboard();
});

function enhanceAdminDashboard() {
    console.log('\ud83d\ude80 SiteGenIT Admin Dashboard Initialized');
    
    // Add quick stats to dashboard
    addQuickStats();
    
    // Add keyboard shortcuts
    addKeyboardShortcuts();
    
    // Enhance table interactions
    enhanceTableInteractions();
    
    // Add live status indicator
    addLiveStatusIndicator();
}

function addQuickStats() {
    const dashboard = document.querySelector('#content');
    if (dashboard && window.location.pathname.includes('/admin/')) {
        // Add a quick stats panel
        const statsPanel = document.createElement('div');
        statsPanel.innerHTML = `
            <div class=\"dashboard-stats\" style=\"
                background: var(--light-bg);
                border: 1px solid var(--border-color);
                border-radius: 15px;
                padding: 20px;
                margin-bottom: 30px;
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 20px;
            \">
                <div class=\"stat-item\" style=\"text-align: center; padding: 15px; background: var(--darker-bg); border-radius: 10px;\">
                    <div style=\"font-size: 2rem; color: var(--primary-color); font-weight: 800;\">\ud83d\ude80</div>
                    <div style=\"color: var(--text-primary); font-weight: 600; margin: 5px 0;\">SiteGenIT CMS</div>
                    <div style=\"color: var(--text-muted); font-size: 0.9rem;\">Digital Excellence</div>
                </div>
                <div class=\"stat-item\" style=\"text-align: center; padding: 15px; background: var(--darker-bg); border-radius: 10px;\">
                    <div style=\"font-size: 2rem; color: var(--success-color); font-weight: 800;\">\u2705</div>
                    <div style=\"color: var(--text-primary); font-weight: 600; margin: 5px 0;\">System Status</div>
                    <div style=\"color: var(--success-color); font-size: 0.9rem;\">All Systems Online</div>
                </div>
                <div class=\"stat-item\" style=\"text-align: center; padding: 15px; background: var(--darker-bg); border-radius: 10px;\">
                    <div style=\"font-size: 2rem; color: var(--secondary-color); font-weight: 800;\">\ud83c\udf10</div>
                    <div style=\"color: var(--text-primary); font-weight: 600; margin: 5px 0;\">Live Website</div>
                    <div style=\"color: var(--text-muted); font-size: 0.9rem;\">
                        <a href=\"https://sitegenit.vercel.app\" target=\"_blank\" style=\"color: var(--primary-color); text-decoration: none;\">sitegenit.vercel.app</a>
                    </div>
                </div>
                <div class=\"stat-item\" style=\"text-align: center; padding: 15px; background: var(--darker-bg); border-radius: 10px;\">
                    <div style=\"font-size: 2rem; color: var(--info-color); font-weight: 800;\">\ud83d\udccb</div>
                    <div style=\"color: var(--text-primary); font-weight: 600; margin: 5px 0;\">Quick Access</div>
                    <div style=\"color: var(--text-muted); font-size: 0.9rem;\">
                        <a href=\"/api/\" target=\"_blank\" style=\"color: var(--info-color); text-decoration: none;\">API Documentation</a>
                    </div>
                </div>
            </div>
        `;
        
        const h1 = dashboard.querySelector('h1');
        if (h1) {
            h1.parentNode.insertBefore(statsPanel, h1.nextSibling);
        }
    }
}

function addKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl+H: Go to home
        if (e.ctrlKey && e.key === 'h') {
            e.preventDefault();
            window.location.href = '/admin/';
        }
        
        // Ctrl+M: Go to messages
        if (e.ctrlKey && e.key === 'm') {
            e.preventDefault();
            window.location.href = '/admin/api/contactmessage/';
        }
        
        // Ctrl+P: Go to projects
        if (e.ctrlKey && e.key === 'p') {
            e.preventDefault();
            window.location.href = '/admin/api/project/';
        }
    });
}

function enhanceTableInteractions() {
    // Add hover effects to table rows
    const tables = document.querySelectorAll('.results table');
    tables.forEach(table => {
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
            row.addEventListener('mouseenter', function() {
                this.style.backgroundColor = 'rgba(0, 245, 255, 0.1)';
                this.style.transform = 'translateY(-1px)';
                this.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.2)';
                this.style.transition = 'all 0.2s ease';
            });
            
            row.addEventListener('mouseleave', function() {
                this.style.backgroundColor = '';
                this.style.transform = '';
                this.style.boxShadow = '';
            });
        });
    });
}

function addLiveStatusIndicator() {
    // Add a live status indicator
    const header = document.querySelector('#header');
    if (header) {
        const statusIndicator = document.createElement('div');
        statusIndicator.style.cssText = `
            position: absolute;
            top: 10px;
            right: 20px;
            display: flex;
            align-items: center;
            gap: 8px;
            background: rgba(0, 0, 0, 0.5);
            padding: 5px 12px;
            border-radius: 20px;
            border: 1px solid var(--border-color);
        `;
        
        statusIndicator.innerHTML = `
            <div style=\"
                width: 8px;
                height: 8px;
                background: var(--success-color);
                border-radius: 50%;
                animation: pulse 2s infinite;
            \"></div>
            <span style=\"color: var(--text-primary); font-size: 0.8rem; font-weight: 500;\">Backend Online</span>
        `;
        
        header.style.position = 'relative';
        header.appendChild(statusIndicator);
        
        // Add pulse animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0%, 100% { opacity: 1; transform: scale(1); }
                50% { opacity: 0.7; transform: scale(1.2); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Display helpful tips
setTimeout(() => {
    if (window.location.pathname.includes('/admin/') && !localStorage.getItem('sitegenit_admin_tips_shown')) {
        console.log('💡 SiteGenIT Admin Tips:');
        console.log('  • Ctrl+H: Quick access to dashboard');
        console.log('  • Ctrl+M: View contact messages');
        console.log('  • Ctrl+P: Manage projects');
        console.log('  • \ud83c\udf10 Live site: https://sitegenit.vercel.app');
        localStorage.setItem('sitegenit_admin_tips_shown', 'true');
    }
}, 1000);