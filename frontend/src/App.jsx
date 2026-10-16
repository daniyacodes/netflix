import React from 'react'
import Header from './Components/Header/Header'
import Banner from './Components/Banner/Banner'
import DisplayRow from './Components/DisplayRow/DisplayRow'
import Footer from './Components/Footer/Footer'
import { PlayerProvider } from './Context/PlayerContext'

function App() {
  return (
    // everything inside can call usePlayer() to open the trailer
    <PlayerProvider>
      <Header/>
      <Banner/>
      <DisplayRow/>
      <Footer/>
    </PlayerProvider>
  )
}

export default App
