import React, { Link } from 'react-router-dom'

function BtnCadastrar() {
  return (
    <button className='fixed bottom-5 right-5 rounded-full bg-green p-4 text-xl font-medium md:text-2xl'>
      <Link to={'/anunciar'}>+ Novo produto</Link>
    </button>
  )
}

export default BtnCadastrar
