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
  }, [editingApplication])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (isEditing) {
      onUpdateApplication({
        id: editingApplication.id,
        company,
        role,
        status,
        dateApplied
      })
    } else {
      onAddApplication({
        company,
        role,
        status,
        dateApplied
      })
    }

    // Clear form after submission
    setCompany('')
    setRole('')
    setStatus('')
    setDateApplied('')
  }

  const handleCancel = () => {
    onCancelEditing()
    setCompany('')
    setRole('')
    setStatus('')
    setDateApplied('')
  }

  return (
    <form className="application-form" onSubmit={handleSubmit}>
      <h3>{isEditing ? 'Edit Application' : 'Add New Application'}</h3>
      
      <div className="form-group">
        <label htmlFor="company">Company</label>
        <input
          type="text"
          id="company"
          name="company"
          placeholder="Enter company name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="role">Role</label>
        <input
          type="text"
          id="role"
          name="role"
          placeholder="Enter job title"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="">Select status</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="dateApplied">Date Applied</label>
        <input
          type="date"
          id="dateApplied"
          name="dateApplied"
          value={dateApplied}
          onChange={(e) => setDateApplied(e.target.value)}
          required
        />
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
