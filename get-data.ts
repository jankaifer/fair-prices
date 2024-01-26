import { billaStoreIntegration } from "./stores/billa";
import { mkdir } from "node:fs/promises";

const integrations: StoreIntegration<Store>[] = [billaStoreIntegration];

const main = async () => {
  const date = new Date();
  const isoDate = date.toISOString();
  for (const integration of integrations) {
    const items = await integration.getAllItems();
    const dir = `data/${integration.store}`;
    await mkdir(dir, { recursive: true });
    await Bun.write(`${dir}/${isoDate}.json`, JSON.stringify(items));
  }
};

main();
