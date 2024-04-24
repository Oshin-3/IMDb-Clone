import React from 'react'
import NavBar from './NavBar'
import Carousel from './Carousel'
import UpcomingMovies from './UpcomingMovies'


function HomePage() {
  return (
    <div>
        
        <Carousel />
        <UpcomingMovies />
    </div>
  )
}

export default HomePage