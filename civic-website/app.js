// Municipal Civic Engagement Platform JavaScript - Final Version

// Application data from provided JSON
const appData = {
  "issues": [
    {
      "id": "ISS-2025-001",
      "title": "Pothole on Main Street",
      "description": "Large pothole causing vehicle damage near intersection",
      "category": "Roads & Transportation",
      "priority": "High",
      "status": "In Progress",
      "location": "Main Street & 5th Avenue",
      "coordinates": { "lat": 40.7128, "lng": -74.0060 },
      "reportedBy": "John Citizen",
      "reportedDate": "2025-01-10",
      "assignedDepartment": "Public Works",
      "assignedTo": "Mike Johnson",
      "estimatedCompletion": "2025-01-15",
      "photos": ["pothole1.jpg"],
      "votes": 23,
      "comments": 5
    },
    {
      "id": "ISS-2025-002",
      "title": "Broken Streetlight",
      "description": "Street light not working, creating safety hazard",
      "category": "Lighting",
      "priority": "Medium",
      "status": "Pending",
      "location": "Oak Avenue & 3rd Street",
      "coordinates": { "lat": 40.7580, "lng": -73.9855 },
      "reportedBy": "Sarah Davis",
      "reportedDate": "2025-01-11",
      "assignedDepartment": "Electrical Services",
      "assignedTo": "Unassigned",
      "estimatedCompletion": null,
      "photos": ["streetlight1.jpg"],
      "votes": 15,
      "comments": 2
    },
    {
      "id": "ISS-2025-003",
      "title": "Overflowing Trash Bin",
      "description": "Public trash bin overflowing, attracting pests",
      "category": "Waste Management",
      "priority": "Low",
      "status": "Resolved",
      "location": "Central Park Entrance",
      "coordinates": { "lat": 40.7829, "lng": -73.9654 },
      "reportedBy": "Emma Wilson",
      "reportedDate": "2025-01-09",
      "assignedDepartment": "Sanitation",
      "assignedTo": "Tom Rodriguez",
      "estimatedCompletion": "2025-01-12",
      "resolvedDate": "2025-01-12",
      "photos": ["trash1.jpg"],
      "votes": 8,
      "comments": 1
    }
  ],
  "departments": [
    {
      "id": "dept-001",
      "name": "Public Works",
      "contact": "publicworks@city.gov",
      "phone": "(555) 123-4567",
      "staff": ["Mike Johnson", "Lisa Chen", "David Brown"]
    },
    {
      "id": "dept-002",
      "name": "Electrical Services",
      "contact": "electrical@city.gov",
      "phone": "(555) 234-5678",
      "staff": ["Alex Turner", "Maria Garcia"]
    },
    {
      "id": "dept-003",
      "name": "Sanitation",
      "contact": "sanitation@city.gov",
      "phone": "(555) 345-6789",
      "staff": ["Tom Rodriguez", "Jennifer Lee"]
    }
  ],
  "categories": [
    "Roads & Transportation",
    "Lighting",
    "Waste Management",
    "Water & Sewage",
    "Parks & Recreation",
    "Public Safety",
    "Building & Construction",
    "Environmental"
  ],
  "priorityLevels": ["Low", "Medium", "High", "Critical"],
  "statusTypes": ["Pending", "Assigned", "In Progress", "Under Review", "Resolved", "Closed"],
  "analytics": {
    "totalIssues": 156,
    "resolvedIssues": 124,
    "pendingIssues": 32,
    "averageResolutionTime": "4.2 days",
    "userSatisfactionRate": "87%",
    "categoriesBreakdown": {
      "Roads & Transportation": 45,
      "Lighting": 32,
      "Waste Management": 28,
      "Water & Sewage": 22,
      "Parks & Recreation": 15,
      "Public Safety": 8,
      "Building & Construction": 4,
      "Environmental": 2
    }
  }
};

// Global state
let currentUser = null;
let isAdminLoggedIn = false;
let charts = {};
let currentSection = 'home';
let currentFilters = {
  search: '',
  status: '',
  category: '',
  department: '',
  priority: ''
};

// Utility functions
function showLoading() {
  const overlay = document.getElementById('loadingOverlay');
  if (overlay) {
    overlay.classList.remove('hidden');
  }
}

