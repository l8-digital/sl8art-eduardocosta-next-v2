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

      <div className='flex flex-col md:flex-row h-full justify-center md:justify-between items-center w-full'>
        <div className="w-[100%] flex">
          <Image
            src={'/images/image-biography.avif'}
            alt=''
            fill
            className='object-cover h-full w-full !relative'
          />
        </div>
        <div className='container'>
          <div className=' w-full md:w-[80%] h-full flex items-start flex-col justify-start'>
            <h2 className="o-title !font-black">
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
         
        </div>

      </div>
    </section >
  )
}
