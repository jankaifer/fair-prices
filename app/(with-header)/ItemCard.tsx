"use client";
import { Card, Image, Group, Text } from "@mantine/core";

export const ItemCard = ({ item }: { item: Item }) => (
  <Card shadow="sm" padding="lg" radius="md" withBorder>
    <Card.Section display="flex" className="justify-center">
      <Image
        src={item.imageUrl}
        h={160}
        w="auto"
        fit="contain"
        alt={item.name}
      />
    </Card.Section>

    <Group justify="space-between" mt="md" mb="xs">
      <Text fw={500}>{item.name}</Text>
    </Group>
  </Card>
);
