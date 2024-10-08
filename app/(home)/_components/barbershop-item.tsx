'use client';
import { Badge } from '@/app/_components/ui/badge';
import { Button } from '@/app/_components/ui/button';
import { Card, CardContent } from '@/app/_components/ui/card';
import type { Barbershop } from '@prisma/client';
import { StarIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export const BarbershopItem = ({ barbershop }: { barbershop: Barbershop }) => {
  const router = useRouter();
  const handleBookingClick = () => {
    router.push(`/barbershops/${barbershop.id}`);
  };

  return (
    <Card className="min-w-full max-w-[167px] rounded-2xl">
      <CardContent className="px-1 py-0 pt-1">
        <div className="px-1 w-full h-[159px] relative">
          <div className="absolute top-2 left-2 z-50">
            <Badge
              variant="secondary"
              className="rounded-full opacity-90 flex gap-2 items-center"
            >
              <StarIcon size={12} className="fill-primary text-primary" />
              <span className="text-xs">5,0</span>
            </Badge>
          </div>

          <Image
            alt={barbershop.name}
            src={barbershop.imageUrl}
            height={0}
            width={0}
            style={{
              objectFit: 'cover',
            }}
            fill
            sizes="100vw"
            className="rounded-2xl"
          />
        </div>

        <div className="px-2 pb-3">
          <h2 className="font-bold mt-2 overflow-hidden text-ellipsis text-nowrap">
            {barbershop.name}
          </h2>
          <p className="text-sm text-gray-400 overflow-hidden text-ellipsis text-nowrap">
            {barbershop.address}
          </p>
          <Button
            onClick={handleBookingClick}
            className="w-full mt-3"
            variant="secondary"
          >
            Reservar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
