import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function EmployeeTable({ employees }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const departments = [...new Set(employees.map(employee => employee.department))];

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment = selectedDepartment ? employee.department === selectedDepartment : true;

    return matchesSearch && matchesDepartment;
  });

  return (
    <section className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-md mt-5">
      <h1 className="text-2xl font-bold mb-4 text-black">Employee Table</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Name, Designation, or Department"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
        />
      </div>

      <div className="mb-4">
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
        >
          <option value="">All Departments</option>
          {departments.map((dept, index) => (
            <option key={index} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 text-left text-gray-800">Employee ID</th>
            <th className="py-2 px-4 text-left text-gray-800">Name</th>
            <th className="py-2 px-4 text-left text-gray-800">Designation</th>
            <th className="py-2 px-4 text-left text-gray-800">Department</th>
            <th className="py-2 px-4 text-left text-gray-800">Joining Date</th>
            <th className="py-2 px-4 text-left text-gray-800">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.id} className="border-b hover:bg-gray-100">
              <td className="py-2 px-4 text-gray-700">{employee.id}</td>
              <td className="py-2 px-4 text-gray-700">
                <Link to={`/employees/${employee.id}`} className="text-blue-500 hover:underline">
                  {employee.name}
                </Link>
              </td>
              <td className="py-2 px-4 text-gray-700">{employee.designation}</td>
              <td className="py-2 px-4 text-gray-700">{employee.department}</td>
              <td className="py-2 px-4 text-gray-700">{new Date(employee.joiningDate).toLocaleDateString()}</td>
              <td className="py-2 px-4">
                <Link to={`/employees/${employee.id}`}>
                  <button className="bg-gray-800 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-700">
                    View full details
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default EmployeeTable;
