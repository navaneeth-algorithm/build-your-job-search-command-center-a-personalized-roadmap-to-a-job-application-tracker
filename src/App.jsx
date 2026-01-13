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

  const deleteApplication = (id) => {
    setApplications(applications.filter(app => app.id !== id))
  }

  return (
    <div className="app">
      <Header />
      <MainContent 
        applications={applications} 
        onAddApplication={addApplication}
        onDeleteApplication={deleteApplication}
      />
      <Footer />
    </div>
  )
}

export default App
