import React from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react'
import { faFilm, faCheck, faPlus, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

function TopActors() {
    const [topActors, setTopActors] = useState([])
    const [activeIndex, setActiveIndex] = useState(0);

    const fetchTopActorsMovies = async () => {

        let topActor = [];

        try {
            const response = await axios.get(`https://api.themoviedb.org/3/trending/person/day?api_key=731e37b9dcf15c6797f4888e7858a66d`);
            topActor = response.data.results.filter(actor => actor.known_for_department == "Acting")

        } catch (error) {
            console.error('Error fetching top actors movies:', error);
        }

        setTopActors(topActor);
    }

    useEffect(() => {
        fetchTopActorsMovies()
    }, [])

    const prevSlide = () => {

        setActiveIndex((prevIndex) =>
            prevIndex === 0 ? topActors.length - 1 : prevIndex - 1
        );

    };

    const nextSlide = () => {

        setActiveIndex((prevIndex) =>
            prevIndex === topActors.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <>
            <div className=' w-full'>
                <div className='text-2xl mt-5 ml-7 font-bold text-amber-400 pl-2'>
                    Top Actors
                </div>
                <div>
                    <div className='carousel-container ml-10 mr-10 border-solid border-transparent border-4'>
                        <button onClick={prevSlide} className={`text-white text-white absolute top-40 left-5 z-10 w-12 h-14 ${activeIndex == 0 ? "bg-gray-500" : "bg-gray-900"} bg-opacity-60`} disabled={activeIndex == 0 ? true : false}>
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </button>

                        <div className='carousel-wrapper' style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
                            {topActors.map((actor, index) => {

                                return <div
                                    key={actor.id}
                                    className={`w-[40vh] h-[47vh] m-8 relative rounded-full ${index % 5 === 0 ? "mr-6" : ""}`}
                                    >
                                    <div
                                        className={`w-[40vh] h-[40vh] bg-center bg-cover md:h[40vh] md:w[180px] rounded-full hover:scale-110 duration-300`}
                                        style={{
                                            backgroundImage: `url(https://image.tmdb.org/t/p/original/t/p/w500/${actor.profile_path})`
                                        }}
                                    ></div>
                                    <div className='w-[40vh] h-[7vh] rounded-lg text-center pt-2 bottom-0 absolute '>
                                        <div className='text-slate-50 w-full pl-2'>
                                            {actor.name}
                                        </div>
                                    </div>
                                </div>
                            })}

                        </div>

                        <button onClick={nextSlide} className={`text-white text-white absolute top-40 right-5 z-10 w-12 h-14 ${activeIndex == 4 ? "bg-gray-500" : "bg-gray-900"} bg-opacity-60`} disabled={activeIndex == 4 ? true : false}>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TopActors