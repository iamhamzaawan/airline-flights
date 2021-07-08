import React, { useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import styled from 'styled-components'

import Airline from './airline'
import Header from './header'

const Home = styled.div`
  text-align:center;
  margin-left: auto;
  margin-right: auto;
  max-width: 1200px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  width: 100%;
  padding: 20px;
  > div {
    background-color: #fff;
    border-radius: 5px;
    padding: 20px;
  }
`
const Airlines = () => {
  const [airlines, setAirlines] = useState([])
  useEffect(() => {
    axios.get('/api/v1/airlines')
    .then(resp => setAirlines(resp.data.data))
    .catch(err => console.log(err))
  }, [airlines.length])

  const grid = airlines.map( (airline, index) => {
    const { name, image_url, slug, average_score } = airline.attributes

    return (
      <Airline 
        key={index}
        name={name}
        image_url={image_url}
        slug={slug}
        average_score={average_score}
      />
    )
  })

  return (
    <Home>
      <Header/>
      <Grid>{grid}</Grid>
    </Home>
  )
}

export default Airlines