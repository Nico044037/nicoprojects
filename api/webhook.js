// api/webhook.js

import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const data = req.body;

    const purchase = {
      item: data.product_summary || "Unknown item",
      amount: data.amount || 0,
      time: Date.now()
    };

    const filePath = path.join(process.cwd(), "public", "latest.json");

    fs.writeFileSync(filePath, JSON.stringify(purchase));

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}