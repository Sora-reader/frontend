import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { signOut } from '../redux/user/actions';
import { TDispatch } from '../redux/types';
import { unwrapResult } from '@reduxjs/toolkit';

function SignOut() {
  // Store in getServerSideProps in undefined
  const router = useRouter();
  const dispatch = useDispatch() as TDispatch;

  useEffect(() => {
    router.prefetch('/');
    dispatch(signOut())
      .then(unwrapResult)
      .then(() => router.push('/'));
  }, []);
  return '';
}

export default SignOut;
