import axios from "axios";
import { useEffect, useState } from "react";
function Employee() {
    const [psID, setPersonID] = useState("");
    const [fName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [empID, setEmployeeID] = useState("");
    const [age, setAge] = useState("");
    const [employees, setEmployee] = useState([]);

    useEffect(() => {
        (async() => await getAllEmployee())()
    }, []);
    
    async function setEmployeeValue(employees) {
        setPersonID(employees.personID);
        setFullName(employees.fullName);
        setAddress(employees.address);
        setEmployeeID(employees.employeeID);
        setAge(employees.age);
    }
    async function setEmployeeNull()
    {
        setPersonID("");
        setFullName("");
        setAddress("");
        setEmployeeID("");
        setAge("");
    }
    async function getAllEmployee() {
        const result = await axios.get("http://localhost:5209/get-all-employee");
        setEmployee(result.data);
    }
    async function createEmployee(event) {
        event.preventDefault();
        try{
            await axios.post("http://localhost:5209/create-employee", {
                personID : psID,
                fullName: fName,
                address: address,
                employeeID: empID,
                age: age
            });
            alert("Create successful employee!")
            setEmployeeNull();
            getAllEmployee();
        }catch(err) {
            alert(err);
        };
    }
    async function updateEmployee(event) {
        event.preventDefault();
        await axios.put("http://localhost:5209/create-employee" + psID, {
            personID : psID,
            fullName: fName,
            address: address,
            employeeID: empID,
            age: age
        });
        alert("Update successful employee!")
        setEmployeeNull();
        getAllEmployee();
    }
    async function deleteEmployee(event) {
        event.preventDefault();
        await axios.delete("http://localhost:5209/delete-employee" + psID);
        alert("Delete successful employee!")
        setEmployeeNull();
        getAllEmployee();
    }
    return(
        <div>
        <h1>Danh sach Person</h1>
        <hr></hr>
        <div class="container mt-4">
          <form>
            <div class="form-group">
                <label>PersonID</label>
                <input type="text" class="form-control" id="personID" value={psID}
                    onChange={(event) => { setPersonID(event.target.value); }} />
                <label>Person Name</label>
                <input type="text" class="form-control" id="fullName" value={fName}
                    onChange={(event) => { setFullName(event.target.value); }} />
                <label>Address</label>
                <input type="text" class="form-control" id="address" value={address}
                    onChange={(event) => { setAddress(event.target.value); }} />
                <label>EmployeeID</label>
                <input type="text" class="form-control" id="employeeID" value={empID}
                    onChange={(event) => { setEmployeeID(event.target.value); }} />
                    <label>Address</label>
                <input type="text" class="form-control" id="age" value={age}
                    onChange={(event) => { setAge(event.target.value); }} />
            </div>
            <div>
              <button class="btn btn-primary mt-4" onClick={createEmployee}>Register</button>
              <button class="btn btn-warning mt-4" onClick={updateEmployee}>Update</button>
            </div>
          </form>
        </div>
        <br></br>
        <table class="table table-hover">
          <thead class="">
            <tr>
              <th scope="col">Person Id</th>
              <th scope="col">Person Name</th>
              <th scope="col">Address</th>
              <th scope="col">EmployeeID</th>
              <th scope="col">Age</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          {
            employees.map(function fn(emp) {
              return (
                <tbody>
                  <tr>
                    <th scope="row">{emp.personID} </th>
                    <td>{emp.fullName}</td>
                    <td>{emp.address}</td>
                    <td>{emp.employeeID}</td>
                    <td>{emp.age}</td>
                    <td>
                      <button type="button" class="btn btn-warning" onClick={() => setEmployeeValue(emp)}>Edit</button>
                      <button type="button" class="btn btn-danger" onClick={() => deleteEmployee(emp.personID)}>Delete</button>
                    </td>
                  </tr>
                </tbody>
              );
            })
          }
      </table>
    </div>
    );
}
export default Employee;