import { useState } from 'react'
import Header from './components/Header'
import MainContent from './components/MainContent'
import Footer from './components/Footer'
import initialApplications from './data/jobApplications'
import './App.css'

function App() {
  const [applications, setApplications] = useState(initialApplications)

  const addApplication = (newAppData) => {
    const newApplication = {
      id: Date.now(),
      ...newAppData
    }
    setApplications([newApplication, ...applications])
  }

  return (
    <div className="app">
      <Header />
      <MainContent 
        applications={applications} 
        onAddApplication={addApplication} 
      />
      <Footer />
    </div>
  )
}

export default App
