// Document Integration - Moth Wing Power Business Planning
class DocumentIntegration {
    constructor() {
        this.documents = {
            'launch-playbook': {
                name: '30-Day Launch Playbook',
                path: 'tools/launch_playbook_30_days.md',
                type: 'markdown',
                description: 'Complete 30-day launch strategy for Samhain Capsule'
            },
            'product-catalog': {
                name: 'Product Catalog',
                path: 'tools/product_catalog_seed.csv',
                type: 'csv',
                description: 'Product catalog with pricing and SKU information'
            },
            'customer-service': {
                name: 'Customer Service Templates',
                path: 'tools/customer_service_templates.md',
                type: 'markdown',
                description: 'Email templates and customer service procedures'
            },
            'content-calendar': {
                name: 'Content Calendar',
                path: 'tools/content_calendar_2weeks.csv',
                type: 'csv',
                description: '2-week content calendar with social media posts'
            },
            'shipping-policy': {
                name: 'Shipping & Returns Policy',
                path: 'tools/shipping_returns_policy.md',
                type: 'markdown',
                description: 'Shipping, returns, and compliance policies'
            },
            'size-guide': {
                name: 'Size Guide Snippet',
                path: 'tools/size_guide_snippet.html',
                type: 'html',
                description: 'HTML snippet for product size guide'
            },
            'supplier-vetting': {
                name: 'Supplier Vetting Checklist',
                path: 'tools/supplier_vetting_checklist.md',
                type: 'markdown',
                description: 'Checklist for evaluating dropship suppliers'
            }
        };
        
        this.init();
    }
    
    init() {
        this.createDocumentHub();
        this.bindEvents();
        this.loadDocumentData();
    }
    
