import React from 'react'
import Logo from './Logo'

const Header = () => {
  return (
    <header className='h-16 shadow-md'>
      <div className='container mx-auto'>
        <div className=''>
          <Logo w={90} h={50}/>
        </div>
      </div>
    </header>
  )
}

export default Header