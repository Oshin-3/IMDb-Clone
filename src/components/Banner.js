import React from 'react'

function Banner() {
  return (
    <div className='h-[20vh] md:h-[40vh] bg-center flex items-end bg-no-repeat' style={{
        backgroundImage : `url(https://w0.peakpx.com/wallpaper/22/577/HD-wallpaper-dune-2020-film-poster.jpg)`,
        
    }}>
        <div className='text-2xl bg-gray-900 bg-opacity-60 p-2 text-white w-full pl-6'>
            Dune
        </div>
    </div>
  )
}

export default Banner