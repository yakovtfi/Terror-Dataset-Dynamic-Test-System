import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { saveTerrorResult } from '../api/terroristAPI'

const Testpage = () => {
  const navigate = useNavigate()
  const { terrorData, score, setScore, currentQuestion, setCurrentQuestion } = useAppContext()
  
  const [userAnswer, setUserAnswer] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('') 
  const [saveMessage, setSaveMessage] = useState('')
  
  const fieldCountry = { key: 'country_txt', label: 'country' }
  const fieldYear = { key: 'iyear', label: 'year' }
  const fieldAttackType = { key: 'attacktype1_txt', label: 'attack type' }


  const generateQuestion = () => {
    if (terrorData.length === 0) return

    const validRows = terrorData.filter(
      (row) =>
        row[fieldCountry.key] &&
        row[fieldYear.key] &&
        row[fieldAttackType.key]
    )

    if (validRows.length === 0) return

    const randomRow = validRows[Math.floor(Math.random() * validRows.length)]

    const question = {
      row: randomRow,
      fieldX: fieldCountry,
      fieldY: fieldYear,
      fieldZ: fieldAttackType,
      valueX: randomRow[fieldCountry.key],
      valueY: randomRow[fieldYear.key],
      correctAnswer: String(randomRow[fieldAttackType.key]).trim()
    }

    setCurrentQuestion(question)
    setUserAnswer('')
    setMessage('')
    setMessageType('')
  }

  const findMatchingRow = (fieldXKey, valueX, fieldYKey, valueY) => {
  
    const matchingRows = terrorData.filter(row => 
      row[fieldXKey] === valueX && row[fieldYKey] === valueY
    );
    

    return matchingRows.length > 1;
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!currentQuestion) return
    if (!userAnswer.trim()) {
      setMessage(' Please enter an answer')
      setMessageType('error')
      return
    }

    const { fieldX, fieldY, valueX, valueY, correctAnswer } = currentQuestion
    const trimmedAnswer = userAnswer.trim()

    if (trimmedAnswer.toLowerCase() === String(correctAnswer).toLowerCase()) {
      setScore(score + 1)
      setMessage(' Correct! +1 point')
      setMessageType('success')
      return
    }


    const hasMultipleMatches = findMatchingRow(fieldX.key, valueX, fieldY.key, valueY)
    
    if (hasMultipleMatches) {
      setScore(score + 1)
      setMessage(` Acceptable answer! Multiple records exist with ${fieldX.label} = "${valueX}" and ${fieldY.label} = "${valueY}". +1 point`)
      setMessageType('success')
    } else {
      setMessage(` Incorrect. No other matching result found. No point.`)
      setMessageType('error')
    }
  }

  const handleSaveScore = async () => {
    try {
      setSaveMessage('Saving...')
      await saveTerrorResult(score)
      setSaveMessage(' Score saved successfully!')
      setTimeout(() => setSaveMessage(''), 3000)
    } catch (error) {
      console.error('Error saving score:', error)
      setSaveMessage(' Error saving score')
      setTimeout(() => setSaveMessage(''), 3000)
    }
  }

  useEffect(() => {
    if (terrorData.length > 0 && !currentQuestion) {
      generateQuestion()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [terrorData, currentQuestion])

  if (terrorData.length === 0) {
    return (
      <div className="container">
        <div className="loading">Loading data...</div>
      </div>
    )
  }

  if (!currentQuestion) {
    return (
      <div className="container">
        <button onClick={generateQuestion} className="nav-button">
          Start Test
        </button>
      </div>
    )
  }

  const { fieldX, fieldY, fieldZ, valueX, valueY } = currentQuestion

  return (
    <div className="container">
      <h1>Terror Dataset - Dynamic Test Page</h1>
      
      <div className="navigation">
        <button onClick={() => navigate('/')} className="nav-button">
          Back to Data Page
        </button>
      </div>

      <div className="score-display">
        <h2>Score: {score}</h2>
        <button onClick={handleSaveScore} className="save-score-button">
          Save Score
        </button>
        {saveMessage && (
          <div className="save-message">{saveMessage}</div>
        )}
      </div>

      <div className="question-container">
        <div className="question">
          <h3>Question:</h3>
          <p className="question-text">
            When <strong>{fieldX.label}</strong> = "<strong>{valueX}</strong>" 
            {' '}and <strong>{fieldY.label}</strong> = "<strong>{valueY}</strong>" 
            {' '}→ what is <strong>{fieldZ.label}</strong>?
          </p>
        </div>

        <form onSubmit={handleSubmit} className="answer-form">
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Enter your answer..."
            className="answer-input"
            autoFocus
          />
          <div className="button-group">
            <button type="submit" className="submit-button">
              Submit Answer
            </button>
            <button 
              type="button" 
              onClick={generateQuestion}
              className="next-button"
            >
              Next Question
            </button>
          </div>
        </form>

        {message && (
          <div className={`message message-${messageType}`}>
            {message}
          </div>
        )}
      </div>

      <div className="instructions">
        <h3>Instructions:</h3>
        <ul>
          <li>Answer the question based on the dataset</li>
          <li>Correct answer: +1 point</li>
          <li>Wrong answer but matching row exists: +1 point</li>
          <li>No matching result: No point</li>
          <li>Navigate between pages while keeping your score and current question</li>
        </ul>
      </div>
    </div>
  )
}

export default Testpage

