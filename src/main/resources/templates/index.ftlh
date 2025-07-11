<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employee Directory</title>
    <link rel="stylesheet" href="../static/css/style.css">
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>Employee Directory</h1>
            <p>Manage your team efficiently</p>
        </div>

        <!-- Controls -->
        <div class="controls">
            <div class="search-box">
                <input type="text" id="searchInput" placeholder="Search by name or email...">
            </div>
            <div class="sort-controls">
                <label for="sortBy">Sort by:</label>
                <select id="sortBy">
                    <option value="">Select...</option>
                    <option value="firstName">First Name</option>
                    <option value="lastName">Last Name</option>
                    <option value="department">Department</option>
                    <option value="role">Role</option>
                </select>
                <select id="sortOrder">
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
            <button class="btn btn-secondary" id="filterBtn">Filter</button>
            <button class="btn btn-primary" id="addEmployeeBtn">Add Employee</button>
        </div>

        <!-- Add/Edit Form -->
        <div class="form-container" id="employeeForm">
            <h2 id="formTitle">Add New Employee</h2>
            <form id="employeeFormElement">
                <div class="form-row">
                    <div class="form-group">
                        <label for="firstName">First Name *</label>
                        <input type="text" id="firstName" name="firstName" required>
                        <div class="error-message" id="firstNameError"></div>
                    </div>
                    <div class="form-group">
                        <label for="lastName">Last Name *</label>
                        <input type="text" id="lastName" name="lastName" required>
                        <div class="error-message" id="lastNameError"></div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="email">Email *</label>
                    <input type="email" id="email" name="email" required>
                    <div class="error-message" id="emailError"></div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="department">Department *</label>
                        <select id="department" name="department" required>
                            <option value="">Select Department</option>
                            <option value="HR">Human Resources</option>
                            <option value="IT">Information Technology</option>
                            <option value="Finance">Finance</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Sales">Sales</option>
                            <option value="Operations">Operations</option>
                        </select>
                        <div class="error-message" id="departmentError"></div>
                    </div>
                    <div class="form-group">
                        <label for="role">Role *</label>
                        <input type="text" id="role" name="role" required>
                        <div class="error-message" id="roleError"></div>
                    </div>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" id="cancelBtn">Cancel</button>
                    <button type="submit" class="btn btn-success" id="saveBtn">Save Employee</button>
                </div>
            </form>
        </div>

        <!-- Employee Grid -->
        <div class="employee-grid" id="employeeGrid">
            <!-- Employees will be dynamically inserted here -->
        </div>

        <!-- No Results Message -->
        <div class="no-results hidden" id="noResults">
            <h3>No employees found</h3>
            <p>Try adjusting your search criteria or add a new employee.</p>
        </div>

        <!-- Pagination -->
        <div class="pagination">
            <div class="pagination-info" id="paginationInfo">
                Showing 1-10 of 50 employees
            </div>
            <div class="pagination-controls">
                <button class="btn btn-secondary" id="prevBtn">Previous</button>
                <button class="btn btn-secondary" id="nextBtn">Next</button>
                <select id="itemsPerPage">
                    <option value="10">10 per page</option>
                    <option value="25">25 per page</option>
                    <option value="50">50 per page</option>
                    <option value="100">100 per page</option>
                </select>
            </div>
        </div>
    </div>

    <!-- Filter Popup -->
    <div class="filter-popup" id="filterPopup">
        <div class="filter-content">
            <h3>Filter Employees</h3>
            <div class="form-group">
                <label for="filterFirstName">First Name</label>
                <input type="text" id="filterFirstName" placeholder="Enter first name">
            </div>
            <div class="form-group">
                <label for="filterDepartment">Department</label>
                <select id="filterDepartment">
                    <option value="">All Departments</option>
                    <option value="HR">Human Resources</option>
                    <option value="IT">Information Technology</option>
                    <option value="Finance">Finance</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="Operations">Operations</option>
                </select>
            </div>
            <div class="form-group">
                <label for="filterRole">Role</label>
                <input type="text" id="filterRole" placeholder="Enter role">
            </div>
            <div class="filter-actions">
                <button class="btn btn-secondary" id="clearFiltersBtn">Clear Filters</button>
                <button class="btn btn-secondary" id="closeFilterBtn">Close</button>
                <button class="btn btn-primary" id="applyFiltersBtn">Apply Filters</button>
            </div>
        </div>
    </div>

    <script src="../static/js/data.js"></script>
    <script src="../static/js/app.js"></script>
</body>
</html>