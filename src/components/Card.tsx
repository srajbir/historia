"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

type Props = {
  name: string;
  slug: string;
  image: string;
  collection: string;
};

const Card = ({ name, slug, image, collection }: Props) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/explore/${collection}/${slug}`)}
      className="cursor-pointer rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105"
    >
      <div className="relative w-full h-64">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
      <div className="text-center bg-white dark:bg-black py-3 text-xl font-semibold">
        {name}
      </div>
    </div>
  );
};

export default Card;
