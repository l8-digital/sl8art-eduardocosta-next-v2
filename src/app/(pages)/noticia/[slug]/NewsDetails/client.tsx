// components/calendarection.jsx
'use client';
import style from './style.module.scss';
import React from 'react';
import SocialShare from '@/components/SocialShare/SocialShare'
import Icon from '@/components/Icon/Icon';
import Link from 'next/link';
import { formatDate } from '@/utils/format';
import { NewsType } from '@/types/news';
import Image from 'next/image';

interface Props {
    data: NewsType;
    news: NewsType[]
}

export default function EventDetail({ data, news }: Props) {

    return (

        <section className={style['details-news']}>

            <div className="container">

                {Boolean(data?.exclusive) && (
                    <p className={`${style['details-news__exclusive']} block md:hidden`}>
                        Exclusivo
                    </p>
                )}

                <h1 className={style['details-news__title']}>{data?.title}</h1>

                <h2 className={style['details-news__subtitle']}>{data?.subtitle}</h2>

                <div className="flex gap-4 my-3">

                    {Boolean(data?.exclusive) && (
                        <p className={`${style['details-news__exclusive']} hidden md:block`}>
                            Exclusivo
                        </p>
                    )}

                    <div className="flex items-center gap-2">

                        <SocialShare
                            social="whatsapp"
                            url={data.url}
                            title={data?.title}
                            className={`${style['link-social']} bg-[#21bd5b] hover:bg-[#1da851]`}>
                            <Icon name="icon-whatsapp" className={style['link-social__icon']} />
                        </SocialShare>

                        <SocialShare
                            social="telegram"
                            url={data.url}
                            title={data?.title}
                            className={`${style['link-social']} bg-[#0088cc] hover:bg-[#467dab]`}>
                            <Icon name="icon-telegram" className={style['link-social__icon']} />
                        </SocialShare>

                        <SocialShare
                            social="facebook"
                            url={data.url}
                            title={data?.title}
                            className={`${style['link-social']} bg-[#4267B2] hover:bg-[#185ab1]`}>
                            <Icon name="icon-facebook" className={style['link-social__icon']} />
                        </SocialShare>

                        <SocialShare
                            social="twitter"
                            url={data.url}
                            title={data?.title}
                            className={`${style['link-social']} bg-[#202020] hover:bg-[#000000]`}>
                            <Icon name="icon-x" className={style['link-social__icon']} />
                        </SocialShare>

                    </div>
                </div>

                <p className={style['details-news__author']}>
                    {Boolean(data?.author) && (
                        <>
                            Por <span className="font-bold text-gray-dark">{data?.author}</span>
                        </>
                    )}
                    {Boolean(data?.date) && (
                        <>
                            {'  - Atualizado ' + formatDate(data.date, { hour: '2-digit', minute: '2-digit' })}
                        </>
                    )}
                </p>
            </div>

            <div className="md:container order-first md:order-none ">

                <div className={style['box-figure']}>

                    {Boolean(data?.image_cdn) && (
                        <figure className={style['box-figure__image']}>
                            <Image src={data.image_cdn} alt="news.title" width="768" height="580" />
                        </figure>
                    )}

                    <div className={style['box-figure__caption']}>

                        <span className={style['caption-title']}>
                            {data.image_subtitle}
                        </span>

                        <span className={style['caption-reference']}>
                            {Boolean(data.image_source) && 'Fonte: ' + data.image_source}
                        </span>

                    </div>

                </div>
            </div>

            <div className="container">

                <div className={style['details-news__description']} dangerouslySetInnerHTML={{ __html: data?.text || '' }}>
                </div>

                <ul className={style['box-tags']}>
                    <li>
                        <div
                            className={style['tag']}>
                            Resenha
                        </div>
                    </li>
                </ul>

                <div className={style['related-news']}>

                    <p className={style['related-news__title']}>
                        Leia também
                    </p>

                    <div className='grid grid-cols-2 gap-8'>

                        {news.map((item, index) => (

                            <Link key={index} href={`/noticia/${item.url}`} className={style['box-related']}>

                                <figure
                                    className={style['box-related__figure']}>

                                    <Image src={item.image_cdn} alt="news.title" width="140" height="105"  className="object-cover w-full h-full" />

                                    <div className={style['box-number']}>
                                        <p className="text-center font-bold text-lg md:text-xl"> {index  + 1}</p>
                                    </div>

                                </figure>

                                <div className="flex-1 box-descricao flex flex-col text-ellipsis overflow-hidden h-[6rem]">
                                    <span className="font-medium text-gray  text-[12px]  truncate">
                                        Name </span>

                                    <span className="font-bold text-black text-sm uppercase line-clamp-4 truncate">
                                        Titulo </span>
                                </div>
                            </Link>

                        ))}
                    </div>
                </div>
            </div>


        </section >
    );
}