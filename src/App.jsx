import { useState, useEffect } from 'react'
import Header from './components/Header'
import MainContent from './components/MainContent'
import Footer from './components/Footer'
import initialApplications from './data/jobApplications'
import './App.css'

const STORAGE_KEY = 'jobApplications'

function App() {
  const [applications, setApplications] = useState(() => {
    const savedApplications = localStorage.getItem(STORAGE_KEY)
    if (savedApplications) {
      return JSON.parse(savedApplications)
    }
    return initialApplications
  })
  const [editingApplication, setEditingApplication] = useState(null)
  const [statusFilter, setStatusFilter] = useState('All')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications))
  }, [applications])

  const generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  const addApplication = (newAppData) => {
    const newApplication = {
      id: generateUniqueId(),
      ...newAppData
    }
    setApplications([newApplication, ...applications])
  }

  const updateApplication = (updatedAppData) => {
    // Update the application in state array by ID
    setApplications(applications.map(app => 
      app.id === updatedAppData.id ? updatedAppData : app
    ))
    // Clear editing state after update
    setEditingApplication(null)
    // Note: useEffect will automatically save to localStorage when applications state changes
  }

  const deleteApplication = (id) => {
    setApplications(applications.filter(app => app.id !== id))
  }

  const startEditing = (application) => {
    setEditingApplication(application)
  }

  const cancelEditing = () => {
    setEditingApplication(null)
  }

  // Filter applications based on selected status
  const filteredApplications = statusFilter === 'All' 
    ? applications 
    : applications.filter(app => app.status === statusFilter)

  return (
    <div className="app">
      <Header />
      <MainContent 
        applications={filteredApplications}
        allApplications={applications}
        onAddApplication={addApplication}
        onUpdateApplication={updateApplication}
        onDeleteApplication={deleteApplication}
        editingApplication={editingApplication}
        onStartEditing={startEditing}
        onCancelEditing={cancelEditing}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />
      <Footer />
    </div>
  )
}

export default App
