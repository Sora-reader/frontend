import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { signOut } from '../redux/user/actions';
import { TDispatch } from '../redux/types';
import { unwrapResult } from '@reduxjs/toolkit';
import { useInitialEffect } from '../utils/hooks';

export default function SignOut() {
  // Store.dispatch doesn't play well with redirect even if awaiting
  const router = useRouter();
  const dispatch = useDispatch() as TDispatch;

  useInitialEffect(() => {
    router.prefetch('/');
    const promise = dispatch(signOut())
      .then(unwrapResult)
      .then(() => router.push('/'));
    return () => {
      // @ts-ignore
      promise.abort();
    };
  });
  return '';
}
