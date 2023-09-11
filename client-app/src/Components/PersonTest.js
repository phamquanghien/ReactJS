import axios from "axios";
import { useEffect, useState } from "react";

function Person() {

const [psID, setPersonID] = useState("");
const [fName, setFullName] = useState("");
const [address, setAddress] = useState("");
const [persons, setPerson] = useState([]);
 
  useEffect(() => {
    (async () => await getAllPerson())();
  }, []);
 
  async function getAllPerson() {
    
    const result = await axios.get("http://localhost:5209/get-all-person");
    setPerson(result.data);
    console.log(result.data);
  }
 
  async function createPerson(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:5209/create-person", {
        personID: psID,
        fullName: fName,
        address: address,
       
      });
      alert("Person Registation Successfully");
          setPersonID("");
          setFullName("");
          setAddress("");
      getAllPerson();
    } catch (err) {
      alert(err);
    }
  }

  async function editPerson(persons) {
    setFullName(persons.fullName);
    setAddress(persons.address);
    setPersonID(persons.personID);
  }
 

  async function deletePerson(id) {
  await axios.delete("http://localhost:5209/delete-person/" + id);
   alert("Employee deleted Successfully");
   setPersonID("");
   setFullName("");
   setAddress("");
   getAllPerson();
  }
 

  async function updatePerson(event) {
    event.preventDefault();
    try {

  await axios.put("http://localhost:5209/update-person/" + psID,
        {
          personID: psID,
          fullName: fName,
          address: address,

        }
      );
      alert("Registation Updateddddd");
      setPersonID("");
      setFullName("");
      setAddress("");
     
      getAllPerson();
    } catch (err) {
      alert(err);
    }
  }

    return (
      <div>
        <h1>Person list</h1>
      <div class="container mt-4">
        <form>
        <label>PersonID</label>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              id="personID"
              value={psID}
              onChange={(event) => {
                setPersonID(event.target.value);
              }}
            />

            <label>Person Name</label>
            <input
              type="text"
              class="form-control"
              id="fullName"
              value={fName}
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
            <button class="btn btn-primary mt-4" onClick={createPerson}>
              Register
            </button>
            <button class="btn btn-warning mt-4" onClick={updatePerson}>
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
                    onClick={() => editPerson(person)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => deletePerson(person.personID)}
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
  
  export default Person;