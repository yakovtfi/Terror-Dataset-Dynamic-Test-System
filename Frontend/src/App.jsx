import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import Testpage from './pages/Testpage'
import AppContext from './context/AppContext'
import { getAllterrorData } from './api/terroristAPI'

function App() {
  const [terrorData, setTerrorData] = useState([])
  const [loading, setLoading] = useState(true)
  const [score, setScore] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const result = await getAllterrorData()
      setTerrorData(result.data)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const contextValue = {
    terrorData,
    loading,
    score,
    setScore,
    currentQuestion,
    setCurrentQuestion
  }

  return (
    <AppContext.Provider value={contextValue}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/test" element={<Testpage />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  )
}

export default App
