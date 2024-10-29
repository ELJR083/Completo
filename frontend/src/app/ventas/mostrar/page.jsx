"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import BorrarVenta from "@/components/borrarv"; // Asegúrate de que la ruta es correcta

export default function MostrarVentas() {
    const [ventas, setVentas] = useState([]);

    // Función para obtener las ventas
    const getVentas = async () => {
        const url = "http://localhost:3000/v/ventas"; // Asegúrate de que la URL es correcta
        try {
            const response = await axios.get(url);
            setVentas(response.data); // Establece las ventas en el estado
        } catch (error) {
            console.error("Error al obtener las ventas:", error);
            alert("Ocurrió un error al intentar cargar las ventas.");
        }
    };

    useEffect(() => {
        getVentas(); // Llama a la función para obtener las ventas al cargar el componente
    }, []);

    return (
        <>
            <h1>Ventas</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cantidad</th>
                        <th>ID Producto</th>
                        <th>ID Usuario</th>
                        <th>Fecha y Hora</th>
                        <th>Status</th>
                        <th>Editar</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {ventas.length > 0 ? (
                        ventas.map((venta) => (
                            <tr key={venta.id}>
                                <td>{venta.id}</td>
                                <td>{venta.cantidad}</td>
                                <td>{venta.idProducto}</td>
                                <td>{venta.idUsuario}</td>
                                <td>{new Date(venta.fechaHora).toLocaleString()}</td>
                                <td>{venta.status}</td>
                                <td>
                                    <Link href={`/ventas/editar/${venta.id}`}>Editar</Link>
                                </td>
                                <td>
                                    <BorrarVenta id={venta.id} /> {/* Componente para borrar la venta */}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="text-center">
                                No hay ventas registradas.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}
