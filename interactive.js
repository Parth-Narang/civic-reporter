// Sample Data - Government Civic Portal
const appData = {
    issues: [
        {
            id: "CIV-2025-001",
            type: "Pothole",
            location: "Main Street, Ward 12",
            description: "Large pothole causing traffic issues near City Center",
            priority: "High",
            status: "In Progress",
            submittedDate: "2025-08-15",
            updatedDate: "2025-08-28",
            assignedTo: "Road Maintenance Dept",
            estimatedResolution: "2025-09-10",
            contactPerson: "Rajesh Kumar",
            contactNumber: "+91-9876543210"
        },
        {
            id: "CIV-2025-002",
            type: "Street Light",
            location: "Park Avenue, Ward 8",
            description: "Street light not working for past 2 weeks",
            priority: "Medium",
            status: "Approved",
            submittedDate: "2025-08-20",
            updatedDate: "2025-08-30",
            assignedTo: "Electrical Dept",
            estimatedResolution: "2025-09-05",
            contactPerson: "Priya Sharma",
            contactNumber: "+91-9765432109"
        },
        {
            id: "CIV-2025-003",
            type: "Garbage",
            location: "Residential Complex, Ward 15",
            description: "Garbage not collected for 3 days, causing hygiene issues",
            priority: "Critical",
            status: "Resolved",
            submittedDate: "2025-08-10",
            updatedDate: "2025-08-25",
            assignedTo: "Sanitation Dept",
            estimatedResolution: "2025-08-15",
            contactPerson: "Amit Patel",
            contactNumber: "+91-9654321098"
        },
        {
            id: "CIV-2025-004",
            type: "Water Supply",
            location: "Green Valley, Ward 22",
            description: "No water supply since yesterday morning",
            priority: "Critical",
            status: "Under Review",
            submittedDate: "2025-09-01",
            updatedDate: "2025-09-02",
            assignedTo: "Water Works Dept",
            estimatedResolution: "2025-09-08",
            contactPerson: "Sunita Rao",
            contactNumber: "+91-9543210987"
        },
        {
            id: "CIV-2025-005",
            type: "Traffic Signal",
            location: "Crossroads Junction, Ward 5",
            description: "Traffic signal malfunctioning causing congestion",
            priority: "High",
            status: "In Progress",
            submittedDate: "2025-08-28",
            updatedDate: "2025-09-01",
            assignedTo: "Traffic Dept",
            estimatedResolution: "2025-09-12",
            contactPerson: "Vikram Singh",
            contactNumber: "+91-9432109876"
        },
        {
            id: "CIV-2025-006",
            type: "Sewage",
            location: "Old City Area, Ward 3",
            description: "Sewage overflow on main road causing health hazards",
            priority: "Critical",
            status: "Approved",
            submittedDate: "2025-08-25",
            updatedDate: "2025-09-01",
            assignedTo: "Sanitation Dept",
            estimatedResolution: "2025-09-15",
            contactPerson: "Rajesh Verma",
            contactNumber: "+91-9321087654"
        },
        {
            id: "CIV-2025-007",
            type: "Pothole",
            location: "Highway Junction, Ward 18",
            description: "Multiple potholes creating safety hazards for vehicles",
            priority: "High",
            status: "Submitted",
            submittedDate: "2025-09-02",
            updatedDate: "2025-09-02",
            assignedTo: "Road Maintenance Dept",
            estimatedResolution: "2025-09-20",
            contactPerson: "Rajesh Kumar",
            contactNumber: "+91-9876543210"
        },
        {
            id: "CIV-2025-008",
            type: "Street Light",
            location: "Market Square, Ward 11",
            description: "All street lights in the area are non-functional",
            priority: "Medium",
            status: "In Progress",
            submittedDate: "2025-08-18",
            updatedDate: "2025-08-30",
            assignedTo: "Electrical Dept",
            estimatedResolution: "2025-09-08",
            contactPerson: "Priya Sharma",
            contactNumber: "+91-9765432109"
        }
    ],
    tenders: [
        {
            id: "TND-2025-101",
            title: "Road Repair and Maintenance Contract",
            category: "Infrastructure",
            budget: "₹50,00,000",
            description: "Annual maintenance contract for road repairs including pothole filling and resurfacing",
            deadline: "2025-09-30",
            status: "Open",
            location: "All Wards",
            eligibility: "Class A contractors with road construction experience",
            contactPerson: "Municipal Engineer",
            contactNumber: "+91-9321098765"
        },
        {
            id: "TND-2025-102",
            title: "Street Lighting Installation and Maintenance",
            category: "Electrical",
            budget: "₹25,00,000",
            description: "Installation of LED street lights and maintenance for 2 years",
            deadline: "2025-10-15",
            status: "Open",
            location: "Ward 8, Ward 12, Ward 15",
            eligibility: "Electrical contractors with LED lighting experience",
            contactPerson: "Electrical Supervisor",
            contactNumber: "+91-9210987654"
        },
        {
            id: "TND-2025-103",
            title: "Waste Management and Collection Services",
            category: "Sanitation",
            budget: "₹75,00,000",
            description: "Comprehensive waste collection and management services for 3 years",
            deadline: "2025-09-20",
            status: "Under Evaluation",
            location: "All Wards",
            eligibility: "Waste management companies with municipal experience",
            contactPerson: "Sanitation Officer",
            contactNumber: "+91-9109876543"
        },
        {
            id: "TND-2025-104",
            title: "Water Pipeline Repair and Maintenance",
            category: "Water Works",
            budget: "₹35,00,000",
            description: "Emergency repair services and preventive maintenance of water pipelines",
            deadline: "2025-10-05",
            status: "Open",
            location: "Ward 20, Ward 22, Ward 25",
            eligibility: "Plumbing contractors with municipal pipeline experience",
            contactPerson: "Water Works Engineer",
            contactNumber: "+91-9098765432"
        },
        {
            id: "TND-2025-105",
            title: "Public Park Maintenance and Landscaping",
            category: "Parks & Recreation",
            budget: "₹15,00,000",
            description: "Comprehensive maintenance of city parks including landscaping and equipment upkeep",
            deadline: "2025-10-20",
            status: "Open",
            location: "All City Parks",
            eligibility: "Landscaping companies with municipal park experience",
            contactPerson: "Parks Officer",
            contactNumber: "+91-8987654321"
        }
    ],
    companies: [
        {
            id: "COMP-001",
            name: "City Infrastructure Pvt Ltd",
            category: "Infrastructure",
            rating: "4.5/5",
            experience: "15 years",
            completedProjects: 45,
            contactPerson: "Arun Mehta",
            contactNumber: "+91-8987654321",
            email: "contact@cityinfra.com",
            specialization: "Road construction, Pothole repairs, Bridge maintenance"
        },
        {
            id: "COMP-002",
            name: "Bright Lights Solutions",
            category: "Electrical",
            rating: "4.2/5",
            experience: "8 years",
            completedProjects: 28,
            contactPerson: "Neha Gupta",
            contactNumber: "+91-8876543210",
            email: "info@brightlights.com",
            specialization: "LED lighting, Street lamp installation, Electrical maintenance"
        },
        {
            id: "COMP-003",
            name: "Clean City Services",
            category: "Sanitation",
            rating: "4.7/5",
            experience: "12 years",
            completedProjects: 35,
            contactPerson: "Manoj Sharma",
            contactNumber: "+91-8765432109",
            email: "admin@cleancity.com",
            specialization: "Waste collection, Recycling services, Sanitation management"
        },
        {
            id: "COMP-004",
            name: "Aqua Works Corporation",
            category: "Water Works",
            rating: "4.3/5",
            experience: "10 years",
            completedProjects: 32,
            contactPerson: "Deepak Patel",
            contactNumber: "+91-8654321098",
            email: "support@aquaworks.com",
            specialization: "Pipeline installation, Water treatment, Emergency repairs"
        },
        {
            id: "COMP-005",
            name: "Green Landscaping Co.",
            category: "Parks & Recreation",
            rating: "4.4/5",
            experience: "9 years",
            completedProjects: 22,
            contactPerson: "Kavita Singh",
            contactNumber: "+91-8543210987",
            email: "projects@greenlandscape.com",
            specialization: "Park maintenance, Landscaping, Garden design"
        }
    ],
    news: [
        {
            title: "New Digital Civic Portal Launched",
            date: "2025-09-01",
            description: "Citizens can now report civic issues digitally and track progress online"
        },
        {
            title: "Smart Street Lighting Project Approved",
            date: "2025-08-28",
            description: "LED street lights to be installed across 50 locations in the city"
        },
        {
            title: "Waste Segregation Drive Begins",
            date: "2025-08-25",
            description: "New initiative for household waste segregation launched in partnership with local NGOs"
        },
        {
            title: "Emergency Water Supply Restoration",
            date: "2025-08-22",
            description: "Water supply issues in Ward 22 have been successfully resolved"
        }
    ],
    departments: [
        {name: "Road Maintenance Department", head: "Rajesh Kumar", contact: "+91-9876543210"},
        {name: "Electrical Department", head: "Priya Sharma", contact: "+91-9765432109"},
        {name: "Sanitation Department", head: "Amit Patel", contact: "+91-9654321098"},
        {name: "Water Works Department", head: "Sunita Rao", contact: "+91-9543210987"},
        {name: "Traffic Management", head: "Vikram Singh", contact: "+91-9432109876"}
    ]
};


