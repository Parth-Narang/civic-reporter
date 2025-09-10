// Civic Reporting System JavaScript
class CivicReportApp {
    constructor() {
        this.currentView = 'dashboard';
        this.issues = [];
        this.categories = [];
        this.departments = [];
        this.dashboardStats = {};
        
        this.init();
    }

    init() {
        this.loadSampleData();
        this.setupEventListeners();
        this.setupTheme();
        this.renderCurrentView();
        this.populateCategories();
        this.showToast('Welcome to CivicReport!', 'info');
    }

    // Load sample data from the provided JSON
    loadSampleData() {
        const sampleData = {
            "sampleIssues": [
                {
                    "id": "ISS-2025-001",
                    "title": "Large pothole on Main Street near City Hall",
                    "category": "roads",
                    "description": "Deep pothole approximately 2 feet wide causing vehicle damage. Multiple cars have hit this pothole in the past week.",
                    "location": {
                        "address": "123 Main Street, Downtown",
                        "coordinates": {"lat": 40.7128, "lng": -74.0060}
                    },
                    "photos": ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400"],
                    "status": "in_progress",
                    "priority": "high",
                    "submittedBy": "Sarah Johnson", 
                    "submittedAt": "2025-09-09T14:30:00Z",
                    "assignedTo": "Public Works Department",
                    "estimatedCompletion": "2025-09-15",
                    "updates": [
                        {"date": "2025-09-09T14:30:00Z", "status": "submitted", "note": "Issue reported by citizen"},
                        {"date": "2025-09-10T09:15:00Z", "status": "assigned", "note": "Assigned to Public Works crew #3"},
                        {"date": "2025-09-11T08:00:00Z", "status": "in_progress", "note": "Work crew dispatched to location"}
                    ]
                },
                {
                    "id": "ISS-2025-002", 
                    "title": "Broken streetlight on Oak Avenue",
                    "category": "lighting",
                    "description": "Streetlight has been out for 3 days creating safety concern for pedestrians at night.",
                    "location": {
                        "address": "456 Oak Avenue, Riverside District", 
                        "coordinates": {"lat": 40.7589, "lng": -73.9851}
                    },
                    "photos": ["https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=400"],
                    "status": "submitted",
                    "priority": "medium",
                    "submittedBy": "Mike Rodriguez",
                    "submittedAt": "2025-09-10T19:45:00Z", 
                    "assignedTo": null,
                    "updates": [
                        {"date": "2025-09-10T19:45:00Z", "status": "submitted", "note": "Issue reported by citizen"}
                    ]
                },
                {
                    "id": "ISS-2025-003",
                    "title": "Overflowing garbage bins at Central Park",
                    "category": "waste", 
                    "description": "Multiple garbage bins overflowing with trash scattered around. Attracting pests and creating unsanitary conditions.",
                    "location": {
                        "address": "Central Park, Recreation Area",
                        "coordinates": {"lat": 40.7831, "lng": -73.9712}
                    },
                    "photos": ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"],
                    "status": "resolved",
                    "priority": "medium", 
                    "submittedBy": "Lisa Chen",
                    "submittedAt": "2025-09-08T16:20:00Z",
                    "assignedTo": "Sanitation Department",
                    "completedAt": "2025-09-09T11:30:00Z",
                    "updates": [
                        {"date": "2025-09-08T16:20:00Z", "status": "submitted", "note": "Issue reported by citizen"},
                        {"date": "2025-09-08T17:45:00Z", "status": "assigned", "note": "Assigned to Sanitation crew #1"},
                        {"date": "2025-09-09T07:30:00Z", "status": "in_progress", "note": "Crew en route to location"}, 
                        {"date": "2025-09-09T11:30:00Z", "status": "resolved", "note": "Bins emptied and area cleaned. Additional pickup scheduled."}
                    ]
                }
            ],
            "categories": [
                {"id": "roads", "name": "Roads & Streets", "icon": "🛣️", "department": "Public Works"},
                {"id": "lighting", "name": "Street Lighting", "icon": "💡", "department": "Utilities"},
                {"id": "waste", "name": "Waste Management", "icon": "🗑️", "department": "Sanitation"},
                {"id": "water", "name": "Water & Sewer", "icon": "💧", "department": "Utilities"},
                {"id": "parks", "name": "Parks & Recreation", "icon": "🌳", "department": "Parks & Recreation"},
                {"id": "traffic", "name": "Traffic & Parking", "icon": "🚦", "department": "Transportation"},
                {"id": "housing", "name": "Housing & Buildings", "icon": "🏠", "department": "Building Services"},
                {"id": "other", "name": "Other", "icon": "📝", "department": "General Services"}
            ],
            "departments": [
                {
                    "id": "public-works",
                    "name": "Public Works Department",
                    "description": "Roads, sidewalks, infrastructure maintenance",
                    "categories": ["roads", "sidewalks", "infrastructure"],
                    "averageResponseTime": "2-3 business days",
                    "contact": "publicworks@city.gov"
                },
                {
                    "id": "utilities", 
                    "name": "Utilities Department",
                    "description": "Water, sewer, electrical, street lighting",
                    "categories": ["water", "lighting", "electrical"],
                    "averageResponseTime": "1-2 business days", 
                    "contact": "utilities@city.gov"
                },
                {
                    "id": "sanitation",
                    "name": "Sanitation Department", 
                    "description": "Waste collection, recycling, street cleaning",
                    "categories": ["waste", "recycling", "cleaning"],
                    "averageResponseTime": "24-48 hours",
                    "contact": "sanitation@city.gov"
                }
            ],
            "dashboardStats": {
                "totalIssues": 1247,
                "openIssues": 89,
                "inProgress": 34,
                "resolved": 1124,
                "avgResponseTime": "2.3 days",
                "citizenSatisfaction": "87%"
            }
        };

        // Load from localStorage or use sample data
        this.issues = this.getFromStorage('civicIssues') || sampleData.sampleIssues;
        this.categories = sampleData.categories;
        this.departments = sampleData.departments;
        this.dashboardStats = sampleData.dashboardStats;
        
        // Save to localStorage
        this.saveToStorage('civicIssues', this.issues);
    }

