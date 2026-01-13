import { useState, useEffect } from 'react'
import Header from './components/Header'
import MainContent from './components/MainContent'
import Footer from './components/Footer'
import initialApplications from './data/jobApplications'
import './App.css'

const STORAGE_KEY = 'jobApplications'

function App() {
  // Load saved applications from localStorage on component mount
  // Uses lazy initialization to read from localStorage only once during initial render
  const [applications, setApplications] = useState(() => {
    try {
      const savedApplications = localStorage.getItem(STORAGE_KEY)
      if (savedApplications) {
        const parsed = JSON.parse(savedApplications)
        // Validate that parsed data is an array
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed
        }
      }
    } catch (error) {
      console.error('Error loading applications from localStorage:', error)
    }
    // Fallback to initial sample data if no saved data exists or parsing fails
    return initialApplications
  })
  const [editingApplication, setEditingApplication] = useState(null)
  const [statusFilter, setStatusFilter] = useState('All')
  const [sortBy, setSortBy] = useState('dateApplied')
  const [sortOrder, setSortOrder] = useState('desc')

  // Automatically save applications to localStorage whenever the applications state changes
  // This useEffect triggers on: add, edit, delete operations
  // The dependency array [applications] ensures it runs whenever applications is updated
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(applications))
      // Data is now persisted - changes will survive page refresh
    } catch (error) {
      console.error('Error saving applications to localStorage:', error)
    }
  }, [applications]) // Dependency: saves whenever applications array changes

  const generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  const addApplication = (newAppData) => {
    const newApplication = {
      id: generateUniqueId(),
      ...newAppData
    }
    setApplications([newApplication, ...applications])
    // useEffect will automatically save to localStorage when applications state updates
  }

  const updateApplication = (updatedAppData) => {
    // Update the application in state array by ID
    setApplications(applications.map(app => 
      app.id === updatedAppData.id ? updatedAppData : app
    ))
    // Clear editing state after update
    setEditingApplication(null)
    // useEffect will automatically save to localStorage when applications state updates
  }

  const deleteApplication = (id) => {
    setApplications(applications.filter(app => app.id !== id))
    // useEffect will automatically save to localStorage when applications state updates
  }

  const startEditing = (application) => {
    setEditingApplication(application)
  }

  const cancelEditing = () => {
    setEditingApplication(null)
  }

  // Filter applications based on selected status
  let filteredApplications = statusFilter === 'All' 
    ? applications 
    : applications.filter(app => app.status === statusFilter)

  // Sort applications
  const sortedApplications = [...filteredApplications].sort((a, b) => {
    let comparison = 0

    if (sortBy === 'dateApplied') {
      const dateA = new Date(a.dateApplied)
      const dateB = new Date(b.dateApplied)
      comparison = dateA - dateB
    } else if (sortBy === 'company') {
      comparison = a.company.localeCompare(b.company)
    }

    return sortOrder === 'asc' ? comparison : -comparison
  })

  return (
    <div className="app">
      <Header />
      <MainContent 
        applications={sortedApplications}
        allApplications={applications}
        onAddApplication={addApplication}
        onUpdateApplication={updateApplication}
        onDeleteApplication={deleteApplication}
        editingApplication={editingApplication}
        onStartEditing={startEditing}
        onCancelEditing={cancelEditing}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
      />
      <Footer />
    </div>
  )
}

export default App
