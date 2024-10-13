import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import useFetch from "../useFetch";

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: employee, error, isPending } = useFetch(`${import.meta.env.VITE_URL}/employees/${id}`);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    designation: '',
    department: '',
    joiningDate: '',
    salary: '',
    phoneNumber: ''
  });

  useEffect(() => {
    if (employee) {
      setEditForm({
        name: employee.name,
        email: employee.email,
        designation: employee.designation,
        department: employee.department,
        joiningDate: employee.joiningDate,
        salary: employee.salary,
        phoneNumber: employee.phoneNumber,
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_URL}/employees/${id}`, editForm);
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
        await axios.delete(`${import.meta.env.VITE_URL}/employees/${id}`);
        alert("Employee deleted successfully!");
        navigate("/");
      } catch (err) {
        console.error("Error deleting employee:", err);
        alert("Error deleting employee.");
      }
    }
  };

  return (
    <section className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-md">
      {isPending && <p className="text-center">Loading user details...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {employee && !isEditing && (
        <>
          <h1 className="text-2xl font-bold text-black">Employee {employee.id} Details</h1>
          <h2 className="text-xl font-semibold text-black">Name: {employee.name}</h2>
          <h3 className="text-lg text-black">Email: {employee.email}</h3>
          <p className="text-black">Designation: {employee.designation}</p>
          <p className="text-black">Department: {employee.department}</p>
          <p className="text-black">Joining Date: {employee.joiningDate}</p>
          <p className="text-black">Salary: ${employee.salary}</p>
          <p className="text-black">Phone Number: {employee.phoneNumber}</p>

          <div className="mt-4">
            <button 
              onClick={() => setIsEditing(true)} 
              className="bg-gray-800 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-700"
            >
              Edit Details
            </button>
            <button 
              onClick={handleDelete} 
              className="bg-red-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-500 ml-2"
            >
              Delete Employee
            </button>
          </div>
        </>
      )}

      {isEditing && (
        <form onSubmit={handleSubmitEdit} className="mt-4">
          <h1 className="text-2xl font-bold text-black">Edit Employee {employee.id} Details</h1>
          <div className="space-y-2">
            {Object.keys(editForm).map((key) => (
              <label key={key} className="block text-black">
                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:
                <input 
                  type={key === 'joiningDate' ? 'date' : key === 'salary' ? 'number' : 'text'}
                  name={key} 
                  value={editForm[key]} 
                  onChange={handleChange} 
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                  required
                />
              </label>
            ))}
          </div>
          <div className="mt-4">
            <button 
              type="submit" 
              className="bg-gray-800 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-700"
            >
              Save Changes
            </button>
            <button 
              type="button" 
              onClick={() => setIsEditing(false)} 
              className="bg-gray-300 text-black px-4 py-2 rounded-md shadow-md hover:bg-gray-200 ml-2"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </section>
  );
};

export default EmployeeDetails;
