'use client';
import { useEffect, useRef } from 'react';
import style from './style.module.scss';

interface ParallaxProps {
  src: string;
  speed?: number;    // intensidade do movimento (0.1 ~ 0.5 é natural)
  height?: number;   // altura do container
}

export default function Parallax({
  src,
  speed = 0.2,      // sutil e natural
  height = 500,
}: ParallaxProps) {
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
    <div
      ref={containerRef}
      className={style.parallaxContainer}
      style={{
        height: `${height}px`,
        backgroundImage: src,
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden',
      }}
    />
  );
}
