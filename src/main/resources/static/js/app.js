class EmployeeManager {
    constructor() {
        // Load employees from localStorage or initialize with mock data
        this.employees = this.loadEmployees();
        this.filteredEmployees = [...this.employees];
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.currentEditId = null;
        this.filters = {
            firstName: '',
            department: '',
            role: ''
        };
        this.searchQuery = '';
        this.sortBy = '';
        this.sortOrder = 'asc';
        
        this.initializeEventListeners();
        this.renderEmployees();
        this.updatePaginationInfo();
    }

    // Load employees from localStorage
    loadEmployees() {
        const storedEmployees = localStorage.getItem('employees');
        if (storedEmployees) {
            return JSON.parse(storedEmployees);
        } else {
            // If no data in localStorage, save mock data
            this.saveEmployees(mockEmployees);
            return [...mockEmployees];
        }
    }

    // Save employees to localStorage
    saveEmployees(employees = this.employees) {
        localStorage.setItem('employees', JSON.stringify(employees));
    }

    initializeEventListeners() {
        // Search
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.searchQuery = e.target.value.toLowerCase();
            this.applyFiltersAndSearch();
        });

        // Sort
        document.getElementById('sortBy').addEventListener('change', (e) => {
            this.sortBy = e.target.value;
            this.applyFiltersAndSearch();
        });

        document.getElementById('sortOrder').addEventListener('change', (e) => {
            this.sortOrder = e.target.value;
            this.applyFiltersAndSearch();
        });

        // Filter popup
        document.getElementById('filterBtn').addEventListener('click', () => {
            document.getElementById('filterPopup').style.display = 'flex';
        });

        document.getElementById('closeFilterBtn').addEventListener('click', () => {
            document.getElementById('filterPopup').style.display = 'none';
        });

        document.getElementById('applyFiltersBtn').addEventListener('click', () => {
            this.applyFilters();
            document.getElementById('filterPopup').style.display = 'none';
        });

        document.getElementById('clearFiltersBtn').addEventListener('click', () => {
            this.clearFilters();
        });

        // Add employee
        document.getElementById('addEmployeeBtn').addEventListener('click', () => {
            this.showAddForm();
        });

        // Form submission
        document.getElementById('employeeFormElement').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveEmployee();
        });

        document.getElementById('cancelBtn').addEventListener('click', () => {
            this.hideForm();
        });

        // Pagination
        document.getElementById('prevBtn').addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.renderEmployees();
                this.updatePaginationInfo();
            }
        });

        document.getElementById('nextBtn').addEventListener('click', () => {
            const totalPages = Math.ceil(this.filteredEmployees.length / this.itemsPerPage);
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.renderEmployees();
                this.updatePaginationInfo();
            }
        });

        document.getElementById('itemsPerPage').addEventListener('change', (e) => {
            this.itemsPerPage = parseInt(e.target.value);
            this.currentPage = 1;
            this.renderEmployees();
            this.updatePaginationInfo();
        });

        // Close filter popup when clicking outside
        document.getElementById('filterPopup').addEventListener('click', (e) => {
            if (e.target.id === 'filterPopup') {
                document.getElementById('filterPopup').style.display = 'none';
            }
        });

        // Reset to mock data (optional - add a button in your HTML to use this)
        if (document.getElementById('resetBtn')) {
            document.getElementById('resetBtn').addEventListener('click', () => {
                this.resetToMockData();
            });
        }
    }

    applyFiltersAndSearch() {
        this.filteredEmployees = this.employees.filter(employee => {
            // Apply search
            const matchesSearch = !this.searchQuery || 
                employee.firstName.toLowerCase().includes(this.searchQuery) ||
                employee.lastName.toLowerCase().includes(this.searchQuery) ||
                employee.email.toLowerCase().includes(this.searchQuery);

            // Apply filters
            const matchesFirstName = !this.filters.firstName || 
                employee.firstName.toLowerCase().includes(this.filters.firstName.toLowerCase());
            const matchesDepartment = !this.filters.department || 
                employee.department === this.filters.department;
            const matchesRole = !this.filters.role || 
                employee.role.toLowerCase().includes(this.filters.role.toLowerCase());

            return matchesSearch && matchesFirstName && matchesDepartment && matchesRole;
        });

        // Apply sorting
        if (this.sortBy) {
            this.filteredEmployees.sort((a, b) => {
                const aValue = a[this.sortBy].toLowerCase();
                const bValue = b[this.sortBy].toLowerCase();
                
                if (this.sortOrder === 'asc') {
                    return aValue.localeCompare(bValue);
                } else {
                    return bValue.localeCompare(aValue);
                }
            });
        }

        this.currentPage = 1;
        this.renderEmployees();
        this.updatePaginationInfo();
    }

    applyFilters() {
        this.filters.firstName = document.getElementById('filterFirstName').value;
        this.filters.department = document.getElementById('filterDepartment').value;
        this.filters.role = document.getElementById('filterRole').value;
        
        this.applyFiltersAndSearch();
    }

    clearFilters() {
        this.filters = { firstName: '', department: '', role: '' };
        document.getElementById('filterFirstName').value = '';
        document.getElementById('filterDepartment').value = '';
        document.getElementById('filterRole').value = '';
        
        this.applyFiltersAndSearch();
    }

    renderEmployees() {
        const grid = document.getElementById('employeeGrid');
        const noResults = document.getElementById('noResults');
        
        if (this.filteredEmployees.length === 0) {
            grid.innerHTML = '';
            noResults.classList.remove('hidden');
            return;
        }

        noResults.classList.add('hidden');
        
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const pageEmployees = this.filteredEmployees.slice(startIndex, endIndex);

        grid.innerHTML = pageEmployees.map(employee => `
            <div class="employee-card">
                <h3>${employee.firstName} ${employee.lastName}</h3>
                <p class="id">ID: ${employee.id}</p>
                <p><strong>Email:</strong> ${employee.email}</p>
                <p><strong>Department:</strong> ${employee.department}</p>
                <p><strong>Role:</strong> ${employee.role}</p>
                <div class="employee-actions">
                    <button class="btn btn-primary" onclick="employeeManager.editEmployee(${employee.id})">Edit</button>
                    <button class="btn btn-danger" onclick="employeeManager.deleteEmployee(${employee.id})">Delete</button>
                </div>
            </div>
        `).join('');
    }

    updatePaginationInfo() {
        const totalItems = this.filteredEmployees.length;
        const startItem = totalItems === 0 ? 0 : (this.currentPage - 1) * this.itemsPerPage + 1;
        const endItem = Math.min(this.currentPage * this.itemsPerPage, totalItems);
        const totalPages = Math.ceil(totalItems / this.itemsPerPage);

        document.getElementById('paginationInfo').textContent = 
            `Showing ${startItem}-${endItem} of ${totalItems} employees`;

        document.getElementById('prevBtn').disabled = this.currentPage === 1;
        document.getElementById('nextBtn').disabled = this.currentPage === totalPages || totalPages === 0;
    }

    showAddForm() {
        this.currentEditId = null;
        document.getElementById('formTitle').textContent = 'Add New Employee';
        document.getElementById('saveBtn').textContent = 'Save Employee';
        this.clearForm();
        document.getElementById('employeeForm').classList.add('active');
        document.getElementById('firstName').focus();
    }

    editEmployee(id) {
        this.currentEditId = id;
        const employee = this.employees.find(emp => emp.id === id);
        if (employee) {
            document.getElementById('formTitle').textContent = 'Edit Employee';
            document.getElementById('saveBtn').textContent = 'Update Employee';
            
            document.getElementById('firstName').value = employee.firstName;
            document.getElementById('lastName').value = employee.lastName;
            document.getElementById('email').value = employee.email;
            document.getElementById('department').value = employee.department;
            document.getElementById('role').value = employee.role;
            
            document.getElementById('employeeForm').classList.add('active');
            document.getElementById('firstName').focus();
        }
    }

    deleteEmployee(id) {
        if (confirm('Are you sure you want to delete this employee?')) {
            this.employees = this.employees.filter(emp => emp.id !== id);
            this.saveEmployees();
            this.applyFiltersAndSearch();
        }
    }

    saveEmployee() {
        if (this.validateForm()) {
            const formData = {
                firstName: document.getElementById('firstName').value.trim(),
                lastName: document.getElementById('lastName').value.trim(),
                email: document.getElementById('email').value.trim(),
                department: document.getElementById('department').value,
                role: document.getElementById('role').value.trim()
            };

            if (this.currentEditId) {
                // Update existing employee
                const index = this.employees.findIndex(emp => emp.id === this.currentEditId);
                if (index !== -1) {
                    this.employees[index] = { ...this.employees[index], ...formData };
                }
            } else {
                // Add new employee
                const newEmployee = {
                    id: Date.now(), // Simple ID generation
                    ...formData
                };
                this.employees.push(newEmployee);
            }

            this.saveEmployees();
            this.applyFiltersAndSearch();
            this.hideForm();
        }
    }

    validateForm() {
        let isValid = true;
        const fields = ['firstName', 'lastName', 'email', 'department', 'role'];
        
        fields.forEach(field => {
            const element = document.getElementById(field);
            const errorElement = document.getElementById(field + 'Error');
            const value = element.value.trim();
            
            element.classList.remove('error');
            errorElement.textContent = '';
            
            if (!value) {
                element.classList.add('error');
                errorElement.textContent = 'This field is required';
                isValid = false;
            } else if (field === 'email' && !this.isValidEmail(value)) {
                element.classList.add('error');
                errorElement.textContent = 'Please enter a valid email address';
                isValid = false;
            }
        });

        return isValid;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    clearForm() {
        document.getElementById('employeeFormElement').reset();
        document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    }

    hideForm() {
        document.getElementById('employeeForm').classList.remove('active');
        this.clearForm();
    }

    // Optional: Reset to initial mock data
    resetToMockData() {
        if (confirm('Are you sure you want to reset all data to the initial mock employees?')) {
            this.employees = [...mockEmployees];
            this.saveEmployees();
            this.applyFiltersAndSearch();
        }
    }
}

// Initialize the application
const employeeManager = new EmployeeManager();