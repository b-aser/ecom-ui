import Categories from "@/components/Categories";
import ProductList from "@/components/ProductList";
import Image from "next/image";

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ category: string }>;
}) => {
  const category = (await searchParams).category || "all";

  return (
    <div className="">
      <div className=" relative aspect-3/1 mb-12">
        <Image
          src="/featured.png"
          alt="Featured Products"
          width={1920}
          height={1080}
          loading="eager"
        />
      </div>
      <ProductList category={category} params={"homepage"}/>
    </div>
  );
};

export default Home;
