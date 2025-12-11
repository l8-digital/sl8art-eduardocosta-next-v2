'use client';
import style from './style.module.scss';
import Link from 'next/link';
import { formatDate, formatDay } from '@/utils/format';
import { useEffect, useState } from 'react';
import { EventType } from '@/types/event';

interface CardEventProps {
  item: EventType;
  index: number;
  type?: string;
}

export function CardEvent({ item }: CardEventProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleSize = () => {
      if (window.innerWidth >= 768)
        setIsMobile(false)
      else
        setIsMobile(true)
    }

    handleSize();
    window.addEventListener('resize', handleSize);
    return () => window.removeEventListener('resize', handleSize);
  }, []);

  return (
    !item?.corporate ?
      <Link
        href={`/agenda/${item.url}`}
        className={style['c-card__item']}>
        <div className={`h-max flex flex-col md:flex-row items-center w-full justify-end relative z-[2] gap-3 md:gap-1 flex-1 ${isMobile ? style['c-card__card-desktop'] : ''}`}>
          <div className="flex-1 flex flex-col md:flex-row items-center justify-start md:justify-center h-full w-full">
            <p className={style['c-card__day']}>{formatDay(formatDate(item.date, { day: 'numeric' }))}</p>
            <p className={`${style['c-card__month']} md:hidden`}>{formatDate(item.date, { month: 'long' })}</p>
          </div>

          {!item.corporate || item.corporate ? (
            !item.district ? (
              <div className={`${!isMobile ? style['c-card__card'] : 'flex flex-col gap-2'}`}>
                <div className='w-full hidden md:block'>
                  <p className={style['c-card__month']}>{formatDate(item.date, { month: 'long' })}</p>
                </div>
                <div className='w-full flex  flex-row gap-1 items-center justify-center md:justify-start line-clamp-1'>
                  <p className={style['c-card__city']}>{item.city_name} - </p>
                  <p className={style['c-card__state']}>{item.state_uf}</p>
                </div>


                <div className='border-[0.5px] md:border-none w-full flex justify-end rounded-full  md:absolute top-[4.7rem] -left-5'>
                  <p className={`${style['c-card__details']}`}>+ mais detalhes</p>
                </div>

              </div>
            ) : (
              <div className="flex-1 flex justify-end">
                <p
                  className="text-sm font-light text-white uppercase"
                  title={`${item.district} é distrito de ${item.city_name} ${item.state_uf}`}
                >
                  {item.district} | {item.state_uf}
                </p>
              </div>
            )
          ) : (
            <div className="w-full flex-1 flex items-end">
              <p className={style['c-card__corporate']}>Evento Corporativo</p>
            </div>
          )}
        </div>
      </Link>
      :
      <div className={style['c-card__item']}>

        <div className={`h-max flex flex-col md:flex-row items-center w-full justify-center md:justify-end relative z-[2] gap-3 md:gap-1 flex-1 ${isMobile ? style['c-card__card-desktop'] : ''}`}>
          <div className="flex-1 flex flex-col md:flex-row items-center h-full justify-start md:justify-center w-full">
            <p className={style['c-card__day']}>{formatDay(formatDate(item.date, { day: 'numeric' }))}</p>
            <p className={`${style['c-card__month']} md:hidden`}>{formatDate(item.date, { month: 'long' })}</p>

          </div>

          {!item.corporate || item.corporate ? (
            !item.district ? (
              <div className={`${!isMobile ? style['c-card__card'] : 'flex flex-col gap-2'}`}>
                <div className='w-full hidden md:flex'>
                  <p className={style['c-card__month']}>{formatDate(item.date, { month: 'long' })}</p>
                </div>
                <div className='w-full flex  flex-row gap-1 items-center justify-center md:justify-start line-clamp-1'>
                  <p className={style['c-card__city']}>{item.city_name} - </p>
                  <p className={style['c-card__state']}>{item.state_uf}</p>
                </div>

                <div className="border-[0.5px] md:border-none w-full flex justify-end rounded-full md:py-0 md:absolute top-[86%] -left-5">
                  <p className={style['c-card__corporate']}>Evento Corporativo</p>
                </div>

              </div>
            ) : (
              <div className="flex-1 flex justify-end">
                <p
                  className="text-sm font-light text-white uppercase"
                  title={`${item.district} é distrito de ${item.city_name} ${item.state_uf}`}
                >
                  {item.district} | {item.state_uf}
                </p>
              </div>
            )
          ) : (
            <div className="w-full flex-1 flex items-end">
              <p className={style['c-card__corporate']}>Evento Corporativo</p>
            </div>
          )}
        </div>
      </div>
  );
}
