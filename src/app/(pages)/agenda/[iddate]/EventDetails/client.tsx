// components/calendarection.jsx
'use client';
import style from './style.module.scss';
import React from 'react';
import { Button } from '@/components/Button/Button';
import { formatDate } from '@/utils/format';
import { CardEvent } from '@/components/CardEvent/CardEvent';
import Icon from '@/components/Icon/Icon';
import { EventDetails } from '@/types/event';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';

interface Props {
    data: EventDetails;
    linkFanclub: string;
    title: string;
}

const isMobile = window.innerWidth < 768;

export default function EventDetail({ data, linkFanclub, title }: Props) {

    const schedule = data ? data.detail : null;
    const calendar = data ? data.data : [];

    return (
        <section className="pt-12 md:pt-32 bg-[#FCF3DD]">

            {schedule &&
                <div className="container pb-12 md:pb-8">
                    <h1 className="o-title text-center !text-black !font-black">
                        <span className="hidden text-[0]">
                            {schedule.city_name} - {schedule.state_uf} |
                        </span>
                        {formatDate(schedule.date, { day: 'numeric', month: 'long' })}
                    </h1>

                    <h2 className="text-lg md:text-lg text-secondary font-semibold uppercase tracking-widest md:tracking-[.25rem] text-center mb-8 md:mb-4">
                        detalhes do show
                    </h2>

                    <div className="flex flex-col md:flex-row mb-8">
                        <div className="w-full md:w-6/12 px-4 md:border-r-2 border-primary mb-4 md:mb-0">
                            <ul className={`${style['c-list']} ${style['c-list--right']}`}>
                                <li className={style['c-list__item']}>
                                    País <br />
                                    <span>{schedule.country_name}</span>
                                </li>
                                <li className={style['c-list__item']}>
                                    Estado <br />
                                    <span>{schedule.state_name}</span>
                                </li>
                                {schedule.local && (
                                    <li className={style['c-list__item']}>
                                        Local <br />
                                        <span>{schedule.local}</span>
                                    </li>
                                )}
                            </ul>
                        </div>

                        <div className="w-full md:w-6/12 px-4">
                            <ul className={`${style['c-list']} ${style['c-list--right@md']}`}>
                                <li className={style['c-list__item']}>
                                    Cidade <br />
                                    <span>{schedule.city_name}</span>
                                </li>
                                <li className={style['c-list__item']}>
                                    Evento <br />
                                    <span>{schedule.name}</span>
                                </li>
                                {schedule.show_time_site && (
                                    <li className={style['c-list__item']}>
                                        horário <br />
                                        <span>{schedule.time}</span>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center mb-8 gap-4 w-max mx-auto">
                        {schedule.link_sale && (
                            <Button
                                href={schedule.link_sale}
                                type="a"
                                color="primary"
                                className="rounded-full w-[17rem]"
                            >
                                Comprar Ingresso
                            </Button>
                        )}
                        {schedule.prize_draw && linkFanclub && (
                            <Button
                                type="a"
                                href={"https://" + linkFanclub}
                                color="secondary"
                                className="rounded-full w-[17rem]"
                            >
                                Participar do Camarim
                            </Button>
                        )}
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center md:mb-8">
                        <h3 className="text-gray-light font-semibold uppercase text-center text-lg mb-2 md:mb-0 md:mr-4">
                            compartilhar o show
                        </h3>
                        <ul className="flex gap-3 justify-center items-center">
                            <li>
                                <a
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${schedule.url ?? encodeURIComponent(schedule.url ? schedule.url : 0)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:opacity-60"
                                >
                                    <Icon name="icon-facebook-round" className="w-9 h-9 fill-secondary" />
                                </a>
                            </li>

                            <li>
                                <a
                                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                                        `${schedule.city_name} - ${schedule.state_uf} contará com a presença de ${title} dia ${formatDate(
                                            schedule.date,
                                            { day: 'numeric', month: 'long' }
                                        )}! ${schedule.url}`
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:opacity-60"
                                >
                                    <Icon name="icon-x-round" className="w-9 h-9 fill-secondary" />
                                </a>
                            </li>

                            <li>
                                <a
                                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                                        `${schedule.city_name} - ${schedule.state_uf} contará com a presença de ${title} dia ${formatDate(
                                            schedule.date,
                                            { day: 'numeric', month: 'long' }
                                        )}! ${schedule.url}`
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:opacity-60"
                                >
                                    <Icon name="icon-whatsapp-round" className="w-9 h-9 fill-secondary" />
                                </a>
                            </li>
                        </ul>

                    </div>

                </div>
            }


            <section
                className="py-12 md:py-8 bg-[#2b1b0a]"
                style={{
                    background: `linear-gradient(
      to bottom,
      rgb(91, 65, 26) 0%,
      rgb(64, 44, 10) 10%,
      rgb(24, 17, 9) 70%,
      rgb(38, 25, 9) 97%
    )`
                }}>
                <div className="container flex items-end justify-between mb-6 md:mb-8 gap-4">
                <h2 className="font-secondary text-primary text-4xl md:text-5xl w-full tracking-[.05em]">
                    Próximos shows
                </h2>
                <Button type="a" href="/agenda" color="primary" className="hidden md:flex w-max rounded-full font-normal  !text-sm !py-[0.3rem] !px-4 " >
                    ver mais
                </Button>
            </div>

            <aside className="container">
                <Swiper
                    spaceBetween={10}
                    className='h-[18rem] w-[20rem] md:w-full md:h-full'
                    direction={'horizontal'}
                    loop={false}
                    keyboard={{ enabled: true }}
                    preventClicks={false}
                    grabCursor={true}
                    centeredSlides={false}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    modules={[Navigation, Pagination, Keyboard]}
                    speed={400}
                    navigation={{
                        nextEl: isMobile ? '.next-button' : '.next-button__calendar',
                        prevEl: isMobile ? '.prev-button' : '.prev-button__calendar'
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
                </Swiper>
                <div className="md:hidden mt-6 c-swiper-nav text-white z-[30]">
                    <div className=' pt-3'>
                        <Icon name="icon-indicator" className="c-swiper-nav__indicator fill-white " />
                    </div>
                    Deslize para navegar
                </div>
                <Button type="a" href="/agenda" color="primary" className="md:hidden mt-8 rounded-full">
                    ver mais
                </Button>

                <div className=" hidden md:flex justify-between bottom-32 relative ">
                    <button
                        type="button"
                        className="prev-button__calendar text-[#5F2A1C] hover:text-[#FDF4DD] bg-[#FDF4DD] border border-[#5F2A1C] hover:border-[#FDF4DD] rounded-full p-2  hover:bg-[#261908] relative right-16 "
                    >
                        <Icon name="icon-button_left" />
                    </button>

                    <button
                        type="button"
                        className="next-button__calendar text-[#5F2A1C] hover:text-[#FDF4DD] bg-[#FDF4DD] border border-[#5F2A1C] hover:border-[#FDF4DD] rounded-full p-2 hover:bg-[#261908] relative left-16 "
                    >
                        <Icon name="icon-button_right" />
                    </button>
                </div>
            </aside>
        </section>

        </section >
    );
}
