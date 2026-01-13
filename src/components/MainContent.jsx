import ApplicationForm from './ApplicationForm'

function MainContent({ applications, onAddApplication, onDeleteApplication }) {
  return (
    <main className="main-content">
      <div className="applications-container">
        <ApplicationForm onAddApplication={onAddApplication} />
        
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
                  <button 
                    className="delete-btn"
                    onClick={() => onDeleteApplication(app.id)}
                  >
                    Delete
                  </button>
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
