import React, { createContext, useState, useContext, useCallback } from 'react';

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = useCallback(async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/employees`);
      if (!response.ok) throw new Error('Failed to fetch employees');
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  }, []);

  const addEmployee = async (newEmployee) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/employees`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEmployee),
      });
      if (!response.ok) throw new Error('Failed to add employee');
      await fetchEmployees(); // Fetch updated data after adding
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const updateEmployee = async (id, updatedEmployee) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/employees/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEmployee),
      });
      if (!response.ok) throw new Error('Failed to update employee');
      await fetchEmployees(); // Fetch updated data after updating
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/employees/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete employee');
      await fetchEmployees(); // Fetch updated data after deleting
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <EmployeeContext.Provider value={{ 
      employees, 
      addEmployee, 
      updateEmployee, 
      deleteEmployee,
      fetchEmployees 
    }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployees = () => useContext(EmployeeContext);