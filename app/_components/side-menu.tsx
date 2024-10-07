"use client"
import { Avatar, AvatarImage } from './ui/avatar';
import { SheetHeader, SheetTitle } from './ui/sheet';
import { Button } from './ui/button';
import {
  CalendarIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  UserIcon,
} from 'lucide-react';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';

export const SideMenu = () => {
  const { data } = useSession();
  const handleLogoutClick = () => signOut();
  const handleLoginClick = () => signIn('google');

  return (
    <>
      <SheetHeader className="p-5 text-left border-b border-solid border-secondary">
        <SheetTitle>
          <h1>Menu</h1>
        </SheetTitle>
      </SheetHeader>
      {data?.user ? (
        <div className="flex justify-between px-5 py-6 items-center">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={data.user.image ?? ''} />
            </Avatar>
            <h2 className="font-bold">{data.user.name}</h2>
          </div>
          <Button variant="secondary" size="icon" onClick={handleLogoutClick}>
            <LogOutIcon />
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-3 px-5 py-6">
          <div className="flex ietms-center gap-3">
            <UserIcon />
            <h2 className="font-bold">Olá. Faça seu login!</h2>
          </div>

          <Button
            variant="secondary"
            onClick={handleLoginClick}
            className="w-full justify-start"
          >
            <LogInIcon className="mr-2" size={18} />
            Fazer Login
          </Button>
        </div>
      )}

      <div className="flex flex-col gap-3 px-5">
        <Button asChild variant="outline" className="justify-start">
          <Link href="/">
            <HomeIcon size={18} className="mr-2" />
            Inicio
          </Link>
        </Button>

        {data?.user && (
          <Button asChild variant="outline" className="justify-start">
            <Link href="/bookings">
              <CalendarIcon size={18} className="mr-2" />
              Agendamentos
            </Link>
          </Button>
        )}
      </div>
    </>
  );
};
