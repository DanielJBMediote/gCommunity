import React from 'react'

import './index.css'

interface NavbarProps {

}

const Navbar: React.FC<NavbarProps> = (props) => {

  function handdleLogout() {
    sessionStorage.removeItem('token');
  }

  return (
    <nav>
      <ul>
        <li><a href="/">Inicio</a></li>

        {
          (sessionStorage.getItem('token') ?
            <><li><a href="/meus-posts">Meus Posts</a></li>
              <li><a href="/" onClick={handdleLogout}>Logout</a></li></>
            :
            <>
              <li><a href="/cadastrar">Cadastrar</a></li>
              <li><a href="/login">Entrar</a></li>
            </>)
        }
      </ul>
    </nav>
  )
}

export default Navbar