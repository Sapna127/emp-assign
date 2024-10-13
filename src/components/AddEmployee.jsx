import React, { useState } from 'react';
import axios from 'axios';

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEmp = {
      ...formData,
      id: Date.now()
    };

    try {
      await axios.post(`${import.meta.env.VITE_URL}/employees`, newEmp);
      alert('Employee added successfully!');

      setFormData({
        name: '',
        email: ''
      });
    } catch (error) {
      alert('Error adding the employee.');
    }
  };

  return (
    <>
      <h1>Add New Employee</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Enter Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Add Employee</button>
      </form>
    </>
  );
};

export default AddEmployee;
