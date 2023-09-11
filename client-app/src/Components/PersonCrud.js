import axios from "axios";
import { useEffect, useState } from "react";

function StudentCrud() {

const [personID, setPersonID] = useState("");
const [fullName, setFullName] = useState("");
const [address, setAddress] = useState("");
const [persons, setPerson] = useState([]);
 
  useEffect(() => {
    (async () => await Load())();
  }, []);
 
  async function Load() {
    
    const result = await axios.get("http://localhost:5209/get-all-person");
    setPerson(result.data);
    console.log(result.data);
  }
 
  async function save(event) {
   
    event.preventDefault();
    try {
      await axios.post("http://localhost:5209/create-person", {
        personID: personID,
        fullName: fullName,
        address: address,
       
      });
      alert("Student Registation Successfully");
          setPersonID("");
          setFullName("");
          setAddress("");
       
     
      Load();
    } catch (err) {
      alert(err);
    }
  }

  async function editStudent(persons) {
    setFullName(persons.fullName);
    setAddress(persons.address);
    setPersonID(persons.personID);
  }
 

  async function DeleteStudent(id) {
  await axios.delete("http://localhost:5209/delete-person/" + id);
   alert("Employee deleted Successfully");
   setPersonID("");
   setFullName("");
   setAddress("");
   Load();
  }
 

  async function update(event) {
    event.preventDefault();
    try {

  await axios.put("http://localhost:5209/update-person/" + personID,
        {
          personID: personID,
          fullName: fullName,
          address: address,

        }
      );
      alert("Registation Updateddddd");
      setPersonID("");
      setFullName("");
      setAddress("");
     
      Load();
    } catch (err) {
      alert(err);
    }
  }

    return (
      <div>
        <h1>Student Details</h1>
      <div class="container mt-4">
        <form>
        <label>PersonID</label>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              id="personID"
              value={personID}
              onChange={(event) => {
                setPersonID(event.target.value);
              }}
            />

            <label>Person Name</label>
            <input
              type="text"
              class="form-control"
              id="fullName"
              value={fullName}
              onChange={(event) => {
                setFullName(event.target.value);
              }}
            />
          </div>
          <div class="form-group">
            <label>Address</label>
            <input
              type="text"
              class="form-control"
              id="address"
              value={address}
              onChange={(event) => {
                setAddress(event.target.value);
              }}
            />
          </div>
          <div>
            <button class="btn btn-primary mt-4" onClick={save}>
              Register
            </button>
            <button class="btn btn-warning mt-4" onClick={update}>
              Update
            </button>
          </div>
        </form>
      </div>
      <br></br>

      <table class="table table-dark" align="center">
        <thead>
          <tr>
            <th scope="col">Person Id</th>
            <th scope="col">Person Name</th>
            <th scope="col">Address</th>
         
 
            <th scope="col">Option</th>
          </tr>
        </thead>
        {persons.map(function fn(person) {
          return (
            <tbody>
              <tr>
                <th scope="row">{person.personID} </th>
                <td>{person.fullName}</td>
                <td>{person.address}</td>
                
                <td>
                  <button
                    type="button"
                    class="btn btn-warning"
                    onClick={() => editStudent(person)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => DeleteStudent(person.personID)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
        
      </div>
    );
  }
  
  export default StudentCrud;