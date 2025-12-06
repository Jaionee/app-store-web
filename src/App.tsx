import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AppGrid from './components/AppGrid'
import Footer from './components/Footer'
import './index.css'

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Hero />
        <AppGrid />
      </main>
      <Footer />
    </div>
  )
}

export default App
