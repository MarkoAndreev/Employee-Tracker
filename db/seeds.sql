-- Active: 1692317003526@@127.0.0.1@3306@employeetracker_db
INSERT INTO department(id, name)
VALUES 
(1, 'Sales'), 
(2, 'Engineering'), 
(3, 'Finance'), 
(4, 'Legal'),
(5, 'Human Resources'),
(6, 'Marketing'),
(7, 'Product'),
(8, 'Customer Service');

INSERT INTO roles(id, title, salary, department_id)
VALUES 
(1, 'Sales Manager', 80000, 1), 
(2, 'Engineer', 70000, 2), 
(3, 'Financial Analyst', 75000, 3), 
(4, 'Legal Advisor', 85000, 4),
(5, 'HR Manager', 75000, 5),
(6, 'Marketing Specialist', 70000, 6),
(7, 'Product Manager', 80000, 7),
(8, 'Customer Service Representative', 65000, 8);

INSERT INTO employee(id, first_name, last_name, role_id, manager_id)
VALUES 
(1, 'John', 'Doe', 1, NULL), 
(2, 'Jane', 'Doe', 2, 1), 
(3, 'Jim', 'Smith', 3, 1), 
(4, 'Jill', 'Johnson', 4, 1),
(5, 'Joe', 'Brown', 5, 1),
(6, 'Julie', 'Davis', 6, 1),
(7, 'James', 'Miller', 7, 1),
(8, 'Jennifer', 'Wilson', 8, 1),
(9, 'Jack', 'Moore', 1, 2),
(10, 'Jessica', 'Taylor', 2, 2),
(11, 'Jeff', 'Anderson', 3, 2),
(12, 'Joyce', 'Thomas', 4, 2),
(13, 'Jerry', 'Jackson', 5, 2),
(14, 'Jasmine', 'White', 6, 2),
(15, 'Jacob', 'Harris', 7, 2);