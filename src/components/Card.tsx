import Image from "next/image";
import Link from "next/link";
import { CardProps } from "@/lib/types";

const Card = ({ name, slug, image, collection }: CardProps) => {
  return (
    <Link 
      href={`/explore/${collection}/${slug}`}
      className="group relative rounded overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-[#1f1f1f] flex flex-col hover-scale-low min-w-[240px] md:min-w-[360px]"
    >
      {/* Image container */}
      <div className="relative w-full h-64">
        <Image 
          src={image} 
          fill 
          alt={name} 
          className="object-cover transition-transform duration-300 group-hover:scale-105" 
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/60 transition-opacity duration-300 group-hover:via-black/40 group-hover:to-black/80" />

        {/* Text Overlay */}
        <div className="absolute bottom-0 w-full p-4 text-white transition-all duration-300">
          <p className="text-sm 
            opacity-100 translate-x-0 
            md:opacity-0 md:translate-x-[-100%] 
            md:group-hover:opacity-100 md:group-hover:translate-x-0 
            transition-all duration-300">
            Find out →
          </p>
          <h2 className="text-md font-semibold">{name}</h2>
        </div>
      </div>
    </Link>
  );
};

export default Card;
