const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "Flash!524",
    database: "employeetracker_db",
  },
  console.log(`Connected to the employeetracker_db database.`)
);

async function runInquirer() {
  const data = await inquirer.prompt({
    type: "list",
    name: "choices",
    message: "What would you like to do?",
    choices: [
      "View all employees",
      "Add employee",
      "Remove employee",
      "Update employee role",
      new inquirer.Separator(),
      "View all roles",
      "Add role",
      new inquirer.Separator(),
      "View all departments",
      "Add department",
      new inquirer.Separator(),
      "Exit",
    ],
  });

  switch (data.choices) {
    case "View all employees":
      viewAllEmployees();
      break;
    case "Add employee":
      addEmployee();
      break;
    case "Remove employee":
      removeEmployee();
      break;
    case "Update employee role":
      updateEmployeeRole();
      break;
    case "View all roles":
      viewAllRoles();
      break;
    case "Add role":
      addRole();
      break;
    case "View all departments":
      viewAllDepartments();
      break;
    case "Add department":
      addDepartment();
      break;
    case "Exit":
      db.end();
      console.log("Goodbye!");
      break;
  }
}

function viewAllEmployees(){
  db.query("SELECT * FROM employee", function (err, results) {
    console.table(results);
    runInquirer();
  });
}

function addEmployee(){
  try{
    inquirer.prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employee's last name?",
      },
      {
        type: "input",
        name: "roleId",
        message: "What is the employee's role ID?",
      },
      {
        type: "input",
        name: "managerId",
        message: "What is the employee's manager ID?",
      },
    ]).then(function (data) {
      db.query(
        "INSERT INTO employee SET ?",
        {
          first_name: data.firstName,
          last_name: data.lastName,
          role_id: data.roleId,
          manager_id: data.managerId,
        },
        function (err, results) {
          if (err) throw err;
          console.log("Employee added!");
          runInquirer();
        }
      );
    });
  } catch(err) {
    throw err;
  }
}

function removeEmployee(){
  try{
    inquirer.prompt([
      {
        type: "input",
        name: "id",
        message: "What is the employee's id?",
      },
    ]).then(function (data) {
      db.query(
        "DELETE FROM employee WHERE ?",
        {
          id: data.id,
        },
        function (err, results) {
          if (err) throw err;
          console.log("Employee deleted!");
          runInquirer();
        }
      );
    });
  } catch(err) {
    throw err;
  }
}

function updateEmployeeRole(){
  try{
    inquirer.prompt([
      {
        type: "input",
        name: "id",
        message: "What is the employee's ID?",
      },
      {
        type: "input",
        name: "roleId",
        message: "What is the id of the role you want to update?",
      },
    ]).then(function (data) {
      db.query(
        "UPDATE employee SET ? WHERE ?",
        [
          {
            role_id: data.roleId,
          },
          {
            id: data.id,
          },
        ],
        function (err, results) {
          if (err) throw err;
          console.log("Employee role updated!");
          runInquirer();
        }
      );
    });
  } catch(err) {
    throw err;
  }
}

function viewAllRoles(){
  db.query("SELECT * FROM roles", function (err, results) {
    console.table(results);
    runInquirer();
  });
}

function addRole(){
  try{
    inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "What is the role's title?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the role's salary?",
      },
      {
        type: "input",
        name: "departmentId",
        message: "What is the role's department ID? (department ID must exist before adding role)",
      },
    ]).then(function (data) {
      db.query(
        "INSERT INTO roles SET ?",
        {
          title: data.title,
          salary: data.salary,
          department_id: data.departmentId,
        },
        function (err, results) {
          if (err) throw err;
          console.log("Role added!");
          runInquirer();
        }
      );
    });
  } catch(err) {
    throw err;
  }
}

function viewAllDepartments(){
  db.query("SELECT * FROM department", function (err, results) {
    console.table(results);
    runInquirer();
  });
}

function addDepartment(){
  try{
    inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "What is the department's name?",
      },
    ]).then(function (data) {
      db.query(
        "INSERT INTO department SET ?",
        {
          name: data.name,
        },
        function (err, results) {
          if (err) throw err;
          console.log("Department added!");
          runInquirer();
        }
      );
    });
  } catch(err) {
    throw err;
  }
}

function init() {
  console.log("       Welcome to the Employee Tracker!           ")
  runInquirer();
}

init();