import * as HoverCard from '@radix-ui/react-hover-card';

import { useAuth } from "../hooks/useAuth";

export function Profile() {
  const { user } = useAuth();

  const name = user?.name[0];

  return (
    <div className='w-full max-w-5xl flex items-center justify-end'>
      <HoverCard.Root>
        <HoverCard.Trigger>
          <div className='h-12 w-12 border border-violet-700 rounded-full flex items-center justify-center'>
            {user?.avatar ?
              <img src={user?.avatar}
                alt="Imagem de avatar do usuário"
                className='h-[42px] w-[42px] rounded-full' /> :
              <span className='bg-zinc-900/75 w-full h-full rounded-full flex items-center justify-center cursor-pointer font-extrabold text-xl text-violet-400/95'>
                {name}
              </span>
            }
          </div>
        </HoverCard.Trigger>

        <HoverCard.Portal>
          <HoverCard.Content className='min-w-[320px] w-full p-6 rounded-md bg-zinc-900 flex items-center justify-between'>
            <div className='h-[70px] w-[70px] border border-violet-700 rounded-full flex items-center justify-center'>
              {user?.avatar ?
                <img src={user?.avatar}
                  alt="Imagem de avatar do usuário"
                  className='h-16 w-16 rounded-full' /> :
                <span className='bg-zinc-900/75 w-full h-full rounded-full flex items-center justify-center cursor-pointer font-extrabold text-4xl text-violet-400/95'>
                  {name}
                </span>
              }
            </div>

            <div className='flex flex-col items-end'>
              <span className='text-sm font-bold text-zinc-400'>
                {user?.name}
              </span>

              <p className='mt-2 text-xs text-zinc-600'>
                {user?.email}
              </p>
            </div>

            <HoverCard.Arrow className='fill-zinc-900' height={8} width={16} />
          </HoverCard.Content>
        </HoverCard.Portal>
      </HoverCard.Root>
    </div>
  );
}