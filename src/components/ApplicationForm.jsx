import { useState, useEffect } from 'react'

function ApplicationForm({ 
  onAddApplication, 
  onUpdateApplication, 
  editingApplication,
  onCancelEditing 
}) {
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [status, setStatus] = useState('')
  const [dateApplied, setDateApplied] = useState('')
  const [errors, setErrors] = useState({})

  const isEditing = editingApplication !== null

  useEffect(() => {
    if (editingApplication) {
      setCompany(editingApplication.company)
      setRole(editingApplication.role)
      setStatus(editingApplication.status)
      setDateApplied(editingApplication.dateApplied)
    } else {
      setCompany('')
      setRole('')
      setStatus('')
      setDateApplied('')
    }
    setErrors({})
  }, [editingApplication])

  const validateForm = () => {
    const newErrors = {}

    // Company validation
    if (!company.trim()) {
      newErrors.company = 'Company name is required'
    } else if (company.trim().length < 2) {
      newErrors.company = 'Company name must be at least 2 characters'
    } else if (company.trim().length > 100) {
      newErrors.company = 'Company name must be less than 100 characters'
    }

    // Role validation
    if (!role.trim()) {
      newErrors.role = 'Job role is required'
    } else if (role.trim().length < 2) {
      newErrors.role = 'Job role must be at least 2 characters'
    } else if (role.trim().length > 100) {
      newErrors.role = 'Job role must be less than 100 characters'
    }

    // Status validation
    if (!status) {
      newErrors.status = 'Please select a status'
    }

    // Date validation
    if (!dateApplied) {
      newErrors.dateApplied = 'Date applied is required'
    } else {
      const selectedDate = new Date(dateApplied)
      const today = new Date()
      today.setHours(23, 59, 59, 999) // Set to end of today
      
      if (selectedDate > today) {
        newErrors.dateApplied = 'Date cannot be in the future'
      }
      
      // Check if date is too far in the past (optional - e.g., 10 years)
      const tenYearsAgo = new Date()
      tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10)
      if (selectedDate < tenYearsAgo) {
        newErrors.dateApplied = 'Date cannot be more than 10 years ago'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    if (isEditing) {
      onUpdateApplication({
        id: editingApplication.id,
        company: company.trim(),
        role: role.trim(),
        status,
        dateApplied
      })
    } else {
      onAddApplication({
        company: company.trim(),
        role: role.trim(),
        status,
        dateApplied
      })
    }

    // Clear form after submission
    setCompany('')
    setRole('')
    setStatus('')
    setDateApplied('')
    setErrors({})
  }

  const handleCancel = () => {
    onCancelEditing()
    setCompany('')
    setRole('')
    setStatus('')
    setDateApplied('')
    setErrors({})
  }

  const handleInputChange = (field, value) => {
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' })
    }
    
    if (field === 'company') {
      setCompany(value)
    } else if (field === 'role') {
      setRole(value)
    } else if (field === 'status') {
      setStatus(value)
    } else if (field === 'dateApplied') {
      setDateApplied(value)
    }
  }

  return (
    <form className="application-form" onSubmit={handleSubmit} noValidate>
      <h3>{isEditing ? 'Edit Application' : 'Add New Application'}</h3>
      
      <div className="form-group">
        <label htmlFor="company">Company</label>
        <input
          type="text"
          id="company"
          name="company"
          placeholder="Enter company name"
          value={company}
          onChange={(e) => handleInputChange('company', e.target.value)}
          className={errors.company ? 'input-error' : ''}
          aria-invalid={errors.company ? 'true' : 'false'}
          aria-describedby={errors.company ? 'company-error' : undefined}
          required
        />
        {errors.company && (
          <span className="error-message" id="company-error" role="alert">
            {errors.company}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="role">Role</label>
        <input
          type="text"
          id="role"
          name="role"
          placeholder="Enter job title"
          value={role}
          onChange={(e) => handleInputChange('role', e.target.value)}
          className={errors.role ? 'input-error' : ''}
          aria-invalid={errors.role ? 'true' : 'false'}
          aria-describedby={errors.role ? 'role-error' : undefined}
          required
        />
        {errors.role && (
          <span className="error-message" id="role-error" role="alert">
            {errors.role}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={status}
          onChange={(e) => handleInputChange('status', e.target.value)}
          className={errors.status ? 'input-error' : ''}
          aria-invalid={errors.status ? 'true' : 'false'}
          aria-describedby={errors.status ? 'status-error' : undefined}
          required
        >
          <option value="">Select status</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
        {errors.status && (
          <span className="error-message" id="status-error" role="alert">
            {errors.status}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="dateApplied">Date Applied</label>
        <input
          type="date"
          id="dateApplied"
          name="dateApplied"
          value={dateApplied}
          onChange={(e) => handleInputChange('dateApplied', e.target.value)}
          className={errors.dateApplied ? 'input-error' : ''}
          aria-invalid={errors.dateApplied ? 'true' : 'false'}
          aria-describedby={errors.dateApplied ? 'dateApplied-error' : undefined}
          required
        />
        {errors.dateApplied && (
          <span className="error-message" id="dateApplied-error" role="alert">
            {errors.dateApplied}
          </span>
        )}
      </div>

      <div className="form-buttons">
        <button type="submit" className="submit-btn">
          {isEditing ? 'Update Application' : 'Add Application'}
        </button>
        {isEditing && (
          <button type="button" className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default ApplicationForm
