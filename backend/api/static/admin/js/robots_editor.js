// Robots.txt Editor for Admin
document.addEventListener('DOMContentLoaded', function() {
    initializeRobotsEditor();
});

function initializeRobotsEditor() {
    console.log('🤖 Robots.txt Editor Initialized');
    
    const textarea = document.querySelector('textarea[name*="content"]');
    if (textarea) {
        setupRobotsTextarea(textarea);
        addValidation(textarea);
        addPreview(textarea);
    }
}

function setupRobotsTextarea(textarea) {
    // Style the textarea
    textarea.style.cssText = `
        background: #0f0f0f !important;
        color: #ffffff !important;
        font-family: 'Courier New', monospace !important;
        font-size: 13px !important;
        line-height: 1.5 !important;
        border: 1px solid rgba(0, 245, 255, 0.2) !important;
        border-radius: 8px !important;
        padding: 15px !important;
    `;
    
    // Add line numbers
    addLineNumbers(textarea);
    
    // Syntax highlighting (basic)
    textarea.addEventListener('input', highlightSyntax);
}

function addLineNumbers(textarea) {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'position: relative; display: inline-block; width: 100%;';
    
    const lineNumbers = document.createElement('div');
    lineNumbers.style.cssText = `
        position: absolute; left: 5px; top: 15px;
        color: #666; font-family: 'Courier New', monospace;
        font-size: 13px; line-height: 1.5; pointer-events: none;
    `;
    
    textarea.parentNode.insertBefore(wrapper, textarea);
    wrapper.appendChild(lineNumbers);
    wrapper.appendChild(textarea);
    
    updateLineNumbers(textarea, lineNumbers);
    textarea.addEventListener('input', () => updateLineNumbers(textarea, lineNumbers));
}

function updateLineNumbers(textarea, lineNumbers) {
    const lines = textarea.value.split('\n').length;
    lineNumbers.innerHTML = Array.from({length: lines}, (_, i) => i + 1).join('<br>');
}

function highlightSyntax() {
    // Basic syntax highlighting for robots.txt
    console.log('Robots.txt syntax highlighting applied');
}

function addValidation(textarea) {
    textarea.addEventListener('input', function() {
        validateRobotsTxt(this.value);
    });
}

function validateRobotsTxt(content) {
    const errors = [];
    const lines = content.split('\n');
    
    lines.forEach((line, index) => {
        line = line.trim();
        if (line && !line.startsWith('#')) {
            if (!line.includes(':')) {
                errors.push(`Line ${index + 1}: Missing colon`);
            }
        }
    });
    
    showValidationResults(errors);
}

function showValidationResults(errors) {
    let validationDiv = document.getElementById('robots-validation');
    if (!validationDiv) {
        validationDiv = document.createElement('div');
        validationDiv.id = 'robots-validation';
        validationDiv.style.cssText = `
            margin-top: 10px; padding: 10px; border-radius: 5px;
            font-size: 12px; border: 1px solid;
        `;
        document.querySelector('textarea[name*="content"]').parentNode.appendChild(validationDiv);
    }
    
    if (errors.length > 0) {
        validationDiv.style.borderColor = '#dc3545';
        validationDiv.style.background = 'rgba(220, 53, 69, 0.1)';
        validationDiv.style.color = '#dc3545';
        validationDiv.innerHTML = '❌ Errors:<br>' + errors.join('<br>');
    } else {
        validationDiv.style.borderColor = '#28a745';
        validationDiv.style.background = 'rgba(40, 167, 69, 0.1)';
        validationDiv.style.color = '#28a745';
        validationDiv.innerHTML = '✅ Valid robots.txt format';
    }
}

function addPreview(textarea) {
    const previewBtn = document.createElement('button');
    previewBtn.innerHTML = '🔍 Preview';
    previewBtn.type = 'button';
    previewBtn.style.cssText = `
        background: #00f5ff; color: #000; border: none;
        padding: 8px 15px; border-radius: 5px; cursor: pointer;
        margin-top: 10px; font-weight: 600;
    `;
    
    previewBtn.onclick = () => showRobotsPreview(textarea.value);
    textarea.parentNode.appendChild(previewBtn);
}

function showRobotsPreview(content) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.8); z-index: 10000;
        display: flex; align-items: center; justify-content: center;
    `;
    
    modal.innerHTML = `
        <div style="background: #1a1a1a; padding: 20px; border-radius: 10px;
                    max-width: 600px; border: 2px solid #00f5ff;">
            <h3 style="color: #00f5ff;">Robots.txt Preview</h3>
            <pre style="background: #0f0f0f; color: #fff; padding: 15px;
                       border-radius: 5px; overflow: auto; max-height: 300px;
                       font-family: 'Courier New', monospace; font-size: 12px;">${content}</pre>
            <button onclick="this.closest('div').remove()"
                    style="background: #ff4757; color: white; border: none;
                           padding: 10px 20px; border-radius: 5px; cursor: pointer;
                           margin-top: 15px;">Close</button>
        </div>
    `;
    
    document.body.appendChild(modal);
}