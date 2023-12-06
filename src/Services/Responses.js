import axios from "axios";

const addEmployee = async (name, salary, position, navigate, setError) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/employees/store",
      {
        name: name,
        salary: salary,
        position: position,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (response.status === 200) {
      navigate("/");
    } else {
      console.log("Error:", response.data.errors);
      setError(response.data.errors || "An error occurred");
    }
  } catch (error) {
    console.error(error);
  }
};

const getEmployees = async (setEmployees) => {
  await axios
    .get("http://127.0.0.1:8000/api/employees")
    .then((response) => setEmployees(response.data))
    .catch((error) => console.error("Error fetching Employees:", error));
};

const delEmployee = async (id, setEmployees) => {
  await axios
    .delete("http://127.0.0.1:8000/api/employees/destroy/" + id, {
      method: "DELETE",
    })
    .then((response) => {
      if (response.status === 200) {
        getEmployees(setEmployees).catch((error) =>
          console.error("Error fetching Employees:", error)
        );
      } else {
        console.error("Something Bad Happened!");
      }
    });
};

const getEmployee = async (id, setEmployee) => {
  await axios
    .get("http://127.0.0.1:8000/api/employees/show/" + id)
    .then((response) => setEmployee(response.data))
    .catch((error) => console.error("Error fetching Employees:", error));
};

const updateEmployee = async (
  id,
  name,
  salary,
  position,
  navigate,
  setError
) => {
  await axios
    .post(
      "http://127.0.0.1:8000/api/employees/edit/" + id,
      {
        name: name,
        salary: salary,
        position: position,
      },
      {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      }
    )
    .then(async (response) => {
      if (response.status === 200) {
        navigate("/");
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
export { addEmployee, getEmployees, delEmployee, getEmployee, updateEmployee };
