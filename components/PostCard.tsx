import db from "@/db/db";
import ProductItem from "./ProductItem";

const getProducts = async () => {
  return await db.query.productTable.findMany();
};

const PostCard = async () => {
  const products = await getProducts();

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-8 my-10">
      {products.map(({ id, name, description, image, price }) => (
        <ProductItem
          key={id}
          name={name}
          description={description}
          image={image}
          price={price}
          id={id}
        />
      ))}
    </section>
  );
};

export default PostCard;
