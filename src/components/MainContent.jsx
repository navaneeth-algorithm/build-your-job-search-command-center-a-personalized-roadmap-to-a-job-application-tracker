import ApplicationForm from './ApplicationForm'

function MainContent({ 
  applications, 
  allApplications,
  onAddApplication, 
  onUpdateApplication,
  onDeleteApplication,
  editingApplication,
  onStartEditing,
  onCancelEditing,
  statusFilter,
  onStatusFilterChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange
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
          <div className="section-header">
            <h2>Your Applications</h2>
            <div className="controls-row">
              <div className="filter-controls">
                <label htmlFor="status-filter">Filter by Status:</label>
                <select
                  id="status-filter"
                  className="status-filter"
                  value={statusFilter}
                  onChange={(e) => onStatusFilterChange(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              <div className="sort-controls">
                <label htmlFor="sort-by">Sort by:</label>
                <select
                  id="sort-by"
                  className="sort-select"
                  value={sortBy}
                  onChange={(e) => onSortByChange(e.target.value)}
                >
                  <option value="dateApplied">Date Applied</option>
                  <option value="company">Company Name</option>
                </select>
                <div className="sort-order-buttons">
                  <button
                    type="button"
                    className={`sort-btn ${sortOrder === 'asc' ? 'active' : ''}`}
                    onClick={() => onSortOrderChange('asc')}
                    title="Ascending"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    className={`sort-btn ${sortOrder === 'desc' ? 'active' : ''}`}
                    onClick={() => onSortOrderChange('desc')}
                    title="Descending"
                  >
                    ↓
                  </button>
                </div>
              </div>
            </div>
          </div>
          <p className="applications-count">
            Showing {applications.length} of {allApplications.length} job applications
          </p>
          
          {applications.length === 0 ? (
            <div className="no-applications">
              <p>No applications found with status "{statusFilter}"</p>
            </div>
          ) : (
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
          )}
        </section>
      </div>
    </main>
  )
}

export default MainContent
