'use client';

import style from './style.module.scss';
import Parallax from '@/components/Parallax/Parallax';

export default function ParallaxSection() {

    return (
        <section className={style['parallax']}>
            <Parallax
                src={'var(--bgdesk-parallax-01)'}
            />
        </section>
    );
}