    setupEventListeners() {
        // Navigation - using event delegation for better reliability
        document.addEventListener('click', (e) => {
            // Handle navigation buttons
            if (e.target.hasAttribute('data-view')) {
                e.preventDefault();
                const view = e.target.getAttribute('data-view');
                this.navigateToView(view);
                return;
            }

            // Handle modal close
            if (e.target.classList.contains('modal-close') || e.target.classList.contains('modal')) {
                this.closeModal();
                return;
            }

            // Handle theme toggle
            if (e.target.classList.contains('theme-toggle')) {
                this.toggleTheme();
                return;
            }

            // Handle GPS location button
            if (e.target.id === 'get-location') {
                this.getGPSLocation();
                return;
            }

            // Handle photo upload area
            if (e.target.closest('#photo-upload')) {
                const photoInput = document.getElementById('photo-input');
                if (photoInput) photoInput.click();
                return;
            }
        });

        // Mobile menu toggle
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        if (mobileToggle) {
            mobileToggle.addEventListener('click', this.toggleMobileMenu);
        }

        // Report form
        const reportForm = document.getElementById('issue-report-form');
        if (reportForm) {
            reportForm.addEventListener('submit', this.handleReportSubmit.bind(this));
        }

        // Photo upload
        const photoInput = document.getElementById('photo-input');
        if (photoInput) {
            photoInput.addEventListener('change', this.handlePhotoUpload.bind(this));
        }

        // Search and filters
        const searchInput = document.getElementById('issue-search');
        if (searchInput) {
            searchInput.addEventListener('input', this.handleSearch.bind(this));
        }

        const statusFilter = document.getElementById('status-filter');
        if (statusFilter) {
            statusFilter.addEventListener('change', this.handleFilter.bind(this));
        }

        // Admin filters
        const adminDeptFilter = document.getElementById('admin-department-filter');
        const adminStatusFilter = document.getElementById('admin-status-filter');
        if (adminDeptFilter) adminDeptFilter.addEventListener('change', this.renderAdminView.bind(this));
        if (adminStatusFilter) adminStatusFilter.addEventListener('change', this.renderAdminView.bind(this));

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    setupTheme() {
        const savedTheme = this.getFromStorage('civicTheme') || 'dark';
        document.documentElement.setAttribute('data-color-scheme', savedTheme);
        this.updateThemeToggle(savedTheme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-color-scheme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-color-scheme', newTheme);
        this.saveToStorage('civicTheme', newTheme);
        this.updateThemeToggle(newTheme);
        
        this.showToast(`Switched to ${newTheme} mode`, 'info');
    }

    updateThemeToggle(theme) {
        const toggle = document.querySelector('.theme-toggle');
        if (toggle) {
            toggle.textContent = theme === 'dark' ? '☀️' : '🌙';
            toggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
        }
    }

    navigateToView(viewName) {
        console.log('Navigating to view:', viewName);
        
        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-view') === viewName) {
                btn.classList.add('active');
            }
        });

