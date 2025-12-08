'use client'
import style from './style.module.scss';;
import { Button } from '@/components/Button/Button';
import { useState } from 'react';
import { BiographyType } from '@/types/biography';
import Image from 'next/image';

interface Props {
  data: BiographyType;
}

export default function BiographySection({ data }: Props) {


  const [activeHeight, setActiveHeight] = useState(false);

  const descricaoActive = () => {
    const newState = !activeHeight;
    setActiveHeight(newState);

    if (!newState) {
      // quando voltar para false, rola até o elemento
      const el = document.getElementById("biography");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (

    <section id="biography" className={style['biography']}>
      {/* <div className=''>
            <Image
                src={`${bgImage}`}
                alt=''
                fill
                className='object-cover h-full w-full !absolute inset-0 left-0'

            />
        </div> */}
      <div className={style['image-biography']}>
        <Image
          src={'/images/bg-biography-mobile.avif'}
          alt=''
          fill
          className='object-cover h-full w-full !relative'
          sizes="100%"
        />
      </div>
      <div className="relative pt-3 md:pt-0 h-full ">
        <div className='flex flex-row h-full justify-center md:justify-between items-center w-full'>
          <div className="w-[100%] md:flex hidden">
            <Image
              src={'/images/imagem-marcos.avif'}
              alt=''
              fill
              className='object-cover h-full w-full !relative'
            />
          </div>
          <div className='container w-full md:w-[45%] h-full flex items-start md:items-center flex-col justify-center'>
            <h2 className="o-title italic text-left md:text-center !font-black text-white">
              {data?.title}
            </h2>

            <div className={style['card']} >

              <div className="w-full flex-1" >
                <div className={`${style['card__description']} ${activeHeight ? style['active'] : ''}`} dangerouslySetInnerHTML={{ __html: data?.description ?? '' }} />


                <Button type="button" className="w-full mt-6 uppercase flex lg:hidden rounded-full"
                  color="outline-primary" onClick={() => descricaoActive()}>VER{activeHeight ? ' MENOS' : ' MAIS'}
                </Button>
              </div>
            </div>
          </div>
          <div className="w-[100%] md:flex hidden">
            <Image
              src={'/images/imagem-belutti.avif'}
              alt=''
              fill
              className='object-cover h-full w-full !relative'
            />

          </div>
        </div>


      </div >
    </section >
  )
}
