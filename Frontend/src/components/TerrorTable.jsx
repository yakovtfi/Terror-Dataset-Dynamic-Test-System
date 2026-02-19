import React from 'react'

const TerrorTable = ({ data }) => {
  console.log('TerrorTable received data length:', data?.length)

  const getRowKey = (row, index) => {
    const keyParts = [
      row.eventid,
      row.iyear,
      row.country_txt,
      row.city,
      row.attacktype1_txt,
      index
    ]

    return keyParts
      .map((value) => (value ?? '').toString().trim())
      .join('|')
  }
  
  return (
    <div className="table-container">
      <table className="terror-table">
        <thead>
          <tr>
            <th>Event ID</th>
            <th>Year</th>
            <th>Country</th>
            <th>Region</th>
            <th>City</th>
            <th>Attack Type</th>
            <th>Target Type</th>
            <th>Target</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={getRowKey(row, index)} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
              <td>{row.eventid}</td>
              <td>{row.iyear}</td>
              <td>{row.country_txt}</td>
              <td>{row.region_txt}</td>
              <td>{row.city}</td>
              <td>{row.attacktype1_txt}</td>
              <td>{row.targtype1_txt}</td>
              <td>{row.target1}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TerrorTable