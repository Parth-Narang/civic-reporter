const translations = {
  hi: {
    'Civic Reporter': 'सिविक रिपोर्टर',
    'Home': 'होम',
    'Report Issue': 'समस्या रिपोर्ट करें',
    'My Reports': 'मेरी रिपोर्ट्स',
    'Admin Dashboard': 'प्रशासनिक डैशबोर्ड',
    'Civic Issue Reporting System': 'सिविक समस्या रिपोर्टिंग सिस्टम',
    'Report an Issue': 'समस्या दर्ज करें',
    'View Reports': 'रिपोर्ट्स देखें',
    'Total Issues': 'कुल समस्याएँ',
    'Resolved': 'सुलझाई गई',
    'Pending': 'लंबित',
    'In Progress': 'प्रगति में',
    'Issue Title *': 'समस्या का शीर्षक *',
    'Category *': 'श्रेणी *',
    'Priority *': 'प्राथमिकता *',
    'Location *': 'स्थान *',
    'Description *': 'विवरण *',
    'Upload Photo': 'फोटो अपलोड करें',
    'Submit Issue Report': 'समस्या रिपोर्ट सबमिट करें',
    'Track the status of your submitted issues.': 'अपनी सबमिट की गई समस्याओं की स्थिति ट्रैक करें।',
    'All Status': 'सभी स्थितियाँ',
    'All Categories': 'सभी श्रेणियाँ',
    'No reports found': 'कोई रिपोर्ट नहीं मिली',
    'You haven\'t reported any issues yet or no issues match your search criteria.': 'आपने अभी तक कोई समस्या रिपोर्ट नहीं की है या कोई मेल नहीं खा रही।',
    'Admin Dashboard': 'प्रशासनिक डैशबोर्ड',
    'Manage and update reported issues.': 'रिपोर्ट की गई समस्याओं का प्रबंधन और अद्यतन करें।',
    'Total Reports': 'कुल रिपोर्ट्स',
    'Submitted': 'सबमिट की गई',
    'Issue Details': 'समस्या का विवरण',
    'Close modal': 'मोडल बंद करें',
    'Close message': 'संदेश बंद करें'
    // Add more translations as needed
  }
};

function setLanguage(lang = 'en') {
  document.querySelectorAll('[data-i18n]').forEach(node => {
    const key = node.getAttribute('data-i18n');
    node.textContent = (lang === 'hi' ? translations.hi[key] || key : key);
  });
}

// Civic Issue Reporting System JavaScript

class CivicReporter {
    constructor() {
        this.currentUser = 'user1'; // Simulate current user
        this.issues = [];
        this.filteredIssues = [];
        this.currentSection = 'home';
        
        this.init();
    }

    init() {
        this.loadSampleData();
        this.bindEvents();
        this.updateStats();
        this.showSection('home');
    }

