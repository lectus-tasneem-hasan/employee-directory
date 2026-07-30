export interface Employee {
  id: number
  name: string
  role: string
  department: string
  email: string
  phone: string
  location: string
  avatarColor: string
  joinedOn: string
  bio: string
}

export type NewEmployeeInput = Omit<Employee, 'id' | 'avatarColor' | 'joinedOn'>

