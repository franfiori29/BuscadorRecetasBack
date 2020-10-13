const cheerio = require("cheerio");
const request = require("request-promise");
const express = require("express");
const app = express();
const port = 3000;

async function scalpURLS(ingredientesInputs) {
  const $ = await request({
    uri: "https://cocinerosargentinos.com/busqueda?q=" + ingredientesInputs,
    transform: (body) => cheerio.load(body),
  });
  const recetas = [];
  $(".item-title").each(function (i, value) {
    recetas[i] =
      "https://cocinerosargentinos.com/" + $(this).children().attr("href");
  });
  return recetas;
}

app.get("/:query", async function (req, res) {
  res.send(await scalpURLS(req.params.query));
});

app.get("/", (req, res) => {
  res.json({ 1: "hola" });
});

app.listen(port, () => {
  console.log(`Buscador de recetas escuchando en http://localhost:${port}`);
});
