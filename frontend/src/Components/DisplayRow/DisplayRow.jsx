import React, { useEffect, useState } from 'react'
import SlideShow from '../SlideShow/SlideShow'
import styles from "./DisplayRow.module.css"
//import { movies } from '../../Data/Data'
import movieInstance from '../../Utility/MovieInstance'
import requests from '../../Utility/requesturls'

function DisplayRow() {
  let [movies, setMovies]= useState({
    trending:[],
    netflixOriginals:[],
    topRated:[],
    action:[],
    comedy:[],
    horror:[],
    romance:[],
    documentaries:[]
  })

  useEffect( ()=>{
    fetchMovies()
  }, [])

  let fetchMovies = async () => {
    try {
      let [trendingRes, netflixRes,topratedRes, actionRes, comedyRes, horrorRes, romanceRes, docRes ] = await Promise.all([
        movieInstance.get(requests.fetchTrending),
        movieInstance.get(requests.fetchNetflixOriginals),
        movieInstance.get(requests.fetchTopRatedMovies),
        movieInstance.get(requests.fetchActionMovies),
        movieInstance.get(requests.fetchComedyMovies),
        movieInstance.get(requests.fetchHorrorMovies),
        movieInstance.get(requests.fetchRomanceMovies),
        movieInstance.get(requests.fetchDocumentaries)
      ])
      setMovies({
        trending: trendingRes.data.results,
        netflixOriginals:netflixRes.data.results,
        topRated: topratedRes.data.results,
        action:actionRes.data.results,
        comedy:comedyRes.data.results,
        horror: horrorRes.data.results,
        romance: romanceRes.data.results,
        documentaries: docRes.data.results
      })
      //console.log(movies)
    } catch (error) {
      console.log(error)
    }
  }
  //  console.log("DisplayRow is rendering");
  // console.log(movies)
  return (
    <div className={styles.mainWrapper}>
      <SlideShow title={"Trending"} movies={movies.trending}/>
        
        <SlideShow title={"Popular on Netflix"} movies={movies.netflixOriginals}/>
        <SlideShow title={"Action"} movies={movies.action}/>
        
    </div>
  )
}

export default DisplayRow