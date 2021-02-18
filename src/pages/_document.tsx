import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import React from 'react';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return {...initialProps};
  }

  render() {
    return (
        <Html lang={'ru'}>

          <Head>
            <meta charSet="utf-8"/>
            <link rel="manifest" href="/manifest.json"/>
            <link rel="icon" href="/favicon.ico"/>
            <link rel="apple-touch-icon" href="/favicon.ico"/>
          </Head>

          <body>
          <Main/>
          <NextScript/>
          </body>

        </Html>
    );
  }
}

export default MyDocument;
