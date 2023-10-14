# Proyecto Integral N°3
El presente documento, es el **Proyecto Integral N°3** de ***Argentina Program 4.0***. Esta es una pequeña solución informática que sirve registrar y buscar peliculas, series y documentales de un amplio catalogo.
La misma, fue diseñada y construida sobre una arquitectura API RESTful, la cual está desarrollada bajo las restricciones y recomendaciones de REST.

#### Especificaciones
- Servidor: http://127.0.0.1:8080
- Autor: Gonzalez Victor Lautaro
- Versión: 1.0.3

#### Requerimientos
- Node.js v18.16.1
- MySql v8.0.31
- PHP v8.0.26
- GIT v2.40.1
- IDE - Visual Studio Code v1.78.2

#### Estructura de directorios
``` PROYECTO3
   \---node_modules
   \---src
    |   server.js
    +---conection
    |       connection.js
    |
    +---models
    |       actricesactores.js
    |       catalogo.js
    |       catalogoactricesactores.js
    |       catalogocategoria.js
    |       catalogogenero.js
    |       categoria.js
    |       genero.js
    |       index.js
    |       
    +---recursos
    |       data-migration.php
    |       modelo-trailerflix-db.png
    |       trailerflix.json
    |       trailerflixQuery.sql
    |
    \---routes
            actricesactores.js
            catalogo.js
            categoria.js
            genero.js
```

---
### CONFIGURACION DE ENTORNO
  - #### VARIABLES DE ENTORNO  
  - ARCHIVO .env.dist 
    Con respecto a su contenido, es necesario asignar los valores correspondientes a las variables:
    ``` 
    DB_HOST=''
    DB_USERNAME=''
    DB_PASSWORD=''
    ```
  - #### TO DO
    - Instalar node modules y npm 
      ```
      npm install
      ```
    - Crear script MySQL para creación de la base de datos, tablas, relaciones, vista y carga de datos inicial
      ```
      npm run generate
      ```
    - iniciar instancia del servidor
      ```
        npm run start
      ```
  - #### TESTS
    Hasta el momento, no hay una suite de test.
    Debe correr el servidor en modo watch para realizar pruebas y cambios live, se ejecuta por medio del comando ***npm run test***.

  - #### ERRORES & FORMATOS
    La comprobación de errores y formatos se ejecuta por medio del comando ***npm run eslint***. se hace por medio de Eslint. Para visualizar los errores en tiempo de escritura, se debe tener instalada la extensión de **Eslint** en Visual Studio Code.
---
#### Dependencias Node.js
1. dotenv -> 16.3.1
2. express -> 4.18.2
3. mongodb -> 5.6.0
4. mysql2 -> 3.6.1
5. sequelize -> 6.33.0
---
#### Especificaciones del servidor
- Endpoints:
  - GET - /
  - GET - /categorias
  - GET - /generos
  - GET - /catalogo
  - GET - /catalogo/:id
  - GET - /catalogo/nombre/:nombre
  - GET - /catalogo/genero/:genero
  - GET - /catalogo/categoria/:categoria
---
#### Métodos HTTP

| Tipo          | URI           | Descripción                        |
|---------------|---------------|-----------------------------------|
| GET | http://127.0.0.1:3005/categoria | Nos muestra todas las categorias que existen |
| GET | http://127.0.0.1:3005/catalogo | Nos muestra el catálogo completo de la BBDD |
| GET | http://127.0.0.1:3005/catalogo/:id | Nos muestra un registro en específico(filtrado por ID) |
| GET | http://127.0.0.1:3005/catalogo/genero/:genero | Nos muestra el filtro por género |
| GET | http://127.0.0.1:3005/catalogo/categoria/:categoria | Nos muestra el filtro por categoria |

#### Método GET:
- Request:
  - Parámetros opcionales de tipo PARAMS:
    - /genero/aventura  (tipo: string. Trae los titulos del genero filtrado) 
    - /categoria/pelicula (tipo: string. Trae los titulos de la categoria filtrada) 
     
  -Respuesta:
  ``` 
      json
        {
        "id": 8,
        "poster": "/posters/8.jpg",
        "titulo": "Avengers: End Game",
        "categoria": "Película",
        "genero": "Aventura, Sci-Fi, Acción",
        "resumen": "Después de los devastadores eventos de los Vengadores: Infinity War (2018), el universo está en ruinas. Con la ayuda de los aliados restantes, los Vengadores se reúnen una vez más para revertir las acciones de Thanos y restaurar el equilibrio del universo.",
        "temporadas": "N/A",
        "reparto": "Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth, Scarlett Johansson, Jeremy Renner"
        }
     ``` 

  -Código HTTP: *200* Devuelve títulos filtrados

  -Código HTTP: *400* Message: Sin resultados

  -Código HTTP: *500* Message: Error al procesar la consulta

#### Método GET - Específico:
- Request:
  - Parámetro obligatorio de tipo URL:
    - 5 (tipo: integer. Indica el código del catalogo que se requiere obtener)
     
  -Respuesta:
    ``` 
      json
        {
        "id": 5,
        "poster": "/posters/5.jpg",
        "titulo": "Gambito de Dama",
        "categoria": "Serie",
        "genero": "Drama, Ficción, Sucesos",
        "resumen": "En los cincuenta, una joven de un orfanato descubre que tiene un increíble don para el ajedrez y recorre el arduo camino a la fama mientras lucha contra las adicciones.",
        "temporadas": 1,
        "reparto": "Anya Taylor-Joy, Thomas Brodie-Sangster, Harry Melling, Moses Ingram, Chloe Pirrie, Janina Elkin"
        }
    ```
  -Código HTTP: *200* Devuelve el título filtrado

  -Código HTTP: *400* Message: Sin resultados para este ID

  -Código HTTP: *500* Message: Error al procesar la consulta.
#### Notas:
```
  Archivos útiles o secundarios en carpeta "recursos"
```