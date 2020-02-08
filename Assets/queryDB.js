var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Freedom123!",
  database: "companydb"
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "Display roles Table",
        "Display employee Table",
        "Display department Table",
        "Update role for a specific employee",
        "Add an employee",
        "Add a department",
        "Add a Role",

        "Delete departments",
        "Delete roles", 
        "Delete employees",
        "View Employees by Manager",
        "Change Manager for an Employee",




        "Exit"
        

      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "Display roles Table":
        showRole();
        break;

      case "Display employee Table":
        showEmployee();
        break;

      case "Display department Table":
        showDepartment();
        break;

      case "Update role for a specific employee":
        updateEmployee();
        
        break;

      case "Add a department":
        addDepartment();
        break;
      case "Add an employee":
        addEmployee();
        break;
      case "Add a Role":
        addRole();
        break;
      
      



      case "Delete departments":
          deleteDepartment();
          break;

      case "Delete roles":
        deleteRole();
        break;

      case "Delete employees":
        deleteEmployee();
        break;

      case "View Employees by Manager":
        viewEmployees();
        break;

      case "Change Manager for an Employee":
        changeManager();
        break;

      case "Show the total amount earned by a department":
        showJobs();
        break;









      case "Exit":
        connection.end();
          break;
      }


    });

}
function showEarnings(){
  
  inquirer
    .prompt(
      {
        name: "dep_id",
        type: "input",
        message: "What is the id of the department for earnings potential?"
      }
  
  )
    .then(function(answer) {
  
  
      
  var query = "SELECT department_id, SUM(salary) earnings_total FROM role WHERE department_id = ? ORDER BY earnings_total DESC";
  
 
  connection.query(query, [answer.dep_id],/*[answer.dep_id,answer.dep_name] *//*, {department: answer.department}*/ function (err, res) {
    // console.log(res);
    
      

      var table = cTable.getTable(res);
          
      console.log(table);
    
      runSearch();
  });
    // var here = JSON.stringify(res);
    // //  var lengthForm = res.toArray();
    // // for (var i = 0; i < lengthForm.length; i++) {
    // // //   console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
    // console.log(here);
      
      //console.table(['name', 'name2'],res[i]);
    });
    
  
 }

function showJobs() {
  inquirer
    .prompt({
      name: "department",
      type: "input",
      message: "What is the name of the table to show from the database named companydb?"
    })
    .then(function(answer) {

      var query = "SELECT COUNT(*) total_jobs FROM role WHERE department_id = ?";
       
   
      //   query += "FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year ";
    //   query += "= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year, top_albums.position";
      connection.query(query, [answer.department]/*,  {department: answer.department}*/ , function(err, res) {
        // console.log(res);
          var table = cTable.getTable(res);
          
          console.log(table);
        
        // var here = JSON.stringify(res);
        // //  var lengthForm = res.toArray();
        // // for (var i = 0; i < lengthForm.length; i++) {
        // // //   console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
        // console.log(here);
          
          //console.table(['name', 'name2'],res[i]);
         showEarnings();
        
      
     });
});
}






function changeManager(){
  showEmployee2();
  inquirer
    .prompt([
      {
        name: "emp_manageid",
        type: "input",
        message: "What is the new manager id for the employee?"
      },
    {
      name: "emp_firstName", 
      type: "input",
      message: "What is the first name for the employee?"
    },
    {
      name: "emp_id", 
      type: "input",
      message: "What is the id for the employee?"
    }
    
  ]
  )
    .then(function(answer) {
  
  
      
  var query = "UPDATE employee SET manager_id = ? WHERE employee.first_name= ? AND employee.id= ?";
  connection.query(query, [answer.emp_manageid, answer.emp_firstName, answer.emp_id],/*[answer.dep_id,answer.dep_name] *//*, {department: answer.department}*/ function (err, res) {
    // console.log(res);
    
      console.log("these are the available id in the department table. The role must have a department_id that is in the department table or insertion will not work." + 
      "Press a key to continue");

      var table = cTable.getTable(res);
          
      console.log(table);
    showEmployee2();
      runSearch();
  });
    // var here = JSON.stringify(res);
    // //  var lengthForm = res.toArray();
    // // for (var i = 0; i < lengthForm.length; i++) {
    // // //   console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
    // console.log(here);
      
      //console.table(['name', 'name2'],res[i]);
    });
    
  
 }
