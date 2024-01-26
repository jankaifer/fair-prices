"use client";

import { Card, Image, Group, Text, SimpleGrid } from "@mantine/core";
import { data } from "./data";

const ItemCard = ({ item }: { item: (typeof data)[number] }) => (
  <Card shadow="sm" padding="lg" radius="md" withBorder>
    <Card.Section>
      <Image
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
        height={160}
        alt="Norway"
      />
    </Card.Section>

    <Group justify="space-between" mt="md" mb="xs">
      <Text fw={500}>{item.name}</Text>
    </Group>
  </Card>
);

export default function Page() {
  return (
    <SimpleGrid cols={{ base: 1, xs: 2, md: 3, lg: 4 }}>
      {data.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </SimpleGrid>
  );
}
