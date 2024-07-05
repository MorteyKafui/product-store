import { formSchema } from "@/lib/formSchema";
import Image from "next/image";
import { z } from "zod";
import { DollarSign } from "lucide-react";
import Link from "next/link";

// type ProductProps = z.infer<typeof formSchema>;
type ProductProps = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

const ProductItem = ({ id, description, image, name, price }: ProductProps) => {
  return (
    <div className="flex flex-col gap-4 shadow-xl rounded-xl">
      <Image
        src={image}
        alt="product-image"
        width={500}
        height={500}
        objectFit="cover"
        className="rounded-xl"
      />
      <div className="p-4">
        <h3 className="flex justify-between items-center mb-4 font-semibold">
          <Link href={`/products/${id}`}>{name}</Link>
          <span className="flex items-center text-teal-600 font-semibold gap-1">
            <DollarSign className="" size={16} /> {price}
          </span>
        </h3>
        <p>{description.slice(0, 100)}</p>
      </div>
    </div>
  );
};

export default ProductItem;