function showEmployeeManage() {
  // inquirer
  //   .prompt({
  //     name: "department",
  //     type: "input",
  //     message: "What is the name of the table to show from the database named companydb?"
  //   })
  //   .then(function(answer) {

      var query = "SELECT manager_id FROM employee";
       
   
      //   query += "FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year ";
    //   query += "= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year, top_albums.position";
      connection.query(query/*, {department: answer.department}*/ , function(err, res) {
        // console.log(res);
          var table = cTable.getTable(res);
          
          console.log(table);
        
        // var here = JSON.stringify(res);
        // //  var lengthForm = res.toArray();
        // // for (var i = 0; i < lengthForm.length; i++) {
        // // //   console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
        // console.log(here);
          
          //console.table(['name', 'name2'],res[i]);
         
        
      
    // });
});
}
function viewEmployees(){
  showEmployeeManage();
  inquirer
    .prompt(
      {
      name: "emp_manage", 
      type: "input",
      message: "What is the id of the manager?"
    }
    
  )
    .then(function(answer) {
  
  
  
  var query = "SELECT id, first_name, last_name from employee WHERE manager_id = ?";
  connection.query(query, [answer.emp_manage],/*[answer.dep_id,answer.dep_name] *//*, {department: answer.department}*/ function (err, res) {
    // console.log(res);
    
      

      var table = cTable.getTable(res);
          
      console.log(table);
    
      runSearch();
  });
});
}
function deleteEmployee(){
  showEmployee2();
  inquirer
    .prompt([
      {
      name: "emp_firstName", 
      type: "input",
      message: "What is the first name for the employee?"
    },
    {
      name: "emp_lastName", 
      type: "input",
      message: "What is the last name for the employee?"
    }
    
  ]
  )
    .then(function(answer) {
  
  
  
  var query = "DELETE from employee WHERE first_name= ? AND last_name= ?";
  connection.query(query, [answer.emp_firstName, answer.emp_lastName],/*[answer.dep_id,answer.dep_name] *//*, {department: answer.department}*/ function (err, res) {
    // console.log(res);
    
      console.log("these are the available id in the department table. The role must have a department_id that is in the department table or insertion will not work." + 
      "Press a key to continue");

      var table = cTable.getTable(res);
          
      console.log(table);
    showEmployee2();
      runSearch();
  });
    // var here = JSON.stringify(res);
    // //  var lengthForm = res.toArray();
    // // for (var i = 0; i < lengthForm.length; i++) {
    // // //   console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
    // console.log(here);
      
      //console.table(['name', 'name2'],res[i]);
    });
    
  
 }
function showEmployee2() {
  // inquirer
  //   .prompt({
  //     name: "department",
  //     type: "input",
  //     message: "What is the name of the table to show from the database named companydb?"
  //   })
  //   .then(function(answer) {

      var query = "SELECT id, first_name, last_name FROM employee";
       
   
      //   query += "FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year ";
    //   query += "= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year, top_albums.position";
      connection.query(query/*, {department: answer.department}*/ , function(err, res) {
        // console.log(res);
          var table = cTable.getTable(res);
          
          console.log(table);
        
        // var here = JSON.stringify(res);
        // //  var lengthForm = res.toArray();
        // // for (var i = 0; i < lengthForm.length; i++) {
        // // //   console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
        // console.log(here);
          
          //console.table(['name', 'name2'],res[i]);
         
        
      
    // });
});
}
function showRole2() {
  // inquirer
  //   .prompt({
  //     name: "department",
  //     type: "input",
  //     message: "What is the name of the table to show from the database named companydb?"
  //   })
  //   .then(function(answer) {

      var query = "SELECT title FROM role";
       
   
      //   query += "FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year ";
    //   query += "= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year, top_albums.position";
      connection.query(query/*, {department: answer.department}*/ , function(err, res) {
        // console.log(res);
          var table = cTable.getTable(res);
          
          console.log(table);
        
        // var here = JSON.stringify(res);
        // //  var lengthForm = res.toArray();
        // // for (var i = 0; i < lengthForm.length; i++) {
        // // //   console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
        // console.log(here);
          
          //console.table(['name', 'name2'],res[i]);
         
        
      
    // });
});
}
function deleteRole(){
  showRole2();
  inquirer
    .prompt(
      {
      name: "role_title", 
      type: "input",
      message: "What is the name for the job title for deletion?"
    }
    
    
  )
    .then(function(answer) {
  
  
  
  var query = "DELETE from role WHERE title = ?";
  connection.query(query, [answer.role_title],/*[answer.dep_id,answer.dep_name] *//*, {department: answer.department}*/ function (err, res) {
    // console.log(res);
    
      console.log("these are the available id in the department table. The role must have a department_id that is in the department table or insertion will not work." + 
      "Press a key to continue");

      var table = cTable.getTable(res);
          
      console.log(table);
    showRole2();
      runSearch();
  });
    // var here = JSON.stringify(res);
    // //  var lengthForm = res.toArray();
    // // for (var i = 0; i < lengthForm.length; i++) {
    // // //   console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
    // console.log(here);
      
      //console.table(['name', 'name2'],res[i]);
    });
    
  
 }



