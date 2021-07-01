import { forwardRef, Ref } from 'react';
import Link, { LinkProps } from 'next/link';
import { Link as MuiLink, LinkProps as MuiLinkProps } from '@material-ui/core';

type LinkRef = HTMLAnchorElement;

type NextLinkProps = Omit<MuiLinkProps, 'href' | 'classes'> & Pick<LinkProps, 'href' | 'as' | 'prefetch'>;

export const NextLink = forwardRef<LinkRef, NextLinkProps>(
  ({ href, as, prefetch, ...props }: LinkProps, ref: Ref<LinkRef>) => (
    <Link href={href} as={as} prefetch={prefetch} passHref>
      <MuiLink ref={ref} {...props} />
    </Link>
  )
);
