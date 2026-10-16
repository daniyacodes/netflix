import React, { useEffect, useState } from 'react'
import netflixBannerLogo from "../../assets/image/logo.png"
import {Play, Info} from "lucide-react"
import styles from "./Banner.module.css"
import movieInstance from '../../Utility/MovieInstance'
import requests from '../../Utility/requesturls'
import { usePlayer } from '../../Context/PlayerContext'
let IMAGE_BASE = "https://image.tmdb.org/t/p/w500"

function Banner() {
  let [bannerImg, setBannerImg]= useState({})
  const { openTrailer } = usePlayer()

  
  useEffect(() => {
  async function fetchBanner() {
    try {
      const request = await movieInstance.get(requests.fetchTrending)

      const movies = request.data.results
      const randomMovie = movies[Math.floor(Math.random() * movies.length)]

      setBannerImg(randomMovie)
    } catch (error) {
      console.log(error)
    }
  }

  fetchBanner()
}, [])

useEffect(() => {
  console.log(bannerImg)
}, [bannerImg])

//console.log(bannerImg)


function truncate(str, num){
  return str?.length ? str.substr(0, num-1)+ " ...":str
}
  return (
    <div className={styles.banner}
    style={{
  backgroundImage:`url("${IMAGE_BASE}${bannerImg.backdrop_path}")`
}}
    >


        <div className={styles.content}>
            {/* netflix-icon */}
            <img src={netflixBannerLogo} alt="netflix logo" className={styles.logoImg} />

            {/* title */}
            <h1 className={styles.title}>{bannerImg.original_name || bannerImg.original_title
}</h1>

            {/* description */}
            <h1 className={styles.description}>{
              truncate(bannerImg?.overview, 120)
              }</h1>

            {/* buttons */}
            <div className={styles.buttonContainer}>
              <button
                className={styles.button}
                onClick={() => bannerImg.id && openTrailer(bannerImg)}
              >
                <Play size={30}/>
                play
              </button>

              <button  className={styles.button}>
                <Info size={30}/>
                My List
              </button>
            </div>
        </div>
        {/* fadding effect */}
        <div className={styles.fadeButton}></div>
    </div>
  )
}

export default Banner