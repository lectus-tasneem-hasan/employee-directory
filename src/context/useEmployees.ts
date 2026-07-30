import { useContext } from 'react'
import { EmployeeContext, type EmployeeContextType } from './EmployeeContext'

export function useEmployees(): EmployeeContextType {
  const context = useContext(EmployeeContext)
  if (!context) {
    throw new Error('useEmployees must be used within an EmployeeProvider')
  }
  return context
}