function showDepartment2() {
  // inquirer
  //   .prompt({
  //     name: "department",
  //     type: "input",
  //     message: "What is the name of the table to show from the database named companydb?"
  //   })
  //   .then(function(answer) {

      var query = "SELECT * FROM department";
       
   
      //   query += "FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year ";
    //   query += "= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year, top_albums.position";
      connection.query(query/*, {department: answer.department}*/ , function(err, res) {
        // console.log(res);
          var table = cTable.getTable(res);
          
          console.log(table);
        
        // var here = JSON.stringify(res);
        // //  var lengthForm = res.toArray();
        // // for (var i = 0; i < lengthForm.length; i++) {
        // // //   console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
        // console.log(here);
          
          //console.table(['name', 'name2'],res[i]);
         
        
      
    // });
});
}
function deleteDepartment(){
  showDepartment2();
  inquirer
    .prompt(
      {
      name: "dep_id", 
      type: "input",
      message: "What is the id for the department for deletion?"
    }
    
    
  )
    .then(function(answer) {
  
  
  
  var query = "DELETE from department WHERE id = ?";
  connection.query(query, [answer.dep_id],/*[answer.dep_id,answer.dep_name] *//*, {department: answer.department}*/ function (err, res) {
    // console.log(res);
    
      console.log("these are the available id in the department table. The role must have a department_id that is in the department table or insertion will not work." + 
      "Press a key to continue");

      var table = cTable.getTable(res);
          
      console.log(table);
    showDepartment2();
      runSearch();
  });
    // var here = JSON.stringify(res);
    // //  var lengthForm = res.toArray();
    // // for (var i = 0; i < lengthForm.length; i++) {
    // // //   console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
    // console.log(here);
      
      //console.table(['name', 'name2'],res[i]);
    });
    
  
 }
