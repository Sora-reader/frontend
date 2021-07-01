import { useTheme } from '@material-ui/core';

type Props = {
  color: string;
  width: number;
};

export function ColorPreview(props: Props) {
  const theme = useTheme();
  const width = `${String(props.width || 70)}px`;

  return (
    <svg style={{ width }} viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
      <circle cx="35" cy="35" r="25" fill={props.color} stroke={theme.palette.text.primary} />
    </svg>
  );
}
