import { useRouter } from 'next/router';
import { signIn } from '../redux/user/actions';
import { NextLink } from '../components/NextLink';
import { UserCredentialsForm } from '../components/UserCredentialsForm';
import { useEffect } from 'react';

export default function SignIn() {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/');
  }, []);

  return (
    <div>
      <UserCredentialsForm
        headerText="Вход"
        submitText="Войти"
        toDispatch={signIn}
        afterSuccess={() => router.push('/')}
        tip={
          <NextLink
            underline="none"
            color="textPrimary"
            align="center"
            href="/sign-up"
            style={{ marginTop: '1rem', opacity: '50%' }}
          >
            Регистрация
          </NextLink>
        }
      />
    </div>
  );
}
