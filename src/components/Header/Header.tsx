'use client'
import style from './style.module.scss';
import Icon from '@/components/Icon/Icon';
import NavigationMenu from '@/components/Navigation/NavigationMenu';
import NavLink from '@/components/Navigation/NavLink';
import SocialMenu from '@/components/SocialMenu/SocialMenu';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useConfigApp } from "@/app/providers/app";


const year = new Date().getFullYear();

type Props = {
    theme?: string
};

export function Header({ theme }: Props) {
    const [scrollActive, setScrollActive] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { title, logo } = useConfigApp() ?? {};


    useEffect(() => {
        const handleScroll = () => {
            setScrollActive(window.scrollY >= 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (

        <header>

            <div className={`${style['menu-desktop']} ${scrollActive || theme === 'black' ? 'bg-black' : 'bg-transparent'}`}>
                <div className="container flex flex-row w-full justify-between">
                    <NavLink to="hero" offset={-70}>
                        <div className="text-[0]">

                            {logo && <Image
                                src={logo}
                                className={style['hero__logo']}
                                width={300}
                                height={128}
                                alt={`Logo ${title}`}
                                priority
                            />}
                        </div>
                    </NavLink>
                    <NavigationMenu />
                </div>
            </div>

            {/* <div className={style['nav-social']}>
                <SocialMenu />
            </div> */}


            <div className={style['menu-mobile']}>
                <div className={`${style['menu-body']} ${isOpen && style['active']}`} id="menu-body">
                    <div className={style['box-social']}>
                        <p className={style['box-social__title']}>Social</p>
                        <SocialMenu />
                    </div>

                    {/* Container que fecha o menu ao clicar em qualquer lugar dentro */}
                    <div
                        className="relative flex flex-col flex-1 justify-center h-full"
                        onClick={() => setIsOpen(false)}
                    >
                        <NavigationMenu className="pl-12 pb-14" />

                        <div className={style['sing']}>
                            <div className="flex items-center">
                                <div className="w-[45%] border-r pr-3 md:pr-4 border-white">
                                    <p className="text-[.65rem] italic text-white leading-tight font-medium text-end mb-0">
                                        &copy; {year} <span className="font-bold">{title}</span>.<br className="hidden md:block" />
                                        Todos os direitos reservados.
                                    </p>
                                </div>
                                <div className="flex items-center w-[55%] pl-3 md:pl-4">
                                    <Icon name="logo-l8" className="w-9 h-7 fill-white" />
                                    <p className="pl-2 md:pl-3 mb-0 italic font-medium text-white text-[.65rem] leading-tight">
                                        Desenvolvido por<br />L8 Digital
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Menu Nav Inferior */}
                <div className={style['menu-nav']}>
                    <NavLink to="contact" offset={-70} className={style['menu-nav__item']}>
                        <Icon name="icon-mail" className="object-contain h-7 w-6 stroke-black" />
                        Contato
                    </NavLink>

                    <NavLink to="music" offset={-70} className={style['menu-nav__item']}>
                        <Icon name="icon-music" className="object-contain h-7 w-7 stroke-black stroke-[0.105rem]" />
                        Músicas
                    </NavLink>

                    <button
                        aria-label="Botao"
                        type="button"
                        className={`${style['menu-nav__item']} ${style['o-hamburguer']} ${isOpen && style['active']}`}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <div className={style['trace']}>
                            <span></span>
                        </div>
                        Menu
                    </button>
                </div>
            </div>

        </header >
    )
}
