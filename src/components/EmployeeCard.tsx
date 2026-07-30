import type { KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Employee } from '../types/employee'
import './EmployeeCard.css'

export interface EmployeeCardProps {
  employee: Employee
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function EmployeeCard({ employee }: EmployeeCardProps) {
  const navigate = useNavigate()

  const goToDetails = () => {
    navigate(`/employees/${employee.id}`)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      goToDetails()
    }
  }

  return (
    <div
      className="employee-card"
      role="button"
      tabIndex={0}
      onClick={goToDetails}
      onKeyDown={handleKeyDown}
    >
      <div className="employee-card-avatar" style={{ backgroundColor: employee.avatarColor }}>
        {getInitials(employee.name)}
      </div>
      <div className="employee-card-info">
        <h3 className="employee-card-name">{employee.name}</h3>
        <p className="employee-card-role">{employee.role}</p>
        <span className="employee-card-department">{employee.department}</span>
      </div>
    </div>
  )
}

export default EmployeeCard
