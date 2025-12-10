'use client';
import style from './style.module.scss';
import NavLink from './NavLink';
import { useEffect, useState } from 'react';

export default function NavigationMenu({ orientation = '', className = '' }) {
    const [activeSection, setActiveSection] = useState<string | null>(null);

    useEffect(() => {

        const sectionIds = ['hero', 'calendar', 'music', 'video', 'biography', 'fan', 'contact'];

        const handleScroll = () => {
            const scrollPosition = window.scrollY + 150;
            let currentActiveSection: string | null = null;


            for (const id of sectionIds) {
                const element = document.getElementById(id);
                if (element && element.offsetTop <= scrollPosition) {
                    currentActiveSection = id;
                }
            }
            setActiveSection(currentActiveSection);
        };


        window.addEventListener('scroll', handleScroll);


        handleScroll();


        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`${style['c-nav']} ${orientation === 'vertical' ? 'c-nav--vertical' : ''} ${className ?? className}`}>


            <NavLink to="hero" className={`${style['c-nav__item']} ${activeSection === 'hero' ? style['is-active'] : ''}`} offset={-70}>Home</NavLink>

            <NavLink to="calendar" className={`${style['c-nav__item']} ${activeSection === 'calendar' ? style['is-active'] : ''}`} offset={-70}>Agenda</NavLink>

            {/* <NavLink to="biography" className={`${style['c-nav__item']} ${activeSection === 'biography' ? style['is-active'] : ''}`} offset={-70}>Biografia</NavLink> */}
            <NavLink to="music" className={`${style['c-nav__item']} ${activeSection === 'music' ? style['is-active'] : ''}`} offset={-70} >Músicas</NavLink>
            <NavLink to="video" className={`${style['c-nav__item']} ${activeSection === 'video' ? style['is-active'] : ''}`} offset={-70} >Vídeos</NavLink>
            <NavLink to="social" className={`${style['c-nav__item']} ${activeSection === 'social' ? style['is-active'] : ''}`} offset={-70} >Social</NavLink>
            <NavLink to="biography" className={`${style['c-nav__item']} ${activeSection === 'biography' ? style['is-active'] : ''}`} offset={-70}>Sobre</NavLink>
            {/* <NavLink to="news" className={`${style['c-nav__item']} ${activeSection === 'hero' ? style['is-active'] : ''}`} offset={-70} >Notícias</NavLink> */}
            {/* <NavLink to="gallery" className={`${style['c-nav__item']} ${activeSection === 'hero' ? style['is-active'] : ''}`} offset={-70} >Fotos</NavLink> */}
            {/* <NavLink to="fan" className={`${style['c-nav__item']} ${activeSection === 'fan' ? style['is-active'] : ''}`} offset={-70} >Fãs</NavLink> */}
            <NavLink to="contact" className={`${style['c-nav__item']} ${activeSection === 'contact' ? style['is-active'] : ''}`} offset={-70}>Contato</NavLink>


            {/* <a
                href="https://www.dsamba.com.br/thiaguinho"
                target="_blank"
                rel="noopener noreferrer"
                className={style['c-nav__item']}
            >
                Loja
            </a> */}
        </nav>
    );
}
