import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function Watchlist(props) {

  //let { watchlist } = props

  console.log("inside watchlist component ", props.watchlist);

  return (
    <div className='flex justify-center w-full bg-gray-300'>
      <div className='w-[120vh] bg-slate-50 mt-3'>
        <div className='h-[70px] p-4 text-3xl border-b-4 mb-3'>
          Your Watchlist
        </div>
        <div>

          <div className='flex h-[200px] border-b-2 p-4 mb-3'>
            <div className='rounded-xl w-[17vh] h-[25vh] bg-center bg-cover md:h[40vh] md:w[180px]'
              style={{
                backgroundImage: `url(https://m.media-amazon.com/images/M/MV5BNjQwZDIyNjAtZGQxMC00OTUwLWFiOWYtNzg2NDc5Mjc1MDQ5XkEyXkFqcGdeQXVyMTAxNzQ1NzI@._V1_FMjpg_UX540_.jpg)`
              }}>

            </div>
            <div className='ml-3 w-[100vh]'>
              <div className='text-xl text-sky-600 font-bold'>Love Again</div>
              <div className='text-zinc-400 text-xs'>
                2023 | 1h 46m | G | Animation, Adventure, Comedy
              </div>
              <div>
                <span className='pr-2'><FontAwesomeIcon icon={faStar} color='gold' /></span>
                6.2
              </div>
              <div className='text-sky-600'>
                John Lasseter, Bradford Lewis | Owen Wilson, Larry the Cable Guy, Michael Caine
              </div>
              <div>
                Star race car Lightning McQueen and his pal Mater head overseas to compete in the World Grand Prix race. But the road to the championship becomes rocky as Mater gets caught up in an intriguing adventure of his own: international espionage.

              </div>
            </div>
          </div>

          

        </div>
      </div>

    </div>
  )
}

export default Watchlist