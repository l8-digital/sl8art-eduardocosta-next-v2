'use client';
import style from './style.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import Lightbox from '@/components/Lightbox/Lightbox';
import { useEffect, useState } from "react";
import { flickrAlbuns, flickrAlbum } from "@/utils/flickr";
import { FlickrAlbumType, FlickrPhotoType } from '@/types/flickr';

interface Props {
    flickrId: string  ;
}

export default function GallerySection({ flickrId }: Props) {


    const [albums, setAlbums] = useState<FlickrAlbumType[]>([]);
    const [itemAlbum, setItemAlbum] = useState<FlickrPhotoType[]>([]);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    const handleOpenLightbox = () => setIsLightboxOpen(true);
    const handleCloseLightbox = () => setIsLightboxOpen(false);


    useEffect(() => {
        (async () => {
            try {
                if (flickrId) {
                    const data = await flickrAlbuns(flickrId);
                    setAlbums(data);
                }
            } catch (error) {
                console.error(error);
            }
        })();
    }, [flickrId]);


    const showMultiple = async (albumId: string) => {
        try {
            setItemAlbum([]);
            handleOpenLightbox();

            const photos = await flickrAlbum(flickrId, albumId);
            setItemAlbum(photos);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <section id="gallery" className={style['gallery']}>


            <Lightbox

                isOpen={isLightboxOpen}
                images={itemAlbum}
                onClose={handleCloseLightbox}
            />

            <div className="container">
                <div className="flex flex-col items-start pb-10 lg:items-end lg:flex-row">

                    <h2 className="o-title text-black">Fotos</h2>

                    <div className={style['box-subtitle']}>
                        <p
                            className="lg:text-lg  text-secondary font-medium lg:tracking-[0.24rem] tracking-wider z-[5] uppercase lg:pl-14 pl-0">
                            momentos especiais </p>
                        <p
                            className="pb-3 lg:text-xl text-secondary font-bold lg:tracking-[0.14rem] tracking-wider z-[5] uppercase lg:pl-14 pl-0">
                            Junto de vocês </p>
                        {/* <hr className="bg-gray-light" /> */}
                    </div>

                </div>
            </div>

            {albums && (
                <Swiper
                    spaceBetween={15}
                    loop={true}
                    keyboard={{ enabled: true }}
                    preventClicks={false}
                    grabCursor={false}
                    centeredSlides={true}
                    slidesPerView={1.25}
                    modules={[Navigation, Pagination, Keyboard]}
                    speed={400}
                    navigation={{
                        nextEl: '.gallery-next-button',
                        prevEl: '.gallery-prev-button',
                    }}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                        1366: { slidesPerView: 4 },
                        1600: { slidesPerView: 6 },
                    }}
                    className={style['carousel-gallery']} >
                    {albums.map((album) => (
                        <SwiperSlide key={album.id} className={`${style['carousel-gallery__item']} aspect-[4/5] md:aspect-[4/6] `}>
                            <button type="button" onClick={() => showMultiple(album.id)} className="h-full w-full  border-2 border-white/10 ">

                                {album.primary_photo_extras.url_l &&
                                    <Image
                                        src={album.primary_photo_extras.url_l} width={329}
                                        height={496} unoptimized
                                        alt="albuns" className="w-full object-cover h-full"
                                    />
                                }

                                <div className={style['legend']}>
                                    <span className="block uppercase">{album.title._content}</span>

                                </div>
                            </button>
                        </SwiperSlide>
                    ))}
                </Swiper>)}

            <div className="container">
                <div className={style['swipper-navigation']}>
                    <button type="button" className={`${style['swiper-nav-button']} gallery-prev-button`}>
                        ANTERIOR
                    </button>
                    <button type="button" className={`${style['swiper-nav-button']} gallery-next-button`}>
                        PRÓXIMO
                    </button>
                </div>
            </div>
        </section >
    );
}
