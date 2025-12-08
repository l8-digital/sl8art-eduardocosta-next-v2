// components/NewsSection.jsx
'use client';
import style from './style.module.scss';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import { Button } from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';
import { NewsType } from '@/types/news';

interface Props {

  data: NewsType[];
}

export default function ContactSection({ data }: Props) {


  return (
    <section id="news" className={style['news']}>

      <div className="container">

        <div className="flex flex-col md:flex-row items-center justify-between">

          <div className="w-full md:w-[17.5rem] flex md:flex-col justify-between items-center gap-6 mb-8 md:mb-0">
            <h2 className="o-title text-white">Notícias</h2>
            <Button type='a' href="/noticias" color="outline-light" className='md:w-max'>Ver mais</Button>
          </div>

          <div className="w-full md:w-[calc(100%-17.5rem)] md:flex items-center gap-8 ">
            <Swiper
              spaceBetween={10}
              loop={true}
              keyboard={{ enabled: true }}
              grabCursor={false}
              preventClicks={false}
              centeredSlides={false}
              slidesPerView={1}
              modules={[Navigation, Pagination, Keyboard]}
              navigation={{
                nextEl: '.c-next-button',
                prevEl: '.c-prev-button',
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 15,
                },
                768: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 1,
                  spaceBetween: 40,
                },
              }}
            >
              {data.map((item, index) => (
                <SwiperSlide key={index} className="md:pl-32 w-full">
                  <Link href={`/noticia/${item.url}`} className={style['card-news']}>
                    <h3 className={style['card-news__title']}>
                      {item.title}
                    </h3>

                    {item.image_cdn &&
                      <Image width={283}
                        height={189} unoptimized
                        src={item.image_cdn}
                        alt={item.title} className={`${style['card-news__image']} min-h-[16rem]`}
                      />
                    }
                    
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className={style['swipper-navigation']}>
              <button type="button" className={`${style['swiper-nav-button']} c-prev-button`}>
                ANTERIOR
              </button>
              <button type="button" className={`${style['swiper-nav-button']} c-next-button`}>
                PRÓXIMO
              </button>
            </div>

          </div>

          <div className="c-swiper-nav text-white/40 mt-8">
            <Icon name="icon-indicator" className="c-swiper-nav__indicator fill-white/30" />
            Deslize para navegar
          </div>
        </div>
      </div>
    </section>
  );
}
