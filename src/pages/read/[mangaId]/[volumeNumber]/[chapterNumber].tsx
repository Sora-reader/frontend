import { GetServerSideProps } from 'next';
import { Reader } from '../../../../components/reader/Reader';

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      mangaId: Number(context.query.mangaId),
      volumeNumber: Number(context.query.volumeNumber),
      chapterNumber: Number(context.query.chapterNumber),
    },
  };
};

type Props = {
  mangaId: number;
  volumeNumber: number;
  chapterNumber: number;
};

export default function Read(props: Props) {
  // TODO: Add more logic here and possibly AppBar
  return <Reader {...props} />;
}
