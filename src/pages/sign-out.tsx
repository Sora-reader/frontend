import * as React from 'react';
import {useEffect} from 'react';
import {useRouter} from 'next/router';
import {useDispatch} from 'react-redux';
import {signOut} from '../redux/user/action';
import {LinearProgress} from '@material-ui/core';

function SignOut() {
  // Store in getServerSideProps in undefined
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(signOut());
    router.push('/').then();
  }, []);
  return <LinearProgress/>;
}

export default SignOut;