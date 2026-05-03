<?php
$data = json_decode(file_get_contents("php://input"), true);

$purchase = [
    "item" => $data["product_summary"] ?? "Unknown item",
    "amount" => $data["amount"] ?? 0,
    "time" => time()
];

file_put_contents(__DIR__ . "/latest.json", json_encode($purchase));

http_response_code(200);