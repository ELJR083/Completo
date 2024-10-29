const express = require("express");
const ruta = express.Router();
const { mostrarProductos, nuevoProducto, borrarProducto, buscarPorId, editarProducto } = require("../bd/productosBD");

ruta.get("/productos", async (req, res) => {
    const productos = await mostrarProductos();
    res.json(productos);
});

ruta.get("/buscarPorIdp/:id", async (req, res) => {
    var productoValido = await buscarPorId(req.params.id);
    res.json(productoValido);
});

ruta.get("/borrarProducto/:id", async (req, res) => {
    var borrado = await borrarProducto(req.params.id);
    res.json(borrado);
});

ruta.post("/nuevoProducto", async (req, res) => {
    var productoValido = await nuevoProducto(req.body);
    res.json(productoValido);
});

// Nueva ruta para editar un producto
ruta.put("/editarProducto/:id", async (req, res) => {
    const productoEditado = await editarProducto(req.params.id, req.body);
    res.json({ success: productoEditado });
});

module.exports = ruta;
