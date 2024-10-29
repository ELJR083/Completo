import BorrarProducto from "@/components/borrarp"; // Asegúrate de tener el componente de borrado de producto
import axios from "axios";
import Link from "next/link";

// Función asíncrona para obtener productos
async function getProductos() {
    const url = "http://localhost:3000/p/productos";
    const response = await axios.get(url);
    return response.data;
}

export default async function Productos() {
    const productos = await getProductos();
    return (
        <>
            <h1>Productos</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Editar</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productos.map((producto, i) => (
                            <tr key={i}>
                                <td>{producto.id}</td>
                                <td>{producto.nombre}</td>
                                <td>{producto.cantidad}</td>
                                <td>{producto.precio}</td>
                                <td>
                                    <Link href={`/productos/editar/${producto.id}`}>Editar</Link>
                                </td>
                                <td>
                                    <BorrarProducto id={producto.id} /> {/* Componente para borrar */}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    );
}
