import { signUp } from '../redux/user/actions';
import { useRouter } from 'next/router';
import { UserCredentialsForm } from '../components/UserCredentialsForm';
import { useInitialEffect } from '../common/hooks';

export default function SignOut() {
  const router = useRouter();

  useInitialEffect(() => {
    router.prefetch('/');
  });

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
