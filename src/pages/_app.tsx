import type { AppProps } from "next/app";
import minlogo from '../Assets/Images/mobilelogo.svg';
import "../Assets/css/bootstrap.min.css";
import "../Assets/css/owl.carousel.min.css";
import "../Assets/css/owl.theme.default.css";
import "../Assets/css/main-style.css";

import Head from "next/head";
import Script from "next/script";

import { AuthProvider } from "@/context/AuthContext"; // 👈 Import AuthProvider

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href={minlogo.src} />
        {/* FontAwesome CSS via CDN */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </Head>

      {/* 👇 Wrap your app with AuthProvider */}
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>

      {/* External JavaScript files */}
      <Script
        src="../Assets/js/jquery.min.js"
        strategy="beforeInteractive"
        onError={(e) => console.error("Failed to load jQuery", e)}
      />
      <Script
        src="../Assets/js/owl.carousel.js"
        strategy="afterInteractive"
        onError={(e) => console.error("Failed to load Owl Carousel", e)}
      />
      <Script
        src="../Assets/js/main.js"
        strategy="afterInteractive"
        onError={(e) => console.error("Failed to load Main JS", e)}
      />
    </>
  );
}
