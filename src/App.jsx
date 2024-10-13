import AddEmployee from './components/AddEmployee';
import EmployeeDetails from './components/EmployeeDetails';
import Home from './pages/Home';
import AppBar from './components/AppBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import useFetch from './useFetch';
import EmployeeTable from './components/EmployeeTable';

export default function App() {
  const { data: employees, isPending, error } = useFetch(`${import.meta.env.VITE_URL}/employees`);
  
  return (
    <Router>
      <AppBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/employees/add-emp' element={<AddEmployee />} />
        <Route path='/employees/:id' element={<EmployeeDetails />} />
        <Route path='/employees' element={employees && <EmployeeTable employees={employees} />} />
      </Routes>
    </Router>
  );
}
