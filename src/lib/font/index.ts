import { Heebo, Nunito, Poppins } from 'next/font/google';

export const poppins = Poppins({
  subsets: ['latin'],
  variable: '--',
  weight: '400',
});
export const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  weight: '400',
});
export const heebo = Heebo({
  subsets: ['latin'],
  variable: '--font-heebo',
  weight: '400',
});