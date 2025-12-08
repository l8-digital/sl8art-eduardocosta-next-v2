'use client'
import style from './style.module.scss';;
interface Props {
  linkFanclub: string | null;
}

export default function FanSection({ linkFanclub }: Props) {

  return (

    <section id="fan" className={style['fan']} >
      <div className="md:container flex flex-col justify-center items-center z-[2] relative">
        <div
          className={style['fan__image']}></div>

        <a href={'https://' + linkFanclub} target="_blank" rel="noopener noreferrer" className={style['fan__box']}>

          <p>Faça parte da nossa central de Fãs</p>
          <p className='font-black uppercase italic text-xl md:text-4xl'>Cadastro/Login</p>

        </a>

      </div>
    </section>
  )
}
