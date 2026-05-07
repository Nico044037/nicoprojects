let latestPurchase = {};

function sendJson(res, statusCode, body) {
  res.status(statusCode).setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(body));
}

module.exports = async function handler(req, res) {
  if (req.method === "GET") {
    return sendJson(res, 200, latestPurchase);
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return sendJson(res, 405, { error: "Method not allowed" });
  }

  const data = req.body && typeof req.body === "object" ? req.body : {};
  latestPurchase = {
    item: data.product_summary || "Unknown item",
    amount: data.amount || 0,
    time: Date.now(),
  };

  return sendJson(res, 200, { ok: true, purchase: latestPurchase });
};
