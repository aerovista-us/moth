/**
 * Supplier Vetting Scoring System
 * Adds interactive scoring and evaluation functionality to the supplier vetting tool
 */

// Supplier Vetting Scoring System
class SupplierVettingScorer {
    constructor() {
        this.totalScore = 0;
        this.maxScore = 0;
        this.categoryScores = {};
        this.supplierData = {};
        this.init();
    }

    init() {
        this.calculateMaxScore();
        this.setupEventListeners();
        this.loadSavedData();
        this.updateScoreDisplay();
    }

    calculateMaxScore() {
        const checkboxes = document.querySelectorAll('.checklist-checkbox');
        this.maxScore = 0;
        
        checkboxes.forEach(checkbox => {
            const score = parseInt(checkbox.getAttribute('data-score')) || 0;
            this.maxScore += score;
        });
    }

    setupEventListeners() {
        // Listen for checkbox changes
        const checkboxes = document.querySelectorAll('.checklist-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.updateScore();
                this.updateScoreDisplay();
                this.generateRecommendations();
                this.saveData();
            });
        });

        // Listen for form input changes
        const formInputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', () => {
                this.saveData();
            });
        });

        // Add action button listeners
        const actionButtons = document.querySelectorAll('.action-button');
        actionButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleActionButton(e.target);
            });
        });
    }

    updateScore() {
        this.totalScore = 0;
        this.categoryScores = {};

        const checkboxes = document.querySelectorAll('.checklist-checkbox');
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const score = parseInt(checkbox.getAttribute('data-score')) || 0;
                this.totalScore += score;

                // Calculate category scores
                const category = checkbox.closest('.checklist-category');
                if (category) {
                    const categoryTitle = category.querySelector('.category-title').textContent;
                    this.categoryScores[categoryTitle] = (this.categoryScores[categoryTitle] || 0) + score;
                }
            }
        });
    }

    updateScoreDisplay() {
        // Create or update score display
        let scoreDisplay = document.getElementById('scoreDisplay');
        if (!scoreDisplay) {
            scoreDisplay = document.createElement('div');
            scoreDisplay.id = 'scoreDisplay';
            scoreDisplay.className = 'score-display';
            
            // Insert after the checklist
            const checklist = document.querySelector('.checklist-section');
            if (checklist) {
                checklist.insertAdjacentElement('afterend', scoreDisplay);
            }
        }

        const percentage = Math.round((this.totalScore / this.maxScore) * 100);
        const status = this.getStatus(percentage);
        
        scoreDisplay.innerHTML = `
            <div class="score-summary">
                <h3>📊 Supplier Score</h3>
                <div class="score-breakdown">
                    <div class="score-item">
                        <span class="score-label">Total Score:</span>
                        <span class="score-value">${this.totalScore}/${this.maxScore}</span>
                    </div>
                    <div class="score-item">
                        <span class="score-label">Percentage:</span>
                        <span class="score-value">${percentage}%</span>
                    </div>
                    <div class="score-item">
                        <span class="score-label">Status:</span>
                        <span class="score-value status-${status.toLowerCase()}">${status}</span>
                    </div>
                </div>
                <div class="score-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${percentage}%"></div>
                    </div>
                </div>
            </div>
            
            <div class="category-breakdown">
                <h4>📈 Category Breakdown</h4>
                ${this.generateCategoryBreakdown()}
            </div>
        `;

        // Add CSS for score display
        this.addScoreDisplayCSS();
    }

    generateCategoryBreakdown() {
        const categories = document.querySelectorAll('.checklist-category');
        let breakdown = '';

        categories.forEach(category => {
            const categoryTitle = category.querySelector('.category-title').textContent;
            const categoryScore = this.categoryScores[categoryTitle] || 0;
            
            // Calculate max score for this category
            const categoryCheckboxes = category.querySelectorAll('.checklist-checkbox');
            let categoryMaxScore = 0;
            categoryCheckboxes.forEach(checkbox => {
                categoryMaxScore += parseInt(checkbox.getAttribute('data-score')) || 0;
            });

            const categoryPercentage = Math.round((categoryScore / categoryMaxScore) * 100);
            
            breakdown += `
                <div class="category-score">
                    <span class="category-name">${categoryTitle}</span>
                    <span class="category-value">${categoryScore}/${categoryMaxScore} (${categoryPercentage}%)</span>
                    <div class="category-progress">
                        <div class="category-progress-fill" style="width: ${categoryPercentage}%"></div>
                    </div>
                </div>
            `;
        });

        return breakdown;
    }

    getStatus(percentage) {
        if (percentage >= 90) return 'EXCELLENT';
        if (percentage >= 75) return 'GOOD';
        if (percentage >= 60) return 'ACCEPTABLE';
        if (percentage >= 40) return 'NEEDS IMPROVEMENT';
        return 'POOR';
    }

    generateRecommendations() {
        let recommendations = document.getElementById('recommendations');
        if (!recommendations) {
            recommendations = document.createElement('div');
            recommendations.id = 'recommendations';
            recommendations.className = 'recommendations';
            
            const scoreDisplay = document.getElementById('scoreDisplay');
            if (scoreDisplay) {
                scoreDisplay.insertAdjacentElement('afterend', recommendations);
            }
        }

        const percentage = Math.round((this.totalScore / this.maxScore) * 100);
        const recommendationsList = this.getRecommendations(percentage);

        recommendations.innerHTML = `
            <h3>💡 Recommendations</h3>
            <div class="recommendation-items">
                ${recommendationsList.map(rec => `
                    <div class="recommendation-item">
                        <div class="recommendation-title">${rec.title}</div>
                        <div class="recommendation-text">${rec.text}</div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    getRecommendations(percentage) {
        const recommendations = [];

        if (percentage < 40) {
            recommendations.push({
                title: '🚨 High Risk Supplier',
                text: 'This supplier has significant gaps in their capabilities. Consider alternative suppliers or request major improvements before proceeding.'
            });
        } else if (percentage < 60) {
            recommendations.push({
                title: '⚠️ Moderate Risk',
                text: 'This supplier needs improvement in several areas. Request specific improvements and consider backup suppliers.'
            });
        } else if (percentage < 75) {
            recommendations.push({
                title: '✅ Acceptable with Conditions',
                text: 'This supplier meets basic requirements but could benefit from improvements in specific areas.'
            });
        } else if (percentage < 90) {
            recommendations.push({
                title: '👍 Good Supplier',
                text: 'This supplier demonstrates strong capabilities with minor areas for improvement.'
            });
        } else {
            recommendations.push({
                title: '🌟 Excellent Supplier',
                text: 'This supplier exceeds expectations and is highly recommended for partnership.'
            });
        }

        // Add specific category recommendations
        Object.entries(this.categoryScores).forEach(([category, score]) => {
            const categoryElement = document.querySelector(`.category-title:contains("${category}")`)?.closest('.checklist-category');
            if (categoryElement) {
                const categoryCheckboxes = categoryElement.querySelectorAll('.checklist-checkbox');
                let categoryMaxScore = 0;
                categoryCheckboxes.forEach(checkbox => {
                    categoryMaxScore += parseInt(checkbox.getAttribute('data-score')) || 0;
                });
                
                const categoryPercentage = Math.round((score / categoryMaxScore) * 100);
                
                if (categoryPercentage < 50) {
                    recommendations.push({
                        title: `🔍 Focus on ${category}`,
                        text: `This category needs significant attention. Review requirements and request improvements.`
                    });
                }
            }
        });

        return recommendations;
    }

    handleActionButton(button) {
        const buttonText = button.textContent.toLowerCase();
        
        if (buttonText.includes('approve')) {
            this.approveSupplier();
        } else if (buttonText.includes('reject')) {
            this.rejectSupplier();
        } else if (buttonText.includes('export')) {
            this.exportReport();
        } else if (buttonText.includes('save')) {
            this.saveData();
        }
    }

    approveSupplier() {
        const percentage = Math.round((this.totalScore / this.maxScore) * 100);
        
        if (percentage >= 75) {
            alert(`✅ Supplier Approved!\n\nScore: ${percentage}%\nStatus: ${this.getStatus(percentage)}\n\nThis supplier meets our approval criteria.`);
        } else {
            alert(`⚠️ Cannot Approve Supplier\n\nScore: ${percentage}%\nStatus: ${this.getStatus(percentage)}\n\nSupplier must score at least 75% for approval.`);
        }
    }

    rejectSupplier() {
        const percentage = Math.round((this.totalScore / this.maxScore) * 100);
        
        if (confirm(`Are you sure you want to reject this supplier?\n\nScore: ${percentage}%\nStatus: ${this.getStatus(percentage)}`)) {
            alert('❌ Supplier Rejected\n\nThis supplier has been marked as rejected and will not be considered for future orders.');
        }
    }

    exportReport() {
        const report = this.generateReport();
        const blob = new Blob([report], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `supplier-vetting-report-${new Date().toISOString().split('T')[0]}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    }

    generateReport() {
        const percentage = Math.round((this.totalScore / this.maxScore) * 100);
        const status = this.getStatus(percentage);
        
        return `
SUPPLIER VETTING REPORT
Generated: ${new Date().toLocaleString()}

SUPPLIER INFORMATION:
Company: ${document.getElementById('companyName')?.value || 'N/A'}
Contact: ${document.getElementById('contactPerson')?.value || 'N/A'}
Email: ${document.getElementById('email')?.value || 'N/A'}

SCORING SUMMARY:
Total Score: ${this.totalScore}/${this.maxScore}
Percentage: ${percentage}%
Status: ${status}

CATEGORY BREAKDOWN:
${Object.entries(this.categoryScores).map(([category, score]) => {
    const categoryElement = document.querySelector(`.category-title:contains("${category}")`)?.closest('.checklist-category');
    let categoryMaxScore = 0;
    if (categoryElement) {
        const categoryCheckboxes = categoryElement.querySelectorAll('.checklist-checkbox');
        categoryCheckboxes.forEach(checkbox => {
            categoryMaxScore += parseInt(checkbox.getAttribute('data-score')) || 0;
        });
    }
    const categoryPercentage = Math.round((score / categoryMaxScore) * 100);
    return `${category}: ${score}/${categoryMaxScore} (${categoryPercentage}%)`;
}).join('\n')}

RECOMMENDATIONS:
${this.getRecommendations(percentage).map(rec => `• ${rec.title}: ${rec.text}`).join('\n')}

NEXT STEPS:
${percentage >= 75 ? '✅ APPROVE: This supplier meets approval criteria' : '⚠️ REVIEW: Additional evaluation required before approval'}
        `;
    }

    saveData() {
        const data = {
            totalScore: this.totalScore,
            maxScore: this.maxScore,
            categoryScores: this.categoryScores,
            supplierData: this.getSupplierData(),
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('supplierVettingData', JSON.stringify(data));
    }

    loadSavedData() {
        const saved = localStorage.getItem('supplierVettingData');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.totalScore = data.totalScore || 0;
                this.maxScore = data.maxScore || 0;
                this.categoryScores = data.categoryScores || {};
                
                // Restore supplier data
                if (data.supplierData) {
                    Object.entries(data.supplierData).forEach(([key, value]) => {
                        const element = document.getElementById(key);
                        if (element) {
                            element.value = value;
                        }
                    });
                }
                
                // Restore checkbox states
                this.restoreCheckboxStates();
            } catch (e) {
                console.error('Error loading saved data:', e);
            }
        }
    }

    getSupplierData() {
        const data = {};
        const formInputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');
        formInputs.forEach(input => {
            if (input.id) {
                data[input.id] = input.value;
            }
        });
        return data;
    }

    restoreCheckboxStates() {
        // This would need to be implemented based on how we want to restore checkbox states
        // For now, we'll just recalculate the score
        this.updateScore();
    }

    addScoreDisplayCSS() {
        if (document.getElementById('supplierVettingCSS')) return;
        
        const style = document.createElement('style');
        style.id = 'supplierVettingCSS';
        style.textContent = `
            .score-display {
                background: linear-gradient(135deg, #6b46c1, #d4a5a5);
                border-radius: 20px;
                padding: 2rem;
                margin: 2rem 0;
                color: white;
            }
            
            .score-summary h3 {
                margin: 0 0 1rem 0;
                font-size: 1.5rem;
            }
            
            .score-breakdown {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1rem;
                margin: 1rem 0;
            }
            
            .score-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: rgba(255, 255, 255, 0.1);
                padding: 0.75rem;
                border-radius: 10px;
            }
            
            .score-label {
                font-weight: 500;
            }
            
            .score-value {
                font-weight: bold;
                font-size: 1.1rem;
            }
            
            .status-excellent { color: #10b981; }
            .status-good { color: #3b82f6; }
            .status-acceptable { color: #f59e0b; }
            .status-needs improvement { color: #ef4444; }
            .status-poor { color: #dc2626; }
            
            .score-progress {
                margin: 1rem 0;
            }
            
            .progress-bar {
                width: 100%;
                height: 20px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 10px;
                overflow: hidden;
            }
            
            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #10b981, #3b82f6);
                transition: width 0.5s ease;
                border-radius: 10px;
            }
            
            .category-breakdown {
                margin-top: 2rem;
            }
            
            .category-breakdown h4 {
                margin: 0 0 1rem 0;
                font-size: 1.2rem;
            }
            
            .category-score {
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: rgba(255, 255, 255, 0.1);
                padding: 0.75rem;
                border-radius: 10px;
                margin: 0.5rem 0;
            }
            
            .category-name {
                font-weight: 500;
                flex: 1;
            }
            
            .category-value {
                font-weight: bold;
                margin: 0 1rem;
            }
            
            .category-progress {
                width: 100px;
                height: 8px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 4px;
                overflow: hidden;
            }
            
            .category-progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #10b981, #3b82f6);
                transition: width 0.5s ease;
                border-radius: 4px;
            }
            
            .recommendations {
                background: linear-gradient(135deg, #d4a5a5, #6b46c1);
                border-radius: 20px;
                padding: 2rem;
                margin: 2rem 0;
                color: white;
            }
            
            .recommendations h3 {
                margin: 0 0 1rem 0;
                font-size: 1.5rem;
            }
            
            .recommendation-items {
                display: grid;
                gap: 1rem;
            }
            
            .recommendation-item {
                background: rgba(255, 255, 255, 0.1);
                padding: 1rem;
                border-radius: 10px;
            }
            
            .recommendation-title {
                font-weight: bold;
                margin-bottom: 0.5rem;
            }
            
            .recommendation-text {
                font-size: 0.9rem;
                opacity: 0.9;
            }
        `;
        
        document.head.appendChild(style);
    }
}

// Initialize the scoring system when the page loads
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.checklist-checkbox')) {
        window.supplierVettingScorer = new SupplierVettingScorer();
        console.log('✅ Supplier Vetting Scoring System initialized');
    }
});
