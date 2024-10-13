import AddEmployee from './components/AddEmployee'
import EmployeeDetails from './components/EmployeeDetails'
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' 

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/employees/add-emp' element={<AddEmployee/>}/>
        <Route path="/employees/:id" element={<EmployeeDetails/>}/>
      </Routes>
    </Router>
  )
}