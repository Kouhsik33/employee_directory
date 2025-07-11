# Employee Directory Web Application

![Dashboard Screenshot](./src/screenshots/dashboard-desktop.png)

A responsive employee management system with data persistence using localStorage.

## Features

- **Employee Management**:
  - Add new employees with form validation
  - Edit existing employee details
  - Delete employees with confirmation

- **Data Visualization**:
  - Grid/list view of all employees
  - Pagination (10, 25, 50, 100 items per page)
  - Responsive design for all devices

- **Search & Filtering**:
  - Full-text search by name or email
  - Advanced filtering by department/role
  - Multi-column sorting

- **Data Persistence**:
  - Automatic save to browser localStorage
  - Data survives page refreshes and browser restarts
  - Optional reset to initial demo data

## Technologies Used

- **Frontend**:
  - HTML5, CSS3 (Flexbox/Grid)
  - Vanilla JavaScript (ES6+)
  - localStorage for data persistence

- **Build**:
  - Freemarker templates (optional)
  - No external dependencies

## Installation & Setup

1. **Simple HTML Version**:
   ```bash
   git clone https://github.com/Kouhsik33/employee_directory.git
   cd employee-directory
   # Open index.html in any modern browser
