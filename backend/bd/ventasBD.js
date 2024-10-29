// ventasBD.js
const ventasBD = require("./conexion").ventas; 
const Ventas = require("../clases/Ventas"); 

const validarDatosVenta = (venta) => {
    let datosCorrectos = false;
    if (venta.idUsuario !== undefined && venta.idProducto !== undefined && venta.cantidad !== undefined) {
        datosCorrectos = true;
    }
    return datosCorrectos;
};

async function mostrarVentas() {
    const ventasSnapshot = await ventasBD.get();
    let ventasValidas = [];

    ventasSnapshot.forEach(doc => {
        const venta = new Ventas({ id: doc.id, ...doc.data() });
        const datosVenta = venta.getVenta;

        if (validarDatosVenta(datosVenta)) { 
            ventasValidas.push(datosVenta); 
        }
    });

    return ventasValidas; 
}

async function buscarVentaPorId(id) {
    const ventaDoc = await ventasBD.doc(id).get();
    const venta = new Ventas({ id: ventaDoc.id, ...ventaDoc.data() });
    let ventaValida = { error: true };

    if (validarDatosVenta(venta.getVenta)) {
        ventaValida = venta.getVenta;
    }

    return ventaValida; 
}

async function nuevaVenta(data) {
    const venta = new Ventas(data);
    let ventaValida = false;

    if (validarDatosVenta(venta.getVenta)) {
        await ventasBD.doc().set(venta.getVenta); 
        ventaValida = true; 
    }

    return ventaValida;
}

async function actualizarStatus(id, nuevoStatus) {
    const venta = await buscarVentaPorId(id); 
    let actualizado = false;

    if (!venta.error) { // Verifica que la venta exista
        await ventasBD.doc(id).update({ status: nuevoStatus }); 
        actualizado = true; 
    }

    return actualizado; 
}

async function borrarVenta(id) {
    const venta = await buscarVentaPorId(id); 
    let borrado = false;

    if (!venta.error) { 
        await ventasBD.doc(id).delete(); 
        borrado = true; 
    }

    return borrado; 
}

// Nueva función para editar una venta
async function editarVenta(id, data) {
    const ventaExistente = await buscarVentaPorId(id); // Busca la venta por ID
    let ventaEditada = false;

    if (!ventaExistente.error) {
        const ventaActualizada = new Ventas({ id, ...ventaExistente, ...data });
        
        if (validarDatosVenta(ventaActualizada.getVenta)) { // Valida los nuevos datos
            await ventasBD.doc(id).update(ventaActualizada.getVenta); // Actualiza la venta en la base de datos
            ventaEditada = true; // Marca que la edición fue exitosa
        }
    }

    return ventaEditada; // Devuelve el resultado de la edición
}

// Exportar las funciones
module.exports = {
    mostrarVentas,
    nuevaVenta,
    buscarVentaPorId,
    actualizarStatus,
    borrarVenta,
    editarVenta // Asegúrate de exportar la nueva función
};
