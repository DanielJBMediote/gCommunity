import React from 'react'
// import api from '../../services/api';

import './index.css'

interface NavbarProps {

}

const Navbar: React.FC<NavbarProps> = (props) => {

  function handdleLogout() {
    localStorage.removeItem('@app/token');
    localStorage.removeItem('@app/username');
  }

  return (
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        {
          (localStorage.getItem('@app/token') ?
            <>
              <li><a href="/meus-posts">My Publishies</a></li>
              <li><a href="/perfil">My Profile</a></li>
              <li><a href="/" onClick={handdleLogout}>Logout</a></li>
            </>
            :
            <>
              <li><a href="/cadastrar">Sign Up</a></li>
              <li><a href="/login">Sign In</a></li>
            </>)
        }
      </ul>
    </nav>
  )
}

export default Navbar