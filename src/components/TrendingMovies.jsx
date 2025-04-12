import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';


const TrendingMovies = ({ discoverMovies }) => {
  const trayArray = ['1','2','3','4','5','6','7','8','9']

  return (
    /* Section for displaying trending movies */
    <div className='trending'>
      {/* Trending section header */}
      <h2 className='mb-5'>Trending</h2>
      <Swiper
      slidesPerView={6}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      navigation={true}
      modules={[Autoplay, Navigation]}
      className="mySwiper h-[163px]"
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
        // when window width is < 480px
        0: {
          slidesPerView: 3,
        },
      }}
      >
        {/* Loop through and render the first 9 trending movies */}
        {discoverMovies && discoverMovies.length > 0 ? discoverMovies.slice(0, 9).map((movie, i) => (
        <SwiperSlide key={movie.id}>
          {/* Display the movie's rank/index */}
          {/* Container for movie poster with hover effect */}
          <div className='relative flex rounded-md cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105'>
            {/* Movie poster image */}
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // Fetch poster image from TMDB
              alt={movie.title} // Use movie title as alt text
              className='w-[108.66px] h-[163px] z-10 rounded-md object-cover -ml-3.5'
            />
            {/* Overlay div that appears on hover, showing the movie title */}
            <p className='rank-movies relative right-11/12 z-0 hidden lg:block'>{i + 1}</p>
            <div
              className='absolute z-20 overflow-hidden top-0 text-clip w-[108.66px] h-[163px] -ml-3.5 cursor-pointer bg-black opacity-0 rounded-md hover:opacity-70 transition-opacity duration-300 ease-in-out text-white'
            >
              <h3 className='text-center my-12 text-sm'>{movie.title}</h3>
            </div>
          </div>
        </SwiperSlide>
        )) : trayArray.map((nmb,i) => (
        <SwiperSlide key={i}>
          <div className='flex rounded-md cursor-pointer'>
            <div className='ml-2 z-10 flex items-center justify-center min-w-[108.66px] h-[163px] bg-gray-300 rounded-md dark:bg-gray-700'>
              <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
              </svg>
            </div>
            <p className='rank-movies relative right-11/12 z-0 hidden lg:block'>{i + 1}</p>
          </div>
        </SwiperSlide>
        ))
        }
      </Swiper>
    </div>
  );
};

export default TrendingMovies;