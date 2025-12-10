'use client'
import { useConfigApp } from '@/app/providers/app';
import style from './style.module.scss';
import Icon from '@/components/Icon/Icon';
import Image from 'next/image';
import SocialMenu from '@/components/SocialMenu/SocialMenu';

export default function HeroSection() {
  const { title, logo } = useConfigApp() ?? {};

  return (

    <section id="hero" className={style['hero']}>

      <div className="container h-full flex flex-col items-center justify-end">
        <h1 className="text-[0]">
          {title}

      
        </h1>

        <aside className={style['hero__scroll']}>
          <div className={style['effect-up']}>

            <Icon name="icon-up" className="h-[0.7rem] stroke-white mt-[0.25rem]" />

          </div>
          <div className="font-tertiary text-sm md:text-base text-white tracking-[0.1rem] font-normal">
            Deslize para navegar
          </div>
          <div className={style['effect-up']}>

            <Icon name="icon-up" className="h-[0.7rem] stroke-white mt-[0.3rem]" />

          </div>
        </aside>
      </div>
      <div className={style['nav-social']}>
        <SocialMenu />
      </div>
    </section>
  )
}
