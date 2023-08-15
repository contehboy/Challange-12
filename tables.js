const Table = require("cli-table");
const moment = require("moment/moment");

class RenderTable {
  // Render departments table
  departmentsTable(departments) {
    const table = new Table({
      head: ["ID", "Name", "Created At"],
      rows: [
        ...departments.map((department) => {
          return [
            department.id,
            department.name,
            moment(department.created_at).format("DD/MM/yyyy"),
          ];
        }),
      ],
    });

    return table;
  }

  // Render roles table
  rolesTable(roles) {
    const table = new Table({
      head: ["ID", "Name", "Salary", "Department", "Created At"],
      rows: [
        ...roles.map((role) => {
          return [
            role.id,
            role.name,
            role.salary,
            role.department,
            moment(role.created_at).format("DD/MM/yyyy"),
          ];
        }),
      ],
    });

    return table;
  }
  // Render roles table
  employeesTable(employees) {
    const table = new Table({
      head: ["ID", "First Name", "Last Name", "Role", "Manager", "Created At"],
      rows: [
        ...employees.map((employee) => {
          return [
            employee.id,
            employee.first_name,
            employee.last_name,
            employee.role,
            employee.manager,
            moment(employee.created_at).format("DD/MM/yyyy"),
          ];
        }),
      ],
    });

    return table;
  }
}

module.exports = new RenderTable();
