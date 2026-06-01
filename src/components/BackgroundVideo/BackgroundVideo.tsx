'use client'
import { useRef, useState } from 'react';
import style from './style.module.scss';
import Icon from '@/components/Icon/Icon';

type BackgroundVideoProps = {
    src: string;
};

export default function BackgroundVideo({ src }: BackgroundVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState(true);
    const [hasInteracted, setHasInteracted] = useState(false);

    function handleFirstClick() {
        const video = videoRef.current;
        if (!video) return;
        video.muted = false;
        setIsMuted(false);
        setHasInteracted(true);
    }

    function toggleMute() {
        const video = videoRef.current;
        if (!video) return;
        const next = !isMuted;
        video.muted = next;
        setIsMuted(next);
    }

    return (
        <>
            <video
                ref={videoRef}
                className={style.video}
                id="bgVideo"
                loop
                muted
                playsInline
                autoPlay>
                <source src={src} type="video/webm" />
                <track
                    src="/video/home/parallax.vtt"
                    kind="captions"
                    srcLang="pt-br"
                    label="Português (Brasil)"
                />
            </video>

            <div className={style.gradient} />

            {!hasInteracted ? (
                <button
                    type="button"
                    className={style.centerPrompt}
                    onClick={handleFirstClick}
                    aria-label="Ativar som"
                >
                    <Icon name="icon-hand" className={style.centerIcon} />
                    <span className={style.centerLabel}>Ativar som</span>
                </button>
            ) : (
                <>
                    <div className={style.overlay} onClick={toggleMute} />
                    <button
                        type="button"
                        className={style.muteBtn}
                        onClick={toggleMute}
                        aria-label={isMuted ? 'Ativar som' : 'Desativar som'}
                    >
                        <Icon
                            name={isMuted ? 'icon-speaker-off' : 'icon-speaker-on'}
                            className={style.muteIcon}
                        />
                    </button>
                </>
            )}
        </>
    );
}
