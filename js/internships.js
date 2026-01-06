document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements - updated IDs to match HTML
    const searchInput = document.getElementById('search-input');
    const companyFilter = document.getElementById('company-filter');
    const locationFilter = document.getElementById('location-filter');
    const typeFilter = document.getElementById('type-filter');
    const fieldFilter = document.getElementById('field-filter');
    const stipendFilter = document.getElementById('stipend-filter');
    const resetBtn = document.getElementById('reset-filters');
    const sortSelect = document.getElementById('sort-by');
    const resultsCount = document.getElementById('results-count');
    const internshipCards = document.querySelectorAll('.internship-card');
    const noResults = document.querySelector('.no-results');
    const clearFiltersBtn = document.getElementById('clear-filters');

    // Add event listeners
    if (searchInput) searchInput.addEventListener('input', filterAndSearch);
    if (companyFilter) companyFilter.addEventListener('change', filterAndSearch);
    if (locationFilter) locationFilter.addEventListener('change', filterAndSearch);
    if (typeFilter) typeFilter.addEventListener('change', filterAndSearch);
    if (fieldFilter) fieldFilter.addEventListener('change', filterAndSearch);
    if (stipendFilter) stipendFilter.addEventListener('change', filterAndSearch);
    if (sortSelect) sortSelect.addEventListener('change', sortInternships);
    if (resetBtn) resetBtn.addEventListener('click', resetAllFilters);
    if (clearFiltersBtn) clearFiltersBtn.addEventListener('click', resetAllFilters);

    // Add apply button event listeners
    document.querySelectorAll('.apply-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.internship-card');
            const company = card.querySelector('.company').textContent;
            const position = card.querySelector('h3').textContent;
            
            // Show application confirmation
            if (confirm(`Are you sure you want to apply for ${position} at ${company}?`)) {
                this.textContent = 'Applied!';
                this.style.background = '#28a745';
                this.disabled = true;
                
                // Show success message
                showNotification(`Successfully applied for ${position} at ${company}!`, 'success');
            }
        });
    });

    function filterAndSearch() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const selectedCompany = companyFilter ? companyFilter.value : '';
        const selectedLocation = locationFilter ? locationFilter.value : '';
        const selectedType = typeFilter ? typeFilter.value : '';
        const selectedField = fieldFilter ? fieldFilter.value : '';
        const selectedStipend = stipendFilter ? stipendFilter.value : '';

        let visibleCount = 0;

        internshipCards.forEach(card => {
            const company = card.getAttribute('data-company');
            const location = card.getAttribute('data-location');
            const type = card.getAttribute('data-type');
            const field = card.getAttribute('data-field');
            const stipend = parseInt(card.getAttribute('data-stipend'));
            
            const title = card.querySelector('h3').textContent.toLowerCase();
            const companyName = card.querySelector('.company').textContent.toLowerCase();

            // Check search match
            const searchMatch = !searchTerm || 
                title.includes(searchTerm) || 
                companyName.includes(searchTerm);

            // Check filter matches
            const companyMatch = !selectedCompany || company === selectedCompany;
            const locationMatch = !selectedLocation || location === selectedLocation;
            const typeMatch = !selectedType || type === selectedType;
            const fieldMatch = !selectedField || field === selectedField;
            
            let stipendMatch = true;
            if (selectedStipend) {
                const [min, max] = selectedStipend.split('-').map(Number);
                if (max) {
                    stipendMatch = stipend >= min && stipend <= max;
                } else {
                    stipendMatch = stipend >= min;
                }
            }

            // Show/hide card based on all criteria
            if (searchMatch && companyMatch && locationMatch && typeMatch && fieldMatch && stipendMatch) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Update results count
        updateResultsCount(visibleCount);
        
        // Show/hide no results message
        if (noResults) {
            if (visibleCount === 0) {
                noResults.style.display = 'block';
            } else {
                noResults.style.display = 'none';
            }
        }
    }

    function sortInternships() {
        if (!sortSelect) return;
        
        const sortBy = sortSelect.value;
        const container = document.querySelector('.internships-grid');
        const cards = Array.from(internshipCards);

        cards.sort((a, b) => {
            switch (sortBy) {
                case 'stipend-high':
                    return parseInt(b.getAttribute('data-stipend')) - parseInt(a.getAttribute('data-stipend'));
                case 'stipend-low':
                    return parseInt(a.getAttribute('data-stipend')) - parseInt(b.getAttribute('data-stipend'));
                case 'company':
                    return a.getAttribute('data-company').localeCompare(b.getAttribute('data-company'));
                default:
                    return 0;
            }
        });

        // Re-append sorted cards
        cards.forEach(card => container.appendChild(card));
    }

    function resetAllFilters() {
        if (searchInput) searchInput.value = '';
        if (companyFilter) companyFilter.value = '';
        if (locationFilter) locationFilter.value = '';
        if (typeFilter) typeFilter.value = '';
        if (fieldFilter) fieldFilter.value = '';
        if (stipendFilter) stipendFilter.value = '';
        
        // Show all cards
        internshipCards.forEach(card => {
            card.style.display = 'block';
        });
        
        // Hide no results message
        if (noResults) noResults.style.display = 'none';
        
        // Update results count
        updateResultsCount(internshipCards.length);
        
        showNotification('All filters cleared!', 'info');
    }

    function updateResultsCount(count) {
        if (resultsCount) {
            resultsCount.textContent = `Showing ${count} internship${count !== 1 ? 's' : ''}`;
        }
    }

    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '1000',
            opacity: '0',
            transform: 'translateY(-20px)',
            transition: 'all 0.3s ease'
        });

        // Set background color based on type
        switch (type) {
            case 'success':
                notification.style.background = '#28a745';
                break;
            case 'error':
                notification.style.background = '#dc3545';
                break;
            case 'info':
            default:
                notification.style.background = '#667eea';
                break;
        }

        // Add to page
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Initialize with all internships visible
    updateResultsCount(internshipCards.length);
});
