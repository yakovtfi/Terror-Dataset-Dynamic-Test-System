import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import Serchbar from '../components/Searchbar'
import TerrorTable from '../components/TerrorTable'

const HomePage = () => {
  const navigate = useNavigate()
  const { terrorData, loading } = useAppContext()
  
  const [searchText, setSearchText] = useState('')
  const [searchField, setSearchField] = useState('all')
  const [yearFilter, setYearFilter] = useState('')
  const [yearOperator, setYearOperator] = useState('=')

 
  const filteredData = useMemo(() => {
    let data = [...terrorData]

    if (searchText.trim()) {
      const searchLower = searchText.trim().toLowerCase()
      data = data.filter(row => {
        const city = row.city ? row.city.trim().toLowerCase() : ''
        const country = row.country_txt ? row.country_txt.trim().toLowerCase() : ''

        if (searchField === 'all') {
          return city === searchLower || country === searchLower
        } else if (searchField === 'city') {
          return city === searchLower
        } else if (searchField === 'country') {
          return country === searchLower
        }
        return false
      })
    }

    if (yearFilter.trim() && !isNaN(yearFilter)) {
      const year = parseInt(yearFilter)
      data = data.filter(row => {
        const rowYear = parseInt(row.iyear)
        if (yearOperator === '>') {
          return rowYear > year
        } else if (yearOperator === '<') {
          return rowYear < year
        } else if (yearOperator === '=') {
          return rowYear === year
        }
        return false
      })
    }

    console.log('Filtered data length:', data.length)
    return data
  }, [terrorData, searchText, searchField, yearFilter, yearOperator])

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading data...</div>
      </div>
    )
  }

  return (
    <div className="container">
      <h1>Terror Dataset - Data Page</h1>
      
      <div className="navigation">
        <button onClick={() => navigate('/test')} className="nav-button">
          Go to Test Page
        </button>
      </div>

      <Serchbar
        searchText={searchText}
        setSearchText={setSearchText}
        searchField={searchField}
        setSearchField={setSearchField}
        yearFilter={yearFilter}
        setYearFilter={setYearFilter}
        yearOperator={yearOperator}
        setYearOperator={setYearOperator}
      />

      <div className="data-info">
        Showing {filteredData.length} of {terrorData.length} records
      </div>

      <TerrorTable data={filteredData} />
    </div>
  )
}

export default HomePage
