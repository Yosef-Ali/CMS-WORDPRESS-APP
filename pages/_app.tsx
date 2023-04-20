<<<<<<< HEAD
import { AppProps } from "next/app";
=======
import { AppProps } from 'next/app';
import '../styles/index.css';
import '../styles/audio.css';
>>>>>>> aa39fc7f3381656a14f872abda7274d19778faf0

import "../styles/index.css";
import "../styles/audio.css";

import { Inter, Roboto_Mono, Noto_Sans_Ethiopic } from "@next/font/google";

// const inter = Inter({
// 	variable: '--font-inter',
// 	display: 'optional',
// });

// const roboto_mono = Roboto_Mono({
// 	variable: '--font-roboto-mono',
// 	display: 'optional',
// });

const noto_Sans_Ethiopic = Noto_Sans_Ethiopic({
  subsets: ["latin"],
  variable: "--noto_Sans_Ethiopic",
  display: "optional",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`${inter.variable} font-sans, ${noto_Sans_Ethiopic.variable} font-noto`}
    >
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
