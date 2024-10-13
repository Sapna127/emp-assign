import React from 'react';
import { Link } from 'react-router-dom';

function EmployeeTable({ employees }) {
  return (
    <section className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4 text-black">Employee Table</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 text-left text-gray-800">Name</th>
            <th className="py-2 px-4 text-left text-gray-800">Email</th>
            <th className="py-2 px-4 text-left text-gray-800">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id} className="border-b hover:bg-gray-100">
              <td className="py-2 px-4 text-gray-700">{employee.name}</td>
              <td className="py-2 px-4 text-gray-700">{employee.email}</td>
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
