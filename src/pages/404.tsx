import { Typography } from '@material-ui/core';
import { ErrorView } from '../components/views/ErrorView';
import Image from 'next/image';

export default function IndexView() {
  return (
    <ErrorView>
      <Typography gutterBottom variant="h4">
        Страница не найдена
      </Typography>
      <Image src="/assets/404.png" alt="404" width="417" height="384" />
    </ErrorView>
  );
}
