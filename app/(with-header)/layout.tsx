"use client";

import { UserButton } from "@clerk/nextjs";
import { AppShell, Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isOpened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 50 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !isOpened },
      }}
      padding="md"
    >
      <AppShell.Header className="flex justify-between items-center p-2">
        <Group>
          <Burger
            opened={isOpened}
            onClick={toggle}
            hiddenFrom="sm"
            size="sm"
          />
          <div>Fair prices</div>
        </Group>

        <UserButton />
      </AppShell.Header>

      <AppShell.Navbar p="md">Add nav links here ...</AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
