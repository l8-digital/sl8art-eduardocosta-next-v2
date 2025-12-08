'use client'
import { useConfigApp } from '@/app/providers/app';
import style from './style.module.scss';
import Icon from '@/components/Icon/Icon';
import Image from 'next/image';

export default function HeroSection() {
  const { title, logo } = useConfigApp() ?? {};
  
  return (

    <section id="hero" className={style['hero']}>

      <div className="container h-full flex flex-col items-center justify-end">
        <h1 className="text-[0]">
          {title}

          {logo &&
            <Image
              src={logo}
              className={style['hero__logo']}
              width={416}
              height={128}
              alt={`Logo`}
              priority
              unoptimized
            />
          }
        </h1>

        <aside className={style['hero__scroll']}>
          <div className="font-tertiary text-sm md:text-base text-white tracking-[.1rem] font-normal  mb-2">
            Deslize para navegar
          </div>
          <div className={style['effect-up']}>

            <Icon name="icon-up" className="h-4 stroke-white"  />

          </div>
        </aside>
      </div>
    </section>
  )
}
