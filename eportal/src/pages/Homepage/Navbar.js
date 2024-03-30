import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

import './Navbar.css';
const Navbar = () => {
  return (
    <>
    <section className='navbar'>
        <ul>
            <li><Link id='tag' smooth to='#home'>Home</Link></li>
            <li><Link id='tag' smooth to='#about'>About</Link></li>
            <li><Link id='tag' smooth to='#faq'>FAQ's</Link></li>
            <li><Link id='tag' smooth to='#contacts'>Contact</Link></li>

        </ul>
    </section>
    
    </>
  )
}

export default Navbar