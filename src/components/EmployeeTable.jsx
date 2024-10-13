import React from 'react'
import { Link } from 'react-router-dom'
function EmployeeTable({employees}) {
  return (
    <>
        <section>
            <section>
                <h1>Employee Table</h1>
            </section>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee)=>(
                        <tr key={employee.id}>
                            <td>
                                <p>{employee.name}</p>
                            </td>
                            <td>
                                <p>{employee.email}</p>
                            </td>

                            <td>
                                <Link to={`/employees/${employee.id}`}>
                                    <button>
                                        View full details
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    </>
  )
}

export default EmployeeTable