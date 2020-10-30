document.querySelector("#enviar").addEventListener("click", () => {
  for (let i = 0; i < 10; i++) {
    let url = "/";
    let ingredientes = [];
    document.querySelectorAll(".ingrediente").forEach((input) => {
      ingredientes.push(input.value);
    });
    ingredientes.forEach((ingr) => {
      if (ingr != "") {
        url += ingr + "+";
      }
    });
    url += total;
    total++;
    fetch(url)
      .then((res) => res.json())
      // .then(data => console.log(data));

      .then((data) => creaTarj(data))
      .catch((e) => console.log("ERROR"));
  }
});


var total = 1;

const creaTarj = (objetoReceta) => {
  let nuevaTarjeta = document.createElement("div");
  nuevaTarjeta.setAttribute("class", "card");

  let divImagen = document.createElement("div");
  divImagen.setAttribute("class", "card-image");
  let elementoImagen = document.createElement("img");
  elementoImagen.src = objetoReceta.imagen
  divImagen.appendChild(elementoImagen)

  let divIngredientes = document.createElement("div")
  divIngredientes.setAttribute("class", "card-content");

  let divIngredientesDescripcion = document.createElement("div")
  divIngredientesDescripcion.setAttribute("class", "short-description");

  let tituloIngredientes = document.createElement("p");
  tituloIngredientes.innerHTML = objetoReceta.titulo
  tituloIngredientes.style = "font-weight: bold"
  let ulIngredientes = document.createElement("ul");

  objetoReceta.ingredientes.forEach((ing) => {
    let lineaIngrediente = document.createElement("li");
    lineaIngrediente.innerHTML = ing;
    ulIngredientes.appendChild(lineaIngrediente);
  });

  divIngredientesDescripcion.appendChild(tituloIngredientes)
  divIngredientesDescripcion.appendChild(ulIngredientes)
  divIngredientes.appendChild(divIngredientesDescripcion)

  let divBoton = document.createElement("div");
  divBoton.setAttribute("class", "card-action");
  let anchor = document.createElement("a")
  anchor.innerText = "IR A LA RECETA"
  anchor.target = "#"
  anchor.href = objetoReceta.link
  divBoton.appendChild(anchor)

  nuevaTarjeta.appendChild(divImagen)
  nuevaTarjeta.appendChild(divIngredientes)
  nuevaTarjeta.appendChild(divBoton)

  document.getElementById("container").appendChild(nuevaTarjeta)

};

document.getElementById("agregarExtra").addEventListener("click", () => {
  let nuevoInput = document.createElement("div");
  nuevoInput.innerHTML =
    '<div class="divInputIngrediente"> Ingrediente extra: <input type="text" class="ingrediente" /><br /> </div>'
  document.getElementById("divInputs").appendChild(nuevoInput);
});