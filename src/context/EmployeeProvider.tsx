import { useEffect, useState, type ReactNode } from 'react'
import { employees as initialEmployees } from '../data/employees'
import type { Employee, NewEmployeeInput } from '../types/employee'
import { EmployeeContext } from './EmployeeContext'

const STORAGE_KEY = 'employee_directory_data'

const AVATAR_PALETTE = [
  '#6C63FF',
  '#00A896',
  '#FF6B6B',
  '#F4A261',
  '#2A9D8F',
  '#E76F51',
  '#8D5A97',
  '#457B9D',
]

export function EmployeeProvider({ children }: { children: ReactNode }) {
  const [employees, setEmployees] = useState<Employee[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved) as unknown
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed as Employee[]
        }
      }
    } catch {
      // Fall back to initial employees if localStorage fails
    }
    return initialEmployees
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(employees))
    } catch {
      // Ignore write errors
    }
  }, [employees])

  const addEmployee = (input: NewEmployeeInput): Employee => {
    const maxId = employees.reduce((max, emp) => (emp.id > max ? emp.id : max), 0)
    const randomColor =
      AVATAR_PALETTE[Math.floor(Math.random() * AVATAR_PALETTE.length)]

    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const today = `${year}-${month}-${day}`

    const newEmployee: Employee = {
      id: maxId + 1,
      name: input.name.trim(),
      role: input.role.trim(),
      department: input.department.trim(),
      email: input.email.trim(),
      phone: input.phone.trim(),
      location: input.location.trim(),
      avatarColor: randomColor,
      joinedOn: today,
      bio: input.bio.trim(),
    }

    setEmployees((prev) => [newEmployee, ...prev])
    return newEmployee
  }

  const getEmployeeById = (id: number): Employee | undefined => {
    return employees.find((emp) => emp.id === id)
  }

  return (
    <EmployeeContext.Provider value={{ employees, addEmployee, getEmployeeById }}>
      {children}
    </EmployeeContext.Provider>
  )
}
