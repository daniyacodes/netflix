import React from 'react'
import styles from "./SlideShow.module.css"
import Card from './../MovieCard/Card';
import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css";
import "swiper/css/navigation";
import {Navigation} from "swiper/modules";


function SlideShow({title, movies}) {
  //console.log("its title amd movie:", title, movies)
  return (
    <div>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.Row}>
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={10}
          slidesPerView={2}
          slidesPerGroup={2}
          speed={600}
          breakpoints={{
            640:  { slidesPerView: 3, slidesPerGroup: 3 },
            900:  { slidesPerView: 4, slidesPerGroup: 4 },
            1200: { slidesPerView: 5, slidesPerGroup: 5 },
            1500: { slidesPerView: 6, slidesPerGroup: 6 },
          }}
        >
           {movies?.map( (singlemovie, index)=>{
            //console.log("index:", index);
            //console.log("single movie:", singlemovie);

            return(
            <SwiperSlide key={singlemovie.id}>
              <Card movie={singlemovie}/>
            </SwiperSlide>)
          
})}
        </Swiper>
       
        
      </div>
    </div>
  )
}

export default SlideShow