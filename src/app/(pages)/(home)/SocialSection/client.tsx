'use client'
import Icon from '@/components/Icon/Icon';
import style from './style.module.scss';
import Image from 'next/image';
import Link from 'next/link';

export default function SocialSection() {


  return (

    <section id="social" className={style['social']}>
      <div className="container relative z-[1]">
        <div className={style['social__content']}>
          <div className='h-full w-full flex-wrap flex flex-col px-10 md:px-20 justify-center gap-6 md:gap-12 md:items-start items-center text-center md:text-start z-[1]'>
            <div className='w-full text-balance '>
              <h2 className='o-title !text-[2.5rem] md:!text-[6rem]'>BASTIDORES, <br className='hidden md:block' /> INSPIRAÇÕES <br className='hidden md:block' /> E NOVIDADES:</h2>
            </div>
            <Link target='_blank' href={'' ?? "/"} className='text-primary underline font-medium font-tertiary text-lg w-full md:w-max md:text-2xl flex w-full transition-all duration-75 ease-in-out hover:text-primary/80 justify-start flex-col'>
              <p className='md:hidden text-balance'>Saiba tudo no instagram do Eduardo!</p>
              <p className='hidden md:block'>Saiba tudo</p>
              <p className='hidden md:block'>no instagram</p>
              <p className='hidden md:block'>do Eduardo!</p>
            </Link>
            <Link target='_blank' href={'' ?? "/"} className=' flex w-max items-center gap-1'>
              <Icon name='icon-instagram' className='h-6 w-6 fill-white' />
              <p className='text-white text-lg'>eduardocosta</p>
              <Image
                src={'/images/verificado.avif'}
                alt='Imagem Verificado'
                width={16}
                height={16}
              />
            </Link>
          </div>
          <div className='w-full h-full z-[1] flex relative'>
            <Image
              src={'/images/album-social-bg.avif'}
              alt='Album do instagram'
              fill
              className='object-cover rounded-b-[2rem] md:rounded-r-[2rem]'
            />
          </div>
        </div>
      </div>
      <div className='w-full h-[20rem] md:h-[42rem] absolute bottom-0 right-0 z-[1]  pointer-events-none'>
        <Image
          src={'/images/eduardo-social1.webp'}
          alt='imagem do Eduardo Costa'
          fill
          className='object-contain md:object-right-bottom absolute'
        />
      </div>
    </section>
  )
}
