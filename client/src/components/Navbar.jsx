import { ArrowRight } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
  return (
    <div className='fixed z-5 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32'>
      <div onClick={()=> {navigate('/'); window.scrollTo(0, 0)}} className='cursor-pointer'>
        <p className='text-2xl font-semibold text-primary'>go.AI</p>
      </div>
   
        <button className='flex items-center gap-2 bg-primary text-white px-10 py-2.5 rounded-full text-sm cursor-pointer hover:bg-primary/80 transition-all duration-300 ease-in-out'>
            Get started
            <ArrowRight className='w-4 h-4 ' />
        </button>

   
    </div>
  )
}

export default Navbar
