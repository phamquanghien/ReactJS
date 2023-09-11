import axios from "axios";
import { useEffect, useState } from "react";
function Person() {
  const [id, setPersonID] = useState("");
  const [fName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [persons, setPerson] = useState([]);
 
  useEffect(() => {
    (async () => await getAllPerson())();
  }, []);

  async function setPersonValue(persons) {
    setFullName(persons.fullName);
    setAddress(persons.address);
    setPersonID(persons.personID);
  }

  async function setPersonNull() {
    setPersonID("");
    setFullName("");
    setAddress("");
  }
  async function getAllPerson() {
    const result = await axios.get("http://localhost:5209/get-all-person");
    setPerson(result.data);
  }
  async function createPerson(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:5209/create-person", {
        personID: id,
        fullName: fName,
        address: address,
      });
      alert("Create successful person!");
      setPersonNull();
      getAllPerson();
    } catch (err) {
      alert(err);
    }
  }
  async function deletePerson(id) {
    await axios.delete("http://localhost:5209/delete-person/" + id);
    alert("Delete successful person!");
    setPersonNull();
    getAllPerson();
  }
  async function updatePerson(event) {
    event.preventDefault();
    try {
      await axios.put("http://localhost:5209/update-person/" + id,
        {
          personID: id,
          fullName: fName,
          address: address,
        }
      );
      alert("Update successful person!");
      setPersonNull();
      getAllPerson();
    } catch (err) {
      alert(err);
    }
  }
  return (
    <div>
        <h1>Danh sach Person</h1>
        <hr></hr>
        <div class="container mt-4">
          <form>
            <label>PersonID</label>
            <div class="form-group">
              <input type="text" class="form-control" id="personID" value={id}
                onChange={(event) => { setPersonID(event.target.value); }} />
              <label>Person Name</label>
              <input type="text" class="form-control" id="fullName" value={fName}
                onChange={(event) => { setFullName(event.target.value); }} />
              <label>Address</label>
              <input type="text" class="form-control" id="address" value={address}
                onChange={(event) => { setAddress(event.target.value); }} />
            </div>
            <div>
              <button class="btn btn-primary mt-4" onClick={createPerson}>Register</button>
              <button class="btn btn-warning mt-4" onClick={updatePerson}>Update</button>
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
              <th scope="col">Action</th>
            </tr>
          </thead>
          {
            persons.map(function fn(ps) {
              return (
                <tbody>
                  <tr>
                    <th scope="row">{ps.personID} </th>
                    <td>{ps.fullName}</td>
                    <td>{ps.address}</td>
                    <td>
                      <button type="button" class="btn btn-warning" onClick={() => setPersonValue(ps)}>Edit</button>
                      <button type="button" class="btn btn-danger" onClick={() => deletePerson(ps.personID)}>Delete</button>
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
  
export default Person;


