const cheerio = require("cheerio");
const request = require("request-promise");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

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

async function scalpReceta(receta) {
  const $ = await request({
    uri: receta,
    transform: (body) => cheerio.load(body),
  });

  let recetaObjeto = {
    imagen: "",
    ingredientes: [],
    link: "",
  };
  //EL SIGUIEN PEDAZO DE CÓDIGO BUSCA LOS "LI" DENTRO DE LA
  //DESCRIPCION DE LA RECETA PARA DEVOLVER LOS INGREDIENTES
  $(".short-description")
    .find("li")
    .each(function (i, elem) {
      recetaObjeto.ingredientes[i] = $(this).html().trim();
    });

  return recetaObjeto;
}

app.use("/", express.static(__dirname + "/public"));

app.get("/:query", async function (req, res) {
  let total = req.params.query[req.params.query.length - 1];
  let parametros = req.params.query.slice(0, -1);

  let arrayDeRecetas = await scalpURLS(req.params.query);

  let recetaObjeto = await scalpReceta(arrayDeRecetas[total]);

  res.send(recetaObjeto);
});

app.get("/", (req, res) => {
  res.send("hi");
});

app.listen(PORT, () => {
  console.log(`Buscador de recetas escuchando en ${PORT}`);
});
