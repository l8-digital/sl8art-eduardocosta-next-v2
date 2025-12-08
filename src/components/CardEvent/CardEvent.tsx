'use client';
import style from './style.module.scss';
import Link from 'next/link';
import { formatDate } from '@/utils/format';
import { EventType } from '@/types/event';


interface CardEventProps {
  item: EventType;
  index: number;
  type?: string;
}

export function CardEvent({ item }: CardEventProps) {


  return (
    !item?.corporate ?
      <Link
        href={`/agenda/${item.url}`}
        className={style['c-card__item']}>

        <div className="h-full flex flex-col items-center justify-between relative z-[2] gap-3 md:gap-3 flex-1">
          <div className="flex-1 flex flex-col items-center  h-full justify-between w-full">
            <p className={style['c-card__day']}>{(formatDate(item.date, { day: 'numeric' }))}</p>
            <p className={style['c-card__month']}>{formatDate(item.date, { month: 'long' })}</p>
          </div>

          {!item.corporate || item.corporate ? (
            !item.district ? (
              <div className="w-full flex flex-col items-center text-center justify-center gap-3 h-full">
                <div className='w-full h-full flex  flex-row gap-1 items-center justify-center line-clamp-1'>
                  <p className={style['c-card__city']}>{item.city_name} - </p>
                  <p className={style['c-card__state']}>{item.state_uf}</p>
                </div>


                <div className='border-[0.5px] md:border-none w-full flex justify-center items-center text-center rounded-full md:py-0'>
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

        <div className="h-full flex flex-col items-center justify-between relative z-[2] gap-3 md:gap-3 flex-1">
          <div className="flex-1 flex flex-col items-center  h-full justify-between w-full">
            <p className={style['c-card__day']}>{(formatDate(item.date, { day: 'numeric' }))}</p>
            <p className={style['c-card__month']}>{formatDate(item.date, { month: 'long' })}</p>
          </div>

          {!item.corporate || item.corporate ? (
            !item.district ? (
              <div className="w-full flex flex-col items-center text-center justify-center gap-3 h-full">
                <div className='w-full h-full flex  flex-row gap-1 items-center justify-center line-clamp-1'>
                  <p className={style['c-card__city']}>{item.city_name} - </p>
                  <p className={style['c-card__state']}>{item.state_uf}</p>
                </div>

                <div className="w-full flex-1 flex items-end">
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
            <div className="w-full flex-1 flex items-end justify-center">
              <p className={style['c-card__corporate']}>Evento Corporativo</p>
            </div>
          )}
        </div>
      </div>
  );
}
