import { format } from 'date-fns';
import { Header } from '../_components/header';
import { ptBR } from 'date-fns/locale';
import { Search } from './_components/search';
import { BookingItem } from '../_components/booking-item';
import { db } from '../_lib/prisma';
import { BarbershopItem } from './_components/barbershop-item';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  const [barbershops, confirmedBookings] = await Promise.all([
    db.barbershop.findMany({}),
    session?.user
      ? db.booking.findMany({
          where: {
            userId: (session?.user as any).id,
            date: {
              gte: new Date(),
            },
          },
          include: {
            service: true,
            barbershop: true,
          },
        })
      : Promise.resolve([]),
  ]);

  return (
    <div>
      <Header />

      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">Olá, Miguel!</h2>
        <p className="text-sm capitalize">
          {format(new Date(), "EEEE',' dd 'de' MMMM", { locale: ptBR })}
        </p>
      </div>

      <div className="px-5 mt-6">
        <Search />
      </div>

      <div className="mt-6">
        <h2 className="pl-5 text-xs uppercase text-gray-400 font-bold mb-3">
          Agendamentos
        </h2>

        <div className="px-5 flex gap-3 overflow-x-auto">
          {confirmedBookings.map((booking) => (
            <BookingItem booking={booking} key={booking.id} />
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xs px-5 uppercase text-gray-400 font-bold mb-3">
          Recomendados
        </h2>

        <div className="flex px-5 gap-2 overflow-x-auto">
          {barbershops.map((barbershop) => (
            <BarbershopItem barbershop={barbershop} />
          ))}
        </div>
      </div>

      <div className="mt-6 mb-[4.5rem]">
        <h2 className="text-xs px-5 uppercase text-gray-400 font-bold mb-3">
          Populares
        </h2>

        <div className="flex px-5 gap-2 overflow-x-auto">
          {barbershops.map((barbershop) => (
            <BarbershopItem barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  );
}
