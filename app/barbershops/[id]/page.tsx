import { db } from '@/app/_lib/prisma';
import { BarbershopInfo } from './_components/barbershop-info';
import { ServiceItem } from './_components/service-item';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/_lib/auth';

interface ParamsProp {
  params: {
    id?: string;
  };
}

export default async function BarbershopDetailsPage({ params }: ParamsProp) {
  const session = await getServerSession(authOptions);

  if (!params.id) {
    // TODO - redirecionar para home page
    return null;
  }

  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  });

  if (!barbershop) {
    // TODO - redirecionar para home page
    return null;
  }

  return (
    <div>
      <BarbershopInfo barbershop={barbershop} />

      <div className="px-5 flex flex-col gap-4 py-6">
        {barbershop.services.map((service) => (
          <ServiceItem
            key={service.id}
            service={service}
            barbershop={barbershop}
            isAuthenticated={!!session?.user}
          />
        ))}
      </div>
    </div>
  );
}
