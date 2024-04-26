import React from 'react'
import NavBar from './NavBar'
import Carousel from './Carousel'
import UpcomingMovies from './UpcomingMovies'
import TopRated from './TopRated'
import TopActors from './TopActors'

function HomePage() {
  return (
    <div>
        
        <Carousel />
        <UpcomingMovies />
        <TopRated />
        <TopActors />
    </div>
  )
}

export default HomePage