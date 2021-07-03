import { forwardRef, ReactEventHandler, Ref } from 'react';
import { ListItem, ListItemIcon, ListItemProps, ListItemText } from '@material-ui/core';
import { NextLink } from '../NextLink';

type DrawerItemProps = Omit<
  ListItemProps<any, { component: any; href: string }>,
  'button' | 'onClick' | 'href' | 'ref' | 'underline' | 'component' | 'color'
> & {
  text: string;
  icon: JSX.Element;
  toggleDrawer: (value: boolean) => ReactEventHandler;
};

export const DrawerItem = forwardRef<any, DrawerItemProps>(
  ({ href, toggleDrawer, text, icon, ...props }: DrawerItemProps, ref: Ref<any>) => (
    <ListItem
      button
      href={href}
      component={NextLink}
      color="inherit"
      underline="none"
      onClick={toggleDrawer(false)}
      ref={ref}
      {...props}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText>{text}</ListItemText>
    </ListItem>
  )
);