function hideLoading() {
  const overlay = document.getElementById('loadingOverlay');
  if (overlay) {
    overlay.classList.add('hidden');
  }
}

function generateTicketId() {
  const date = new Date();
  const year = date.getFullYear();
  const count = appData.issues.length + 1;
  return `ISS-${year}-${count.toString().padStart(3, '0')}`;
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString();
}

function getStatusClass(status) {
  const statusMap = {
    'Pending': 'status--warning',
    'Assigned': 'status--info',
    'In Progress': 'status--info',
    'Under Review': 'status--warning',
    'Resolved': 'status--success',
    'Closed': 'status--success'
  };
  return statusMap[status] || 'status--info';
}

function getPriorityClass(priority) {
  const priorityMap = {
    'Low': 'map-pin--low',
    'Medium': 'map-pin--medium',
    'High': 'map-pin--high',
    'Critical': 'map-pin--high'
  };
  return priorityMap[priority] || 'map-pin--medium';
}

// Navigation functionality
function initNavigation() {
  console.log('Initializing navigation...');
  
  // Get all navigation elements
  const navLinks = document.querySelectorAll('.nav__link[data-section]');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const sections = document.querySelectorAll('.section');
  
  console.log('Found nav links:', navLinks.length);
  console.log('Found sections:', sections.length);

  // Function to show specific section
  function showSection(sectionId) {
    console.log('Showing section:', sectionId);
    
    // Hide all sections
    sections.forEach(section => {
      section.classList.remove('section--active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.classList.add('section--active');
      currentSection = sectionId;
      
      // Update active nav link
      navLinks.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
      
      // Close mobile menu
      if (navMenu) {
        navMenu.classList.remove('active');
      }
      
      // Initialize section-specific functionality
      initializeSection(sectionId);
    }
  }

  // Add click handlers to all navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = link.getAttribute('data-section');
      console.log('Nav link clicked:', sectionId);
      showSection(sectionId);
    });
  });

  // Add click handlers to buttons with data-section attribute
  document.addEventListener('click', (e) => {
    if (e.target.hasAttribute('data-section')) {
      e.preventDefault();
      const sectionId = e.target.getAttribute('data-section');
      console.log('Button clicked:', sectionId);
      showSection(sectionId);
    }
  });

  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
      }
    });
  }

  // Initialize with home section
  showSection('home');
}

// Initialize section-specific functionality
function initializeSection(sectionId) {
  console.log('Initializing section:', sectionId);
  
  switch (sectionId) {
    case 'track':
      setTimeout(() => {
        initIssueTracking();
        renderIssuesList();
      }, 100);
      break;
    case 'map':
      setTimeout(initMap, 100);
      break;
    case 'analytics':
      setTimeout(initAnalytics, 100);
      break;
    case 'admin':
      setTimeout(initAdmin, 100);
      break;
  }
}

// Report form functionality
function initReportForm() {
  const reportForm = document.getElementById('reportForm');
  const reportSuccess = document.getElementById('reportSuccess');

  if (!reportForm) return;

  reportForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('Form submitted');
    
    showLoading();
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newIssue = {
      id: generateTicketId(),
      title: document.getElementById('issueTitle').value,
      description: document.getElementById('issueDescription').value,
      category: document.getElementById('issueCategory').value,
      priority: document.getElementById('issuePriority').value,
      location: document.getElementById('issueLocation').value,
      status: 'Pending',
      reportedBy: document.getElementById('reporterName').value,
      reportedDate: new Date().toISOString().split('T')[0],
      assignedDepartment: 'Unassigned',
      assignedTo: 'Unassigned',
      estimatedCompletion: null,
      photos: [],
      votes: 0,
      comments: 0
    };

    // Add to issues array
    appData.issues.unshift(newIssue);
    
    // Update analytics
    appData.analytics.totalIssues++;
    appData.analytics.pendingIssues++;
    
    // Show success message
    const ticketNumber = document.getElementById('ticketNumber');
    if (ticketNumber) {
      ticketNumber.textContent = newIssue.id;
    }
    
    if (reportSuccess) {
      reportForm.style.display = 'none';
      reportSuccess.classList.remove('hidden');
    }
    
    hideLoading();
    
    // Reset form after delay
    setTimeout(() => {
      reportForm.reset();
      reportForm.style.display = 'block';
      if (reportSuccess) {
        reportSuccess.classList.add('hidden');
      }
    }, 5000);
  });
}

