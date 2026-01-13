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
    setApplications(applications.map(app => 
      app.id === updatedAppData.id ? updatedAppData : app
    ))
    setEditingApplication(null)
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

  return (
    <div className="app">
      <Header />
      <MainContent 
        applications={applications} 
        onAddApplication={addApplication}
        onUpdateApplication={updateApplication}
        onDeleteApplication={deleteApplication}
        editingApplication={editingApplication}
        onStartEditing={startEditing}
        onCancelEditing={cancelEditing}
      />
      <Footer />
    </div>
  )
}

export default App
