const cheerio = require("cheerio");
const request = require("request-promise");
const express = require("express");
const utf8 = require("utf8");
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
      recetaObjeto.ingredientes[i] = utf8.decode($(this).html().trim());
    });
  console.log(recetaObjeto.ingredientes);

  return recetaObjeto;
}

app.get("/:query", async function (req, res) {
  let arrayDeRecetas = await scalpURLS(req.params.query);

  console.log(arrayDeRecetas);

  let resultadoTotal = [];

  for (let receta of arrayDeRecetas) {
    let imagen = await scalpReceta(receta);
    resultadoTotal.push(imagen);
  }

  console.log(resultadoTotal);

  res.send(resultadoTotal);
});

app.get("/", (req, res) => {
  res.json({ 1: "hola" });
});

app.listen(port, () => {
  console.log(`Buscador de recetas escuchando en http://localhost:${port}`);
});
