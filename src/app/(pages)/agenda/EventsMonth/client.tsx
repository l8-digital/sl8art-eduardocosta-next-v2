// components/calendarection.jsx
'use client';
import style from './style.module.scss';
import { Button } from '@/components/Button/Button';
import { EventsByMonth } from '@/types/event';
import { formatDate } from '@/utils/format';

interface Props {
    data: EventsByMonth;
}

export default function EventsSection({ data }: Props) {

    return (
        <section className={style['calendar-page']}>
            <div className="container md:max-w-4xl">

                <h1 className="o-title italic !font-black text-black text-center md:mb-0 mb-5">Agenda</h1>
                <aside className="grid grid-cols-1 gap-10">
                    {Object.entries(data).map(([index, schedule]) => {
                        const [year, month] = index.split('-');
                        const monthName = new Date(Date.UTC(Number(year), Number(month) - 1))
                            .toLocaleString('pt-BR', { month: 'long', timeZone: 'UTC' });
                        return (
                            <div key={index}>
                                <h2 className="uppercase font-secondary text-secondary md:text-black font-bold text-3xl tracking-wider w-full mb-4 text-center md:text-left">
                                    {`${monthName} ${year}`}
                                </h2>
                                <div className="grid grid-cols-1 gap-5">
                                    {schedule.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className={`${style['c-list__item']} ${item.corporate ? 'grayscale' : 'grayscale-0'}`} >
                                            <div className="relative w-12 flex flex-col justify-center items-center">
                                                <p className={style['c-list__day']}>
                                                    {formatDate(item.date, { day: 'numeric' })}
                                                </p>
                                                <p className={style['c-list__month']}>
                                                    {formatDate(item.date, { month: 'long' })}
                                                </p>
                                            </div>
                                            <div className="w-full md:w-auto md:h-full border-b md:border-r-2 border-primary" />
                                            <div className="h-full flex-1 flex flex-col items-center justify-center relative z-[2] gap-3 md:gap-5">
                                                {!item.corporate ? (
                                                    !item.district ? (
                                                        <div className="w-full flex flex-col justify-center">
                                                            <p className={style['c-list__name']}>{item.name}</p>
                                                            <p className={style['c-list__city']}>
                                                                {item.city_name} – {item.state_uf}
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <div className="flex-1 flex justify-end">
                                                            <p
                                                                className="text-sm font-light text-black uppercase"
                                                                title={`${item.district} é distrito de ${item.city_name} ${item.state_uf}`}>
                                                                {item.district} | {item.state_uf}
                                                            </p>
                                                        </div>
                                                    )
                                                ) : (
                                                    <div className="w-full flex-1 flex items-center">
                                                        <p className={style['c-list__corporate']}>{item.name}</p>
                                                    </div>
                                                )}
                                            </div>
                                            {!item.corporate && (
                                                <Button type="a" href={`/agenda/${item.url}`} color="primary" className="w-full md:w-auto">
                                                    Mais detalhes
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </aside>
            </div>
        </section>
    );
}

