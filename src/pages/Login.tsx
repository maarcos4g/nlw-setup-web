import { GoogleLogo } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';
import logoImage from '../assets/logo.svg'
import { useAuth } from '../hooks/useAuth';

export function Login() {
  const navigate = useNavigate();
  const { signInWithGoogle, user } = useAuth();

  async function handleLogin() {
    if (!user) {
      await signInWithGoogle();
    }
    console.log(user);
    navigate({ pathname: "/dashboard" });
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <img src={logoImage} alt="Logo da aplicação Habits" />

      <span className='mt-6 font-semibold text-zinc-200 text-2xl leading-tight text-center'>
        Crie seus hábitos e
        <br />
        monitore sua rotina.
      </span>

      <button
        className='mt-5 border border-red-700 bg-red-600 font-semibold rounded-lg flex px-6 py-4 items-center gap-3
      hover:border-red-500 hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-offset-2 focus:ring-offset-background'
        onClick={handleLogin}
      >
        <GoogleLogo size={20} weight="bold" />
        <span>Entrar com Google</span>
      </button>

    </div>
  );
}