import { useParams, useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import useFetch from "../useFetch";

const EmployeeDetails = () => {
  const { id } = useParams();
  const history = useHistory(); 
  const { data: employee, error, isPending } = useFetch(`${process.env.URL}/employees/` + id);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: ''
  });

  const editDetails = () => {
    setIsEditing(true);
    if (employee) {
      setEditForm({ name: employee.name, email: employee.email });
    }
  };

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.URL}/employees/${id}`, editForm);
      alert("Employee details updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating employee:", err);
      alert("Error updating employee details.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`${process.env.URL}/employees/${id}`);
        alert("Employee deleted successfully!");
        history.push("/"); 
      } catch (err) {
        console.error("Error deleting employee:", err);
        alert("Error deleting employee.");
      }
    }
  };

  return (
    <section>
      {isPending && <p>Loading user details...</p>}
      {error && <p>{error}</p>}

      {employee && !isEditing && (
        <>
          <h1>Employee {employee.id} Details</h1>
          <h2>Name: {employee.name}</h2>
          <h3>Email: {employee.email}</h3>

          <button onClick={editDetails}>Edit Details</button>
          <button onClick={handleDelete} style={{ marginLeft: "10px", color: "red" }}>Delete Employee</button>
        </>
      )}

      {isEditing && (
        <form onSubmit={handleSubmitEdit}>
          <h1>Edit Employee {employee.id} Details</h1>
          <label>
            Name:
            <input type="text" name="name" value={editForm.name} onChange={handleChange} />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={editForm.email} onChange={handleChange} />
          </label>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      )}
    </section>
  );
};

export default EmployeeDetails;
