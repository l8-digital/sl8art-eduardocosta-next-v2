// src/styles/fonts.ts
import { Bebas_Neue, Montserrat, Red_Rose } from "next/font/google";
import localFont from "next/font/local";
// Fonte Bebas Neue
const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas'
});

const red_rose = Red_Rose({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-ret_rose'
});

const Modesto_Condensed = localFont({
  src: [
    {
        path: '../fonts/ModestoCondensed/modesto-condensed-bold.ttf',
        weight: '900',
        style: 'normal',
    },
    {
        path: '../fonts/ModestoCondensed/modesto-condensed.otf',
        weight: '900',
        style: 'normal',
    },
  ],
  variable: '--font-modesto-condensed',
  display: 'swap',
});


const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});
// Variável combinada para aplicar no <html>
export const fonts = `${bebas.variable} ${montserrat.variable} ${red_rose.variable} ${Modesto_Condensed.variable}`;
