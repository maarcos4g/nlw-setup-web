import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import { Header } from '../components/Header'
import { SummaryTable } from '../components/SummaryTable'
import { Profile } from '../components/Profile';

export function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate({ pathname: "/login" })
    }
  }, [])

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
        <Profile />
        <Header />
        <SummaryTable />
      </div>

    </div>
  )
}