        // Hide all views
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });

        // Show target view
        const targetView = document.getElementById(`${viewName}-view`);
        if (targetView) {
            targetView.classList.add('active');
            this.currentView = viewName;
            this.renderCurrentView();
            
            // Update page title
            document.title = `CivicReport - ${viewName.charAt(0).toUpperCase() + viewName.slice(1)}`;
        } else {
            console.error('View not found:', `${viewName}-view`);
        }
    }

    renderCurrentView() {
        console.log('Rendering view:', this.currentView);
        
        switch (this.currentView) {
            case 'dashboard':
                this.renderDashboard();
                break;
            case 'track':
                this.renderTrackView();
                break;
            case 'admin':
                this.renderAdminView();
                break;
            case 'report':
                // Report view is static, just ensure form is reset
                const form = document.getElementById('issue-report-form');
                if (form) {
                    form.reset();
                    const photoPreview = document.getElementById('photo-preview');
                    if (photoPreview) photoPreview.innerHTML = '';
                }
                break;
        }
    }

    renderDashboard() {
        // Update statistics
        const stats = this.calculateStats();
        Object.entries(stats).forEach(([key, value]) => {
            const element = document.querySelector(`[data-stat="${key}"]`);
            if (element) {
                element.textContent = value.toLocaleString();
            }
        });

        // Render recent issues
        const feed = document.getElementById('recent-issues-feed');
        if (feed) {
            const recentIssues = this.issues.slice(0, 5);
            feed.innerHTML = recentIssues.map(issue => this.createIssueCard(issue)).join('');
            
            // Add click handlers for issue cards
            feed.querySelectorAll('.issue-card').forEach((card, index) => {
                card.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.showIssueModal(recentIssues[index]);
                });
            });
        }
    }

    renderTrackView() {
        const container = document.getElementById('issues-list');
        if (!container) return;

        const searchTerm = document.getElementById('issue-search')?.value.toLowerCase() || '';
        const statusFilter = document.getElementById('status-filter')?.value || '';

        let filteredIssues = this.issues.filter(issue => {
            const matchesSearch = !searchTerm || 
                issue.title.toLowerCase().includes(searchTerm) ||
                issue.description.toLowerCase().includes(searchTerm) ||
                issue.id.toLowerCase().includes(searchTerm);
            
            const matchesStatus = !statusFilter || issue.status === statusFilter;
            
            return matchesSearch && matchesStatus;
        });

        container.innerHTML = filteredIssues.map(issue => this.createIssueCard(issue, true)).join('');
        
        // Add click handlers
        container.querySelectorAll('.issue-card').forEach((card, index) => {
            card.addEventListener('click', (e) => {
                e.stopPropagation();
                this.showIssueModal(filteredIssues[index]);
            });
        });
    }

    renderAdminView() {
        const container = document.getElementById('admin-issues-list');
        if (!container) return;

        const deptFilter = document.getElementById('admin-department-filter')?.value || '';
        const statusFilter = document.getElementById('admin-status-filter')?.value || '';

        let filteredIssues = this.issues.filter(issue => {
            const matchesDept = !deptFilter || issue.assignedTo === deptFilter;
            const matchesStatus = !statusFilter || issue.status === statusFilter;
            return matchesDept && matchesStatus;
        });

        container.innerHTML = filteredIssues.map(issue => this.createAdminIssueCard(issue)).join('');
    }

    createIssueCard(issue, showActions = false) {
        const category = this.categories.find(cat => cat.id === issue.category);
        const timeAgo = this.getTimeAgo(new Date(issue.submittedAt));
        
        return `
            <div class="issue-card" data-issue-id="${issue.id}">
                <div class="issue-card-header">
                    <h4 class="issue-title">${issue.title}</h4>
                    <span class="issue-id">${issue.id}</span>
                </div>
                <div class="issue-meta">
                    <span>${category ? category.icon + ' ' + category.name : 'Other'}</span>
                    <span>📍 ${issue.location.address}</span>
                    <span>⏰ ${timeAgo}</span>
                </div>
                <p class="issue-description">${issue.description}</p>
                <div class="issue-footer">
                    <div class="issue-badges">
                        <span class="status-badge status-badge--${issue.status}">${issue.status.replace('_', ' ')}</span>
                        <span class="priority-badge priority-badge--${issue.priority}">${issue.priority}</span>
                    </div>
                    ${issue.assignedTo ? `<span class="assigned-to">Assigned to: ${issue.assignedTo}</span>` : ''}
                </div>
            </div>
        `;
    }

    createAdminIssueCard(issue) {
        const category = this.categories.find(cat => cat.id === issue.category);
        const timeAgo = this.getTimeAgo(new Date(issue.submittedAt));
        
        return `
            <div class="issue-card admin-issue-card" data-issue-id="${issue.id}">
                <div class="issue-card-header">
                    <h4 class="issue-title">${issue.title}</h4>
                    <div class="admin-actions">
                        <select class="form-control status-select" onchange="app.updateIssueStatus('${issue.id}', this.value)">
                            <option value="submitted" ${issue.status === 'submitted' ? 'selected' : ''}>Submitted</option>
                            <option value="assigned" ${issue.status === 'assigned' ? 'selected' : ''}>Assigned</option>
                            <option value="in_progress" ${issue.status === 'in_progress' ? 'selected' : ''}>In Progress</option>
                            <option value="resolved" ${issue.status === 'resolved' ? 'selected' : ''}>Resolved</option>
                        </select>
                    </div>
                </div>
                <div class="issue-meta">
                    <span>${category ? category.icon + ' ' + category.name : 'Other'}</span>
                    <span>📍 ${issue.location.address}</span>
                    <span>⏰ ${timeAgo}</span>
                    <span>👤 ${issue.submittedBy}</span>
                </div>
                <p class="issue-description">${issue.description}</p>
                <div class="issue-footer">
                    <div class="issue-badges">
                        <span class="status-badge status-badge--${issue.status}">${issue.status.replace('_', ' ')}</span>
                        <span class="priority-badge priority-badge--${issue.priority}">${issue.priority}</span>
                    </div>
                    ${issue.assignedTo ? `<span class="assigned-to">${issue.assignedTo}</span>` : '<span class="unassigned">Unassigned</span>'}
                </div>
            </div>
        `;
    }

    populateCategories() {
        const categorySelect = document.getElementById('issue-category');
        if (categorySelect) {
            categorySelect.innerHTML = '<option value="">Select a category...</option>' +
                this.categories.map(cat => 
                    `<option value="${cat.id}">${cat.icon} ${cat.name}</option>`
                ).join('');
        }
    }

    handleReportSubmit(e) {
        e.preventDefault();
        
        const category = document.getElementById('issue-category').value;
        const title = document.getElementById('issue-title').value;
        const location = document.getElementById('issue-location').value;
        const description = document.getElementById('issue-description').value;
        const priority = document.getElementById('issue-priority').value;
        
        if (!category || !title || !location || !description) {
            this.showToast('Please fill in all required fields', 'error');
            return;
        }

        const submitButton = document.getElementById('submit-report');
        const submitText = submitButton.querySelector('.submit-text');
        const submitLoading = submitButton.querySelector('.submit-loading');
        
        // Show loading state
        submitButton.disabled = true;
        submitText.style.display = 'none';
        submitLoading.style.display = 'inline';

        // Simulate submission delay
        setTimeout(() => {
            const newIssue = {
                id: this.generateIssueId(),
                title,
                category,
                description,
                location: {
                    address: location,
                    coordinates: { lat: 40.7128 + Math.random() * 0.1, lng: -74.0060 + Math.random() * 0.1 }
                },
                photos: [], // Would contain uploaded photos
                status: 'submitted',
                priority,
                submittedBy: 'Current User',
                submittedAt: new Date().toISOString(),
                assignedTo: null,
                updates: [{
                    date: new Date().toISOString(),
                    status: 'submitted',
                    note: 'Issue reported by citizen'
                }]
            };

            this.issues.unshift(newIssue);
            this.saveToStorage('civicIssues', this.issues);
            
            // Reset loading state
            submitButton.disabled = false;
            submitText.style.display = 'inline';
            submitLoading.style.display = 'none';
            
            this.showToast(`Issue ${newIssue.id} submitted successfully!`, 'success');
            
            // Reset form and navigate to track view
            e.target.reset();
            const photoPreview = document.getElementById('photo-preview');
            if (photoPreview) photoPreview.innerHTML = '';
            
            setTimeout(() => {
                this.navigateToView('track');
            }, 1000);
        }, 1500);
    }

    handlePhotoUpload(e) {
        const files = Array.from(e.target.files);
        const preview = document.getElementById('photo-preview');
        
        if (!preview) return;
        
        files.forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.style.width = '100px';
                    img.style.height = '100px';
                    img.style.objectFit = 'cover';
                    img.style.borderRadius = '8px';
                    img.style.border = '1px solid var(--color-border)';
                    img.style.margin = '4px';
                    preview.appendChild(img);
                };
                reader.readAsDataURL(file);
            }
        });

        this.showToast(`${files.length} photo(s) uploaded`, 'success');
    }

    getGPSLocation() {
        const locationInput = document.getElementById('issue-location');
        const locationBtn = document.getElementById('get-location');
        
        if (!locationInput || !locationBtn) return;
        
        locationBtn.textContent = '📍 Getting location...';
        locationBtn.disabled = true;

        // Simulate GPS lookup
        setTimeout(() => {
            const mockAddresses = [
                '123 Main Street, Downtown',
                '456 Oak Avenue, Riverside District', 
                '789 Pine Road, Hillside',
                '321 Elm Street, City Center',
                '654 Maple Drive, Westside'
            ];
            
            const randomAddress = mockAddresses[Math.floor(Math.random() * mockAddresses.length)];
            locationInput.value = randomAddress;
            
            locationBtn.textContent = '📍 Use GPS Location';
            locationBtn.disabled = false;
            
            this.showToast('Location detected successfully', 'success');
        }, 2000);
    }

    handleSearch() {
        this.renderTrackView();
    }

    handleFilter() {
        this.renderTrackView();
    }

    showIssueModal(issue) {
        const modal = document.getElementById('issue-modal');
        const title = document.getElementById('modal-title');
        const body = document.getElementById('modal-body');
        
        if (!modal || !title || !body) return;

        title.textContent = issue.title;
        
        const category = this.categories.find(cat => cat.id === issue.category);
        const timeline = issue.updates.map(update => `
            <div class="timeline-item">
                <div class="timeline-date">${this.formatDate(update.date)}</div>
                <div class="timeline-content">
                    <div class="timeline-status">${update.status.replace('_', ' ').toUpperCase()}</div>
                    <div class="timeline-note">${update.note}</div>
                </div>
            </div>
        `).join('');

        body.innerHTML = `
            <div class="issue-details">
                <div class="detail-row">
                    <strong>Issue ID:</strong> ${issue.id}
                </div>
                <div class="detail-row">
                    <strong>Category:</strong> ${category ? category.icon + ' ' + category.name : 'Other'}
                </div>
                <div class="detail-row">
                    <strong>Location:</strong> ${issue.location.address}
                </div>
                <div class="detail-row">
                    <strong>Priority:</strong> 
                    <span class="priority-badge priority-badge--${issue.priority}">${issue.priority}</span>
                </div>
                <div class="detail-row">
                    <strong>Status:</strong> 
                    <span class="status-badge status-badge--${issue.status}">${issue.status.replace('_', ' ')}</span>
                </div>
                <div class="detail-row">
                    <strong>Submitted by:</strong> ${issue.submittedBy}
                </div>
                <div class="detail-row">
                    <strong>Submitted:</strong> ${this.formatDate(issue.submittedAt)}
                </div>
                ${issue.assignedTo ? `<div class="detail-row"><strong>Assigned to:</strong> ${issue.assignedTo}</div>` : ''}
                ${issue.estimatedCompletion ? `<div class="detail-row"><strong>Estimated completion:</strong> ${this.formatDate(issue.estimatedCompletion)}</div>` : ''}
                
                <div class="detail-section">
                    <strong>Description:</strong>
                    <p>${issue.description}</p>
                </div>
                
                ${issue.photos && issue.photos.length > 0 ? `
                    <div class="detail-section">
                        <strong>Photos:</strong>
                        <div class="issue-photos">
                            ${issue.photos.map(photo => `<img src="${photo}" alt="Issue photo" style="max-width: 200px; border-radius: 8px; margin: 8px;">`).join('')}
                        </div>
                    </div>
                ` : ''}
                
                <div class="issue-timeline">
                    <strong>Timeline:</strong>
                    ${timeline}
                </div>
            </div>
        `;

        modal.classList.remove('hidden');
        
        // Focus management for accessibility
        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) closeBtn.focus();
    }

    closeModal() {
        const modal = document.getElementById('issue-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    updateIssueStatus(issueId, newStatus) {
        const issue = this.issues.find(i => i.id === issueId);
        if (!issue) return;

        issue.status = newStatus;
        issue.updates.push({
            date: new Date().toISOString(),
            status: newStatus,
            note: `Status updated to ${newStatus.replace('_', ' ')} by admin`
        });

        if (newStatus === 'resolved') {
            issue.completedAt = new Date().toISOString();
        }

        this.saveToStorage('civicIssues', this.issues);
        this.showToast(`Issue ${issueId} status updated to ${newStatus.replace('_', ' ')}`, 'success');
        
        // Re-render current view to reflect changes
        this.renderCurrentView();
    }

    showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast toast--${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <span>${message}</span>
            </div>
        `;

        container.appendChild(toast);

        // Show toast
        setTimeout(() => toast.classList.add('show'), 100);

        // Remove toast after 4 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (container.contains(toast)) {
                    container.removeChild(toast);
                }
            }, 300);
        }, 4000);
    }

    calculateStats() {
        const total = this.issues.length;
        const open = this.issues.filter(i => i.status === 'submitted').length;
        const inProgress = this.issues.filter(i => i.status === 'in_progress').length;
        const resolved = this.issues.filter(i => i.status === 'resolved').length;

        return {
            totalIssues: total,
            openIssues: open,
            inProgress: inProgress,
            resolved: resolved
        };
    }

    generateIssueId() {
        const year = new Date().getFullYear();
        const count = this.issues.length + 1;
        return `ISS-${year}-${count.toString().padStart(3, '0')}`;
    }

    getTimeAgo(date) {
        const now = new Date();
        const diffMs = now - date;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMinutes = Math.floor(diffMs / (1000 * 60));

        if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        if (diffMinutes > 0) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
        return 'Just now';
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    saveToStorage(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.warn('localStorage not available:', e);
        }
    }

    getFromStorage(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.warn('localStorage not available:', e);
            return null;
        }
    }

    toggleMobileMenu() {
        const menu = document.querySelector('.navbar-menu');
        if (menu) {
            menu.classList.toggle('mobile-open');
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new CivicReportApp();
});

// Handle browser back/forward
window.addEventListener('popstate', (e) => {
    if (window.app && e.state && e.state.view) {
        window.app.navigateToView(e.state.view);
    }
});