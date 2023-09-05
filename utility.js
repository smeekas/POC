const crypto = require("crypto");
const bcrypt = require("bcrypt");
const QRCode = require("qrcode");
const fs = require("fs");
let algorithm = "aes256"; // or any other algorithm supported by OpenSSL
let key = "password";
const saltRounds = 10;

module.exports.encrpyt = function encrpyt(lat, lon) {
  let text = `${lat}|${lon}`;
  bcrypt.hash(text, saltRounds, function (err, hash) {
    const objectForJson = {
      lat,
      lon,
      hash,
    };
    console.log(objectForJson);
    fs.writeFile(
      "./qrData.json",
      JSON.stringify(objectForJson),
      "utf-8",
      (err) => {
        if (!err) {
          const response = {
            hash,
          };
        }
      }
    );
  });
};
module.exports.decrypt = function decrypt(hash) {
  let decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(hash, "hex", "utf8") + decipher.final("utf8");
  return decrypted;
};
module.exports.convert = function convert(lat1, lon1, lat2, lon2) {
  //   let lat1 = 23.048157;
  //   let lat2 = 23.045273;
  //   let lon1 = 72.673312;
  //   let lon2 = 72.504782;
  function degToRad(degrees) {
    let pi = Math.PI;
    return degrees * (pi / 180);
  }
  lat1 = degToRad(lat1);
  lat2 = degToRad(lat2);
  lon1 = degToRad(lon1);
  lon2 = degToRad(lon2);
  let dlon = lon2 - lon1;
  let dlat = lat2 - lat1;

  let a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

  let c = 2 * Math.asin(Math.sqrt(a));
  let r = 6371;
  console.log(c * r * 1000);
};

module.exports.toQr = function toQr(encyptedText) {
  return QRCode.toString(
    encyptedText,
    { type: "terminal" },
    function (err, url) {
      return url;
    }
  );
};
