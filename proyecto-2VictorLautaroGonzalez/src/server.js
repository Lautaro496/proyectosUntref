const express = require('express');
const {
    connectToCollection,
    desconnect,
    generateCodigo
} = require('../connection_db.js');

const server = express();

const messageNotFound = JSON.stringify({
    message: 'El código no corresponde a un mueble registrado'
});
const messageMissingData = JSON.stringify({ message: 'Faltan datos' });
// const messageExceedsAmount = JSON.stringify({ message: 'supera el maximo' });
const messageErrorServer = JSON.stringify({
    message: 'Se ha generado un error en el servidor'
});

// Middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// a) Obtener los registros de todos los muebles (sin ordenar)
server.get('/muebles', async (req, res) => {
    let muebles = [];
    try {
        const collection = await connectToCollection('muebles');
        if (muebles) muebles = await collection.findAll().toArray();
        res.status(200).send(JSON.stringify({ payload: muebles }));
    } catch (error) {
        console.log(error.message);
        res.status(500).send(messageErrorServer);
    } finally {
        await desconnect();
    }
});

server.get('/muebles', async (req, res) => {
    const { categoria, precio_gte, precio_lte } = req.query;
    let muebles = [];

    try {
        const collection = await connectToCollection('muebles');

        if (categoria) muebles = await collection.find({ categoria }).toArray();
        // else if (precio_lte === 'min') muebles = await collection.find().sort({ precio: 1 }).limit(1).toArray();
        // else if (precio_gte === 'precio_gte') muebles = await collection.find().sort({ precio: -1 }).limit().toArray();
        // else if (precio_gte <= 500) res.status(400).send(JSON.stringify({messageExceedsAmount}));
        else if (precio_gte >= 500) muebles = await collection
            .find({ precio: { $gte: Number(precio_gte) } })
            .toArray();
        else if (precio_lte) muebles = await collection
            .find({ precio: { $lte: Number(precio_lte) } })
            .toArray();
        else muebles = await collection.find().toArray();


        res.status(200).send(JSON.stringify({ payload: muebles }));
    } catch (error) {
        console.log(error.message);
        res.status(500).send(messageErrorServer);
    } finally {
        await desconnect();
    }
});

server.get('/muebles/:codigo', async (req, res) => {
    const { codigo } = req.params;

    try {
        const collection = await connectToCollection('muebles');
        const mueble = await collection.findOne({ codigo: { $eq: Number(codigo) } });

        if (!mueble) return res.status(400).send(messageNotFound);

        res.status(200).send(JSON.stringify({ payload: mueble }));
    } catch (error) {
        console.log(error.message);
        res.status(500).send(messageErrorServer);
    } finally {
        await desconnect();
    }
});

server.post('/muebles', async (req, res) => {
    const { nombre, precio, categoria} = req.body;

    if (!nombre && !precio && !categoria) return res.status(400).send(messageMissingData);
    try {
        const collection = await connectToCollection('muebles');
        const mueble = {
            codigo: await generateCodigo(collection),
            nombre,
            precio,
            categoria
        };
        await collection.insertOne(mueble);
        res.status(201).send(JSON.stringify({ message: 'Registro creado', payload: mueble }));
    } catch (error) {
        console.log(error.message);
        res.status(500).send(messageErrorServer);
    } finally {
        await desconnect();
    }
});

server.put('/muebles/:codigo', async (req, res) => {
    const { codigo } = req.params;
    const { nombre, precio, categoria } = req.body;

    if (!nombre && !precio && !categoria) return res.status(400).send(messageMissingData);

    try {
        const collection = await connectToCollection('muebles');
        let mueble = await collection.findOne({ codigo: { $eq: Number(codigo) } });

        if (!mueble) return res.status(400).send(messageNotFound);
        mueble = { categoria, nombre, precio };

        await collection.updateOne({ codigo: Number(codigo) }, { $set: mueble });
        res
            .status(200)
            .send(JSON.stringify({
                message: 'mueble actualizado',
                payload: { codigo, ...mueble }
            }));
    } catch (error) {
        console.log(error.message);
        res.status(500).send(messageErrorServer);
    } finally {
        await desconnect();
    }
});

server.delete('/muebles/:codigo', async (req, res) => {
    const { codigo } = req.params;

    try {
        const collection = await connectToCollection('muebles');
        const mueble = await collection.findOne({ codigo: { $eq: Number(codigo) } });

        if (!mueble) return res.status(400).send(messageNotFound);

        await collection.deleteOne({ codigo: { $eq: Number(codigo) } });
        res.status(200).send(JSON.stringify({ message: 'Registro eliminado' }));
    } catch (error) {
        console.log(error.message);
        res.status(500).send(messageErrorServer);
    } finally {
        await desconnect();
    }
});

// Control de rutas inexistentes
server.use('*', (req, res) => {
    res
        .status(404)
        .send(`<h1>Error 404</h1><h3>La URL indicada no existe en este servidor</h3>`);
});

// Método oyente de solicitudes
server.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {
    console.log(`Ejecutandose en http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/muebles`);
});
