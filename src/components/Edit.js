import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const Edit = () => {
  let history = useNavigate();

  const params = useParams();
  const [employee, setEmployee] = useState("");
  const [name, setName] = useState(employee?.data?.name);
  const [salary, setSalary] = useState("");
  const [position, setPosition] = useState("");
  const [id, setId] = useState(params.id);
  const [error, setError] = useState(null);

  const getEmp = (id) => {
    fetch("http://127.0.0.1:8000/api/employees/show/" + id)
      .then((response) => response.json())
      .then((data) => setEmployee(data))
      .catch((error) => console.error("Error fetching Employees:", error));
  };
  const updateEmployee = async (name, salary, position) => {
    await fetch("http://127.0.0.1:8000/api/employees/edit/" + id, {
      method: "POST",
      body: JSON.stringify({
        name: name,
        salary: salary,
        position: position,
      }),
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json",
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
        console.error(error, "error");
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateEmployee(name, salary, position);
  };

  useEffect(() => {
    console.log("render id useEffect");
    getEmp(id);
  }, [id]);
  useEffect(() => {
    console.log("render employe useEffect");

    if (employee?.data) {
      debugger;
      setName(employee?.data?.name);
      setSalary(employee?.data?.salary);
      setPosition(employee?.data?.position);
    }
  }, [employee]);
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
