// components/calendarection.jsx
'use client';
import style from './style.module.scss';
import React from 'react';
import { Button } from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import { formatDate } from '@/utils/format';
import { NewsType } from '@/types/news';
import Image from 'next/image';


interface Props {
    data: NewsType[];
    emphasis: NewsType[]
}

export default function EventsSection({ data, emphasis }: Props) {

    return (

        <section className={style['news']}>
            <h1 className="text-[0px]">Notícias</h1>

            <div className={style['news__header']}>

                <div className="md:container max-w-[900px] relative">
                    <div className="md:px-16">

                        <Swiper
                            spaceBetween={10}
                            loop={false}
                            keyboard={{ enabled: true }}
                            preventClicks={false}
                            preventClicksPropagation={false}
                            grabCursor={true}
                            centeredSlides={false}
                            slidesPerView={1}
                            modules={[Navigation, Pagination, Keyboard]}
                            speed={400} pagination={true}
                            navigation={{ nextEl: '.next-button', prevEl: '.prev-button' }} >

                            {emphasis.map((item, index) => (

                                <SwiperSlide key={index} className='pb-4 md:pb-12'>
                                    <Link href={'/noticia/' + item.url} className={style['slide']}>
                                        <figure className={style['slide__figure']}>
                                            <Image src={item.image_cdn} alt={item.title} width={500} height={300} className="w-full h-full object-cover" />
                                        </figure>

                                        <div className={style['slide__info']}>
                                            <h3 className={style['title']}>
                                                {item.title}
                                            </h3>

                                            <Button type="button" color="primary"
                                                className="w-max my-4 md:mb-0 md:mt-6">
                                                Saiba mais
                                            </Button>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            ))}

                        </Swiper>
                    </div>
                    <div className={style['swipper-navigation']}>
                        <button type="button" className={`${style['swiper-nav-button']} prev-button`}>
                            <Icon name="icon-arrow" className='h-full w-full stroke-gray/70 rotate-90' />
                        </button>
                        <button type="button" className={`${style['swiper-nav-button']} next-button`}>
                            <Icon name="icon-arrow" className='h-full w-full stroke-gray/70 -rotate-90' />
                        </button>
                    </div>

                </div>
            </div>

            <div className={style['news__body']}>
                <div className="container max-w-[1080px]">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-4">
                        {data.map((item, index) => (
                            
                            <Link href={'/noticia/' + item.url} className={style['card']} key={index}>

                                <figure className={style['card__figure']}>
                                    <Image src={item.image_cdn} alt={item.title} width={400} height={200} className="w-full h-full object-cover" />
                                </figure>

                                <div className={style['card__info']}>
                                    <p className={style['date']}>
                                        {formatDate(item.date, { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                    <p className={style['title']}>
                                        {item.title}
                                    </p>

                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

        </section >
    );
}