function findDepartment(){
  var query = "SELECT id FROM department";
  connection.query(query, /*[answer.dep_id,answer.dep_name] *//*, {department: answer.department}*/ function(err, res) {
    // console.log(res);
    
      console.log("these are the available id in the department table. The role must have a department_id that is in the department table or insertion will not work." + 
      "Press a key to continue");

      var table = cTable.getTable(res);
          
      console.log(table);
    
      
    
    // var here = JSON.stringify(res);
    // //  var lengthForm = res.toArray();
    // // for (var i = 0; i < lengthForm.length; i++) {
    // // //   console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
    // console.log(here);
      
      //console.table(['name', 'name2'],res[i]);
     
    
  
 });
}
function findRole(){
  var query = "SELECT id FROM role";
  connection.query(query, /*[answer.dep_id,answer.dep_name] *//*, {department: answer.department}*/ function(err, res) {
    // console.log(res);
    
      console.log("these are the available id in the role table. The employee must have a role_id that is in the role table or insertion will not work." + 
      "Press a key to continue");
      var table = cTable.getTable(res);
          
      console.log(table);
      
    
    // var here = JSON.stringify(res);
    // //  var lengthForm = res.toArray();
    // // for (var i = 0; i < lengthForm.length; i++) {
    // // //   console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
    // console.log(here);
      
      //console.table(['name', 'name2'],res[i]);
     
    
  
 });
}
function addEmployee() {
  findRole();
  inquirer
    .prompt([
      {
      name: "emp_id", 
      type: "input",
      message: "What is the id for the employee?"
    },
    {
      name: "first_name", 
      type: "input",
      message: "What is the first name for the employee?"
    },
    {
      name: "last_name", 
      type: "input",
      message: "What is the last name for the employee?"
    },
    {
      name: "role_id", 
      type: "input",
      message: "What is the role id for the employee?"
    },
    {
      name: "manager_id", 
      type: "input",
      message: "What is the manager id for the employee?"
    }
  ])
    .then(function(answer) {

      var query = "INSERT into employee (id, first_name, last_name, role_id, manager_id) VALUES (?,?,?,?,?)";
       
   
      //   query += "FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year ";
    //   query += "= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year, top_albums.position";
      connection.query(query, [answer.emp_id,answer.first_name,answer.last_name,answer.role_id,answer.manager_id]/*, {department: answer.department}*/ , function(err, res) {
        // console.log(res);
          var table = cTable.getTable(res);
          
          console.log(table);
        
        // var here = JSON.stringify(res);
        // //  var lengthForm = res.toArray();
        // // for (var i = 0; i < lengthForm.length; i++) {
        // // //   console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
        // console.log(here);
          
          //console.table(['name', 'name2'],res[i]);
         
        runSearch();
      
     });
});
}
function addRole() {
  findDepartment();
  inquirer
    .prompt([{
      name: "rol_id",
      type: "input",
      message: "What is the id for the role?"
    },
    {
      name: "title",
      type: "input",
      message: "What is the new job title?"
    },
    {
      name: "salary",
      type: "input",
      message: "What is the amount to be paid for job title"
    },
    {
      name: "dep_id",
      type: "input",
      message: "What is the id for the department?"
    }]
    )
    .then(function(answer) {

      var query = "INSERT into role ( id, title, salary, department_id) VALUES (?,?,?,?)";
       
   
      //   query += "FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year ";
    //   query += "= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year, top_albums.position";
      connection.query(query, [answer.rol_id, answer.title, answer.salary, answer.dep_id]/*, {department: answer.department}*/ , function(err, res) {
        // console.log(res);
          var table = cTable.getTable(res);
          
          console.log(table);
        
        // var here = JSON.stringify(res);
        // //  var lengthForm = res.toArray();
        // // for (var i = 0; i < lengthForm.length; i++) {
        // // //   console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
        // console.log(here);
          
          //console.table(['name', 'name2'],res[i]);
         
        runSearch();
      
     });
});
}

function addDepartment() {
  inquirer
    .prompt([{
      name: "dep_id",
      type: "input",
      message: "What is the id for the department?"
    },
    {
      name: "dep_name",
      type: "input",
      message: "What is the name for the department?"
    }
  ])
    .then(function(answer) {

      var query = "INSERT into department (id , name) VALUES (?,?)";
       
   
      //   query += "FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year ";
    //   query += "= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year, top_albums.position";
      connection.query(query, [answer.dep_id,answer.dep_name]/*, {department: answer.department}*/ , function(err, res) {
        // console.log(res);
          var table = cTable.getTable(res);
          
          console.log(table);
        
        // var here = JSON.stringify(res);
        // //  var lengthForm = res.toArray();
        // // for (var i = 0; i < lengthForm.length; i++) {
        // // //   console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
        // console.log(here);
          
          //console.table(['name', 'name2'],res[i]);
         
        runSearch();
      
     });
});
}








