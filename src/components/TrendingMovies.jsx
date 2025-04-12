import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';


const TrendingMovies = ({ discoverMovies }) => {

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
      pagination={{
        clickable: false,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
      breakpoints={{
        // when window width is >= 768px (md breakpoint in Tailwind)
        768: {
          slidesPerView: 6,
        },
        // when window width is < 768px
        640: {
          slidesPerView: 4,
        },
        // when window width is < 640px
        0: {
          slidesPerView: 3,
        },
      }}
      >
        {/* Loop through and render the first 9 trending movies */}
        {discoverMovies && discoverMovies.slice(0, 9).map((movie, i) => (
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
            <p className='rank-movies relative right-11/12 z-0'>{i + 1}</p>
            <div
              className='absolute z-20 overflow-hidden top-0 text-clip w-[108.66px] h-[163px] -ml-3.5 cursor-pointer bg-black opacity-0 rounded-md hover:opacity-70 transition-opacity duration-300 ease-in-out text-white'
            >
              <h3 className='text-center my-12 text-sm'>{movie.title}</h3>
            </div>
          </div>
        </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrendingMovies;