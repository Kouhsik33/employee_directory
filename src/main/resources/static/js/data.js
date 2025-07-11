// Mock Employee Data (Simulating Freemarker data injection)
 const mockEmployees = [
            { id: 1, firstName: 'Koushik', lastName: 'Thummu', email: 'koushikt33@gmail.com', department: 'IT', role: 'Senior Developer' },
            { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@company.com', department: 'HR', role: 'HR Manager' },
            { id: 3, firstName: 'Mike', lastName: 'Johnson', email: 'mike.johnson@company.com', department: 'Finance', role: 'Financial Analyst' },
            { id: 4, firstName: 'Sarah', lastName: 'Williams', email: 'sarah.williams@company.com', department: 'Marketing', role: 'Marketing Specialist' },
            { id: 5, firstName: 'David', lastName: 'Brown', email: 'david.brown@company.com', department: 'IT', role: 'DevOps Engineer' },
            { id: 6, firstName: 'Lisa', lastName: 'Davis', email: 'lisa.davis@company.com', department: 'Sales', role: 'Sales Representative' },
            { id: 7, firstName: 'Robert', lastName: 'Miller', email: 'robert.miller@company.com', department: 'Operations', role: 'Operations Manager' },
            { id: 8, firstName: 'Emily', lastName: 'Wilson', email: 'emily.wilson@company.com', department: 'HR', role: 'Recruiter' },
            { id: 9, firstName: 'James', lastName: 'Moore', email: 'james.moore@company.com', department: 'IT', role: 'Frontend Developer' },
            { id: 10, firstName: 'Ashley', lastName: 'Taylor', email: 'ashley.taylor@company.com', department: 'Marketing', role: 'Content Creator' },
            { id: 11, firstName: 'Christopher', lastName: 'Anderson', email: 'christopher.anderson@company.com', department: 'Finance', role: 'Accountant' },
            { id: 12, firstName: 'Michelle', lastName: 'Thomas', email: 'michelle.thomas@company.com', department: 'Sales', role: 'Sales Manager' },
            { id: 13, firstName: 'Daniel', lastName: 'Jackson', email: 'daniel.jackson@company.com', department: 'IT', role: 'Database Administrator' },
            { id: 14, firstName: 'Jessica', lastName: 'White', email: 'jessica.white@company.com', department: 'Operations', role: 'Project Coordinator' },
            { id: 15, firstName: 'Matthew', lastName: 'Harris', email: 'matthew.harris@company.com', department: 'Marketing', role: 'Digital Marketing Manager' }
        ];

// Make it available for Freemarker template
// In a real Freemarker setup, this would be passed from the backend
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { mockEmployees };
}