// Issues tracking functionality - Fixed filtering
function renderIssuesList(filteredIssues = null) {
  const issuesList = document.getElementById('issuesList');
  if (!issuesList) return;
  
  const issues = filteredIssues || appData.issues;
  console.log('Rendering issues list:', issues.length);
  
  if (issues.length === 0) {
    issuesList.innerHTML = '<p class="text-center">No issues found matching your criteria.</p>';
    return;
  }
  
  issuesList.innerHTML = issues.map(issue => `
    <div class="issue-card" onclick="showIssueDetails('${issue.id}')">
      <div class="issue-card__header">
        <h3 class="issue-card__title">${issue.title}</h3>
        <div class="issue-card__id">${issue.id}</div>
      </div>
      <div class="issue-card__meta">
        <span class="issue-card__category">${issue.category}</span>
        <span class="status ${getStatusClass(issue.status)}">${issue.status}</span>
        <div class="issue-card__location">${issue.location}</div>
      </div>
      <p class="issue-card__description">${issue.description}</p>
      <div class="issue-card__footer">
        <div class="issue-card__engagement">
          <div class="engagement-item">
            <span>👍</span>
            <span>${issue.votes}</span>
          </div>
          <div class="engagement-item">
            <span>💬</span>
            <span>${issue.comments}</span>
          </div>
        </div>
        <div class="issue-card__date">
          Reported: ${formatDate(issue.reportedDate)}
        </div>
      </div>
    </div>
  `).join('');
}

function initIssueTracking() {
  const searchBtn = document.getElementById('searchBtn');
  const issueSearch = document.getElementById('issueSearch');
  const statusFilter = document.getElementById('statusFilter');
  const categoryFilter = document.getElementById('categoryFilter');

  function filterIssues() {
    const searchTerm = issueSearch ? issueSearch.value.toLowerCase().trim() : '';
    const statusValue = statusFilter ? statusFilter.value.trim() : '';
    const categoryValue = categoryFilter ? categoryFilter.value.trim() : '';

    console.log('Filtering with:', { searchTerm, statusValue, categoryValue });

    // Update current filters
    currentFilters.search = searchTerm;
    currentFilters.status = statusValue;
    currentFilters.category = categoryValue;

    const filteredIssues = appData.issues.filter(issue => {
      // Search filter - check if empty string or matches
      const matchesSearch = !searchTerm || 
        issue.title.toLowerCase().includes(searchTerm) ||
        issue.description.toLowerCase().includes(searchTerm) ||
        issue.location.toLowerCase().includes(searchTerm) ||
        issue.id.toLowerCase().includes(searchTerm);
      
      // Status filter - check if empty string or exact match
      const matchesStatus = !statusValue || issue.status === statusValue;
      
      // Category filter - check if empty string or exact match  
      const matchesCategory = !categoryValue || issue.category === categoryValue;

      const result = matchesSearch && matchesStatus && matchesCategory;
      
      // Debug logging for filtering issues
      if (statusValue && !matchesStatus) {
        console.log(`Issue ${issue.id} filtered out: status "${issue.status}" doesn't match "${statusValue}"`);
      }

      return result;
    });

    console.log('Filtered issues:', filteredIssues.length, 'out of', appData.issues.length);
    renderIssuesList(filteredIssues);
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', filterIssues);
  }
  
  if (issueSearch) {
    issueSearch.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') filterIssues();
    });
    issueSearch.addEventListener('input', filterIssues); // Real-time search
  }
  
  if (statusFilter) {
    statusFilter.addEventListener('change', filterIssues);
  }
  
  if (categoryFilter) {
    categoryFilter.addEventListener('change', filterIssues);
  }

  // Initial render with no filters
  renderIssuesList();
}

