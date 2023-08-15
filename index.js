const inquirer = require("inquirer");
const mysql = require("./mysql");
const renderTable = require("./tables");

async function departmentQuestions() {
  return await inquirer.prompt([
    {
      type: "input",
      name: "departmentName",
      message: "What is the department name?",
    },
  ]);
}

async function roleQuestions(departments) {
  return await inquirer.prompt([
    {
      type: "input",
      name: "roleName",
      message: "What is the role name?",
    },
    {
      type: "number",
      name: "roleSalary",
      message: "What is the role salary?",
    },
    {
      type: "list",
      name: "roleDepartment",
      message: "What is the department of role?",
      choices: departments.map((department) => department.name),
    },
  ]);
}

async function employeeQuestions(roles) {
  return await inquirer.prompt([
    {
      type: "input",
      name: "employeeFirstName",
      message: "What is your first name?",
    },
    {
      type: "input",
      name: "employeeLastName",
      message: "What is your last name?",
    },
    {
      type: "list",
      name: "employeeRole",
      message: "What is the role of employee?",
      choices: roles.map((role) => role.name),
    },
    {
      type: "input",
      name: "employeeManager",
      message: "What is the name of your manager?",
    },
  ]);
}

async function updateEmployeeQuestions(employees, roles) {
  return await inquirer.prompt([
    {
      type: "list",
      name: "employee",
      message: "Choose employee you want tot update?",
      choices: employees.map(
        (employee) => employee.first_name + " " + employee.last_name
      ),
    },
    {
      type: "list",
      name: "role",
      message: "Update employee role to?",
      choices: roles.map((role) => role.name),
    },
  ]);
}

async function main() {
  mysql.connectMysql();

  // Main question for operation
  let answers = await inquirer.prompt([
    {
      type: "list",
      name: "operation",
      message: "What do you want to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        new inquirer.Separator(),
        "Add a department",
        "Add a role",
        "Add an employee",
        new inquirer.Separator(),
        "Update an employee role",
      ],
    },
  ]);
  // Load questions depending on the operation
  switch (answers.operation) {
    case "View all departments":
      const departments1 = await mysql.fetchAllDepartments();
      const departmentTable = renderTable.departmentsTable(departments1);
      console.log(departmentTable.toString());
      break;
    case "View all roles":
      const roles = await mysql.fetchAllRolesWithDepartments();
      const roleTable = renderTable.rolesTable(roles);
      console.log(roleTable.toString());
      break;
    case "View all employees":
      const employees = await mysql.fetchAllEmployeesWithRoles();
      const employeeTable = renderTable.employeesTable(employees);
      console.log(employeeTable.toString());
      break;
    case "Add a department":
      answers = await departmentQuestions();
      mysql.saveDepartment(answers.departmentName);
      break;
    case "Add a role":
      const departments2 = await mysql.fetchAllDepartments();
      answers = await roleQuestions(departments2);
      const selectedDepartment = departments2.find(
        (department) => department.name === answers.roleDepartment
      );
      await mysql.saveRole(
        answers.roleName,
        answers.roleSalary,
        selectedDepartment.id
      );
      break;
    case "Add an employee":
      const roles1 = await mysql.fetchAllRoles();
      answers = await employeeQuestions(roles1);
      const selectedRole = roles1.find(
        (role) => role.name === answers.employeeRole
      );
      await mysql.saveEmployee(
        answers.employeeFirstName,
        answers.employeeLastName,
        selectedRole.id,
        answers.employeeManager
      );
      break;
    case "Update an employee role":
      const employees1 = await mysql.fetchAllEmployees();
      const roles2 = await mysql.fetchAllRoles();
      answers = await updateEmployeeQuestions(employees1, roles2);
      const selectedEmployee = employees1.find(
        (employee) =>
          employee.first_name + " " + employee.last_name === answers.employee
      );
      const selectedRole1 = roles2.find((role) => role.name === answers.role);
      await mysql.updateEmployee(selectedEmployee.id, selectedRole1.id);
      break;
    default:
      console.log("Invalid operation!");
      break;
  }

  console.log(answers);

  mysql.connection.end();
}

main();
