const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");

const storageStrategy = multer.memoryStorage();
const upload = multer({ storage: multer.memoryStorage() });

const app = express();


app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hola Mundo");
});
app.post("/img", upload.single("img"), async function (req, res) {
  const img = req.file;
  const processedImage = sharp(img.buffer);
  const resizedImage = processedImage.resize(600,600,{
    fit: "contain",
    background: "#fff"
  });
  const resizedImageBuffer = await resizedImage.toBuffer();
    fs.writeFileSync("nuevaRuta/prueba.png",resizedImageBuffer)

  console.log(resizedImageBuffer);
  res.send({resizedImage : resizedImageBuffer});
});

app.listen(3000);

//npm run dev reinicia el sevidor gracias a nodemon