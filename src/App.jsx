import { useState } from 'react'
import './App.css'
import Charachters from './pages/characters/Characters'
import { Routes, Route } from 'react-router-dom'
import SingleEpisode from './pages/SingleEpisode'
import SingleLocation from './pages/SingleLocation'
import NavBar from './components/NavBar'
import SingleCharacter from './pages/characters/SingleCharacter'

function App() {

return (
  <div> <NavBar />
  <main className='main-content'>
    <Routes>
      <Route path="/" element={<Charachters />} />
      <Route path="/character/:id" element={<SingleCharacter />} />
      <Route path="/episode/:id" element={<SingleEpisode />} />
      <Route path="/location/:id" element={<SingleLocation />} />
    </Routes>

  </main>
  </div>
);
}

export default App
