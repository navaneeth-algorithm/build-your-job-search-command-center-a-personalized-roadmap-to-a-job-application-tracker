import ApplicationForm from './ApplicationForm'

function MainContent({ 
  applications, 
  onAddApplication, 
  onUpdateApplication,
  onDeleteApplication,
  editingApplication,
  onStartEditing,
  onCancelEditing
}) {
  return (
    <main className="main-content">
      <div className="applications-container">
        <ApplicationForm 
          onAddApplication={onAddApplication}
          onUpdateApplication={onUpdateApplication}
          editingApplication={editingApplication}
          onCancelEditing={onCancelEditing}
        />
        
        <section className="applications-section">
          <h2>Your Applications</h2>
          <p className="applications-count">{applications.length} job applications tracked</p>
          
          <ul className="applications-list">
            {applications.map((app) => (
              <li key={app.id} className="application-item">
                <div className="application-header">
                  <h3 className="company-name">{app.company}</h3>
                  <span className={`status-badge status-${app.status.toLowerCase()}`}>
                    {app.status}
                  </span>
                </div>
                <p className="role-title">{app.role}</p>
                <div className="application-footer">
                  <p className="date-applied">Applied: {app.dateApplied}</p>
                  <div className="action-buttons">
                    <button 
                      className="edit-btn"
                      onClick={() => onStartEditing(app)}
                    >
                      Edit
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => onDeleteApplication(app.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  )
}

export default MainContent
