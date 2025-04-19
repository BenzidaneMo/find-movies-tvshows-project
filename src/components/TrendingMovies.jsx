import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';


const TrendingMovies = ({ trendingMovies }) => {
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
        <SwiperSlide key={movie.id}>
          {/* Display the movie's rank/index */}
          {/* Container for movie poster with hover effect */}
          <div className='relative flex rounded-md cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105'>
            {/* Movie poster image */}
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // Fetch poster image from TMDB
              alt={movie.title ? movie.title : movie.name} // Use movie title as alt text
              className='w-[108.66px] h-[163px] z-10 rounded-md object-cover -ml-3.5'
            />
            {/* Overlay div that appears on hover, showing the movie title */}
            <p className='rank-movies relative right-11/12 z-0 hidden lg:block'>{i + 1}</p>
            <div
              className='absolute z-20 overflow-hidden top-0 text-clip w-[108.66px] h-[163px] -ml-3.5 cursor-pointer bg-black opacity-0 rounded-md hover:opacity-70 active:opacity-70 transition-opacity duration-300 ease-in-out text-white'
            >
              <h3 className='text-center my-12 text-sm'>{movie.title ? movie.title : movie.name}</h3>
            </div>
          </div>
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