function showIssueDetails(issueId) {
  console.log('Showing issue details:', issueId);
  const issue = appData.issues.find(i => i.id === issueId);
  if (!issue) return;

  const modal = document.getElementById('mapModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');

  if (modalTitle) {
    modalTitle.textContent = issue.title;
  }
  
  if (modalBody) {
    modalBody.innerHTML = `
      <div class="issue-details">
        <div class="issue-details__header">
          <span class="status ${getStatusClass(issue.status)}">${issue.status}</span>
          <span class="issue-card__category">${issue.category}</span>
        </div>
        <p><strong>ID:</strong> ${issue.id}</p>
        <p><strong>Location:</strong> ${issue.location}</p>
        <p><strong>Priority:</strong> ${issue.priority}</p>
        <p><strong>Description:</strong> ${issue.description}</p>
        <p><strong>Reported by:</strong> ${issue.reportedBy}</p>
        <p><strong>Date:</strong> ${formatDate(issue.reportedDate)}</p>
        <p><strong>Department:</strong> ${issue.assignedDepartment}</p>
        <p><strong>Assigned to:</strong> ${issue.assignedTo}</p>
        ${issue.estimatedCompletion ? `<p><strong>Est. Completion:</strong> ${formatDate(issue.estimatedCompletion)}</p>` : ''}
        ${issue.resolvedDate ? `<p><strong>Resolved:</strong> ${formatDate(issue.resolvedDate)}</p>` : ''}
        <div class="issue-engagement">
          <button class="btn btn--outline btn--sm" onclick="voteForIssue('${issue.id}')">
            👍 Vote (${issue.votes})
          </button>
          <button class="btn btn--outline btn--sm">
            💬 Comments (${issue.comments})
          </button>
        </div>
      </div>
    `;
  }

  if (modal) {
    modal.classList.remove('hidden');
  }
}

function voteForIssue(issueId) {
  const issue = appData.issues.find(i => i.id === issueId);
  if (issue) {
    issue.votes++;
    showIssueDetails(issueId); // Refresh modal
    if (currentSection === 'track') {
      // Re-apply current filters
      const filteredIssues = applyCurrentFilters();
      renderIssuesList(filteredIssues);
    }
  }
}

function applyCurrentFilters() {
  return appData.issues.filter(issue => {
    const matchesSearch = !currentFilters.search || 
      issue.title.toLowerCase().includes(currentFilters.search) ||
      issue.description.toLowerCase().includes(currentFilters.search) ||
      issue.location.toLowerCase().includes(currentFilters.search) ||
      issue.id.toLowerCase().includes(currentFilters.search);
    
    const matchesStatus = !currentFilters.status || issue.status === currentFilters.status;
    const matchesCategory = !currentFilters.category || issue.category === currentFilters.category;

    return matchesSearch && matchesStatus && matchesCategory;
  });
}

// Map functionality
function initMap() {
  console.log('Initializing map...');
  const mapPins = document.querySelectorAll('.map-pin');
  const mapCategoryFilter = document.getElementById('mapCategoryFilter');
  const mapStatusFilter = document.getElementById('mapStatusFilter');

  mapPins.forEach(pin => {
    pin.addEventListener('click', (e) => {
      e.preventDefault();
      const issueId = pin.getAttribute('data-issue');
      console.log('Map pin clicked:', issueId);
      showIssueDetails(issueId);
    });
  });

  function filterMapPins() {
    const categoryValue = mapCategoryFilter ? mapCategoryFilter.value : '';
    const statusValue = mapStatusFilter ? mapStatusFilter.value : '';

    mapPins.forEach(pin => {
      const issueId = pin.getAttribute('data-issue');
      const issue = appData.issues.find(i => i.id === issueId);
      
      if (issue) {
        const showPin = (!categoryValue || issue.category === categoryValue) &&
                       (!statusValue || issue.status === statusValue);
        
        pin.style.display = showPin ? 'flex' : 'none';
      }
    });

    updateMapStats();
  }

  function updateMapStats() {
    const visiblePins = Array.from(mapPins).filter(pin => pin.style.display !== 'none');
    const stats = document.querySelectorAll('.map-stats .stat-card__value');
    
    if (stats.length >= 4) {
      stats[0].textContent = visiblePins.length;
      
      let highPriority = 0;
      let inProgress = 0;
      let resolved = 0;

      visiblePins.forEach(pin => {
        const issueId = pin.getAttribute('data-issue');
        const issue = appData.issues.find(i => i.id === issueId);
        if (issue) {
          if (issue.priority === 'High' || issue.priority === 'Critical') highPriority++;
          if (issue.status === 'In Progress') inProgress++;
          if (issue.status === 'Resolved') resolved++;
        }
      });

      stats[1].textContent = highPriority;
      stats[2].textContent = inProgress;
      stats[3].textContent = resolved;
    }
  }

  if (mapCategoryFilter) {
    mapCategoryFilter.addEventListener('change', filterMapPins);
  }
  
  if (mapStatusFilter) {
    mapStatusFilter.addEventListener('change', filterMapPins);
  }

  // Initial stats update
  updateMapStats();
}

// Modal functionality
function initModals() {
  const modals = document.querySelectorAll('.modal');
  const closeButtons = document.querySelectorAll('.modal__close');

  closeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const modal = button.closest('.modal');
      if (modal) {
        modal.classList.add('hidden');
      }
    });
  });

  // Close on outside click
  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modals.forEach(modal => modal.classList.add('hidden'));
    }
  });
}

// Analytics functionality
function initAnalytics() {
  console.log('Initializing analytics...');
  setTimeout(() => {
    createCategoryChart();
    createTimelineChart();
    createDepartmentChart();
  }, 100);
}

function createCategoryChart() {
  const ctx = document.getElementById('categoryChart');
  if (!ctx) {
    console.log('Category chart canvas not found');
    return;
  }

  if (charts.categoryChart) {
    charts.categoryChart.destroy();
  }

  const data = appData.analytics.categoriesBreakdown;
  
  charts.categoryChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: Object.keys(data),
      datasets: [{
        data: Object.values(data),
        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}

function createTimelineChart() {
  const ctx = document.getElementById('timelineChart');
  if (!ctx) return;

  if (charts.timelineChart) {
    charts.timelineChart.destroy();
  }

  charts.timelineChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Issues Resolved',
        data: [12, 19, 15, 22, 18, 25],
        backgroundColor: '#1FB8CD'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function createDepartmentChart() {
  const ctx = document.getElementById('departmentChart');
  if (!ctx) return;

  if (charts.departmentChart) {
    charts.departmentChart.destroy();
  }

  charts.departmentChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Public Works', 'Electrical', 'Sanitation'],
      datasets: [{
        label: 'Avg Resolution Days',
        data: [4.2, 3.8, 2.5],
        backgroundColor: ['#FFC185', '#B4413C', '#5D878F']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Admin portal functionality
function initAdmin() {
  console.log('Initializing admin portal...');
  const adminLogin = document.getElementById('adminLogin');
  const adminDashboard = document.getElementById('adminDashboard');

  if (!adminLogin || !adminDashboard) return;

  if (isAdminLoggedIn) {
    adminLogin.style.display = 'none';
    adminDashboard.classList.remove('hidden');
    renderAdminIssues();
  } else {
    adminLogin.style.display = 'block';
    adminDashboard.classList.add('hidden');
  }
}

function setupAdminHandlers() {
  const adminLoginForm = document.getElementById('adminLoginForm');
  const adminLogout = document.getElementById('adminLogout');

  if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const username = document.getElementById('adminUsername').value;
      const password = document.getElementById('adminPassword').value;

      showLoading();
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (username === 'admin' && password === 'admin123') {
        isAdminLoggedIn = true;
        const adminLogin = document.getElementById('adminLogin');
        const adminDashboard = document.getElementById('adminDashboard');
        
        if (adminLogin) adminLogin.style.display = 'none';
        if (adminDashboard) {
          adminDashboard.classList.remove('hidden');
          renderAdminIssues();
        }
      } else {
        alert('Invalid credentials. Use admin / admin123');
      }

      hideLoading();
    });
  }

  if (adminLogout) {
    adminLogout.addEventListener('click', () => {
      isAdminLoggedIn = false;
      const adminLogin = document.getElementById('adminLogin');
      const adminDashboard = document.getElementById('adminDashboard');
      const adminLoginForm = document.getElementById('adminLoginForm');
      
      if (adminLogin) adminLogin.style.display = 'block';
      if (adminDashboard) adminDashboard.classList.add('hidden');
      if (adminLoginForm) adminLoginForm.reset();
    });
  }

  // Admin filters
  const adminFilters = ['adminStatusFilter', 'adminDepartmentFilter', 'adminPriorityFilter'];
  adminFilters.forEach(filterId => {
    const filter = document.getElementById(filterId);
    if (filter) {
      filter.addEventListener('change', renderAdminIssues);
    }
  });

  // Refresh button
  const refreshBtn = document.getElementById('refreshIssues');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      showLoading();
      setTimeout(() => {
        renderAdminIssues();
        hideLoading();
      }, 500);
    });
  }
}

