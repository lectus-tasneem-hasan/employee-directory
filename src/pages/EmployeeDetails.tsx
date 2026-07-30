import { useNavigate, useParams } from 'react-router-dom'
import { employees } from '../data/employees'
import Button from '../components/Button'
import './EmployeeDetails.css'

function EmployeeDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const numericId = Number(id)
  const employee = employees.find((emp) => emp.id === numericId)

  if (!employee) {
    return (
      <div className="employee-details-page">
        <div className="employee-not-found">
          <h2>Employee Not Found</h2>
          <p>We couldn't find an employee with id "{id}".</p>
          <Button variant="primary" onClick={() => navigate('/employees')}>
            Back to Directory
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="employee-details-page">
      <Button variant="ghost" onClick={() => navigate('/employees')}>
        ← Back to Directory
      </Button>

      <div className="employee-details-card">
        <div
          className="employee-details-avatar"
          style={{ backgroundColor: employee.avatarColor }}
        >
          {employee.name
            .split(' ')
            .map((p) => p[0])
            .join('')
            .slice(0, 2)
            .toUpperCase()}
        </div>

        <div className="employee-details-info">
          <h1>{employee.name}</h1>
          <p className="employee-details-role">
            {employee.role} · {employee.department}
          </p>

          <p className="employee-details-bio">{employee.bio}</p>

          <dl className="employee-details-meta">
            <div>
              <dt>Email</dt>
              <dd>{employee.email}</dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>{employee.phone}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{employee.location}</dd>
            </div>
            <div>
              <dt>Joined On</dt>
              <dd>{employee.joinedOn}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}

export default EmployeeDetails
