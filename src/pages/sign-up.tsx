import { signUp } from '../redux/user/actions';
import { useRouter } from 'next/router';
import { UserCredentialsForm } from '../components/UserCredentialsForm';

export default function SignOut() {
  const router = useRouter();

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
