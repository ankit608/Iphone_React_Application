import { useState } from 'react'
import Navbar from './components/Navbar'
import Highlights from './components/Highlights'
import Hero from './components/Hero'
import Model from './components/Model'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import Footer from './components/Footer'
function App() {
  const [count, setCount] = useState(0)

  return (
    <main className='bg-black'>
     <Navbar></Navbar>
     <Hero></Hero>
     <Highlights></Highlights>
     <Model></Model>
     <Features></Features>
     <HowItWorks></HowItWorks>
     <Footer></Footer>
    
    </main>
  )
}

export default App
