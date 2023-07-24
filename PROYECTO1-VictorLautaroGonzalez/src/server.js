const express = require('express');
const {findAll, findByCategorie, findOneById,create,update,destroy} = require('./db/data-manager.js');
require('dotenv').config();

const server = express();

//  Middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));


// obtener todos los peliculas:  Ruta GET http://127.0.0.1:3000/peliculas
server.get("/peliculas", (req, res) => {
  findAll()
    .then((peliculas) => res.status(200).send(peliculas))
    .catch((err) => res.status(400).send(err.message));
});

// Obtener un pelicula específico: Ruta GET http://127.0.0.1:3000/peliculas/1
server.get("/peliculas/:id", (req, res) => {
    const { id } = req.params;

    findOneById(Number(id))
        .then((pelicula) => {
            res.status(200).send(pelicula);
        })
        .catch((err) => {
            res.status(400).send(err.message);
        });
});

// Obtener peliculas por categoria Ruta GET http://127.0.0.1:3000/peliculas/cat
server.get("/peliculas/categoria/:categoria",(req, res) => {  
    const { categoria } = req.params;

    findByCategorie(categoria)
      .then((pelicula) => {
        res.status(200).send(pelicula);
      })
      .catch((err) => {
        res.status(400).send(err.message);
      });
});

// Crear un nuevo pelicula: Ruta POST http://127.0.0.1:3000/peliculas
server.post('/peliculas', (req, res) => {
    const { titulo, formato, anio, categoria, calificacion } = req.body;

    create({ titulo, formato, anio, categoria, calificacion })
      .then((peliculas) => res.status(201).send(peliculas))
      .catch((error) => res.status(400).send(error.message));
});

// Actualizar un pelicula específico: Ruta PUT http://127.0.0.1:3000/peliculas/1
server.put('/peliculas/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, formato, anio, categoria, calificacion } = req.body;

    update({ id: Number(id), titulo, formato, anio, categoria, calificacion })
        .then((pelicula) => res.status(200).send(pelicula))
        .catch((error) => res.status(400).send(error.message));
});

// Eliminar un pelicula específico: Ruta DELETE http://127.0.0.1:3000/peliculas/1
server.delete('/peliculas/:id', (req, res) => {
    const { id } = req.params;

    destroy(Number(id))
        .then((pelicula) => res.status(200).send(pelicula))
        .catch((error) => res.status(400).send(error.message));
});

// Control de rutas inexistentes
server.use('*', (req, res) => {
    res.status(404).send(`<h1>Error 404</h1><h3>La URL indicada no existe en este servidor</h3>`);
});


// Método oyente de peteciones
server.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {
    console.log(`Ejecutandose en http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/peliculas`);
});