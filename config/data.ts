interface MituniItem {
  iD: number;
  name: string;
  status: string;
  value: number;
}

export const mituniData: MituniItem[] = [
  {
    iD: 1,
    name: "Item 1",
    status: "Active",
    value: 650,
  },
  {
    iD: 2,
    name: "Item 2",
    status: "Inactive",
    value: 874,
  },
  {
    iD: 3,
    name: "Item 3",
    status: "Pending",
    value: 110,
  },
  {
    iD: 4,
    name: "Item 4",
    status: "Active",
    value: 89,
  },
  {
    iD: 5,
    name: "Item 5",
    status: "Inactive",
    value: 96,
  },
  {
    iD: 6,
    name: "Item 6",
    status: "Pending",
    value: 383,
  },
  {
    iD: 7,
    name: "Item 7",
    status: "Active",
    value: 307,
  },
  {
    iD: 8,
    name: "Item 8",
    status: "Inactive",
    value: 38,
  },
  {
    iD: 9,
    name: "Item 9",
    status: "Pending",
    value: 580,
  },
  {
    iD: 10,
    name: "Item 10",
    status: "Active",
    value: 348,
  },
  {
    iD: 11,
    name: "Item 11",
    status: "Inactive",
    value: 376,
  },
  {
    iD: 12,
    name: "Item 12",
    status: "Pending",
    value: 330,
  },
  {
    iD: 13,
    name: "Item 13",
    status: "Active",
    value: 630,
  },
  {
    iD: 14,
    name: "Item 14",
    status: "Inactive",
    value: 465,
  },
  {
    iD: 15,
    name: "Item 15",
    status: "Pending",
    value: 197,
  },
  {
    iD: 16,
    name: "Item 16",
    status: "Active",
    value: 879,
  },
  {
    iD: 17,
    name: "Item 17",
    status: "Inactive",
    value: 551,
  },
  {
    iD: 18,
    name: "Item 18",
    status: "Pending",
    value: 983,
  },
  {
    iD: 19,
    name: "Item 19",
    status: "Active",
    value: 930,
  },
  {
    iD: 20,
    name: "Item 20",
    status: "Inactive",
    value: 46,
  },
];

const generateOrdersData = (count: number) => {
  const data = [];
  const statuses = ["pending", "processing", "completed", "cancelled"];
  const paymentMethods = ["Credit Card", "PayPal", "Bank Transfer"];

  for (let i = 1; i <= count; i++) {
    const hasSubRows = Math.random() > 0.3; // 70% chance of multiple items
    const itemCount = hasSubRows ? Math.floor(Math.random() * 4) + 2 : 1;
    const orderId = `ORD-${1000 + i}`;
    const date = new Date(
      Date.now() - Math.floor(Math.random() * 10000000000)
    ).toISOString();
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    // Generate items
    const items = [];
    let totalAmount = 0;

    for (let j = 0; j < itemCount; j++) {
      const price = Math.floor(Math.random() * 1000) + 50;
      const quantity = Math.floor(Math.random() * 5) + 1;
      const subtotal = price * quantity;
      totalAmount += subtotal;

      items.push({
        item_id: i * 100 + j,
        product_name: `Product ${String.fromCharCode(
          65 + Math.floor(Math.random() * 26)
        )}-${Math.floor(Math.random() * 100)}`,
        quantity,
        price: price.toString(),
        subtotal: subtotal.toString(),
        order_id: orderId, // Needed for subrows logic
        // Include parent fields in subrows if needed by UI, but usually not
      });
    }

    const firstItem = items[0];
    const subRows = items.slice(1).map((item) => ({
      // Subrows need to match Order schema somewhat
      id: item.item_id, // Unique ID for key
      ...item,
      // Parent fields that might be accessed
      order_id: orderId,
      customer_name: `Customer ${i}`,
      status,
      total_items: 0, // Not shown
      total_amount: "0",
      order_date: date,
    }));

    data.push({
      id: i,
      order_id: orderId,
      customer_name: `Customer ${i}`,
      customer_email: `customer${i}@example.com`,
      order_date: date,
      status,
      total_items: itemCount,
      total_amount: totalAmount.toString(),
      shipping_address: `${Math.floor(Math.random() * 1000)} Main St`,
      payment_method:
        paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
      created_at: date,

      // First item data
      item_id: firstItem.item_id,
      product_name: firstItem.product_name,
      quantity: firstItem.quantity,
      price: firstItem.price,
      subtotal: firstItem.subtotal,

      subRows: subRows.length > 0 ? subRows : undefined,
    });
  }
  return data;
};

export const ordersData = generateOrdersData(50);