// Global state
let currentUserRole = 'Citizen';
let filteredIssues = [...appData.issues];


// Make functions global for onclick handlers
window.showSection = showSection;
window.toggleUserRole = toggleUserRole;
window.selectIssueType = selectIssueType;
window.showIssueDetails = showIssueDetails;
window.updateIssueStatus = updateIssueStatus;
window.participateInTender = participateInTender;
window.closeModal = closeModal;
window.closeNotification = closeNotification;


// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing app...');
    initializeApp();
    loadNewsData();
    loadIssuesData();
    loadTendersData();
    loadCompaniesData();
    loadDepartmentsData();
    setupEventListeners();
});


function initializeApp() {
    console.log('App initialized');
    // Show home section by default
    showSection('home');
}


// Section Navigation
function showSection(sectionName) {
    console.log('Showing section:', sectionName);
    
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
        console.log('Section activated:', sectionName);
    } else {
        console.error('Section not found:', sectionName);
    }
    
    // Update navigation
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.classList.remove('nav-active');
    });
    
    const activeLink = document.querySelector(`[onclick*="showSection('${sectionName}')"]`);
    if (activeLink) {
        activeLink.classList.add('nav-active');
    }
    
    // Load section-specific data
    if (sectionName === 'track') {
        loadIssuesData();
    } else if (sectionName === 'tenders') {
        loadTendersData();
        loadCompaniesData();
    }
}


