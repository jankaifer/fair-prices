import * as z from "valibot";

export const billaStoreIntegration: StoreIntegration<"billa"> = {
  store: "billa",
  getUrlFromId: (item) => `https://shop.billa.cz/produkt/${item.id}`,
  getAllItems: async () => {
    const billaItems = await listAllProducts({ pageSize: 100, page: 0 });
    return billaItems.map(billaItemToItem);
  },
};

const billaItemSchema = z.object({
  slug: z.string(),
  name: z.string(),
  descriptionShort: z.optional(z.string()),
  images: z.array(z.string()),
  amount: z.string(),
  price: z.object({
    regular: z.object({
      value: z.number(),
    }),
  }),
  volumeLabelKey: z.union([
    z.literal("kg"),
    z.literal("gr"),
    z.literal("st"),
    z.literal("ks"),
    z.literal("lt"),
  ]),
});

const volumeLabelKeyToMultiplierWithUnit: {
  [key in z.Output<typeof billaItemSchema>["volumeLabelKey"]]: [
    multiplier: number,
    unit: QuantityUnit
  ];
} = {
  kg: [1, "kg"],
  gr: [0.001, "kg"],
  st: [1, "piece"],
  ks: [1, "piece"],
  lt: [1, "l"],
};

const billaItemToItem = (
  billaItem: z.Output<typeof billaItemSchema>
): Item<"billa"> => {
  const genericPart = {
    store: "billa",
    id: billaItem.slug,
    name: billaItem.name,
    description: billaItem.descriptionShort,
  } as const;

  const [multiplier, unit] =
    volumeLabelKeyToMultiplierWithUnit[billaItem.volumeLabelKey];
  return {
    ...genericPart,
    price: {
      amount: billaItem.price.regular.value,
      currency: "CZK",
    },
    quantity: {
      amount: Number(billaItem.amount) * multiplier,
      unit,
    },
  };
};

const listAllProducts = async ({
  pageSize,
  page,
}: {
  pageSize: number;
  page: number;
}) => {
  const response = await fetch(
    `https://shop.billa.cz/api/products?page=${page}&sortBy=price&sortOrder=asc&pageSize=${pageSize}`
  );
  const data = (await response.json()).results;
  let array;
  try {
    array = z.parse(z.array(z.unknown()), data);
  } catch (e) {
    if (e instanceof z.ValiError) {
      console.error("Expected array from billa but got", e.name, e.issues);
    }
    throw e;
  }

  return array.map((item) => {
    try {
      return z.parse(billaItemSchema, item);
    } catch (e) {
      if (e instanceof z.ValiError) {
        console.error("Billa item was malformed", e.name, e.issues);
      }
      throw e;
    }
  });
};
