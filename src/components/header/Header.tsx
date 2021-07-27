import { MouseEventHandler } from 'react';
import { AppBar, AppBarProps, createStyles, IconButton, makeStyles, Theme, Toolbar } from '@material-ui/core';
import { forwardRef } from 'react';

const useStyles = makeStyles<Theme, { backgroundColor?: string }>((theme: Theme) =>
  createStyles({
    '@global': {
      header: {
        backgroundColor: `${
          theme.palette.type === 'dark' ? theme.palette.grey['800'] : theme.palette.primary.main
        } !important`,
      },
    },
    navbar: {},
    toolbar: {},
    toolbarIcon: {},
  })
);

type Props = {
  icon: JSX.Element;
  onIconClick?: MouseEventHandler<HTMLButtonElement>;
  classes?: Partial<ReturnType<typeof useStyles>>;
  backgroundColor?: string;
} & AppBarProps;

export const Header = forwardRef<any, Props>(
  ({ icon, onIconClick, classes: propClasses, children, backgroundColor, ...props }: Props, ref: any) => {
    const classes = { ...useStyles({ backgroundColor }), ...propClasses };

    return (
      <AppBar className={classes.navbar} ref={ref} {...props}>
        <Toolbar className={classes.toolbar}>
          <IconButton onClick={onIconClick} className={classes.toolbarIcon}>
            {icon}
          </IconButton>
          {children}
        </Toolbar>
      </AppBar>
    );
  }
);
