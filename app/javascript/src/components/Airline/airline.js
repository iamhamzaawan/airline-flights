import React from 'react'
import { Link } from 'react-router-dom'

const Airline = props => {
  const airline = { ...props.airline }
  return (
    <div className="card">
      <div className="airline-logo">
        <img src={airline.image_url} alt={airline.name} />
      </div>
      <div className="airline-name">{airline.name}</div>
      <div className="airline-score">{airline.avg_score}</div>
      <div className="airline-link">
        <Link to={`/api/v1/airlines/${airline.slug}`}>View Airline</Link>
      </div>
    </div>
  )
}

export default Airline