DROP DATABASE IF EXISTS companyDB;
CREATE database companyDB;

USE companyDB;

CREATE TABLE employee (
 id int(4000) not null AUTO_INCREMENT PRIMARY KEY,
  first_name varchar(30) not null,
  last_name varchar(30) not null,
  role_id int not null,
  manager_id int null,
  FOREIGN KEY (role_id) REFERENCES role(id)
);

CREATE TABLE role (
  id int(4000) AUTO_INCREMENT PRIMARY KEY,
  title varchar(30) not null,
  salary decimal,
  department_id int,
  FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE department (
  id int(4000) AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30)
);
SELECT * FROM employee;
select * from department;
select * from role;

-- what is the foreign key used for in databases?
-- FOREIGN KEY (role_id) REFERENCES role(id)
-- department.name, role.salary, employee.first_name, employee.last_name
-- SELECT * FROM department INNER JOIN role ON (department.id = role.id) INNER JOIN employee ON (role.id = employee.id)  WHERE department.name = 'Technology';
-- SELECT * FROM employee INNER JOIN role ON (role.id = employee.id)  INNER JOIN department ON (department.id = role.id) WHERE department.name = 'Technology';









-- inquirer
--     .prompt([
--       {
--       name: "emp_firstName", 
--       type: "input",
--       message: "What is the first name for the employee?"
--     },
--     {
--       name: "emp_lastName", 
--       type: "input",
--       message: "What is the last name for the employee?"
--     }
    
--   ])
--     .then(function(answer) {
  
  
  
--   var query = "DELETE from employee WHERE first_name= ? AND last_name= ?";
--   connection.query(query, [answer.emp_firstName, answer.emp_lastName]
