import { GetServerSideProps } from 'next';
import { useSelector } from 'react-redux';
import { MangaListView } from '../../components/views/MangaListView';
import { saveList } from '../../core/consts';
import { ListType } from '../../redux/saveLists/types';
import { RootState } from '../../redux/store';

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: { listType: context.params?.listType },
  };
};

type Props = {
  listType: ListType;
};

export default function IndexView({ listType }: Props) {
  const mangaList = useSelector((state: RootState) => state.saveLists[listType]);
  return <MangaListView header={saveList[listType].alt} mangaList={mangaList} />;
}
