'use client'
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
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

interface Props {
    data: EventType[];
}

export default function EventsSection({ data }: Props) {

    const calendar = data;

    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);
    const [directionWidth, setDirectionWidth] = useState<'vertical' | 'horizontal'>('vertical');

    useEffect(() => {
        const handleSize = () => {
            if (window.innerWidth >= 768)
                setDirectionWidth('vertical')
            else
                setDirectionWidth('horizontal')
        }

        handleSize();
        window.addEventListener('resize', handleSize);
        return () => window.removeEventListener('resize', handleSize);
    }, []);


    return (


        calendar &&

        <section id="calendar" className={style['calendar']} style={{
            backgroundSize: 'contain',
            backgroundPosition: 'center',
        }}>
            <div className={style['calendar__mobile']}>
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

                        <div className='w-full h-full flex justify-end max-md:mt-6  md:mb-10 text-center items-end md:items-center'>

                            <h2 className="o-title text-white !font-light">
                                Agenda
                            </h2>

                            <div className='w-full justify-end flex md:hidden'>
                                <div className='w-full flex justify-end'>
                                    <Link href="/agenda"
                                        className="w-max  text-lg text-primary underline transition-all duration-500 ease-in-out font-tertiary">
                                        Ver todos
                                    </Link>
                                </div>
                            </div>
                        </div>


                    </div>

                    <div className='relative'>
                        <Swiper
                            spaceBetween={0}
                            className='h-[18rem] w-[20rem] md:min-w-[35rem] md:h-[27rem]'
                            direction={directionWidth}
                            loop={false}
                            keyboard={{ enabled: true }}
                            pagination={{
                                clickable: true,
                                // el: '.swiper-pagination'
                            }}
                            preventClicks={false}
                            grabCursor={true}
                            centeredSlides={false}
                            onBeforeInit={(swiper) => {
                                if (swiper.params.navigation) {
                                    // @ts-expect-error - Swiper types expect this to be readonly.
                                    swiper.params.navigation.prevEl = navigationPrevRef.current;
                                    // @ts-expect-error - Swiper types expect this to be readonly.
                                    swiper.params.navigation.nextEl = navigationNextRef.current;
                                }
                            }}
                            slidesPerView={1}
                            modules={[Navigation, Pagination, Keyboard]}
                            speed={400}
                            navigation={{
                                nextEl: '.next-button',
                                prevEl: '.prev-button',
                            }}
                            breakpoints={{
                                640: { slidesPerView: 1 },
                                768: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 },
                                1366: { slidesPerView: 3 },
                                1600: { slidesPerView: 3 },
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


                <div className="mt-6 c-swiper-nav text-white z-[30] md:hidden">
                    <div className=' pt-3'>
                        <Icon name="icon-indicator" className="c-swiper-nav__indicator fill-white " />
                    </div>
                    Deslize para navegar
                </div>

                <div className='w-full justify-end hidden md:flex'>
                    <div className='w-full md:w-[36rem] flex justify-end md:justify-end pt-3 pr-16'>
                        <Link href="/agenda"
                            className="w-max  text-lg text-primary underline transition-all duration-500 ease-in-out font-tertiary">
                            Ver todos
                        </Link>
                    </div>
                </div>
            </div>
        </section >

    )
}