function updateEmployee() {
  findRole();
  inquirer
    .prompt([
      {
        name: "new_role",
        type: "input",
        message: "What is the new job title for employee?",
        
  
      },
      {
      name: "emp_id",
      type: "input",
      message: "What is the specific id of the employee?",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    }]
    )
    .then(function(answer) {
      

      var query = "UPDATE role SET title = ? WHERE id = ?";
       
   
      //   query += "FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year ";
    //   query += "= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year, top_albums.position";
      connection.query(query, [answer.new_role, answer.emp_id] , function() {
        // console.log(res);
          console.log(`"Employee with id: ${answer.emp_id}"`+ "has a new job title called " + `${answer.new_role}`);
        
        // var here = JSON.stringify(res);
        // //  var lengthForm = res.toArray();
        // // for (var i = 0; i < lengthForm.length; i++) {
        // // //   console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
        // console.log(here);
          
          //console.table(['name', 'name2'],res[i]);
         
        
      
     });
}).then(function(){
  connection.query("SELECT * FROM role", function(err,res){
    var table = cTable.getTable(res);
          
          console.log(table + "changes were made to the Role table");
          runSearch();
  });
});

}
function showDepartment() {
  // inquirer
  //   .prompt({
  //     name: "department",
  //     type: "input",
  //     message: "What is the name of the table to show from the database named companydb?"
  //   })
  //   .then(function(answer) {

      var query = "SELECT * FROM department";
       
   
      //   query += "FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year ";
    //   query += "= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year, top_albums.position";
      connection.query(query/*, {department: answer.department}*/ , function(err, res) {
        // console.log(res);
          var table = cTable.getTable(res);
          
          console.log(table);
        
        // var here = JSON.stringify(res);
        // //  var lengthForm = res.toArray();
        // // for (var i = 0; i < lengthForm.length; i++) {
        // // //   console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
        // console.log(here);
          
          //console.table(['name', 'name2'],res[i]);
         
        runSearch();
      
    // });
});
}
function showEmployee() {
  // inquirer
  //   .prompt({
  //     name: "department",
  //     type: "input",
  //     message: "What is the name of the table to show from the database named companydb?"
  //   })
  //   .then(function(answer) {

      var query = "SELECT * FROM employee";
       
   
      //   query += "FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year ";
    //   query += "= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year, top_albums.position";
      connection.query(query/*, {department: answer.department}*/ , function(err, res) {
        // console.log(res);
          var table = cTable.getTable(res);
          
          console.log(table);
        
        // var here = JSON.stringify(res);
        // //  var lengthForm = res.toArray();
        // // for (var i = 0; i < lengthForm.length; i++) {
        // // //   console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
        // console.log(here);
          
          //console.table(['name', 'name2'],res[i]);
         
        runSearch();
      
    // });
});
}
function showRole() {
  // inquirer
  //   .prompt({
  //     name: "department",
  //     type: "input",
  //     message: "What is the name of the table to show from the database named companydb?"
  //   })
  //   .then(function(answer) {

      var query = "SELECT * FROM role";
       
   
      //   query += "FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year ";
    //   query += "= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year, top_albums.position";
      connection.query(query/*, {department: answer.department}*/ , function(err, res) {
        // console.log(res);
          var table = cTable.getTable(res);
          
          console.log(table);
        
        // var here = JSON.stringify(res);
        // //  var lengthForm = res.toArray();
        // // for (var i = 0; i < lengthForm.length; i++) {
        // // //   console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
        // console.log(here);
          
          //console.table(['name', 'name2'],res[i]);
         
        runSearch();
      
    // });
});
}

function multiSearch() {
  var query = "SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1";
  connection.query(query, function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].artist);
    }
    runSearch();
  });
}

function rangeSearch() {
  inquirer
    .prompt([
      {
        name: "start",
        type: "input",
        message: "Enter starting position: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "end",
        type: "input",
        message: "Enter ending position: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      var query = "SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?";
      connection.query(query, [answer.start, answer.end], function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log(
            "Position: " +
              res[i].position +
              " || Song: " +
              res[i].song +
              " || Artist: " +
              res[i].artist +
              " || Year: " +
              res[i].year
          );
        }
        runSearch();
      });
    });
}

function songSearch() {
  inquirer
    .prompt({
      name: "song",
      type: "input",
      message: "What song would you like to look for?"
    })
    .then(function(answer) {
      console.log(answer.song);
      connection.query("SELECT * FROM top5000 WHERE ?", { song: answer.song }, function(err, res) {
        console.log(
          "Position: " +
            res[0].position +
            " || Song: " +
            res[0].song +
            " || Artist: " +
            res[0].artist +
            " || Year: " +
            res[0].year
        );
        runSearch();
      });
    });
}

function songAndAlbumSearch() {
  inquirer
    .prompt({
      name: "artist",
      type: "input",
      message: "What artist would you like to search for?"
    })
    .then(function(answer) {
      var query = "SELECT top_albums.year, top_albums.album, top_albums.position, top5000.song, top5000.artist ";
      query += "FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year ";
      query += "= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year, top_albums.position";

      connection.query(query, [answer.artist, answer.artist], function(err, res) {
        console.log(res.length + " matches found!");
        for (var i = 0; i < res.length; i++) {
          console.log(
            i+1 + ".) " +
              "Year: " +
              res[i].year +
              " Album Position: " +
              res[i].position +
              " || Artist: " +
              res[i].artist +
              " || Song: " +
              res[i].song +
              " || Album: " +
              res[i].album
          );
        }

        runSearch();
      });
    });
}
