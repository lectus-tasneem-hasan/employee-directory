import { Navigate, Route, Routes } from 'react-router-dom'
import EmployeeList from './pages/EmployeeList'
import EmployeeDetails from './pages/EmployeeDetails'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/employees" replace />} />
      <Route path="/employees" element={<EmployeeList />} />
      <Route path="/employees/:id" element={<EmployeeDetails />} />
      <Route path="*" element={<Navigate to="/employees" replace />} />
    </Routes>
  )
}

export default App
