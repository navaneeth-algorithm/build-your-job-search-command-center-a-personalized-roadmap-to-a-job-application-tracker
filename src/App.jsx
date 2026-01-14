import { useState, useEffect } from 'react'
import Header from './components/Header'
import MainContent from './components/MainContent'
import Footer from './components/Footer'
import Notification from './components/Notification'
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
  const [notification, setNotification] = useState({ message: '', type: '' })

  // Automatically save applications to localStorage whenever the applications state changes
  // This useEffect triggers on: add, edit, delete operations
  // The dependency array [applications] ensures it runs whenever applications is updated
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(applications))
      // Data is now persisted - changes will survive page refresh
    } catch (error) {
      console.error('Error saving applications to localStorage:', error)
      showNotification('Failed to save data. Please check your browser storage settings.', 'error')
    }
  }, [applications]) // Dependency: saves whenever applications array changes

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
  }

  const hideNotification = () => {
    setNotification({ message: '', type: '' })
  }

  const generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  const addApplication = (newAppData) => {
    try {
      const newApplication = {
        id: generateUniqueId(),
        ...newAppData
      }
      setApplications([newApplication, ...applications])
      showNotification('Application added successfully!', 'success')
    } catch (error) {
      console.error('Error adding application:', error)
      showNotification('Failed to add application. Please try again.', 'error')
    }
  }

  const updateApplication = (updatedAppData) => {
    try {
      // Update the application in state array by ID
      setApplications(applications.map(app => 
        app.id === updatedAppData.id ? updatedAppData : app
      ))
      // Clear editing state after update
      setEditingApplication(null)
      showNotification('Application updated successfully!', 'success')
    } catch (error) {
      console.error('Error updating application:', error)
      showNotification('Failed to update application. Please try again.', 'error')
    }
  }

  const deleteApplication = (id) => {
    try {
      const application = applications.find(app => app.id === id)
      setApplications(applications.filter(app => app.id !== id))
      showNotification(`${application?.company || 'Application'} deleted successfully!`, 'success')
    } catch (error) {
      console.error('Error deleting application:', error)
      showNotification('Failed to delete application. Please try again.', 'error')
    }
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
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={hideNotification}
      />
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
