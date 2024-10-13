import React from 'react';
import { Link } from 'react-router-dom'; 
import useFetch from '../useFetch';
import EmployeeTable from '../components/EmployeeTable';

function Home() {
    const { data: employees, isPending, error } = useFetch(`${process.env.URL}/employees`);

    return (
        <section>
            {error && <p>{error}</p>}
            {isPending && <p>Loading Employees...</p>}
            
            <Link to={`/employees/add-emp`}>
                <button>
                    Add New Employee
                </button>
            </Link>
            
            {employees && <EmployeeTable employees={employees} />} 
        </section>
    );
}

export default Home;
