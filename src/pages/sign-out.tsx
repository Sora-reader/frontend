import * as React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { LinearProgress } from '@material-ui/core';
import { signOut } from '../redux/user/actions';
import { TDispatch } from '../redux/types';

function SignOut() {
  // Store in getServerSideProps in undefined
  const router = useRouter();
  const dispatch = useDispatch() as TDispatch;
  useEffect(() => {
    dispatch(signOut()).then(() => router.push('/'));
  }, []);
  return '';
}

export default SignOut;
