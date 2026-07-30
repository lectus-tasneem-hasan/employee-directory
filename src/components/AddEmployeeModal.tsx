import { useEffect, useState, type ChangeEvent, type FormEvent, type MouseEvent } from 'react'
import Button from './Button'
import type { NewEmployeeInput } from '../types/employee'
import './AddEmployeeModal.css'

export interface AddEmployeeModalProps {
  isOpen: boolean
  onClose: () => void
  onAddEmployee: (employee: NewEmployeeInput) => void
}

export type { NewEmployeeInput }

const initialFormState: NewEmployeeInput = {
  name: '',
  role: '',
  department: '',
  email: '',
  phone: '',
  location: '',
  bio: '',
}

interface FormErrors {
  name?: string
  role?: string
  department?: string
  email?: string
}

function AddEmployeeModal({ isOpen, onClose, onAddEmployee }: AddEmployeeModalProps) {
  const [formData, setFormData] = useState<NewEmployeeInput>(initialFormState)
  const [errors, setErrors] = useState<FormErrors>({})

  const resetForm = () => {
    setFormData(initialFormState)
    setErrors({})
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        resetForm()
        onClose()
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Full Name is required'
    }
    if (!formData.role.trim()) {
      newErrors.role = 'Role is required'
    }
    if (!formData.department.trim()) {
      newErrors.department = 'Department is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onAddEmployee(formData)
    handleClose()
  }

  return (
    <div
      className="modal-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-content">
        <header className="modal-header">
          <h2 id="modal-title" className="modal-title">
            Add New Employee
          </h2>
          <button
            type="button"
            className="modal-close-btn"
            onClick={handleClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </header>

        <form onSubmit={handleSubmit} noValidate className="modal-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Full Name <span className="required-star">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className={`form-input ${errors.name ? 'input-error' : ''}`}
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Aditi Sharma"
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="role" className="form-label">
                Role <span className="required-star">*</span>
              </label>
              <input
                id="role"
                name="role"
                type="text"
                className={`form-input ${errors.role ? 'input-error' : ''}`}
                value={formData.role}
                onChange={handleChange}
                placeholder="e.g. Frontend Engineer"
              />
              {errors.role && <span className="error-message">{errors.role}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="department" className="form-label">
                Department <span className="required-star">*</span>
              </label>
              <input
                id="department"
                name="department"
                type="text"
                className={`form-input ${errors.department ? 'input-error' : ''}`}
                value={formData.department}
                onChange={handleChange}
                placeholder="e.g. Engineering"
              />
              {errors.department && (
                <span className="error-message">{errors.department}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email <span className="required-star">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className={`form-input ${errors.email ? 'input-error' : ''}`}
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. aditi.sharma@company.com"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                className="form-input"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. +91 98765 43210"
              />
            </div>

            <div className="form-group">
              <label htmlFor="location" className="form-label">
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                className="form-input"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Ahmedabad, IN"
              />
            </div>

            <div className="form-group form-group-full">
              <label htmlFor="bio" className="form-label">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={3}
                className="form-textarea"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Brief bio or description..."
              />
            </div>
          </div>

          <footer className="modal-actions">
            <Button type="button" variant="ghost" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Add Employee
            </Button>
          </footer>
        </form>
      </div>
    </div>
  )
}

export default AddEmployeeModal
