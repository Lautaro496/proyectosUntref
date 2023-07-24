const fs = require("fs");
const path = require("path");

const ruta = path.join(__dirname, "data.json");

function escribir(contenido) {
  return new Promise((resolve, reject) => {
    fs.writeFile(
      ruta,
      JSON.stringify(contenido, null, "\t"),
      "utf8",
      (error) => {
        if (error) reject(new Error("Error. No se puede escribir"));

        resolve(true);
      }
    );
  });
}

function leer() {
  return new Promise((resolve, reject) => {
    fs.readFile(ruta, "utf8", (error, result) => {
      if (error) reject(new Error("Error. No se puede leer"));

      resolve(JSON.parse(result));
    });
  });
}

function generarId(peliculas) {
  let mayorId = 0;

  peliculas.forEach((pelicula) => {
    if (Number(pelicula.id) > mayorId) {
      mayorId = Number(pelicula.id);
    }
  });

  return mayorId + 1;
}

async function findOneById(id) {
  if (!id) throw new Error("Error. El Id está indefinido.");

  const peliculas = await leer();
  const pelicula = peliculas.find((element) => element.id === id);

  if (!pelicula)
    throw new Error("Error. El Id no corresponde a un pelicula en existencia.");

  return pelicula;
}

async function findByCategorie(cate){
  if(!cate) throw new Error("Error. No existe esa categoria.");
  const peliculas = await leer();
  const pelicula = peliculas.filter((element) => element.categoria.includes(cate));

  if (!pelicula) {throw new Error("Error. El Id no corresponde a un pelicula en existencia.");}
  return pelicula;
}
async function findAll() {
  const peliculas = await leer();
  return peliculas;
}

async function create(pelicula) {
  if (!pelicula?.titulo || !pelicula?.formato || !pelicula?.anio)
    throw new Error("Error. Datos incompletos.");

  let peliculas = await leer();
  const peliculaConId = { id: generarId(peliculas), ...pelicula };

  peliculas.push(peliculaConId);
  await escribir(peliculas);

  return peliculaConId;
}

async function update(pelicula) {
  if (!pelicula?.id || !pelicula?.titulo || !pelicula?.formato || !pelicula?.anio)
    throw new Error("Error. Datos incompletos.");

  let peliculas = await leer();
  const indice = peliculas.findIndex((element) => element.id === pelicula.id);

  if (indice < 0)
    throw new Error("Error. El Id no corresponde a un pelicula en existencia.");

  peliculas[indice] = pelicula;
  await escribir(peliculas);

  return peliculas[indice];
}

async function destroy(id) {
  if (!id) throw new Error("Error. El Id está indefinido.");

  let peliculas = await leer();
  const indice = peliculas.findIndex((element) => element.id === id);

  if (indice < 0)
    throw new Error("Error. El Id no corresponde a un pelicula en existencia.");

  const pelicula = peliculas[indice];
  peliculas.splice(indice, 1);
  await escribir(peliculas);

  return pelicula;
}

module.exports = { findOneById, findByCategorie, findAll, create, update, destroy };