// User Role Management
function toggleUserRole() {
    const roles = ['Citizen', 'Municipal Officer', 'Administrator'];
    const currentIndex = roles.indexOf(currentUserRole);
    const nextIndex = (currentIndex + 1) % roles.length;
    currentUserRole = roles[nextIndex];
    
    document.getElementById('currentRole').textContent = currentUserRole;
    
    // Update UI based on role
    updateUIForRole();
    showNotification(`Switched to ${currentUserRole} role`, 'success');
}


function updateUIForRole() {
    // Show/hide admin features based on role
    const adminFeatures = document.querySelectorAll('.admin-only');
    const isAdmin = currentUserRole !== 'Citizen';
    
    adminFeatures.forEach(element => {
        element.style.display = isAdmin ? 'block' : 'none';
    });
}


// Issue Category Selection
function selectIssueType(type) {
    console.log('Selecting issue type:', type);
    showSection('report');
    setTimeout(() => {
        const issueTypeSelect = document.getElementById('issueType');
        if (issueTypeSelect) {
            issueTypeSelect.value = type;
        }
    }, 100);
}


// Load News Data
function loadNewsData() {
    const container = document.getElementById('newsContainer');
    if (!container) return;
    
    container.innerHTML = appData.news.map(newsItem => `
        <div class="news-card">
            <div class="news-date">${formatDate(newsItem.date)}</div>
            <h4>${newsItem.title}</h4>
            <p>${newsItem.description}</p>
        </div>
    `).join('');
}


