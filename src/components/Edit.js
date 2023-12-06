import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { getEmployee, updateEmployee } from "../Services/Responses";

/**
 * Edit component for updating employee information.
 */
const Edit = () => {
  // Hook to navigate between pages
  let navigate = useNavigate();

  // Hook to extract parameters from the URL
  const params = useParams();

  // State to hold employee data
  const [employee, setEmployee] = useState("");

  // States to hold form input values
  const [name, setName] = useState(employee?.data?.name);
  const [salary, setSalary] = useState("");
  const [position, setPosition] = useState("");
  const [id, setId] = useState(params.id);
  const [error, setError] = useState(null);

  /**
   * Handles form submission to update employee information.
   * @param {Object} e - Event object.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    updateEmployee(id, name, salary, position, navigate, setError);
  };

  // Effect to fetch employee data when the component mounts
  useEffect(() => {
    getEmployee(id, setEmployee);
  }, [id]);

  // Effect to update form input values when employee data changes
  useEffect(() => {
    if (employee?.data) {
      setName(employee?.data?.name);
      setSalary(employee?.data?.salary);
      setPosition(employee?.data?.position);
    }
  }, [employee]);

  // JSX code for rendering the component
  return (
    <div>
      <Form className="d-grip gap-2 form-margin">
        <Form.Group className="mb-3" controlId="formName">
          <Form.Control
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter Name"
            value={name}
          />
          {error?.name && <div style={{ color: "red" }}>{error?.name}</div>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formSalary">
          <Form.Control
            onChange={(e) => setSalary(e.target.value)}
            type="number"
            placeholder="Enter Salary"
            value={salary}
          />
          {error?.salary && <div style={{ color: "red" }}>{error?.salary}</div>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPosition">
          <Form.Control
            onChange={(e) => setPosition(e.target.value)}
            type="text"
            placeholder="Enter Position"
            value={position}
          />
          {error?.position && (
            <div style={{ color: "red" }}>{error?.position}</div>
          )}
        </Form.Group>

        <Button
          onClick={(e) => handleSubmit(e)}
          variant="primary"
          type="submit"
        >
          Update
        </Button>

        <Link className="d-grip gap-2" to="/">
          <Button variant="warning">Back</Button>
        </Link>
      </Form>
    </div>
  );
};
export default Edit;