    loadSampleData() {
        // Load from localStorage or use sample data
        const storedIssues = localStorage.getItem('civicIssues');
        if (storedIssues) {
            this.issues = JSON.parse(storedIssues);
        } else {
            // Sample data from provided JSON including 6 issues
            this.issues = [
                {
                    id: 1,
                    title: "Large pothole on Main Street",
                    description: "There is a large pothole near the intersection of Main Street and Oak Avenue that is causing damage to vehicles.",
                    category: "Pothole",
                    priority: "High",
                    location: "Main Street & Oak Avenue",
                    photo: null,
                    status: "In Progress",
                    dateSubmitted: "2025-08-28",
                    dateUpdated: "2025-08-30",
                    userId: "user1",
                },
                {
                    id: 2,
                    title: "Broken street light on Park Road",
                    description: "The street light pole #47 on Park Road has been out for over a week, creating safety concerns.",
                    category: "Street Light",
                    priority: "Medium",
                    location: "Park Road, Pole #47",
                    photo: null,
                    status: "Submitted",
                    dateSubmitted: "2025-08-25",
                    dateUpdated: "2025-08-25",
                    userId: "user2",
                },
                {
                    id: 3,
                    title: "Water supply disruption in Sector 15",
                    description: "No water supply for the past 3 days in Sector 15, Block A. Residents are facing severe inconvenience.",
                    category: "Water Supply",
                    priority: "Emergency",
                    location: "Sector 15, Block A",
                    photo: null,
                    status: "Submitted",
                    dateSubmitted: "2025-08-20",
                    dateUpdated: "2025-08-22",
                    userId: "user3",
                },
                {
                    id: 4,
                    title: "Garbage accumulation near bus stop",
                    description: "Large amount of garbage has been accumulating near the central bus stop for several days.",
                    category: "Garbage",
                    priority: "Medium",
                    location: "Central Bus Stop, City Center",
                    photo: null,
                    status: "Submitted",
                    dateSubmitted: "2025-08-29",
                    dateUpdated: "2025-08-29",
                    userId: "user1",
                },
                {
                    id: 5,
                    title: "Traffic signal malfunction at 5th Avenue",
                    description: "Traffic signal at the intersection of 5th Avenue and Main Street is not functioning properly causing traffic jams.",
                    category: "Traffic Signal",
                    priority: "High",
                    location: "5th Avenue & Main Street",
                    photo: "https://www.bing.com/images/search?q=pothole+image&id=5424BCA374BC630578A50DE5C4EFBF3603767DC1&FORM=IACFIR",
                    status: "Submitted",
                    dateSubmitted: "2025-08-31",
                    dateUpdated: "2025-08-31",
                    userId: "user4",
                },
                {
                    id: 6,
                    title: "Water leakage near Elm Park",
                    description: "There is a major water leakage near Elm Park fountain. The water waste is significant.",
                    category: "Water Supply",
                    priority: "Medium",
                    location: "Elm Park Fountain Area",
                    photo: null,
                    status: "In Progress",
                    dateSubmitted: "2025-08-30",
                    dateUpdated: "2025-09-01",
                    userId: "user2",
                },
            ];
            this.saveToStorage(); // Save sample data to localStorage
        }
    }

    saveToStorage() {
        localStorage.setItem('civicIssues', JSON.stringify(this.issues));
    }

