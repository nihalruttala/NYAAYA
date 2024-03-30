import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';


const LoginNavbar = () => {
  return (
    <>
    <section className='usernavbar'>
        <div className="usernavcontainer">
          <div>
            <div>
            </div>

            <div>
              <h3>NYAAYA</h3>
              <h6>CASE MANAGEMENT</h6>
            </div>
          </div>
          <ul>
            <li><Link smooth to='/#home'>Home</Link></li>
            <li><Link smooth to='/#faq'>FAQ's</Link></li>
            <li><Link smooth to='/#contacts'>Contact</Link></li>
          </ul>
        </div>
        </section>
    </>
  )
}

export default LoginNavbar