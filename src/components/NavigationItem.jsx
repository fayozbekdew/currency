import React from 'react'
import { Link } from 'react-router-dom'

function NavigationItem({nav}) {
   
  return (
        <Link to={nav.link} className='flex items-center gap-x-2'>
        <img src={nav.img} alt={`${nav.title} image`} width={30} height={30} />
            {nav.title}</Link>
  )
}

export default NavigationItem