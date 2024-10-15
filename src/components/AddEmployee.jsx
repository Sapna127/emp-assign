import React, { useState } from 'react';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import { useEmployees } from '../EmployeeContext';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
  const { addEmployee } = useEmployees();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    designation: '',
    department: '',
    joiningDate: '',
    salary: '',
    phoneNumber: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addEmployee(formData);
      alert('Employee added successfully!');
      navigate('/employees');
    } catch (error) {
      console.error('Error adding employee:', error);
      alert('Error adding the employee.');
    }
  };


  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md border border-black">
        <h1 className="text-black text-2xl font-bold text-center mb-4">Add New Employee</h1>
        <form onSubmit={handleSubmit} className="space-y-2 justify-center">
          <div className='flex gap-2'>
            <FormInput label="Name" type="text" name="name" value={formData.name} onChange={handleChange} />
            <FormInput label="Email" type="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <FormInput label="Designation" type="text" name="designation" value={formData.designation} onChange={handleChange} />
          <div className='flex gap-2'>
            <FormInput label="Department" type="text" name="department" value={formData.department} onChange={handleChange} />
            <FormInput label="Joining Date" type="date" name="joiningDate" value={formData.joiningDate} onChange={handleChange} />
          </div>
          <div className='flex gap-2'>
            <FormInput label="Salary" type="number" name="salary" value={formData.salary} onChange={handleChange} />
            <FormInput label="Phone Number" type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          </div>
          
          <div className="flex justify-center mt-4">
            <Button type="submit">Add Employee</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
