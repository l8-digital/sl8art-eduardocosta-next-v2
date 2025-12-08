// components/calendarection.jsx
'use client';
import style from './style.module.scss';
import React from 'react';
import { Button } from '@/components/Button/Button';
import { formatDate } from '@/utils/format';
import { CardEvent } from '@/components/CardEvent/CardEvent';
import Icon from '@/components/Icon/Icon';
import { EventDetails } from '@/types/event';

interface Props {
    data: EventDetails;
    linkFanclub: string;
    title: string;
}

export default function EventDetail({ data, linkFanclub, title }: Props) {

    const schedule = data ? data.detail : null;
    const calendar = data ? data.data : [];

    return (
       <section className="pt-12 md:pt-32 bg-white">

            {schedule &&
                <div className="container pb-12 md:pb-8">
                    <h1 className="o-title text-center italic !font-black">
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


            <section className="bg-secondary py-12 md:py-8">
                <div className="container flex items-end justify-between mb-6 md:mb-8 gap-4">
                    <h2 className="font-secondary text-primary text-4xl md:text-5xl w-full tracking-[.05em]">
                        Proximos shows
                    </h2>
                    <Button type="a" href="/agenda" color="primary" className="hidden md:flex w-max">
                        ver mais
                    </Button>
                </div>
                <aside className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-fr gap-6">
                        {calendar.map((item, idx) => (
                            <CardEvent key={idx} item={item} index={idx} type="square" />
                        ))}
                    </div>
                    <Button type="a" href="/agendas" color="primary" className="md:hidden mt-8">
                        ver mais
                    </Button>
                </aside>
            </section>

        </section>
    );
}
