document.querySelector("#enviar").addEventListener("click", () => {
  for (let i = 0; i < 10; i++) {
    let url = "http://localhost:3000/";
    let ingredientes = [];
    document.querySelectorAll(".ingrediente").forEach((input) => {
      ingredientes.push(input.value);
    });
    ingredientes.forEach((ingr) => {
      url += ingr + "+";
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

const renderReceta = (objetoReceta) => {
  objetoReceta.ingredientes.forEach((ingr) => {
    document.getElementById("container").innerHTML += ingr;
  });
};
var total = 1;

const creaTarj = (objetoReceta) => {
  let nuevaTarjeta = document.createElement("div");
  nuevaTarjeta.setAttribute("class", "tarjeta");
  objetoReceta.ingredientes.forEach((ing) => {
    let lineaIngrediente = document.createElement("p");
    lineaIngrediente.innerHTML = ing;
    nuevaTarjeta.appendChild(lineaIngrediente);
    document.getElementById("container").appendChild(nuevaTarjeta);
  });
};

// const crearTarjeta = (titulo, linkImagen, arrayIngredientes, linkReceta) => {
//     let nuevaTarjeta = document.createElement("div");
//     nuevaTarjeta.setAttribute("class", "tarjeta");

//     let elementoTitulo = document.createElement("p");
//     elementoTitulo.innerHTML = titulo;
//     nuevaTarjeta.appendChild(elementoTitulo);

//     let elementoImagen = document.createElement("img");
//     elementoImagen.src = linkImagen;
//     nuevaTarjeta.appendChild(elementoImagen);

//     arrayIngredientes.forEach((ing) => {
//         let lineaIngrediente = document.createElement("p");
//         lineaIngrediente.innerHTML = ing;
//         nuevaTarjeta.appendChild(lineaIngrediente);
//     });

//     let elementoBoton = document.createElement("a");
//     elementoBoton.setAttribute("href", linkReceta);
//     elementoBoton.innerHTML = "IR A LA RECETA";

//     nuevaTarjeta.appendChild(elementoBoton);
//     document.getElementById("container").appendChild(nuevaTarjeta);
// };
