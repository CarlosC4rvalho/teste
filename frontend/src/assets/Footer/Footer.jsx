import React from 'react'
import whatsapp from 'assets/icons/whatsapp-transparent.svg'
import telephone from 'assets/icons/telephone-icon.svg'
import email from 'assets/icons/email-icon.svg'
import location from 'assets/icons/location-icon.svg'
import facebook from 'assets/icons/facebook-icon.svg'
import instagram from 'assets/icons/instagram-icon.svg'

export default function Footer() {
  return (
    <footer id='contato' className='flex w-full flex-col bg-dark'>
      <section className='flex w-full items-center justify-between bg-dark'>
        <article className='flex-1'>
          <header>Intitucional</header>
          <ul>
            <li className='flex items-center gap-2'>
              <a className='' href='#motos'>
                Nossas Motos
              </a>
            </li>
            <li className='flex items-center gap-2'>
              <a className='' href='#sobre'>
                Sobre nós
              </a>
            </li>
            <li className='flex items-center gap-2'>
              <a className='' href='#mecanica'>
                Serviços
              </a>
            </li>
            <li className='flex items-center gap-2'>
              <a className='' href='#contato'>
                Contato
              </a>
            </li>
          </ul>
        </article>

        <article className=''>
          <header>Contato</header>
          <ul>
            <li className='flex items-center gap-2'>
              <img src={whatsapp} width={28} height={28} alt='whatsapp' />
              <span>
                <a
                  className=''
                  href='https://api.whatsapp.com/send?phone=554399689296'
                  target='_blank'
                  rel='noreferrer'
                >
                  (43) 99968-9296
                </a>
              </span>
            </li>
            <li className='flex items-center gap-2'>
              <img src={telephone} width={28} height={28} alt='telephone' />
              <span>
                <a className='' href='tel:+554399247887' target='_blank' rel='noreferrer'>
                  (43) 99924-7887
                </a>
              </span>
            </li>
            <li className='flex items-center gap-2'>
              <img src={email} width={28} height={28} alt='email' />
              <span>
                <a className='' href='malito:bacanamotosji@hotmail.com' target='_blank' rel='noreferrer'>
                  bacanamotosji@hotmail.com
                </a>
              </span>
            </li>
            <li className='flex items-center gap-2'>
              <img src={location} width={28} height={28} alt='location' />
              <span>
                <a className='' href='https://maps.app.goo.gl/UaGkFi2CHwK2Yza16' target='_blank' rel='noreferrer'>
                  São João do Ivaí, PR
                </a>
              </span>
            </li>
          </ul>
        </article>

        <article className='flex flex-col gap-4'>
          <header>Onde nos Encontrar</header>
          <ul className='flex items-center gap-2'>
            <li className='flex items-center gap-2'>
              <a href='https://www.facebook.com/bacanamotors/' target='_blank' rel='noreferrer'>
                <img src={facebook} alt='facebook' width={40} height={40} />
              </a>
            </li>
            <li className='flex items-center gap-2'>
              <a href='https://www.instagram.com/bacanamotors/' target='_blank' rel='noreferrer'>
                <img src={instagram} alt='instagram' width={40} height={40} />
              </a>
            </li>
            <li className='flex items-center gap-2'>
              <a href='https://api.whatsapp.com/send?phone=554399689296' target='_blank' rel='noreferrer'>
                <img src={whatsapp} alt='whatsapp' width={40} height={40} />
              </a>
            </li>
          </ul>
        </article>
      </section>

      <section className='flex items-center justify-around w-full'>
        <a href='https://dorac.com.br' target='_blank' rel='noreferrer'>
          Desenvolvido por Agência Dorac
        </a>
        <a href='https://bacanamotors.com.br'>Bacana Motors - Copyright &copy; 2024 - Todos os Direitos Reservados.</a>
        <a href='#' target='_blank'>
          Politica de Privacidade
        </a>
      </section>
    </footer>
  )
}
