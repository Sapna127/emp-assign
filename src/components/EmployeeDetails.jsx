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
    <section className="mt-5 max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-300">
      {isPending && <p className="text-center text-gray-500">Loading employee details...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {employee && !isEditing && (
        <>
          <h1 className="text-2xl font-bold text-gray-800">Employee {employee.id} Details</h1>
          <div className="mt-4 space-y-2">
            <h2 className="text-xl font-semibold text-gray-700">Name: <span className="font-normal">{employee.name}</span></h2>
            <h3 className="text-lg text-gray-600">Email: <span className="font-normal">{employee.email}</span></h3>
            <p className="text-gray-600">Designation: <span className="font-normal">{employee.designation}</span></p>
            <p className="text-gray-600">Department: <span className="font-normal">{employee.department}</span></p>
            <p className="text-gray-600">Joining Date: <span className="font-normal">{employee.joiningDate}</span></p>
            <p className="text-gray-600">Salary: <span className="font-normal">${employee.salary}</span></p>
            <p className="text-gray-600">Phone Number: <span className="font-normal">{employee.phoneNumber}</span></p>
          </div>

          <div className="mt-6 flex space-x-4">
            <button 
              onClick={() => setIsEditing(true)} 
              className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-700 transition duration-200"
            >
              Edit Details
            </button>
            <button 
              onClick={handleDelete} 
              className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-500 transition duration-200"
            >
              Delete Employee
            </button>
          </div>
        </>
      )}

      {isEditing && (
        <form onSubmit={handleSubmitEdit} className="mt-4">
          <h1 className="text-2xl font-bold text-gray-800">Edit Employee {employee.id} Details</h1>
          <div className="mt-4 space-y-4">
            {Object.keys(editForm).map((key) => (
              <div key={key}>
                <label className="block text-gray-700 font-semibold mb-1">
                  {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:
                </label>
                <input 
                  type={key === 'joiningDate' ? 'date' : key === 'salary' ? 'number' : 'text'}
                  name={key} 
                  value={editForm[key]} 
                  onChange={handleChange} 
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
                  required
                />
              </div>
            ))}
          </div>
          <div className="mt-6 flex space-x-4">
            <button 
              type="submit" 
              className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-700 transition duration-200"
            >
              Save Changes
            </button>
            <button 
              type="button" 
              onClick={() => setIsEditing(false)} 
              className="flex-1 bg-gray-300 text-black px-4 py-2 rounded-md shadow-md hover:bg-gray-200 transition duration-200"
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
