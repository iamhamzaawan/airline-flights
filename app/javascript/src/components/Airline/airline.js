import React, { useEffect, useState, Fragment } from 'react'
import axios from 'axios'
import styled from 'styled-components'

import Header from './header'
import Review from './review'
import ReviewForm from './review_form'

const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
`

const Column = styled.div`
  background: #fff; 
  max-width: 50%;
  width: 50%;
  float: left; 
  height: 100vh;
  overflow-x: scroll;
  overflow-y: scroll; 
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  &:last-child {
    background: black;
    border-top: 1px solid rgba(255,255,255,0.5);
  }
`

const Main = styled.div`
  padding-left: 60px;
`

const Airline = props => {
  const [airline, setAirline] = useState({})
  const [reviews, setReviews] = useState({})
  const [review, setReview] = useState({title: '', description: '', score: 0})
  const [error, setError] = useState('')
  const [loaded, setLoaded] = useState(false)
  let userReviews, total, average = 0; 
  
  useEffect(() => {
    const slug = props.match.params.slug;
    axios.get(`/api/v1/airlines/${slug}`)
    .then(resp => {
      setAirline(resp.data)
      setReviews(resp.data.data.attributes.reviews)
      setLoaded(true)
    })
    .catch(err => console.error('Error', err))
  }, [])

  // Modify text in review form
  const handleChange = (e) => {
    setReview(Object.assign({}, review, {[e.target.name]: e.target.value}))
  }

  // Create a review
  const handleSubmit = (e) => {
    e.preventDefault()

    const airline_id = parseInt(airline.data.id)
    axios.post('/api/v1/reviews', { ...review, airline_id })
    .then(resp => {
      setReviews([...reviews, resp.data.data.attributes])
      setReview({ title: '', description: '', score: 0 })
      setError('')
    })
    .catch( resp => {
      let error
      switch(resp.message){
        case "Request failed with status code 401":
          error = 'Please log in to leave a review.'
          break
        default:
          error = 'Something went wrong.'
      }
      setError(error)
    })
  }

  // Destroy a review
  const handleDestroy = (id, e) => {
    e.preventDefault()

    axios.delete(`/api/v1/reviews/${id}`)
    .then(data => {
      const included = [...reviews]
      const index = included.findIndex(data => data.id == id )
      included.splice(index, 1)

      setReviews(included)
    })
    .catch( data => console.log('Error', data) )
  }

  // set score
  const setRating = (score, e) => {
    e.preventDefault()  
    setReview({ ...review, score })
  }

  if (reviews && reviews.length > 0) {
    total = reviews.reduce((total, review) => total + review.score, 0)
    average = total > 0 ? (parseFloat(total) / parseFloat(reviews.length)) : 0
    
    userReviews = reviews.map( (review, index) => {
      return (
        <Review 
          key={index}
          id={review.id}
          attributes={review}
          handleDestroy={handleDestroy}
        />
      )
    })
  }

  return (
    <div className="wrapper">
      {
      loaded && 
      <Fragment>
        <Column>
          <Main>
            <Header 
              attributes={airline.data.attributes}
              reviews={reviews}
              average={average}
            />
          </Main>
          <div className="reviews"></div>
        </Column>
        <Column>
          <ReviewForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            attributes={airline.data.attributes}
            review={review}
            setRating={setRating}
          />
        </Column>
      </Fragment>
      }
    </div>
  )
}

export default Airline