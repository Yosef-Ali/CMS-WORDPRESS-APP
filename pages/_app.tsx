import { AppProps } from "next/app";

import "../styles/index.css";
import "../styles/audio.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="text-">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
