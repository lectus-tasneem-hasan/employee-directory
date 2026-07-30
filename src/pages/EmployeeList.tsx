import { useMemo, useState } from 'react'
import type { NewEmployeeInput } from '../types/employee'
import EmployeeCard from '../components/EmployeeCard'
import SearchInput from '../components/SearchInput'
import Button from '../components/Button'
import AddEmployeeModal from '../components/AddEmployeeModal'
import { useEmployees } from '../context/useEmployees'
import './EmployeeList.css'

function EmployeeList() {
  const { employees, addEmployee } = useEmployees()
  const [query, setQuery] = useState<string>('')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const filteredEmployees = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return employees
    return employees.filter((employee) =>
      employee.name.toLowerCase().includes(normalized)
    )
  }, [employees, query])

  const handleAddEmployee = (input: NewEmployeeInput) => {
    addEmployee(input)
  }

  return (
    <div className="employee-list-page">
      <header className="employee-list-header">
        <div>
          <h1>Employee Directory</h1>
          <p className="employee-list-subtitle">
            {employees.length} employees across the company
          </p>
        </div>
        <div className="employee-list-actions">
          <SearchInput value={query} onChange={setQuery} />
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            Add Employee
          </Button>
        </div>
      </header>

      {filteredEmployees.length > 0 ? (
        <div className="employee-grid">
          {filteredEmployees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>
      ) : (
        <div className="employee-empty-state">
          <p>No employees match "{query}".</p>
        </div>
      )}

      <AddEmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddEmployee={handleAddEmployee}
      />
    </div>
  )
}

export default EmployeeList
