//carga de variables de entorno
require('dotenv').config();
//instancias
const path = require("path");
const express = require('express');
const sequelize = require("./conection/connection")
//imports 

const server = express();
// Middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname,'public')));

// Ruta Principal
server.get("/home", (req, res) => {
  res.status(200).sendFile(path.join(__dirname,'public','views','homepage.html'))
});


//categorias (información de todas las categorías)
server.get("/categoria", async (req,res) => {
  try{
    const consulta = "SELECT * FROM categorias ORDER BY idCategoria "

    const categorias = await sequelize.query ( consulta )

  res.status(200).send(categorias[0])
  }catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error al procesar la consulta' });
  }  

});

//catalogo (catálogo completo)
server.get ("/catalogo", async (req,res) => {
  try{
    const consulta = "SELECT *, CONCAT('http://127.0.0.1:8080/public', poster) AS poster FROM vista_trailerflix"

    const catalogo = await sequelize.query ( consulta )

    res.status(200).send(catalogo[0])
  }catch(error) {
    console.error(error);
    res.status(500).send({ message: 'Error al procesar la consulta' });
  }  
});

//catalogo/:id (filtrar por código de la película/serie)

server.get("/catalogo/:id", async (req, res) => {
  const id = req.params.id;
   try {
        
    if (!id) {
      return res.status(400).send({ message: 'El ID no puede ser nulo' });
    }

    const consulta = ` SELECT *, CONCAT('http://127.0.0.1:8080/public', poster) AS poster FROM Vista_Trailerflix WHERE id = :id`;

    const busqueda_ID = await sequelize.query(consulta, {
      replacements: { id },
      type:Sequelize.QueryTypes.SELECT
     });
    if (busqueda_ID.length > 0) {
      res.status(200).send(busqueda_ID);
    } else {
      res.status(404).send({ message: 'No se encontraron resultados para este ID' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error al procesar la consulta' });
  }
});

//(filtrar por género del contenido)
server.get("/catalogo/genero/:genero", async (req,res) => {
  const genero = req.params.genero;
  try {
    const consulta = 'SELECT *, CONCAT ("http://127.0.0.1:3005/8080", poster) AS poster FROM Vista_Trailerflix WHERE genero LIKE :genero'

    const X_Genero = await sequelize.query(consulta, {
      replacements: { genero: `%${genero}%` },
      type: Sequelize.QueryTypes.SELECT });

    if (X_Genero.length > 0) {
        res.status(200).send(X_Genero);
    } else {
        res.status(404).send({ message: "No se encuentran resultados" });
    }
} catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error al procesar la consulta' });
}
})

//filtrar por serie - película 
server.get ("/catalogo/categoria/:categoria", async (req,res) => {
  const  categoria = req.params.categoria;

  try {
    if (!categoria) {
        return res.status(400).send({ message: 'La categoria ingresada no puede ser nula' });
    }
    const consulta = `SELECT *, CONCAT ("http://127.0.0.1:8080/public", poster) AS poster FROM Vista_Trailerflix 
    WHERE categoria IN (
      SELECT Nombre FROM Categorias WHERE Nombre = :categoria )`
    const results = await sequelize.query ( consulta, { 
        replacements: { categoria },
        type:QueryTypes.SELECT });
  if(results.length>0)
    res.status(200).send(results);
    else
    {
        res.status(400).send({ message: "No se encuentran resuldatos" });
    }     
} 
catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error al procesar la consulta' });
}
});

// Control de rutas inexistentes
server.use('*', (req, res) => {
    res.status(404).send({ error: `La URL indicada no existe en este servidor` });
});

// Manejo de errores
server.use((err, req, res, next) => {
    console.log(err)
    res.send(err)
})

// Método oyente de solicitudes
sequelize.authenticate().then(() => {
    sequelize.sync({ force: false }).then(()=>{
        server.listen(process.env.PORT, process.env.HOST, () => {
            console.log(`El servidor está escuchando en: http://${process.env.HOST}:${process.env.PORT}/home`);
        });
    }).catch(()=>{
        console.log("Hubo un problema con la sincronización con la base de datos.")
    })
}).catch(() => {
    console.log("Hubo un problema con la conección a la base de datos.")
});
