'use client'
import { useEffect, useRef, useState } from 'react';
import style from './style.module.scss'
import Icon from '@/components/Icon/Icon';
import { SocialType } from '@/types/configuration';

declare module 'react' {
    interface CSSProperties {
        [key: `--${string}`]: string | number | undefined;
    }
}

interface SpotifyPlayerProps {
    albumId: string;
}

function SpotifyPlayer({ albumId }: SpotifyPlayerProps) {

    const spotifyUrl = `https://open.spotify.com/embed/album/${albumId}?utm_source=generator&theme=0`;

    const [hoverDivVisible, setHoverDivVisible] = useState(true);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const [mobileOverlayVisible, setMobileOverlayVisible] = useState(true);

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const touch =
            typeof window !== "undefined" &&
            ("ontouchstart" in window || navigator.maxTouchPoints > 0);

        setIsTouchDevice(touch);
    }, []);

    const muteHeroVideo = () => {
        const heroVideo = document.getElementById("bgVideo") as HTMLVideoElement | null;
        if (heroVideo) heroVideo.muted = true;

        window.dispatchEvent(new Event("hero-force-mute"));
    };

    const handleHoverDivEnter = () => {
        muteHeroVideo();
        setHoverDivVisible(false);

        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            setHoverDivVisible(true);
        }, 3000);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    // useEffect(() => {
    //     const stopSpotify = () => {
    //         if (!wrapperRef.current) return;

    //         const oldIframe = wrapperRef.current.querySelector("iframe");
    //         if (!oldIframe) return;

    //         // pega estilo atual, Safari precisa disso
    //         const width = oldIframe.offsetWidth;
    //         const height = oldIframe.offsetHeight;

    //         // cria novo iframe
    //         const newIframe = document.createElement("iframe");
    //         newIframe.src = spotifyUrl;
    //         newIframe.width = String(width);
    //         newIframe.height = String(height);
    //         newIframe.allow = "encrypted-media";
    //         newIframe.style.border = "0";

    //         // substitui sem remover o wrapper => Safari não desaparece
    //         wrapperRef.current.replaceChild(newIframe, oldIframe);
    //     };

    //     window.addEventListener("stop-spotify", stopSpotify);
    //     return () => window.removeEventListener("stop-spotify", stopSpotify);
    // }, []);

    if (!mounted) return null;

    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                borderRadius: 12,
                overflow: "hidden",
            }}
        >

            {/* DESKTOP */}
            {!isTouchDevice && hoverDivVisible && (
                <div
                    style={{
                        position: "absolute",
                        bottom: 170,
                        left: "82%",
                        width: 60,
                        height: 60,
                        zIndex: 25,
                        background: "transparent",
                        cursor: "pointer",
                    }}
                    onMouseMove={handleHoverDivEnter}
                />
            )}

            {/* MOBILE */}
            {isTouchDevice && mobileOverlayVisible && (
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        zIndex: 30,
                        background: "transparent",
                    }}
                    onTouchStart={() => {
                        handleHoverDivEnter();
                        setMobileOverlayVisible(false);

                        if (timeoutRef.current) clearTimeout(timeoutRef.current);

                        timeoutRef.current = setTimeout(() => {
                            setMobileOverlayVisible(true);
                        }, 3000);
                    }}
                />
            )}

            <div ref={wrapperRef} style={{ width: "100%", height: "352px" }}>
                <iframe
                    src={spotifyUrl}
                    width="100%"
                    height="100%"
                    allow="encrypted-media"
                    style={{ border: 0 }}
                />
            </div>
        </div>
    );
}

interface Props {
    social: SocialType;
}

export default function MusicSection({ social }: Props) {

    useEffect(() => {
        const handleSpotifyPlay = () => { };
        window.addEventListener("spotify-play", handleSpotifyPlay);
        return () => window.removeEventListener("spotify-play", handleSpotifyPlay);
    }, []);

    return (
        <section id='music' className={style['music']} >
            <div className='container relative z-[1]'>

                <div className="w-full h-max flex justify-start items-center gap-0 pt-0 relative max-md:-top-14 md:pt-20">
                    <div className={style['music__square']}>

                        <div className='w-full h-full md:flex'>
                            <SpotifyPlayer albumId={'3wImMnhicT0G2cR15q17nT'} />
                        </div>

                        <div className="uppercase text-white flex flex-col gap-3 text-center z-[20] py-[1.5rem]">
                            <p className="font-tertiary font-medium text-sm md:text-base text-balance">
                                Disponível também nos streamings:
                            </p>
                            <ul className={style['c-streaming']}>
                                <li>
                                    <a target='_blank' href={social?.spotify || '#'} className={style['c-streaming__link']}>
                                        <Icon name="icon-spotify" className="hidden md:flex h-7 fill-white" />
                                        <Icon name="icon-spotify-mobile" className="md:hidden h-7 fill-white" />
                                    </a>
                                </li>
                                <li>
                                    <a target='_blank' href={social?.link_deezer || '#'} className={style['c-streaming__link']}>
                                        <Icon name="icon-deezer" className="hidden md:flex h-7 fill-white" />
                                        <Icon name="icon-deezer-symbol" className="md:hidden h-7 fill-white" />
                                    </a>
                                </li>
                                <li>
                                    <a target='_blank' href={social?.link_suamusica || '#'} className={style['c-streaming__link']}>
                                        <Icon name="icon-sua-musica" className="hidden md:flex h-7 fill-white" />
                                        <Icon name="icon-suamusica-mobile" className="md:hidden h-7 fill-white" />
                                    </a>
                                </li>
                                <li>
                                    <a target='_blank' href={social?.link_itunes || '#'} className={style['c-streaming__link']}>
                                        <Icon name="icon-apple-music" className="hidden md:flex h-5 fill-white" />
                                        <Icon name="icon-apple-mobile" className="md:hidden h-7 fill-white" />
                                    </a>
                                </li>
                               
                              
                                {/* {social.link_youtube_music && (
                                    <li>
                                        <a target='_blank' href={social.link_youtube_music} className={style['c-streaming__link']}>
                                            <Icon name="icon-youtube-music" className="hidden md:flex h-7 fill-black" />
                                            <Icon name="icon-youtube-music-symbol" className="md:hidden h-7 fill-black" />
                                        </a>
                                    </li>
                                )} */}
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
