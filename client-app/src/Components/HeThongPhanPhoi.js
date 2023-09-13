import axios from "axios";
import { useEffect, useState } from "react";
function HeThongPhanPhoi() {
  const [id, setMaHTPP] = useState("");
  const [ten, setTenHTPP] = useState("");
  const [hethongpps, setHeThongPP] = useState([]);
 
  useEffect(() => {
    (async () => await getAllHTPP())();
  }, []);

  async function setHTPPValue(ht) {
    setTenHTPP(ht.tenHTPP);
    setMaHTPP(ht.maHTPP);
  }

  async function setHTPPNull() {
    setMaHTPP("");
    setTenHTPP("");
  }
  async function getAllHTPP() {
    const result = await axios.get("http://localhost:5209/get-all-he-thong-phan-phoi");
    setHeThongPP(result.data);
  }
  async function createHTPP(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:5209/create-he-thong-phan-phoi", {
        maHTPP: id,
        tenHTPP: ten,
      });
      alert("Create successful!");
      setHTPPNull();
      getAllHTPP();
    } catch (err) {
      alert(err);
    }
  }
  async function deleteHTPP(id) {
    await axios.delete("http://localhost:5209/delete-he-thong-phan-phoi/" + id);
    alert("Delete successful!");
    setHTPPNull();
    getAllHTPP();
  }
  async function updateHTPP(event) {
    event.preventDefault();
    try {
      await axios.put("http://localhost:5209/update-he-thong-phan-phoi/" + id,
        {
          maHTPP: id,
          tenHTPP: ten,
        }
      );
      alert("Update successful person!");
      setHTPPNull();
      getAllHTPP();
    } catch (err) {
      alert(err);
    }
  }
  return (
    <div>
        <h1>Danh sach HTPP</h1>
        <hr></hr>
        <div class="container mt-4">
          <form>
            <div class="form-group">
                <label>Ma HTPP</label>
                <input type="text" class="form-control" id="maHTPP" value={id}
                    onChange={(event) => { setMaHTPP(event.target.value); }} />
                <label>Ten HTPP</label>
                <input type="text" class="form-control" id="tenHTPP" value={ten}
                    onChange={(event) => { setTenHTPP(event.target.value); }} />
            </div>
            <div>
              <button class="btn btn-primary mt-4" onClick={createHTPP}>Register</button>
              <button class="btn btn-warning mt-4" onClick={updateHTPP}>Update</button>
            </div>
          </form>
        </div>
        <br></br>
        <table class="table table-hover">
          <thead class="">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Ten HTPP</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          {
            hethongpps.map(function fn(ht) {
              return (
                <tbody>
                  <tr>
                    <th scope="row">{ht.maHTPP} </th>
                    <td>{ht.tenHTPP}</td>
                    <td>
                      <button type="button" class="btn btn-warning" onClick={() => setHTPPValue(ht)}>Edit</button>
                      <button type="button" class="btn btn-danger" onClick={() => deleteHTPP(ht.maHTPP)}>Delete</button>
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
  
export default HeThongPhanPhoi;


