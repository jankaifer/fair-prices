import assert from "node:assert";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const dataDir = "data";

export const loadPrices = async () => {
  await Promise.resolve();

  const stores = (await readdir(dataDir)) as Store[];
  const items = await Promise.all(stores.map(loadStore));
  return items.flat();
};

const loadStore = async (store: Store) => {
  const storeDir = join(dataDir, store);
  const isoTimestamps = await readdir(storeDir);
  const lastIsoTimestamp = isoTimestamps.sort().at(-1);
  assert(lastIsoTimestamp !== undefined);
  const data = await readFile(join(storeDir, lastIsoTimestamp), "utf-8");
  return JSON.parse(data.toString()) as Item[];
};
