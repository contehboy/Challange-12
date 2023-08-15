const mysql = require("mysql");

class Mysql {
  // Connect to mysql
  connectMysql() {
    this.connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "challenge_12",
    });

    this.connection.connect(function (err) {
      if (err) {
        console.error("error connecting: " + err.stack);
        return;
      }

      console.log("Mysql connected!");
    });
  }

  // Fetch departments
  async fetchAllDepartments() {
    return new Promise((resolve, reject) => {
      this.connection.query("SELECT * FROM `departments`", (err, results) => {
        if (err) {
          reject(err);
        }

        resolve(results);
      });
    });
  }

  // Fetch roles
  async fetchAllRoles() {
    return new Promise((resolve, reject) => {
      this.connection.query("SELECT * FROM `roles`", (err, results) => {
        if (err) {
          reject(err);
        }

        resolve(results);
      });
    });
  }

  // Fetch departments
  async fetchAllRolesWithDepartments() {
    return new Promise((resolve, reject) => {
      this.connection.query(
        "SELECT roles.id,roles.name, roles.salary, roles.created_at, departments.name AS department FROM `roles` INNER JOIN `departments` ON roles.department_id=departments.id",
        (err, results) => {
          if (err) {
            reject(err);
          }

          resolve(results);
        }
      );
    });
  }

  // Fetch roles
  async fetchAllEmployees() {
    return new Promise((resolve, reject) => {
      this.connection.query("SELECT * FROM `employees`", (err, results) => {
        if (err) {
          reject(err);
        }

        resolve(results);
      });
    });
  }

  async fetchAllEmployeesWithRoles() {
    return new Promise((resolve, reject) => {
      this.connection.query(
        "SELECT employees.id, employees.first_name, employees.last_name, employees.manager, employees.created_at, roles.name AS role FROM `employees` INNER JOIN `roles` ON employees.role_id=roles.id",
        (err, results) => {
          if (err) {
            reject(err);
          }

          resolve(results);
        }
      );
    });
  }

  // Save department in database
  saveDepartment(name) {
    this.connection.query(
      "INSERT INTO `departments` (name) VALUES ('" + name + "')",
      (err, result) => {
        if (err) {
          console.log(err);
          console.log("Unable to save record!");
          return;
        }

        console.log("Depeartment saved successfully!");
      }
    );
  }

  // Save role in database
  async saveRole(name, salary, departmentId) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        "INSERT INTO `roles` (name, salary, department_id) VALUES (?, ?, ?)",
        [name, salary, departmentId],
        (err, result) => {
          if (err) {
            reject(err);
          }

          resolve("Depeartment saved successfully!");
        }
      );
    });
  }

  // Save employees in database
  async saveEmployee(firstName, lastName, roleId, manager) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        "INSERT INTO `employees` (first_name, last_name, role_id, manager) VALUES (?, ?, ?, ?)",
        [firstName, lastName, roleId, manager],
        (err, result) => {
          if (err) {
            reject(err);
          }

          resolve("Depeartment saved successfully!");
        }
      );
    });
  }

  // Update employee in database
  async updateEmployee(employeeId, roleId) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        "UPDATE `employees` SET role_id = ? WHERE id=?;",
        [roleId, employeeId],
        (err, result) => {
          if (err) {
            reject(err);
          }

          resolve("Depeartment saved successfully!");
        }
      );
    });
  }
}

module.exports = new Mysql();
