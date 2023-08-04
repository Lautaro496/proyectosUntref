
const express = require('express');
const {
    connectToCollection,
    desconnect,
    generateCodigo
} = require('../connection_db.js');

const server = express();


// Middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// a) Obtener los registros de todos los muebles (sin ordenar)
// b) Obtener los registros de los muebles filtrados y ordenados por una categoría
// c)Obtener los registros de los muebles por precio mayor o igual que un valor y
// ordenados por el precio de forma ascendente
// d) Obtener los registros de los muebles por precio menor o igual que un valor y
// ordenados por el precio de forma descendente
server.get('/api/v1/muebles', async (req, res) => {
    const { categoria, precio_lte, precio_gte } = req.query;
    let muebles = [];

    try {
        const collection = await connectToCollection('muebles');

        if (categoria) muebles = await collection.find({categoria}).sort({ nombre: 1 }).toArray();
        else if (precio_gte) muebles = await collection.find({precio: {$gte: Number(precio_gte)}}).sort({ precio: 1 }).toArray();
        else if (precio_lte) muebles = await collection.find({precio: {$lte: Number(precio_lte)}}).sort({ precio: -1 }).toArray();
        else muebles = await collection.find().toArray();

        res.status(200).send(JSON.stringify({payload: muebles}));
    } catch (error) {
        console.log(error.message);
        res.status(500).send(JSON.stringify({message: 'Se ha generado un error en el servidor'}));
    } finally {
        await desconnect();
    }
});

// e) Obtener el registro de un mueble por su código
server.get('/api/v1/muebles/:codigo', async (req, res) => {
    const { codigo } = req.params;

    try {
        const collection = await connectToCollection('muebles');
        const mueble = await collection.findOne({
            codigo: { $eq: Number(codigo) }
        });

        if (!mueble) return res
            .status(400)
            .send(JSON.stringify({
                message: 'El código no corresponde a un mueble registrado'
            }));

        res.status(200).send(JSON.stringify({payload: mueble}));
    } catch (error) {
        console.log(error.message);
        res.status(500).send(JSON.stringify({message: 'Se ha generado un error en el servidor'}));
    } finally {
        await desconnect();
    }
});

// f) Crear un nuevo registro de un mueble (contemplar la validación del esquema)
server.post('/api/v1/muebles', async (req, res) => {
    const {nombre, precio, categoria} = req.body;

    if (!nombre && !precio && !categoria) return res.status(400).send(JSON.stringify({ message: 'Faltan datos relevantes' }));
    try {
        const collection = await connectToCollection('muebles');
        const mueble = {
            codigo: await generateCodigo(collection),
            nombre,
            precio,
            categoria
        };
        await collection.insertOne(mueble);
        res
            .status(201)
            .send(JSON.stringify({ message: 'Registro creado', payload: mueble }));
    } catch (error) {
        console.log(error.message);
        res
            .status(500)
            .send(JSON.stringify({ message: 'Se ha generado un error en el servidor' }));
    } finally {
        await desconnect();
    }
});

// g) Actualizar el registro de un mueble por su código (contemplar la validación del esquema)
server.put('/api/v1/muebles/:codigo', async (req, res) => {
    const { codigo } = req.params;
    const { nombre, precio, categoria } = req.body;

    if (!nombre && !precio && !categoria) return res.status(400).send(JSON.stringify({ message: 'Faltan datos relevantes' }));

    try {
        const collection = await connectToCollection('muebles');
        let mueble = await collection.findOne({ codigo: { $eq: Number(codigo) } });

        if (!mueble) return res.status(400).send(JSON.stringify({message: 'El código no corresponde a un mueble registrado'}));
        mueble = { categoria, nombre, precio };

        await collection.updateOne({ codigo: Number(codigo) }, { $set: mueble });
        res.status(200).send(JSON.stringify({
            message: 'Registro actualizado',
            payload: { codigo, ...mueble }
        }));
    } catch (error) {
        console.log(error.message);
        res.status(500).send(JSON.stringify({message: 'Se ha generado un error en el servidor'}));
    } finally {
        await desconnect();
    }
});


// h) Eliminar el registro de un mueble por su código
server.delete('/api/v1/muebles/:codigo', async (req, res) => {
    const { codigo } = req.params;

    try {
        const collection = await connectToCollection('muebles');
        const mueble = await collection.findOne({
            codigo: { $eq: Number(codigo) }
        });

        if (!mueble) return res.status(400).send(JSON.stringify({message: 'El código no corresponde a un mueble registrado'}));

        await collection.deleteOne({ codigo: { $eq: Number(codigo) } });
        res.status(200).send(JSON.stringify({ message: 'Registro eliminado' }));
    } catch (error) {
        console.log(error.message);
        res.status(500).send(JSON.stringify({message: 'Se ha generado un error en el servidor'}));
    } finally {
        await desconnect();
    }
});

// i) Controlar las rutas inexistentes
server.use('*', (req, res) => {
    res
        .status(404)
        .send(`<h1>Error 404</h1><h3>La URL indicada no existe en este servidor</h3>`);
});

// Método oyente de solicitudes
server.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {
    console.log(`Ejecutandose en http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/muebles`);
});