function renderAdminIssues() {
  const adminIssuesList = document.getElementById('adminIssuesList');
  if (!adminIssuesList) return;

  const statusFilter = document.getElementById('adminStatusFilter')?.value || '';
  const departmentFilter = document.getElementById('adminDepartmentFilter')?.value || '';
  const priorityFilter = document.getElementById('adminPriorityFilter')?.value || '';

  const filteredIssues = appData.issues.filter(issue => {
    return (!statusFilter || issue.status === statusFilter) &&
           (!departmentFilter || issue.assignedDepartment === departmentFilter) &&
           (!priorityFilter || issue.priority === priorityFilter);
  });

  adminIssuesList.innerHTML = filteredIssues.map(issue => `
    <div class="admin-issue-card" onclick="showAdminIssueModal('${issue.id}')">
      <div class="admin-issue-card__header">
        <h3>${issue.title}</h3>
        <div>
          <span class="status ${getStatusClass(issue.status)}">${issue.status}</span>
          <span class="issue-card__id">${issue.id}</span>
        </div>
      </div>
      <div class="issue-card__meta">
        <span class="issue-card__category">${issue.category}</span>
        <span class="issue-card__location">${issue.location}</span>
        <span style="color: var(--color-text-secondary);">Priority: ${issue.priority}</span>
      </div>
      <p class="issue-card__description">${issue.description}</p>
      <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary); margin-top: var(--space-8);">
        <div>Reported: ${formatDate(issue.reportedDate)} by ${issue.reportedBy}</div>
        <div>Department: ${issue.assignedDepartment} | Assigned to: ${issue.assignedTo}</div>
      </div>
      <div class="admin-issue-card__actions">
        <button class="btn btn--sm btn--outline" onclick="event.stopPropagation(); assignIssue('${issue.id}')">
          Assign
        </button>
        <button class="btn btn--sm btn--primary" onclick="event.stopPropagation(); updateIssueStatus('${issue.id}')">
          Update Status
        </button>
      </div>
    </div>
  `).join('');
}

