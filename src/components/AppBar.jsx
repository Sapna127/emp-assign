import React from 'react';
import { Link } from 'react-router-dom';

function AppBar() {

  return (
    <header className="bg-black text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Optional: Uncomment the logo/title if needed */}
        <div className="text-2xl font-bold">
          <Link to="/">Employee</Link>
        </div>

        <Link to="employees/add-emp">
          <button className="bg-white text-black px-4 py-2 rounded-md shadow-md hover:bg-gray-100 transition duration-200">
            + New Employee
          </button>
        </Link>
      </div>
    </header>
  );
}

export default AppBar;
