'use client'
import { useConfigApp } from '@/app/providers/app';
import style from './style.module.scss';
import Icon from '@/components/Icon/Icon';

const year = new Date().getFullYear();


export function Footer() {
  const { title } = useConfigApp() ?? {};

  return (

    <footer className={style.footer} id="footer">
      <a href="https://l8.digital" target="_blank" className={style['sing']} >
        <div className="container p-3 md:p-5">
          <div className="flex items-center">
            <div className="w-1/2 border-r-[1px]  pr-4 border-white">

              <p className="text-[0.622rem] sm:text-[.6875rem] md:text-xs italic text-white font-medium text-end mb-0">&copy; {year} <span className="font-bold">{title}</span>.<br className="hidden md:block" /> Todos os direitos reservados.
              </p>

            </div>

            <div className="w-1/2 flex items-center pl-4">
              <Icon name="logo-l8" className="w-9 md:w-12 h-10 fill-white" />
              <div>
                <p className="pl-2 md:pl-3 mb-0 italic font-medium text-white text-[.65rem] md:text-xs">
                  Desenvolvido por <br />  L8 Digital</p>
              </div>
            </div>
          </div>
        </div>
      </a>
    </footer >
  )
}
