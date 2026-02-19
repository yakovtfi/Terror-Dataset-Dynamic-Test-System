import React from 'react'

const Serchbar = ({ 
  searchText, 
  setSearchText, 
  searchField, 
  setSearchField, 
  yearFilter, 
  setYearFilter, 
  yearOperator, 
  setYearOperator 
}) => {
  const handleClearFilters = () => {
    setSearchText('')
    setYearFilter('')
    setSearchField('all')
    setYearOperator('=')
  }

  return (
    <div className="filters">
      <div className="filter-group">
        <label>Text Search:</label>
        <select 
          value={searchField} 
          onChange={(e) => setSearchField(e.target.value)}
          className="filter-select"
        >
          <option value="all">City & Country</option>
          <option value="city">City Only</option>
          <option value="country">Country Only</option>
        </select>
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search..."
          className="filter-input"
        />
      </div>

      <div className="filter-group">
        <label>Year Filter:</label>
        <select 
          value={yearOperator} 
          onChange={(e) => setYearOperator(e.target.value)}
          className="filter-select"
        >
          <option value="=">Equal to (=)</option>
          <option value=">">Greater than (&gt;)</option>
          <option value="<">Less than (&lt;)</option>
        </select>
        <input
          type="number"
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          placeholder="Year (e.g., 2015)"
          className="filter-input"
        />
      </div>

      <button 
        onClick={handleClearFilters}
        className="clear-button"
      >
        Clear Filters
      </button>
    </div>
  )
}

export default Serchbar