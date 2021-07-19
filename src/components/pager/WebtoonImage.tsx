import { useRef } from 'react';
import { ReaderImage, ReaderImageProps } from '../reader/ReaderImage';
import { useVisible } from './hooks';

type Props = Omit<ReaderImageProps, 'current'>;

export const WebtoonImage = ({ image }: Props) => {
  const ref = useRef();
  const current = useVisible(ref);

  return <ReaderImage image={image} current={current} ref={ref} />;
};
