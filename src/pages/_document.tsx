import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* External resources like CSS and meta tags */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        
        {/* Include external scripts */}
        <script
          src="https://code.jquery.com/jquery-3.6.0.min.js"
          defer // Ensures script is executed after HTML parsing
        ></script>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.11.6/umd/popper.min.js"
          defer // Ensures script is executed after HTML parsing
        ></script>
        <script
          src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"
          defer // Ensures script is executed after HTML parsing
        ></script>
      </body>
    </Html>
  );
}