// Load Issues Data
function loadIssuesData() {
    const container = document.getElementById('issuesContainer');
    if (!container) return;
    
    container.innerHTML = filteredIssues.map(issue => `
        <div class="issue-card" onclick="showIssueDetails('${issue.id}')">
            <div class="issue-header">
                <div class="issue-id">${issue.id}</div>
                <div class="issue-type">${issue.type}</div>
            </div>
            <div class="issue-location">📍 ${issue.location}</div>
            <div class="issue-description">${issue.description}</div>
            <div class="issue-footer">
                <div class="status status--${issue.status.toLowerCase().replace(' ', '-')}">${issue.status}</div>
                <div class="issue-priority ${issue.priority.toLowerCase()}">${issue.priority}</div>
                <div class="issue-date">Reported: ${formatDate(issue.submittedDate)}</div>
            </div>
        </div>
    `).join('');
}


// Load Tenders Data
function loadTendersData() {
    const container = document.getElementById('tendersContainer');
    if (!container) return;
    
    container.innerHTML = appData.tenders.map(tender => `
        <div class="tender-card">
            <div class="tender-header">
                <div>
                    <h3 class="tender-title">${tender.title}</h3>
                    <div class="status status--${tender.status.toLowerCase().replace(' ', '-')}">${tender.status}</div>
                </div>
                <div class="tender-budget">${tender.budget}</div>
            </div>
            <div class="tender-meta">
                <div class="tender-meta-item">
                    <div class="tender-meta-label">Category:</div>
                    <div class="tender-meta-value">${tender.category}</div>
                </div>
                <div class="tender-meta-item">
                    <div class="tender-meta-label">Deadline:</div>
                    <div class="tender-meta-value">${formatDate(tender.deadline)}</div>
                </div>
                <div class="tender-meta-item">
                    <div class="tender-meta-label">Location:</div>
                    <div class="tender-meta-value">${tender.location}</div>
                </div>
                <div class="tender-meta-item">
                    <div class="tender-meta-label">Tender ID:</div>
                    <div class="tender-meta-value">${tender.id}</div>
                </div>
            </div>
            <div class="tender-description">${tender.description}</div>
            <div class="tender-footer">
                <div class="tender-contact">
                    Contact: ${tender.contactPerson}<br>
                    Phone: ${tender.contactNumber}
                </div>
                <button class="btn btn--primary" onclick="participateInTender('${tender.id}')">
                    Participate
                </button>
            </div>
        </div>
    `).join('');
}


// Load Companies Data
function loadCompaniesData() {
    const container = document.getElementById('companiesContainer');
    if (!container) return;
    
    container.innerHTML = appData.companies.map(company => `
        <div class="company-card">
            <div class="company-header">
                <div>
                    <div class="company-name">${company.name}</div>
                    <div class="status status--info">${company.category}</div>
                </div>
                <div class="company-rating">${company.rating}</div>
            </div>
            <div class="company-details">
                <div class="company-detail-item">Experience: ${company.experience}</div>
                <div class="company-detail-item">Projects: ${company.completedProjects}</div>
            </div>
            <div class="company-specialization">
                <strong>Specialization:</strong> ${company.specialization}
            </div>
            <div class="company-contact">
                <strong>Contact:</strong> ${company.contactPerson}<br>
                <strong>Phone:</strong> ${company.contactNumber}<br>
                <strong>Email:</strong> ${company.email}
            </div>
        </div>
    `).join('');
}


