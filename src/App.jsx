import AddEmployee from './components/AddEmployee';
import EmployeeDetails from './components/EmployeeDetails';
import Home from './pages/Home';
import AppBar from './components/AppBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import EmployeeTable from './components/EmployeeTable';
import { EmployeeProvider } from './EmployeeContext';

export default function App() {
  return (
    <Router>
      <EmployeeProvider>
        <AppBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/employees/add-emp' element={<AddEmployee />} />
          <Route path='/employees/:id' element={<EmployeeDetails />} />
          <Route path='/employees' element={<EmployeeTable />} />
        </Routes>
      </EmployeeProvider>
    </Router>
  );
}