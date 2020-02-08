-- -- DROP DATABASE IF EXISTS companydb;
-- -- CREATE database companydb;

-- -- USE companydb;

-- -- CREATE TABLE employee (
-- --  id int not null AUTO_INCREMENT PRIMARY KEY,
-- --   first_name varchar(30) not null,
-- --   last_name varchar(30) not null,
-- --   role_id int not null,
-- --   manager_id int null,
-- --   FOREIGN KEY (role_id) REFERENCES title(id)
-- -- );

-- -- CREATE TABLE title (
-- --   id int AUTO_INCREMENT PRIMARY KEY,
-- --   title varchar(30) not null,
-- --   salary decimal,
-- --   department_id int,
-- --   FOREIGN KEY (department_id) REFERENCES department(id)
-- -- );

-- -- CREATE TABLE department (
-- --   id int AUTO_INCREMENT PRIMARY KEY,
-- --   name VARCHAR(30)
-- -- );
use companyDB;
SELECT * FROM employee INNER JOIN title ON (role.id = employee.id)  INNER JOIN department ON (department.id = role.id) WHERE department.name = 'Technology';
use companyDB;
SELECT * FROM title;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Freedom123!';
SELECT * FROM employee;
SELECT * FROM title;
SELECT * FROM department;
-- for the role table the department must exist for insertion
-- for the employee table the role must exist for inssertion
-- all clear for department
INSERT into employee (id, first_name, last_name, role_id, manager_id) VALUES (111,'Charles','Frozen',21,888);
INSERT into title ( id, title, salary, department_id) VALUES (687, 'Tours', 898, 1);
INSERT into department (id , name) VALUES (8, 'Fire');

use companyDB;
INSERT into employee (id, first_name, last_name, role_id, manager_id) VALUES (1144555,'Charles','Frozen',21,2);
INSERT into employee (id, first_name, last_name, role_id, manager_id) VALUES (56885,'Charles','Frozen',21,2);
INSERT into employee (id, first_name, last_name, role_id, manager_id) VALUES (9850,'Charles','Frozen',21,2);
INSERT into employee (id, first_name, last_name, role_id, manager_id) VALUES (89897,'Charles','Frozen',21,2);

SELECT id, first_name, last_name from employee WHERE manager_id = 2;
use companyDB;
SELECT manager_id FROM employee;
SELECT id, first_name, last_name FROM employee
UPDATE title SET title = 'r' WHERE id = 687;


use companyDB;
DELETE from department WHERE name ='Fire' ;
DELETE from employee WHERE first_name='BLue' AND last_name= 'Blue';


UPDATE title SET title = 'role' WHERE id = 21;
UPDATE employee SET manager_id = '666' WHERE employee.first_name= 'Fred' AND employee.last_name='Charles';
SELECT * FROM employee;

use companyDB;
CREATE TABLE IF NOT EXISTS tasks (
    task_id INT AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    start_date DATE,
    due_date DATE,
    priority TINYINT NOT NULL DEFAULT 3,
    description TEXT,
    PRIMARY KEY (task_id)
);

SELECT * FROM tasks;
INSERT INTO tasks(title,priority)
VALUES('Learn MySQL INSERT Statement',1);

INSERT INTO title (id, title, salary, department_id) VALUES (888, 'zero', 0, 3989899);
use companydb;
SELECT * FROM  department;
use companydb;
SELECT * FROM  title;
INSERT INTO department( id, name) VALUES (0, 'Freedom');


    
SELECT COUNT(*) total_jobs FROM title WHERE department_id = 1;


