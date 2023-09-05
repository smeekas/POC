const express = require("express");
const crypto = require("crypto");
const utils = require("./utility");
const cors = require("cors");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 9999;
app.use(cors());

// console.log(utils.toQr("HELLO"));
app.use(express.json());
app.post("/create", (req, res) => {
  console.log(req.body);
  const lat = req.body.lat;
  const lon = req.body.lon;
  console.log(lat, lon);
  const hash = utils.encrpyt(lat, lon);
  //   console.log("hash", hash);
  //   const objectForJson = {
  //     lat,
  //     lon,
  //     hash,
  //   };
  fs.readFile("./qrData.json", "utf-8", (err, data) => {
    res.json(JSON.parse(data));
  });
});
app.get("/abc", (req, res) => {
  // req.query.idc
  // console.log(req.query, req.params);
  return res.json({ abc: "abc" });
});
app.get("/scan/:hash", (req, res) => {
  res.json({ hash: utils.decrypt(req.params.hash) });
});
app.listen(port, () => {
  console.log(`TypeScript with Express
           http://localhost:${port}/`);
});
