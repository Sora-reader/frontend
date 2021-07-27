import { forwardRef } from 'react';
import { SoraChip, SoraChipProps } from '../../../SoraChip';

type Props = {
  value: number;
  chipWidth: number;
} & SoraChipProps;

export const ChapterChip = forwardRef(({ value, chipWidth, ...props }: Props, ref: any) => {
  const style = {
    width: `${chipWidth}rem`,
    padding: 0,
    margin: '0 1rem 0 0',
    fontSize: 'small',
  };
  // classes override seems to not work, hotfixing for now with inline styles
  return <SoraChip label={value} style={style} variant="outlined" size="small" ref={ref} props={props} />;
});

ChapterChip.defaultProps = {
  chipWidth: 2.6,
};
