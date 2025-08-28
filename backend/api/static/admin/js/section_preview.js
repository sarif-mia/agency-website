// Section Preview JavaScript for Admin
document.addEventListener('DOMContentLoaded', function() {
    initializeSectionPreview();
});

function initializeSectionPreview() {
    console.log('🎨 Section Preview Initialized');
    
    // Add preview buttons
    const rows = document.querySelectorAll('.results tbody tr');
    rows.forEach((row, index) => {
        addPreviewButton(row, index);
    });
    
    // Setup preview handlers
    setupPreviewHandlers();
}

function addPreviewButton(row, index) {
    const actionsCell = row.querySelector('td:last-child');
    if (actionsCell) {
        const btn = document.createElement('button');
        btn.innerHTML = '👁️ Preview';
        btn.className = 'preview-btn';
        btn.style.cssText = `
            background: linear-gradient(135deg, #00f5ff, #0066ff);
            border: none; color: white; padding: 5px 10px;
            border-radius: 15px; cursor: pointer; font-size: 11px;
            margin-left: 5px; transition: all 0.3s ease;
        `;
        
        btn.onclick = () => showPreview(index);
        actionsCell.appendChild(btn);
    }
}

function showPreview(index) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.8); z-index: 10000;
        display: flex; align-items: center; justify-content: center;
    `;
    
    modal.innerHTML = `
        <div style="background: #1a1a1a; padding: 20px; border-radius: 10px;
                    max-width: 80%; max-height: 80%; overflow: auto;
                    border: 2px solid #00f5ff;">
            <h3 style="color: #00f5ff;">Section Preview</h3>
            <div id="preview-content">Loading preview...</div>
            <button onclick="this.closest('.preview-overlay').remove()"
                    style="background: #ff4757; color: white; border: none;
                           padding: 10px 20px; border-radius: 5px; cursor: pointer;
                           margin-top: 15px;">Close</button>
        </div>
    `;
    
    modal.className = 'preview-overlay';
    document.body.appendChild(modal);
}

function setupPreviewHandlers() {
    // Handle section type changes
    const sectionTypeFields = document.querySelectorAll('select[name*="section_type"]');
    sectionTypeFields.forEach(field => {
        field.addEventListener('change', updatePreviewOnChange);
    });
}

function updatePreviewOnChange() {
    console.log('Section type changed - preview updated');
}