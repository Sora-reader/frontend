import { forwardRef } from 'react';
import Typography, { TypographyProps } from '@material-ui/core/Typography';

export const SettingHeader = forwardRef<any, TypographyProps>(({ children, ...props }: TypographyProps, ref) => {
  return (
    <Typography variant="h5" color="textPrimary" ref={ref} {...props}>
      {children}
    </Typography>
  );
});
