import { SimpleGrid } from "@mantine/core";
import { ItemCard } from "./ItemCard";
import { loadPrices } from "../loadPrices";

export default async function Page() {
  const items = await loadPrices();
  return (
    <SimpleGrid cols={{ base: 1, xs: 2, md: 3, lg: 4 }}>
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </SimpleGrid>
  );
}
