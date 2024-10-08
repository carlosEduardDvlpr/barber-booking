import { redirect } from 'next/navigation';
import { BarbershopItem } from '../(home)/_components/barbershop-item';
import { Header } from '../_components/header';
import { db } from '../_lib/prisma';
import { Search } from '../(home)/_components/search';

interface BarbershopPageProps {
  searchParams: {
    search?: string;
  };
}

const BarbershopPage = async ({ searchParams }: BarbershopPageProps) => {
  if (!searchParams.search) redirect('/');

  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: 'insensitive',
      },
    },
  });
  return (
    <>
      <Header />
      <div className="px-5 pt-5">
        <Search defaultValue={{ search: searchParams.search }} />
      </div>

      <div className="px-5 py-6">
        <h1 className="text-gray-400 font-bold text-xs uppercase">
          Resultados para "{searchParams.search}"
        </h1>
        <div className="grid grid-cols-2 mt-3 gap-4">
          {barbershops.map((barbershop) => (
            <div key={barbershop.id} className="w-full">
              <BarbershopItem barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BarbershopPage;
