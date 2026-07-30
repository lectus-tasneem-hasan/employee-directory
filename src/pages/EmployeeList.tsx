import { useMemo, useState } from 'react'
import { employees as initialEmployees } from '../data/employees'
import type { Employee } from '../types/employee'
import EmployeeCard from '../components/EmployeeCard'
import SearchInput from '../components/SearchInput'
import './EmployeeList.css'

function EmployeeList() {
  const [employees] = useState<Employee[]>(initialEmployees)
  const [query, setQuery] = useState<string>('')

  const filteredEmployees = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return employees
    return employees.filter((employee) =>
      employee.name.toLowerCase().includes(normalized)
    )
  }, [employees, query])

  return (
    <div className="employee-list-page">
      <header className="employee-list-header">
        <div>
          <h1>Employee Directory</h1>
          <p className="employee-list-subtitle">
            {employees.length} employees across the company
          </p>
        </div>
        <SearchInput value={query} onChange={setQuery} />
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
    </div>
  )
}

export default EmployeeList
