import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import MovieCard from './MovieCard';


const TrendingMovies = ({ trendingMovies, onSelectMovie }) => {
  const trayArray = ['1','2','3','4','5','6','7','8','9'] // Array to display placeholders when no trending movies are available
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 480); // State to track if the screen is large enough for navigation buttons to apear

  // Effect to handle window resize events
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 480);
    };
    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    /* Section for displaying trending movies */
    <div className='trending'>
      {/* Trending section header */}
      <h2 className='mb-8'>Trending</h2>
      <Swiper
      slidesPerView={6}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      navigation={isLargeScreen}
      breakpoints={{
       // when window width is >= 768px (md breakpoint in Tailwind)
       768: {
         slidesPerView: 6,
        },
        // when window width is < 768px and greater than > 640px
        640: {
          slidesPerView: 5,
        },
        // when window width is < 640px and greater than > 480px
        480: {
          slidesPerView: 4,
        },
        // when window width is =< 480px
        0: {
          slidesPerView: 3,
        },
      }}
      modules={[Autoplay, Navigation]}
      className="mySwiper h-[163px]"
      >
        {/* Loop through and render the first 9 trending movies */}
        {trendingMovies && trendingMovies.length > 0 ? trendingMovies.map((movie, i) => (
        <SwiperSlide key={movie.movie_id}>
          <MovieCard
            movie={movie}
            mediaType={movie.media_type}
            variant="trending"
            rank={i + 1}
            onSelect={onSelectMovie}
          />
        </SwiperSlide>
        )) : trayArray.map((nmb,i) => (
        <SwiperSlide key={i}>
          <div className='flex rounded-md'>
            <div className='cursor-pointer ml-2 z-10 flex items-center justify-center min-w-[108.66px] h-[163px] bg-gray-300 rounded-md dark:bg-gray-700'>
              <img src="img.svg" className='w-10 h-10 opacity-30 transition-transform duration-300 ease-in-out transform hover:opacity-35'/>
            </div>
            <p className='rank-movies relative right-11/12 z-0 hidden lg:block'>{i + 1}</p>
          </div>
        </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrendingMovies;