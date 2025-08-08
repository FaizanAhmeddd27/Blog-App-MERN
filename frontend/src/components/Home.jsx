import React from 'react'
import Hero from '../home/Hero'
import Trending from '../home/Trending'
import Devotional from '../home/Devotional'
import Creator from '../home/Creator'

const Home = () => {
  return (
    <div className='bg-slate-200'>
      <Hero />
      <Trending />
      <Devotional />
      <Creator />
      
    </div>
  )
}

export default Home