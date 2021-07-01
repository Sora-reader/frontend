import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { SettingDivider } from './SettingDivider';
import { SettingHeader } from './SettingHeader';

type Props = {
  title: string;
  noDivier?: boolean;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const SettingPart = ({ title, noDivier: noDivider, children, ...props }: Props) => {
  return (
    <>
      <div style={{ margin: '1rem 0 1rem 0' }} {...props}>
        <SettingHeader>{title}</SettingHeader>
        {children}
      </div>
      {noDivider ? '' : <SettingDivider />}
    </>
  );
};
