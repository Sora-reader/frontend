import { GetServerSideProps } from 'next';
import { wrapper } from '../redux/store';
import Head from 'next/head';

type Props = {
  params?: Record<any, any>;
};

export default function Detail({ params }: Props) {
  console.log(params);
  return (
    <Head>
      {/* <title>Bye Indonesia - Renunciation of Indonesian Citizenship Guide 2021</title> */}
      <meta name="description" content={params?.description.slice(0, 55)} />

      <meta property="og:url" content="https://www.byeindonesia.com/" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={params?.title} />
      <meta property="og:description" content={params?.description.slice(0, 55)} />
      <meta
        property="og:image"
        content={'https://backend.sora-reader.app/api/preview/resize?image' + params?.thumbnail}
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="byeindonesia.com" />
      <meta property="twitter:url" content="https://www.byeindonesia.com/" />
      <meta name="twitter:title" content={params?.title} />
      <meta name="twitter:description" content={params?.description.slice(0, 55)} />
      <meta
        name="twitter:image"
        content={'https://backend.sora-reader.app/api/preview/resize?image' + params?.thumbnail}
      ></meta>

      {/* <meta name="description" content={params?.description} />

      <meta property="og:url" content="https://sora-reader.app/" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={params?.title} />
      <meta property="og:description" content={params?.description} />
      <meta property="og:image" content={params?.thumbnail} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="sora-reader.app" />
      <meta property="twitter:url" content="https://sora-reader.app/" />
      <meta name="twitter:title" content={params?.title} />
      <meta name="twitter:description" content={params?.description} />
      <meta name="twitter:image" content={params?.thumbnail}></meta> */}

      {/* <meta name="description" content={params?.description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Sora Reader" />
      <meta property="og:title" content={params?.title} />
      <meta property="og:description" content={params?.description} />
      <meta property="og:image" content={params?.thumbnail} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={params?.url} />
      <meta property="twitter:site" content="@sora-reader" />
      <meta property="twitter:domain" content="sora-reader.app" />
      <meta property="twitter:title" content={params?.title} />
      <meta property="twitter:description" content={params?.description} />
      <meta property="twitter:image" content={params?.thumbnail} /> */}
    </Head>
  );
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async ({ query }) => {
  return { props: { params: query } };
});
