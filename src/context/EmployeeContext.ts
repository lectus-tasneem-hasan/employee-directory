import { createContext } from 'react'
import type { Employee, NewEmployeeInput } from '../types/employee'

export interface EmployeeContextType {
  employees: Employee[]
  addEmployee: (input: NewEmployeeInput) => Employee
  getEmployeeById: (id: number) => Employee | undefined
}

export const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined)
