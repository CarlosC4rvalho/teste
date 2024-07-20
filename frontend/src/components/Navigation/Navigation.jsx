import React, { useEffect } from 'react'

const MenuItem = ({ href, onClick, children }) => (
  <li>
    <a href={href} onClick={onClick} className='text-4xl font-medium text-white hover:text-green hover:underline'>
      {children}
    </a>
  </li>
)

function Navigation({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleClose = () => {
    onClose()
  }

  const handleLinkClick = () => {
    handleClose()
  }

  const overlayClass = isOpen ? 'opacity-85' : 'opacity-0 pointer-events-none'
  const translateClass = isOpen ? 'translate-x-0' : 'translate-x-full'

  return (
    <div id='nav' className={`transition-all`}>
      <div
        className={`fixed inset-0 z-30 bg-dark ${overlayClass} backdrop-blur-xl backdrop-filter duration-500 ease-in-out`}
        onClick={handleClose}
      />

      <nav
        className={`fixed inset-y-0 right-0 z-40 flex w-full flex-col justify-center gap-8 bg-dark p-8 shadow-lg duration-1000 ease-in-out md:w-1/3 ${translateClass}`}
      >
        <ul className='flex flex-col gap-4'>
          <MenuItem href='#home' onClick={handleLinkClick}>
            Início
          </MenuItem>
          <MenuItem href='#servicos' onClick={handleLinkClick}>
            Motocicletas
          </MenuItem>
          <MenuItem href='#sobre-nos' onClick={handleLinkClick}>
            Acessórios
          </MenuItem>
          <MenuItem href='#clientes' onClick={handleLinkClick}>
            Mecânica
          </MenuItem>
          <MenuItem href='#academia-dorac' onClick={handleLinkClick}>
            Quem Somos
          </MenuItem>
          <MenuItem href='#contato' onClick={handleLinkClick}>
            Contato
          </MenuItem>
        </ul>
      </nav>
    </div>
  )
}

export default Navigation
