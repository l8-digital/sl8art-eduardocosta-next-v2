'use client'
import BackgroundVideo from '@/components/BackgroundVideo/BackgroundVideo'
import style from './style.module.scss'
import { useEffect, useRef } from 'react';

type Props = {
  bgvideo: string ;
};

export default function VideoParallax({ bgvideo }: Props) {
    console.log(bgvideo)
    const src = bgvideo

    const speed = 0.2;
    const height = 600;
    const containerRef = useRef<HTMLDivElement>(null);
    const currentY = useRef(0);

        useEffect(() => {
        let rafId: number;

        const animate = () => {
            const container = containerRef.current;
            if (!container) return;

            const rect = container.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.bottom > 0 && rect.top < windowHeight) {
            // calcula o progresso do scroll dentro do container
            const scrollProgress = Math.min(Math.max((windowHeight - rect.top) / (windowHeight + rect.height), 0), 1);

            // define altura extra da imagem para não sumir
            const imgHeight = container.offsetHeight * 1.3;
            const maxShift = imgHeight - container.offsetHeight;

            const targetY = maxShift * scrollProgress;

            // suavização natural
            currentY.current += (targetY - currentY.current) * 0.08;

            container.style.backgroundPosition = `center ${-currentY.current}px`;
            }

            rafId = requestAnimationFrame(animate);
        };

        rafId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(rafId);
        }, [speed, height]);

    return (
        <>
            <section id='video-parallax' className={style['video-parallax']}>

                {/* <div ref={containerRef} className={style['parallaxContainer']} style={{
                    height: `${height}px`,
                    // backgroundImage: `url(${src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'top center',
                    backgroundRepeat: 'no-repeat',
                    overflow: 'hidden',
                }}> */}
                    <BackgroundVideo src={src} />

                {/* </div> */}

            </section>
        </>
    )
}
