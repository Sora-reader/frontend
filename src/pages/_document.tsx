import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import React from 'react';
import GoogleFonts from 'next-google-fonts';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return {...initialProps};
  }

  render() {
    const muiIcons = 'https://fonts.googleapis.com/icon?family=Material+Icons';

    return (
        <Html lang={'ru'}>

          <Head>
            <meta charSet="utf-8"/>
          </Head>

          <body>
          <noscript>You need to enable JavaScript to run this app.</noscript>

          <Main/>
          <NextScript/>

          </body>
        </Html>
    );
  }
}

export default MyDocument;
