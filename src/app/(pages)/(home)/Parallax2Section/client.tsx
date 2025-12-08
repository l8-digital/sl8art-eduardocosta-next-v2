'use client';

import style from './style.module.scss';
import Parallax from '@/components/Parallax/Parallax';

export default function Parallax2Section() {

    return (
        <section className={style['parallax']}>
            <Parallax
                src={'var(--bgdesk-parallax-02)'}
            />
        </section>
    );
}