    createDocumentHub() {
        // Add document hub to the analytics section
        const analyticsSection = document.getElementById('analytics');
        if (analyticsSection) {
            const documentHubHTML = `
                <div class="card mystical-card floating-card">
                    <h3>📚 Business Documents Hub</h3>
                    <div class="document-grid">
                        ${Object.entries(this.documents).map(([key, doc]) => `
                            <div class="document-card" data-document="${key}">
                                <div class="document-icon">${this.getDocumentIcon(doc.type)}</div>
                                <h4>${doc.name}</h4>
                                <p>${doc.description}</p>
                                <div class="document-actions">
                                    <button class="btn mystical-btn" onclick="window.documentIntegration.previewDocument('${key}')">Preview</button>
                                    <button class="btn mystical-btn" onclick="window.documentIntegration.downloadDocument('${key}')">Download</button>
                                    <button class="btn mystical-btn" onclick="window.documentIntegration.editDocument('${key}')">Edit</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="document-upload">
                        <h4>Upload Custom Document</h4>
                        <input type="file" id="documentUpload" accept=".md,.csv,.html,.txt" onchange="handleDocumentUpload(this)">
                        <button class="btn mystical-btn" onclick="document.getElementById('documentUpload').click()">Choose File</button>
                    </div>
                </div>
            `;
            
            analyticsSection.insertAdjacentHTML('beforeend', documentHubHTML);
        }
    }
    
    getDocumentIcon(type) {
        const icons = {
            'markdown': '📝',
            'csv': '📊',
            'html': '🌐',
            'txt': '📄'
        };
        return icons[type] || '📄';
    }
    
    bindEvents() {
        // Document preview events
        document.addEventListener('click', (e) => {
            if (e.target.matches('.document-card')) {
                const documentKey = e.target.closest('.document-card').dataset.document;
                this.previewDocument(documentKey);
            }
        });
    }
    
    async previewDocument(documentKey) {
        const doc = this.documents[documentKey];
        if (!doc) return;
        
        try {
            const response = await fetch(doc.path);
            const content = await response.text();
            
            this.showDocumentPreview(doc.name, content, doc.type);
        } catch (error) {
            console.error('Failed to load document:', error);
            this.showError('Failed to load document. Please check the file path.');
        }
    }
    
    showDocumentPreview(title, content, type) {
        // Create modal for document preview
        const modal = document.createElement('div');
        modal.className = 'document-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="close-btn" onclick="this.closest('.document-modal').remove()">×</button>
                </div>
                <div class="modal-body">
                    <div class="document-content ${type}">
                        ${this.formatContent(content, type)}
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn mystical-btn" onclick="window.documentIntegration.downloadDocument('${Object.keys(this.documents).find(key => this.documents[key].name === title)}')">Download</button>
                    <button class="btn mystical-btn" onclick="this.closest('.document-modal').remove()">Close</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add modal styles
        this.addModalStyles();
    }
    
    formatContent(content, type) {
        switch (type) {
            case 'markdown':
                return this.formatMarkdown(content);
            case 'csv':
                return this.formatCSV(content);
            case 'html':
                return content;
            default:
                return `<pre>${content}</pre>`;
        }
    }
    
    formatMarkdown(content) {
        // Simple markdown formatting
        return content
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
            .replace(/\*(.*)\*/gim, '<em>$1</em>')
            .replace(/^- (.*$)/gim, '<li>$1</li>')
            .replace(/\n/g, '<br>');
    }
    
    formatCSV(content) {
        const lines = content.split('\n');
        const headers = lines[0].split(',');
        const rows = lines.slice(1).map(line => line.split(','));
        
        return `
            <table class="csv-table">
                <thead>
                    <tr>${headers.map(header => `<th>${header}</th>`).join('')}</tr>
                </thead>
                <tbody>
                    ${rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}
                </tbody>
            </table>
        `;
    }
    
    downloadDocument(documentKey) {
        const doc = this.documents[documentKey];
        if (!doc) return;
        
        // Create download link
        const link = document.createElement('a');
        link.href = doc.path;
        link.download = doc.name;
        link.click();
    }
    
    editDocument(documentKey) {
        const doc = this.documents[documentKey];
        if (!doc) return;
        
        // Open in new tab for editing
        window.open(doc.path, '_blank');
    }
    
    async loadDocumentData() {
        // Load CSV data into interactive tables
        try {
            const catalogResponse = await fetch('tools/product_catalog_seed.csv');
            const catalogContent = await catalogResponse.text();
            this.integrateProductCatalog(catalogContent);
            
            const calendarResponse = await fetch('tools/content_calendar_2weeks.csv');
            const calendarContent = await calendarResponse.text();
            this.integrateContentCalendar(calendarContent);
        } catch (error) {
            console.warn('Could not load document data:', error);
        }
    }
    
    integrateProductCatalog(csvContent) {
        const lines = csvContent.split('\n');
        const headers = lines[0].split(',');
        const products = lines.slice(1).map(line => {
            const values = line.split(',');
            const product = {};
            headers.forEach((header, index) => {
                product[header] = values[index];
            });
            return product;
        });
        
        // Add interactive product table to tracking section
        const trackingSection = document.getElementById('tracking');
        if (trackingSection) {
            const productTableHTML = `
                <div class="card mystical-card floating-card">
                    <h3>📦 Product Catalog Integration</h3>
                    <div class="product-table-container">
                        <table class="mystical-table">
                            <thead>
                                <tr>
                                    <th>SKU</th>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>COGS</th>
                                    <th>MSRP</th>
                                    <th>Margin</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${products.map(product => `
                                    <tr>
                                        <td class="mystical-code">${product.SKU}</td>
                                        <td>${product.Name}</td>
                                        <td>${product.Type}</td>
                                        <td>$${product.COGS}</td>
                                        <td>$${product.MSRP}</td>
                                        <td>${product['Gross_Margin_%']}%</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
            
            trackingSection.insertAdjacentHTML('beforeend', productTableHTML);
        }
    }
    
    integrateContentCalendar(csvContent) {
        const lines = csvContent.split('\n');
        const headers = lines[0].split(',');
        const posts = lines.slice(1).map(line => {
            const values = line.split(',');
            const post = {};
            headers.forEach((header, index) => {
                post[header] = values[index];
            });
            return post;
        });
        
        // Add content calendar to planning section
        const planningSection = document.getElementById('planning');
        if (planningSection) {
            const calendarHTML = `
                <div class="card mystical-card floating-card">
                    <h3>📅 Content Calendar Integration</h3>
                    <div class="calendar-grid">
                        ${posts.map(post => `
                            <div class="calendar-item">
                                <div class="calendar-date">${post.date}</div>
                                <div class="calendar-channel">${post.channel}</div>
                                <div class="calendar-content">${post.hook_caption}</div>
                                <div class="calendar-cta">${post.cta_utm}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            
            planningSection.insertAdjacentHTML('beforeend', calendarHTML);
        }
    }
    
    addModalStyles() {
        if (document.getElementById('document-modal-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'document-modal-styles';
        style.textContent = `
            .document-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .modal-content {
                background: white;
                border-radius: 8px;
                max-width: 90vw;
                max-height: 90vh;
                overflow: hidden;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1rem;
                background: var(--moth-gold);
                color: var(--moth-primary);
            }
            
            .close-btn {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: var(--moth-primary);
            }
            
            .modal-body {
                padding: 1rem;
                max-height: 60vh;
                overflow-y: auto;
            }
            
            .modal-footer {
                padding: 1rem;
                background: #f5f5f5;
                display: flex;
                gap: 1rem;
                justify-content: flex-end;
            }
            
            .document-content {
                line-height: 1.6;
            }
            
            .document-content h1,
            .document-content h2,
            .document-content h3 {
                color: var(--moth-primary);
                margin: 1rem 0 0.5rem 0;
            }
            
            .document-content pre {
                background: #f5f5f5;
                padding: 1rem;
                border-radius: 4px;
                overflow-x: auto;
            }
            
            .csv-table {
                width: 100%;
                border-collapse: collapse;
                margin: 1rem 0;
            }
            
            .csv-table th,
            .csv-table td {
                border: 1px solid #ddd;
                padding: 0.5rem;
                text-align: left;
            }
            
            .csv-table th {
                background: var(--moth-gold);
                color: var(--moth-primary);
            }
            
            .document-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 1rem;
                margin: 1rem 0;
            }
            
            .document-card {
                background: rgba(212, 175, 55, 0.1);
                padding: 1rem;
                border-radius: 8px;
                border: 1px solid var(--moth-gold);
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .document-card:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(212, 175, 55, 0.3);
            }
            
            .document-icon {
                font-size: 2rem;
                margin-bottom: 0.5rem;
            }
            
            .document-card h4 {
                color: var(--moth-primary);
                margin-bottom: 0.5rem;
            }
            
            .document-card p {
                color: var(--text-light);
                font-size: 0.9rem;
                margin-bottom: 1rem;
            }
            
            .document-actions {
                display: flex;
                gap: 0.5rem;
            }
            
            .document-actions .btn {
                padding: 0.5rem 1rem;
                font-size: 0.8rem;
            }
            
            .calendar-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 1rem;
                margin: 1rem 0;
            }
            
            .calendar-item {
                background: rgba(212, 175, 55, 0.1);
                padding: 1rem;
                border-radius: 8px;
                border: 1px solid var(--moth-gold);
            }
            
            .calendar-date {
                font-weight: bold;
                color: var(--moth-primary);
                margin-bottom: 0.5rem;
            }
            
            .calendar-channel {
                font-size: 0.9rem;
                color: var(--text-light);
                margin-bottom: 0.5rem;
            }
            
            .calendar-content {
                margin-bottom: 0.5rem;
            }
            
            .calendar-cta {
                font-size: 0.8rem;
                color: var(--moth-gold);
                font-style: italic;
            }
        `;
        document.head.appendChild(style);
    }
    
    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 10px 20px;
            background: #f44336;
            color: white;
            border-radius: 4px;
            z-index: 10000;
        `;
        
        document.body.appendChild(errorDiv);
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 3000);
    }
}

// Global function for file upload
function handleDocumentUpload(input) {
    const file = input.files[0];
    if (file) {
        // Handle custom document upload
        console.log('Uploading document:', file.name);
        // You could implement file upload logic here
    }
}

// Initialize document integration when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.documentIntegration = new DocumentIntegration();
});
