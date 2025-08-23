import { useState } from 'react'
import './App.css'
import CardComponent from './components/CharacterCard'
import Charachters from './pages/characters/Characters'
import { Routes, Route } from 'react-router-dom'
import Episode from './pages/Episode'
import Location from './pages/Location'
import NavBar from './components/NavBar'
import SingleCharacter from './pages/characters/SingleCharacter'

function App() {

return (
  <div> <NavBar />
  <main className='main-content'>
    <Routes>
      <Route path="/" element={<Charachters />}/>
      <Route path="/:id" element={<SingleCharacter />}/>
      <Route path="/Episode" element = {<Episode />}/>
      <Route path="/Location" element = {<Location />}/>
      
    </Routes>
  </main>
  </div>
);
}

export default App
