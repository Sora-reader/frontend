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
    const roboto = 'https://fonts.googleapis.com/css?' +
        'family=Roboto:300,400,500,700&display=swap';
    const montserrat = 'https://fonts.googleapis.com/css2?' +
        'family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600' +
        ';0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,' +
        '800;1,900&display=swap';
    const muiIcons = 'https://fonts.googleapis.com/icon?family=Material+Icons';

    return (
        <Html lang={'ru'}>
          <Head>
            <meta charSet="utf-8"/>

            <link rel="stylesheet" href={roboto}/>
            <link rel="stylesheet" href={montserrat}/>
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
            <link rel="stylesheet" href={muiIcons}/>
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
