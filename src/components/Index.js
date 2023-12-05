import {useState,useEffect} from "react";
import { Button, Table } from "react-bootstrap";
import array from "./array";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Index() {
    let history = useNavigate();

    const [employees,setEmployees] = useState([]);
    const getEmp = () => {
        fetch('http://127.0.0.1:8000/api/employees')
        .then(response => response.json())
        .then(data => setEmployees(data))
        .catch(error => console.error('Error fetching Employees:', error));
    }
    useEffect(() => {
        getEmp();
     }, []);
    const deleteEmployee = async(id) => {
        console.log(id, 'delete id');
        await fetch('http://127.0.0.1:8000/api/employees/destroy/'+id,{
            method: 'DELETE',
        }).then((response) => {
            if(response.status === 200){
                    getEmp();
                console.log(response,'del response');
            }else{
                return;
            }
        })
    };
    
    
    
    console.log(employees, 'fetch employees api');
    console.log(employees?.data, 'filtered');
    // function deleted(id) {
    //     let index = array.map(function(e) {
    //         return e.id;
    //     }).indexOf(id);
    //     console.log(index, "from Index Page");
    //     array.splice(index,1);
    // }

  
    // const navigateToEdit=()=>{
        
    // }
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
                                        <Button variant="info" 
                                        id = {employee.id}
                                        >
                                            Edit
                                        </Button>
                                    </Link>
                                
                                    <Button variant="danger"
                                    onClick={(e) => deleteEmployee(employee.id)}
                                    type="submit"
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        );
                    }               
                    )}
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