function showAdminIssueModal(issueId) {
  const issue = appData.issues.find(i => i.id === issueId);
  if (!issue) return;

  const modal = document.getElementById('adminModal');
  const modalTitle = document.getElementById('adminModalTitle');
  const modalBody = document.getElementById('adminModalBody');

  if (!modal || !modalTitle || !modalBody) return;

  modalTitle.textContent = `Manage Issue: ${issue.title}`;
  modalBody.innerHTML = `
    <div class="admin-issue-details">
      <div style="margin-bottom: var(--space-16);">
        <span class="status ${getStatusClass(issue.status)}">${issue.status}</span>
        <span class="issue-card__category">${issue.category}</span>
      </div>
      
      <div style="margin-bottom: var(--space-16);">
        <p><strong>ID:</strong> ${issue.id}</p>
        <p><strong>Location:</strong> ${issue.location}</p>
        <p><strong>Priority:</strong> ${issue.priority}</p>
        <p><strong>Description:</strong> ${issue.description}</p>
        <p><strong>Reported by:</strong> ${issue.reportedBy} on ${formatDate(issue.reportedDate)}</p>
        <p><strong>Votes:</strong> ${issue.votes} | <strong>Comments:</strong> ${issue.comments}</p>
      </div>

      <div class="form-group">
        <label class="form-label">Update Status</label>
        <select id="newStatus" class="form-control">
          ${appData.statusTypes.map(status => 
            `<option value="${status}" ${status === issue.status ? 'selected' : ''}>${status}</option>`
          ).join('')}
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Assign Department</label>
        <select id="newDepartment" class="form-control">
          <option value="Unassigned">Unassigned</option>
          ${appData.departments.map(dept => 
            `<option value="${dept.name}" ${dept.name === issue.assignedDepartment ? 'selected' : ''}>${dept.name}</option>`
          ).join('')}
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Assign Staff</label>
        <select id="newAssignee" class="form-control">
          <option value="Unassigned">Unassigned</option>
          ${getStaffForDepartment(issue.assignedDepartment).map(staff => 
            `<option value="${staff}" ${staff === issue.assignedTo ? 'selected' : ''}>${staff}</option>`
          ).join('')}
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Estimated Completion</label>
        <input type="date" id="newEstCompletion" class="form-control" value="${issue.estimatedCompletion || ''}">
      </div>

      <div style="margin-top: var(--space-20);">
        <button class="btn btn--primary" onclick="saveIssueChanges('${issue.id}')">Save Changes</button>
        <button class="btn btn--outline" onclick="closeAdminModal()">Cancel</button>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');

  // Update staff dropdown when department changes
  const deptSelect = document.getElementById('newDepartment');
  if (deptSelect) {
    deptSelect.addEventListener('change', (e) => {
      const staffSelect = document.getElementById('newAssignee');
      const departmentName = e.target.value;
      const staff = getStaffForDepartment(departmentName);
      
      if (staffSelect) {
        staffSelect.innerHTML = '<option value="Unassigned">Unassigned</option>' +
          staff.map(name => `<option value="${name}">${name}</option>`).join('');
      }
    });
  }
}

function getStaffForDepartment(departmentName) {
  const department = appData.departments.find(d => d.name === departmentName);
  return department ? department.staff : [];
}

function saveIssueChanges(issueId) {
  const issue = appData.issues.find(i => i.id === issueId);
  if (!issue) return;

  const newStatus = document.getElementById('newStatus')?.value;
  const newDepartment = document.getElementById('newDepartment')?.value;
  const newAssignee = document.getElementById('newAssignee')?.value;
  const newEstCompletion = document.getElementById('newEstCompletion')?.value;

  // Update issue
  if (newStatus) issue.status = newStatus;
  if (newDepartment) issue.assignedDepartment = newDepartment;
  if (newAssignee) issue.assignedTo = newAssignee;
  if (newEstCompletion !== undefined) issue.estimatedCompletion = newEstCompletion || null;

  if (newStatus === 'Resolved' && !issue.resolvedDate) {
    issue.resolvedDate = new Date().toISOString().split('T')[0];
    appData.analytics.resolvedIssues++;
    appData.analytics.pendingIssues = Math.max(0, appData.analytics.pendingIssues - 1);
  }

  // Show success and refresh
  showLoading();
  setTimeout(() => {
    renderAdminIssues();
    closeAdminModal();
    hideLoading();
    alert('Issue updated successfully!');
  }, 500);
}

function closeAdminModal() {
  const modal = document.getElementById('adminModal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

function assignIssue(issueId) {
  showAdminIssueModal(issueId);
}

function updateIssueStatus(issueId) {
  showAdminIssueModal(issueId);
}

// Real-time updates simulation
function simulateRealTimeUpdates() {
  setInterval(() => {
    // Simulate random status updates
    const pendingIssues = appData.issues.filter(issue => issue.status === 'Pending');
    if (pendingIssues.length > 0 && Math.random() < 0.1) {
      const randomIssue = pendingIssues[Math.floor(Math.random() * pendingIssues.length)];
      randomIssue.status = 'In Progress';
      
      // Update UI if relevant section is active
      if (isAdminLoggedIn && currentSection === 'admin') {
        renderAdminIssues();
      }
      if (currentSection === 'track') {
        const filteredIssues = applyCurrentFilters();
        renderIssuesList(filteredIssues);
      }
    }

    // Simulate vote updates
    if (Math.random() < 0.05) {
      const randomIssue = appData.issues[Math.floor(Math.random() * appData.issues.length)];
      randomIssue.votes++;
      
      // Update UI if track section is visible
      if (currentSection === 'track') {
        const filteredIssues = applyCurrentFilters();
        renderIssuesList(filteredIssues);
      }
    }
  }, 10000); // Update every 10 seconds
}

// Global functions for onclick handlers
window.showIssueDetails = showIssueDetails;
window.voteForIssue = voteForIssue;
window.showAdminIssueModal = showAdminIssueModal;
window.saveIssueChanges = saveIssueChanges;
window.closeAdminModal = closeAdminModal;
window.assignIssue = assignIssue;
window.updateIssueStatus = updateIssueStatus;

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM Content Loaded - Initializing app...');
  
  // Initialize core functionality
  initNavigation();
  initReportForm();
  initModals();
  setupAdminHandlers();
  
  // Start real-time updates
  setTimeout(simulateRealTimeUpdates, 2000);
  
  console.log('App initialization complete');
});

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Fail silently if no service worker
    });
  });
}