// Load Departments Data
function loadDepartmentsData() {
    const container = document.getElementById('departmentsContainer');
    if (!container) return;
    
    container.innerHTML = appData.departments.map(dept => `
        <div class="department-item">
            <div class="department-name">${dept.name}</div>
            <div class="department-contact">Head: ${dept.head} | Contact: ${dept.contact}</div>
        </div>
    `).join('');
}


// Show Issue Details Modal
function showIssueDetails(issueId) {
    console.log('Showing issue details for:', issueId);
    const issue = appData.issues.find(i => i.id === issueId);
    if (!issue) return;
    
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <div class="issue-details">
            <div class="detail-row" style="margin-bottom: 12px;">
                <strong>Issue ID:</strong> ${issue.id}
            </div>
            <div class="detail-row" style="margin-bottom: 12px;">
                <strong>Type:</strong> ${issue.type}
            </div>
            <div class="detail-row" style="margin-bottom: 12px;">
                <strong>Location:</strong> ${issue.location}
            </div>
            <div class="detail-row" style="margin-bottom: 12px;">
                <strong>Description:</strong> ${issue.description}
            </div>
            <div class="detail-row" style="margin-bottom: 12px;">
                <strong>Priority:</strong> <span class="issue-priority ${issue.priority.toLowerCase()}">${issue.priority}</span>
            </div>
            <div class="detail-row" style="margin-bottom: 12px;">
                <strong>Status:</strong> <span class="status status--${issue.status.toLowerCase().replace(' ', '-')}">${issue.status}</span>
            </div>
            <div class="detail-row" style="margin-bottom: 12px;">
                <strong>Submitted Date:</strong> ${formatDate(issue.submittedDate)}
            </div>
            <div class="detail-row" style="margin-bottom: 12px;">
                <strong>Last Updated:</strong> ${formatDate(issue.updatedDate)}
            </div>
            <div class="detail-row" style="margin-bottom: 12px;">
                <strong>Assigned To:</strong> ${issue.assignedTo}
            </div>
            <div class="detail-row" style="margin-bottom: 12px;">
                <strong>Estimated Resolution:</strong> ${formatDate(issue.estimatedResolution)}
            </div>
            <div class="detail-row" style="margin-bottom: 12px;">
                <strong>Contact Person:</strong> ${issue.contactPerson}
            </div>
            <div class="detail-row" style="margin-bottom: 12px;">
                <strong>Contact Number:</strong> ${issue.contactNumber}
            </div>
            ${currentUserRole !== 'Citizen' ? `
                <div class="admin-actions" style="margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--color-border);">
                    <h4>Admin Actions</h4>
                    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                        <button class="btn btn--primary btn--sm" onclick="updateIssueStatus('${issue.id}', 'Under Review')">Mark Under Review</button>
                        <button class="btn btn--primary btn--sm" onclick="updateIssueStatus('${issue.id}', 'Approved')">Approve</button>
                        <button class="btn btn--primary btn--sm" onclick="updateIssueStatus('${issue.id}', 'In Progress')">Mark In Progress</button>
                        <button class="btn btn--primary btn--sm" onclick="updateIssueStatus('${issue.id}', 'Resolved')">Mark Resolved</button>
                    </div>
                </div>
            ` : ''}
        </div>
    `;
    
    document.getElementById('modalTitle').textContent = `Issue Details - ${issue.type}`;
    document.getElementById('issueModal').classList.remove('hidden');
}


// Update Issue Status (Admin function)
function updateIssueStatus(issueId, newStatus) {
    if (currentUserRole === 'Citizen') {
        showNotification('Access denied. Admin privileges required.', 'error');
        return;
    }
    
    const issueIndex = appData.issues.findIndex(i => i.id === issueId);
    if (issueIndex !== -1) {
        appData.issues[issueIndex].status = newStatus;
        appData.issues[issueIndex].updatedDate = new Date().toISOString().split('T')[0];
        
        // Update filtered issues as well
        const filteredIndex = filteredIssues.findIndex(i => i.id === issueId);
        if (filteredIndex !== -1) {
            filteredIssues[filteredIndex].status = newStatus;
            filteredIssues[filteredIndex].updatedDate = new Date().toISOString().split('T')[0];
        }
        
        loadIssuesData();
        closeModal();
        showNotification(`Issue ${issueId} status updated to: ${newStatus}`, 'success');
    }
}


// Participate in Tender
function participateInTender(tenderId) {
    const tender = appData.tenders.find(t => t.id === tenderId);
    if (!tender) return;
    
    if (tender.status !== 'Open') {
        showNotification('This tender is not open for participation', 'error');
        return;
    }
    
    showNotification(`Participation request submitted for ${tender.title}`, 'success');
}


// Event Listeners
function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Remove issueReportForm listener if "Report Issue" is removed
    const reportForm = document.getElementById('issueReportForm');
    if (reportForm) {
        reportForm.addEventListener('submit', handleIssueSubmission);
        console.log('Form listener added');
    }
    
    // Search and Filter functionality
    const trackingSearch = document.getElementById('trackingSearch');
    const statusFilter = document.getElementById('statusFilter');
    const typeFilter = document.getElementById('typeFilter');
    
    if (trackingSearch) {
        trackingSearch.addEventListener('input', filterIssues);
    }
    if (statusFilter) {
        statusFilter.addEventListener('change', filterIssues);
    }
    if (typeFilter) {
        typeFilter.addEventListener('change', filterIssues);
    }
    
    // Header search
    const headerSearch = document.getElementById('headerSearch');
    const searchBtn = document.querySelector('.search-btn');
    
    if (headerSearch) {
        headerSearch.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performHeaderSearch();
            }
        });
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', performHeaderSearch);
    }
}


// Handle Issue Report Submission
function handleIssueSubmission(e) {
    e.preventDefault();
    console.log('Form submitted');
    
    const issueData = {
        id: `CIV-2025-${String(appData.issues.length + 1).padStart(3, '0')}`,
        type: document.getElementById('issueType').value,
        location: document.getElementById('issueLocation').value,
        description: document.getElementById('issueDescription').value,
        priority: document.getElementById('issuePriority').value,
        status: 'Submitted',
        submittedDate: new Date().toISOString().split('T')[0],
        updatedDate: new Date().toISOString().split('T')[0],
        assignedTo: getDepartmentForType(document.getElementById('issueType').value),
        estimatedResolution: getEstimatedResolution(),
        contactPerson: getContactPersonForType(document.getElementById('issueType').value),
        contactNumber: getContactNumberForType(document.getElementById('issueType').value)
    };
    
    // Add to issues array
    appData.issues.unshift(issueData);
    filteredIssues = [...appData.issues];
    
    // Show success message
    showNotification(`Issue reported successfully! Your complaint ID is: ${issueData.id}`, 'success');
    
    // Reset form
    e.target.reset();
    
    // Switch to tracking section
    setTimeout(() => {
        showSection('track');
        loadIssuesData();
    }, 2000);
}


// Filter Issues
function filterIssues() {
    const searchTerm = document.getElementById('trackingSearch')?.value.toLowerCase() || '';
    const statusFilter = document.getElementById('statusFilter')?.value || '';
    const typeFilter = document.getElementById('typeFilter')?.value || '';
    
    filteredIssues = appData.issues.filter(issue => {
        const matchesSearch = searchTerm === '' ||
            issue.id.toLowerCase().includes(searchTerm) ||
            issue.location.toLowerCase().includes(searchTerm) ||
            issue.type.toLowerCase().includes(searchTerm) ||
            issue.description.toLowerCase().includes(searchTerm);
            
        const matchesStatus = statusFilter === '' || issue.status === statusFilter;
        const matchesType = typeFilter === '' || issue.type === typeFilter;
        
        return matchesSearch && matchesStatus && matchesType;
    });
    
    loadIssuesData();
}


// Header Search
function performHeaderSearch() {
    const searchTerm = document.getElementById('headerSearch').value.toLowerCase();
    if (!searchTerm) {
        showNotification('Please enter a search term', 'error');
        return;
    }
    
    // Search in issues
    const matchingIssues = appData.issues.filter(issue =>
        issue.id.toLowerCase().includes(searchTerm) ||
        issue.location.toLowerCase().includes(searchTerm) ||
        issue.type.toLowerCase().includes(searchTerm) ||
        issue.description.toLowerCase().includes(searchTerm)
    );
    
    if (matchingIssues.length > 0) {
        filteredIssues = matchingIssues;
        showSection('track');
        loadIssuesData();
        showNotification(`Found ${matchingIssues.length} matching issues`, 'success');
    } else {
        showNotification('No matching issues found', 'error');
    }
    
    document.getElementById('headerSearch').value = '';
}


// Helper Functions
function getDepartmentForType(type) {
    const departmentMapping = {
        'Pothole': 'Road Maintenance Dept',
        'Street Light': 'Electrical Dept',
        'Garbage': 'Sanitation Dept',
        'Water Supply': 'Water Works Dept',
        'Traffic Signal': 'Traffic Dept',
        'Sewage': 'Sanitation Dept',
        'Other': 'General Administration'
    };
    return departmentMapping[type] || 'General Administration';
}


function getContactPersonForType(type) {
    const contactMapping = {
        'Pothole': 'Rajesh Kumar',
        'Street Light': 'Priya Sharma',
        'Garbage': 'Amit Patel',
        'Water Supply': 'Sunita Rao',
        'Traffic Signal': 'Vikram Singh',
        'Sewage': 'Amit Patel',
        'Other': 'Municipal Officer'
    };
    return contactMapping[type] || 'Municipal Officer';
}


function getContactNumberForType(type) {
    const numberMapping = {
        'Pothole': '+91-9876543210',
        'Street Light': '+91-9765432109',
        'Garbage': '+91-9654321098',
        'Water Supply': '+91-9543210987',
        'Traffic Signal': '+91-9432109876',
        'Sewage': '+91-9654321098',
        'Other': '+91-9000000000'
    };
    return numberMapping[type] || '+91-9000000000';
}


function getEstimatedResolution() {
    const today = new Date();
    const resolutionDate = new Date(today.getTime() + (Math.random() * 15 + 5) * 24 * 60 * 60 * 1000);
    return resolutionDate.toISOString().split('T')[0];
}


function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
}


// Modal Functions
function closeModal() {
    document.getElementById('issueModal').classList.add('hidden');
}


// Notification Functions
function showNotification(message, type = 'success') {
    console.log('Showing notification:', message, type);
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    
    if (notification && notificationText) {
        notificationText.textContent = message;
        notification.className = `notification ${type}`;
        notification.classList.remove('hidden');
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            closeNotification();
        }, 5000);
    }
}


function closeNotification() {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.classList.add('hidden');
    }
}


// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('issueModal');
    if (e.target === modal) {
        closeModal();
    }
});


// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
    // Complaint Status Check Handler
document.getElementById('complaintStatusForm').addEventListener('submit', function(e) {
  e.preventDefault();

  var inputId = document.getElementById('complaintIdInput').value.trim().toUpperCase();
  var resultDiv = document.getElementById('complaintStatusResult');

  var complaint = appData.issues.find(issue => issue.id === inputId);

  if (!complaint) {
    resultDiv.textContent = `Complaint ID "${inputId}" not found.`;
    resultDiv.style.color = 'red';
  } else {
    // Map internal status to display status if needed
    let displayStatus = '';
    if (complaint.status === 'Submitted' || complaint.status === 'Under Review' || complaint.status === 'Approved') {
      displayStatus = 'Accepted';
    } else if (complaint.status === 'In Progress') {
      displayStatus = 'Working';
    } else if (complaint.status === 'Resolved' || complaint.status === 'Closed') {
      displayStatus = 'Resolved';
    } else {
      displayStatus = complaint.status;
    }
    resultDiv.textContent = `Status: ${displayStatus} (Current Stage: ${complaint.status})`;
    resultDiv.style.color = 'green';
  }
});

});
