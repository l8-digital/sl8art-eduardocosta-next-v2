'use client'
import { Button } from '@/components/Button/Button';
import style from './style.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import { EventType } from '@/types/event';
import Icon from '@/components/Icon/Icon';
import { CardEvent } from '@/components/CardEvent/CardEvent';
import Image from 'next/image';

interface Props {
    data: EventType[];
}

export default function EventsSection({ data }: Props) {

    const calendar = data;

    return (

        <section id="calendar" className={style['calendar']} style={{
            backgroundSize: 'contain',
            backgroundPosition: 'center',
        }}>
            <div className='w-full h-full md:hidden flex justify-start'>
                <Image
                    src={'/images/image-schendule.avif'}
                    alt=''
                    fill
                    className='object-contain w-full object-left-top !relative'
                    sizes="100%"
                />
            </div>
            <div className='container relative z-[1] pt-7 md:pt-10'>
                <div className='flex flex-col md:flex-col w-full justify-center h-full items-center md:items-end relative md:px-12'>
                    <div className=" flex h-full w-full md:w-[30rem] items-center justify-center gap-7 pb-7 md:flex-col ">

                        <div className='w-full h-full flex justify-center text-center items-center'>

                            <h2 className="o-title text-white italic !font-black">
                                Agenda
                            </h2>
                        </div>


                    </div>

                    <div className='relative'>
                        <Swiper
                            spaceBetween={10}
                            className='h-[18rem] w-[20rem] md:w-[30rem] md:h-full'
                            direction={'horizontal'}
                            loop={false}
                            keyboard={{ enabled: true }}
                            pagination={{
                                clickable: true,
                                // el: '.swiper-pagination'
                            }}
                            preventClicks={false}
                            grabCursor={true}
                            centeredSlides={false}
                            slidesPerView={1}
                            modules={[Navigation, Pagination, Keyboard]}
                            speed={400}
                            navigation={{
                                nextEl: '.next-button',
                                prevEl: '.prev-button',
                            }}
                            breakpoints={{
                                640: { slidesPerView: 1 },
                                768: { slidesPerView: 1 },
                                1024: { slidesPerView: 2 },
                                1366: { slidesPerView: 2 },
                                1600: { slidesPerView: 2 },
                            }}
                        >
                            {calendar.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <CardEvent item={item} index={index} />
                                </SwiperSlide>
                            ))}


                            {/* <div className={`${style['swiper-pagination-custom']}`}></div> */}
                            {/* <div className="swiper-pagination-custom"></div> */}
                        </Swiper>


                    </div>

                </div>

                <div className={`${style['swipper-navigation']}`}>
                    <button type="button" className={`${style['swiper-nav-button']} prev-button `}>
                        <Icon name='icon-arrow' className='h-12 w-12 stroke-white rotate-90' />
                    </button>
                    <button type="button" className={`${style['swiper-nav-button']} next-button`}>
                        <Icon name='icon-arrow' className='h-12 w-12 stroke-white -rotate-90' />
                    </button>
                </div>


                <div className="mt-6 c-swiper-nav text-white z-[30] md:hidden">
                    <div className=' pt-3'>
                        <Icon name="icon-indicator" className="c-swiper-nav__indicator fill-white " />
                    </div>
                    Deslize para navegar
                </div>

                <div className='w-full justify-end flex'>
                    <div className='w-full md:w-[36rem] flex justify-center md:justify-center pt-6'>
                        <Button type="a" href="/agenda" color="outline-light"
                            className="w-max !px-6 py-2 text-sm backdrop-blur-lg italic border-[0.5px] border-white-light rounded-full uppercase transition-all duration-500 ease-in-out font-tertiary">
                            ver todas
                        </Button>
                    </div>
                </div>
            </div>
        </section >
    )
}
