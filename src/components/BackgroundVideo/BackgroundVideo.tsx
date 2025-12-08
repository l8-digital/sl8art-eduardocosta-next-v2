'use client';

import { useState, useRef, useEffect } from 'react';
import style from './style.module.scss';
import Icon from '../Icon/Icon';

type BackgroundVideoProps = {
    src: string;
};

export default function BackgroundVideo({ src }: BackgroundVideoProps) {
    const [isMuted, setIsMuted] = useState(true);
    const [wasActivated, setWasActivated] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const handleSpotifyPlay = () => {
            const video = videoRef.current;
            if (video) {
                video.muted = true;
                setIsMuted(true);
            }
        };

        const handleForceMute = () => {
            const video = videoRef.current;
            if (video) {
                video.muted = true;
                setIsMuted(true);
            }
        };

        window.addEventListener("spotify-play", handleSpotifyPlay);
        window.addEventListener("hero-force-mute", handleForceMute);

        return () => {
            window.removeEventListener("spotify-play", handleSpotifyPlay);
            window.removeEventListener("hero-force-mute", handleForceMute);
        };
    }, []);

    const stopSpotify = () => {
        window.dispatchEvent(new Event("stop-spotify"));
    };

    const toggleSound = () => {
        const video = videoRef.current;
        if (!video) return;

        const newMuted = !video.muted;
        video.muted = newMuted;
        setIsMuted(newMuted);

        if (!newMuted) stopSpotify();
    };

    const activateSoundFirstTime = () => {
        toggleSound();
        setWasActivated(true);
    };

    return (
        <>
            {wasActivated && (
                <div
                    onClick={toggleSound}
                    className="absolute inset-0 z-[1] cursor-pointer"
                />
            )}

            {!wasActivated && (
                <button
                    id="buttonVideo"
                    className={`${style.buttonVideo} font-medium text-white absolute w-full h-full z-[2] top-0 left-0 opacity-40 hover:opacity-70 cursor-pointer`}
                    onClick={activateSoundFirstTime}
                >
                    <Icon
                        name="icon-touch"
                        className={`${style.icon} mx-auto w-9 mb-2 fill-white`}
                    />
                    Ativar som
                </button>
            )}

            {wasActivated && (
                <button
                    id="buttonSoundCorner"
                    className="absolute max-md:top-6 md:bottom-12 left-5 p-2 z-[20] bg-black/10 rounded-full cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleSound();
                    }}
                >
                    {isMuted ? (
                        <Icon name="icon-nosound" className="w-5 fill-white" />
                    ) : (
                        <Icon name="icon-sound" className="w-5 fill-white" />
                    )}
                </button>
            )}

            <video
                ref={videoRef}
                className={style.video}
                id="bgVideo"
                loop
                muted={isMuted}
                playsInline
                autoPlay
            >
                <source src={src} type="video/webm" />
                Seu navegador não suporta o vídeo.
            </video>
        </>
    );
}