    bindEvents() {
        // Navigation events
        document.querySelectorAll('[data-nav]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = e.target.getAttribute('data-nav');
                this.showSection(section);
            });
        });

        // Mobile navigation toggle
        const navToggle = document.querySelector('.nav__toggle');
        const navMenu = document.querySelector('.nav__menu');
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }

        // Form submission
        const reportForm = document.getElementById('report-form');
        if (reportForm) {
            reportForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitIssue();
            });
        }

        // GPS location
        const locationBtn = document.getElementById('get-location');
        if (locationBtn) {
            locationBtn.addEventListener('click', () => {
                this.getCurrentLocation();
            });
        }

        // Photo preview
        const photoInput = document.getElementById('issue-photo');
        if (photoInput) {
            photoInput.addEventListener('change', (e) => {
                this.previewPhoto(e.target.files[0]);
            });
        }

        // Search and filter events
        this.bindSearchAndFilter();

        // Modal events
        this.bindModalEvents();

        // Toast close
        const toastClose = document.querySelector('.toast__close');
        if (toastClose) {
            toastClose.addEventListener('click', () => {
                this.hideToast();
            });
        }
    }

    bindSearchAndFilter() {
        // User reports search and filter
        const reportsSearch = document.getElementById('reports-search');
        const reportsStatusFilter = document.getElementById('reports-status-filter');
        const reportsCategoryFilter = document.getElementById('reports-category-filter');

        if (reportsSearch) {
            reportsSearch.addEventListener('input', () => this.renderUserReports());
        }
        if (reportsStatusFilter) {
            reportsStatusFilter.addEventListener('change', () => this.renderUserReports());
        }
        if (reportsCategoryFilter) {
            reportsCategoryFilter.addEventListener('change', () => this.renderUserReports());
        }

        // Admin search and filter
        const adminSearch = document.getElementById('admin-search');
        const adminStatusFilter = document.getElementById('admin-status-filter');
        const adminCategoryFilter = document.getElementById('admin-category-filter');

        if (adminSearch) {
            adminSearch.addEventListener('input', () => this.renderAdminReports());
        }
        if (adminStatusFilter) {
            adminStatusFilter.addEventListener('change', () => this.renderAdminReports());
        }
        if (adminCategoryFilter) {
            adminCategoryFilter.addEventListener('change', () => this.renderAdminReports());
        }
    }

    bindModalEvents() {
        const modal = document.getElementById('issue-modal');
        const modalClose = document.querySelector('.modal__close');
        const modalBackdrop = document.querySelector('.modal__backdrop');

        if (modalClose) {
            modalClose.addEventListener('click', () => this.hideModal());
        }
        if (modalBackdrop) {
            modalBackdrop.addEventListener('click', () => this.hideModal());
        }
        
        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideModal();
            }
        });
    }

    showSection(sectionName) {
        // Update navigation
        document.querySelectorAll('.nav__link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-nav="${sectionName}"]`).classList.add('active');

        // Show section
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionName).classList.add('active');

        this.currentSection = sectionName;

        // Load section-specific data
        switch (sectionName) {
            case 'home':
                this.updateStats();
                break;
            case 'my-reports':
                this.renderUserReports();
                break;
            case 'admin':
                this.renderAdminReports();
                this.updateAdminStats();
                break;
        }
    }

    submitIssue() {
        const form = document.getElementById('report-form');

        const title = document.getElementById('issue-title').value.trim();
        const description = document.getElementById('issue-description').value.trim();
        const category = document.getElementById('issue-category').value;
        const priority = document.getElementById('issue-priority').value;
        const location = document.getElementById('issue-location').value.trim();
        const photoFile = document.getElementById('issue-photo').files[0];

        // Validation
        if (!title || !description || !category || !priority || !location) {
            this.showToast('Please fill in all required fields', 'error');
            return;
        }

        // Create new issue
        const newIssue = {
            id: Date.now(),
            title,
            description,
            category,
            priority,
            location,
            photo: photoFile ? URL.createObjectURL(photoFile) : null,
            status: 'Submitted',
            dateSubmitted: new Date().toISOString().split('T')[0],
            dateUpdated: new Date().toISOString().split('T')[0],
            userId: this.currentUser
        };

        this.issues.unshift(newIssue);
        this.saveToStorage();

        // Reset form and show success message
        form.reset();
        this.clearPhotoPreview();
        this.showToast('Issue reported successfully!', 'success');
        this.updateStats();

        // Navigate to My Reports after delay
        setTimeout(() => {
            this.showSection('my-reports');
        }, 2000);
    }

    getCurrentLocation() {
        const locationBtn = document.getElementById('get-location');
        const locationInput = document.getElementById('issue-location');
        
        if (!navigator.geolocation) {
            this.showToast('Geolocation is not supported by this browser', 'error');
            return;
        }

        locationBtn.classList.add('loading');
        locationBtn.disabled = true;

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                locationInput.value = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
                locationBtn.classList.remove('loading');
                locationBtn.disabled = false;
                this.showToast('Location detected successfully!', 'success');
            },
            (error) => {
                locationBtn.classList.remove('loading');
                locationBtn.disabled = false;
                this.showToast('Unable to get your location. Please enter manually.', 'error');
            },
            { timeout: 10000, enableHighAccuracy: true }
        );
    }

    previewPhoto(file) {
        const preview = document.getElementById('photo-preview');
        
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                preview.innerHTML = `<img src="${e.target.result}" alt="Photo preview">`;
            };
            reader.readAsDataURL(file);
        } else {
            this.clearPhotoPreview();
        }
    }

    clearPhotoPreview() {
        const preview = document.getElementById('photo-preview');
        preview.innerHTML = '';
    }

    updateStats() {
        const total = this.issues.length;
        const resolved = this.issues.filter(issue => issue.status === 'Resolved').length;
        const pending = this.issues.filter(issue => issue.status === 'Submitted').length;
        const inProgress = this.issues.filter(issue => issue.status === 'In Progress').length;

        document.getElementById('total-issues').textContent = total;
        document.getElementById('resolved-issues').textContent = resolved;
        document.getElementById('pending-issues').textContent = pending;
        document.getElementById('in-progress-issues').textContent = inProgress;
    }

    updateAdminStats() {
        const total = this.issues.length;
        const submitted = this.issues.filter(issue => issue.status === 'Submitted').length;
        const progress = this.issues.filter(issue => issue.status === 'In Progress').length;
        const resolved = this.issues.filter(issue => issue.status === 'Resolved').length;

        document.getElementById('admin-total').textContent = total;
        document.getElementById('admin-submitted').textContent = submitted;
        document.getElementById('admin-progress').textContent = progress;
        document.getElementById('admin-resolved').textContent = resolved;
    }

    renderUserReports() {
        const container = document.getElementById('reports-list');
        const userIssues = this.issues.filter(issue => issue.userId === this.currentUser);
        
        const searchTerm = document.getElementById('reports-search').value.toLowerCase();
        const statusFilter = document.getElementById('reports-status-filter').value;
        const categoryFilter = document.getElementById('reports-category-filter').value;

        let filteredIssues = userIssues.filter(issue => {
            const matchesSearch = issue.title.toLowerCase().includes(searchTerm) || 
                                  issue.description.toLowerCase().includes(searchTerm) ||
                                  issue.location.toLowerCase().includes(searchTerm);
            const matchesStatus = !statusFilter || issue.status === statusFilter;
            const matchesCategory = !categoryFilter || issue.category === categoryFilter;
            
            return matchesSearch && matchesStatus && matchesCategory;
        });

        if (filteredIssues.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <h3>No reports found</h3>
                    <p>You haven't reported any issues yet or no issues match your search criteria.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = filteredIssues.map(issue => this.createIssueCard(issue, false)).join('');
        this.bindIssueCardEvents();
    }

    renderAdminReports() {
        const container = document.getElementById('admin-list');
        
        const searchTerm = document.getElementById('admin-search').value.toLowerCase();
        const statusFilter = document.getElementById('admin-status-filter').value;
        const categoryFilter = document.getElementById('admin-category-filter').value;

        let filteredIssues = this.issues.filter(issue => {
            const matchesSearch = issue.title.toLowerCase().includes(searchTerm) || 
                                  issue.description.toLowerCase().includes(searchTerm) ||
                                  issue.location.toLowerCase().includes(searchTerm);
            const matchesStatus = !statusFilter || issue.status === statusFilter;
            const matchesCategory = !categoryFilter || issue.category === categoryFilter;
            
            return matchesSearch && matchesStatus && matchesCategory;
        });

        if (filteredIssues.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <h3>No reports found</h3>
                    <p>No issues match your search criteria.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = filteredIssues.map(issue => this.createIssueCard(issue, true)).join('');
        this.bindIssueCardEvents();
        this.bindStatusChangeEvents();
    }

    createIssueCard(issue, isAdmin = false) {
        const statusClass = `status--${issue.status.toLowerCase().replace(' ', '-')}`;
        const priorityClass = `priority--${issue.priority.toLowerCase()}`;
        
        return `
            <div class="issue-card ${isAdmin ? 'admin-card' : ''}" data-issue-id="${issue.id}">
                <div class="issue-card__header">
                    <h3 class="issue-card__title">${issue.title}</h3>
                    <span class="status ${statusClass}">${issue.status}</span>
                </div>
                
                <div class="issue-card__meta">
                    <div class="issue-card__meta-item">
                        <span class="issue-card__meta-label">Category</span>
                        <span class="issue-card__meta-value">${issue.category}</span>
                    </div>
                    <div class="issue-card__meta-item">
                        <span class="issue-card__meta-label">Priority</span>
                        <span class="priority ${priorityClass}">${issue.priority}</span>
                    </div>
                    <div class="issue-card__meta-item">
                        <span class="issue-card__meta-label">Location</span>
                        <span class="issue-card__meta-value">${issue.location}</span>
                    </div>
                    <div class="issue-card__meta-item">
                        <span class="issue-card__meta-label">Date</span>
                        <span class="issue-card__meta-value">${new Date(issue.dateSubmitted).toLocaleDateString()}</span>
                    </div>
                    ${isAdmin ? `
                    <div class="issue-card__meta-item">
                        <span class="issue-card__meta-label">User ID</span>
                        <span class="issue-card__meta-value">${issue.userId}</span>
                    </div>
                    ` : ''}
                </div>
                
                <p class="issue-card__description">${issue.description}</p>
                
                <div class="issue-card__actions">
                    <button class="btn btn--outline btn--sm view-details" data-issue-id="${issue.id}">
                        View Details
                    </button>
                    ${isAdmin ? `
                    <select class="form-control status-select" data-issue-id="${issue.id}" onclick="event.stopPropagation();">
                        <option value="Submitted" ${issue.status === 'Submitted' ? 'selected' : ''}>Submitted</option>
                        <option value="In Progress" ${issue.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                        <option value="Resolved" ${issue.status === 'Resolved' ? 'selected' : ''}>Resolved</option>
                        <option value="Rejected" ${issue.status === 'Rejected' ? 'selected' : ''}>Rejected</option>
                    </select>
                    ` : ''}
                </div>
            </div>
        `;
    }

    bindIssueCardEvents() {
        document.querySelectorAll('.view-details').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const issueId = parseInt(button.getAttribute('data-issue-id'));
                this.showIssueModal(issueId);
            });
        });

        document.querySelectorAll('.issue-card').forEach(card => {
            card.addEventListener('click', (e) => {
                // Don't trigger if clicking on the status select
                if (e.target.classList.contains('status-select')) {
                    return;
                }
                const issueId = parseInt(card.getAttribute('data-issue-id'));
                this.showIssueModal(issueId);
            });
        });
    }

    bindStatusChangeEvents() {
        document.querySelectorAll('.status-select').forEach(select => {
            select.addEventListener('change', (e) => {
                e.stopPropagation();
                const issueId = parseInt(select.getAttribute('data-issue-id'));
                const newStatus = select.value;
                this.updateIssueStatus(issueId, newStatus);
            });
        });
    }

    updateIssueStatus(issueId, newStatus) {
        const issueIndex = this.issues.findIndex(issue => issue.id === issueId);
        if (issueIndex !== -1) {
            const oldStatus = this.issues[issueIndex].status;
            this.issues[issueIndex].status = newStatus;
            this.issues[issueIndex].dateUpdated = new Date().toISOString().split('T')[0];
            this.saveToStorage();
            
            this.updateStats();
            this.updateAdminStats();
            this.renderAdminReports();
            
            this.showToast(`Issue status updated from ${oldStatus} to ${newStatus}`, 'success');
        }
    }

    showIssueModal(issueId) {
        const issue = this.issues.find(i => i.id === issueId);
        if (!issue) return;

        const modal = document.getElementById('issue-modal');
        const modalBody = document.getElementById('modal-body');

        const statusClass = `status--${issue.status.toLowerCase().replace(' ', '-')}`;
        const priorityClass = `priority--${issue.priority.toLowerCase()}`;

        modalBody.innerHTML = `
            <div class="modal-detail">
                <div class="modal-detail__item">
                    <span class="modal-detail__label">Title:</span>
                    <span class="modal-detail__value">${issue.title}</span>
                </div>
                <div class="modal-detail__item">
                    <span class="modal-detail__label">Status:</span>
                    <span class="status ${statusClass}">${issue.status}</span>
                </div>
                <div class="modal-detail__item">
                    <span class="modal-detail__label">Priority:</span>
                    <span class="priority ${priorityClass}">${issue.priority}</span>
                </div>
                <div class="modal-detail__item">
                    <span class="modal-detail__label">Category:</span>
                    <span class="modal-detail__value">${issue.category}</span>
                </div>
                <div class="modal-detail__item">
                    <span class="modal-detail__label">Location:</span>
                    <span class="modal-detail__value">${issue.location}</span>
                </div>
                <div class="modal-detail__item">
                    <span class="modal-detail__label">Submitted:</span>
                    <span class="modal-detail__value">${new Date(issue.dateSubmitted).toLocaleDateString()}</span>
                </div>
                <div class="modal-detail__item">
                    <span class="modal-detail__label">Last Updated:</span>
                    <span class="modal-detail__value">${new Date(issue.dateUpdated).toLocaleDateString()}</span>
                </div>
                <div class="modal-detail__item">
                    <span class="modal-detail__label">Description:</span>
                    <span class="modal-detail__value">${issue.description}</span>
                </div>
                ${issue.photo ? `
                <div class="modal-detail__photo">
                    <img src="${issue.photo}" alt="Issue photo">
                </div>
                ` : ''}
            </div>
        `;

        modal.classList.remove('hidden');
    }

    hideModal() {
        const modal = document.getElementById('issue-modal');
        modal.classList.add('hidden');
    }

    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toast-message');
        
        toastMessage.textContent = message;
        toast.className = `toast ${type === 'error' ? 'toast--error' : ''}`;
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            this.hideToast();
        }, 5000);
    }

    hideToast() {
        const toast = document.getElementById('toast');
        toast.classList.add('hidden');
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CivicReporter();
    const langSelect = document.getElementById("language-select");
if (langSelect) {
  langSelect.addEventListener("change", function() {
    setLanguage(this.value);
  });
  // Set initial language on load
  setLanguage(langSelect.value);
}

});
