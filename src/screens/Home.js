import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className='h-screen' style={{background: "grey"}}>
        <div>
            <Navbar />
        </div>
        <div>
            <Footer />
        </div>
    </div>

  )
}
