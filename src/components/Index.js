import { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { delEmployee, getEmployees } from "../Services/Responses";

/**
 * React component for displaying a table of employees.
 */
function Index() {
  // State to hold the list of employees
  const [employees, setEmployees] = useState([]);

  // Fetch employees data from the server when the component mounts
  useEffect(() => {
    getEmployees(setEmployees);
  }, []);

  /**
   * Handles the deletion of an employee.
   * @param {number} id - The ID of the employee to be deleted.
   */
  const deleteEmployee = (id) => {
    delEmployee(id, setEmployees);
  };

  // JSX code for rendering the component
  return (
    <div className="form-margin">
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Salary</th>
            <th>Position</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees?.data?.map((employee) => {
            return (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>{employee.salary}</td>
                <td>{employee.position}</td>
                <td>
                  <Link to={"/edit/" + employee.id}>
                    <Button variant="info" id={employee.id}>
                      Edit
                    </Button>
                  </Link>

                  <Button
                    variant="danger"
                    onClick={(e) => deleteEmployee(employee.id)}
                    type="submit"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Link className="d-grip gap-2" to="/create">
        <Button variant="secondary" size="lg">
          Create
        </Button>
      </Link>
    </div>
  );
}

export default Index;
