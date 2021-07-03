import { signUp } from '../redux/user/actions';
import { useRouter } from 'next/router';
import { UserCredentialsForm } from '../components/UserCredentialsForm';
import { useEffect } from 'react';

export default function SignOut() {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/');
  }, []);

  return (
    <div>
      <div>
        <UserCredentialsForm
          headerText="Регистрация"
          submitText="Зарегистрироваться"
          toDispatch={signUp}
          afterSuccess={() => router.push('/')}
        />
      </div>
    </div>
  );
}
