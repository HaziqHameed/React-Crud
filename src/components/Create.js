import React, { useState, useEffect } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

function Create() {
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [position, setPosition] = useState("");
  const [error, setError] = useState(null);
  let history = useNavigate();
  const addEmployee = async (name, salary, position) => {
    await fetch("http://127.0.0.1:8000/api/employees/store", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        salary: salary,
        position: position,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(async (response) => {
        if (response.status === 200) {
          history("/");
        } else {
          const errorData = await response.json();
          console.log("Error:", errorData.errors);
          setError(errorData.errors || "An error occurred");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addEmployee(name, salary, position);
  };
  return (
    <div>
      <Form className="d-grip gap-2 form-margin">
        <Form.Group className="mb-3" controlId="formName">
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter Name"
          />
          {error?.name && <div style={{ color: "red" }}>{error?.name}</div>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formSalary">
          <Form.Control
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            type="number"
            placeholder="Enter Salary"
          />
          {error?.salary && <div style={{ color: "red" }}>{error?.salary}</div>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPosition">
          <Form.Control
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            type="text"
            placeholder="Enter Position"
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
          Submit
        </Button>

        <Link className="d-grip gap-2" to="/">
          <Button variant="warning">Back</Button>
        </Link>
      </Form>
    </div>
  );
}
export default Create;
