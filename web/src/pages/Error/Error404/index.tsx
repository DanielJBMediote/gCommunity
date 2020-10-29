import React from 'react'

import './index.css'

export default class Error404 extends React.Component{
  render() {
    return (
      <>
        <div className="err-modal">
          <h1>404</h1>
          <h3>Oops! A pagina não foi encontrada</h3>
          <a href="/">Voltar para o ínicio</a>
        </div>
      </>
    );
    }
}