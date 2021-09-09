import { Typography } from '@material-ui/core';
import { ErrorView } from '../components/views/ErrorView';

export default function IndexView() {
  return (
    <ErrorView>
      <Typography variant="h4">Страница оффлайн</Typography>
    </ErrorView>
  );
}
