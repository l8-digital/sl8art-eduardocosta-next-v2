// src/styles/fonts.ts
import { Bebas_Neue, Montserrat, Red_Hat_Display } from "next/font/google";

// Fonte Bebas Neue
const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas'
});

const red_hat = Red_Hat_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-ret_hat'
});


const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});
// Variável combinada para aplicar no <html>
export const fonts = `${bebas.variable} ${montserrat.variable} ${red_hat.variable}`;
