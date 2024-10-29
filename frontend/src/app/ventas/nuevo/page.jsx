"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AgregarVenta() {
    const [cantidad, setCantidad] = useState("");
    const [idProducto, setIdProducto] = useState("");
    const [idUsuario, setIdUsuario] = useState("");
    const [status, setStatus] = useState("");
    const router = useRouter();

    async function agregarVenta(e) {
        e.preventDefault();
        const url = "http://localhost:3000/v/nuevaVenta";
        const datos = { cantidad, idProducto, idUsuario, status };

        try {
            await axios.post(url, datos);
            alert("Venta agregada correctamente");
            router.push("/ventas/mostrar");
        } catch (error) {
            alert("Ocurrió un error al intentar agregar la venta.");
            console.error("Error al agregar la venta:", error);
        }
    }

    return (
        <div className="m-0 row justify-content-center">
            <form onSubmit={agregarVenta} className="col-6 mt-5">
                <div className="card">
                    <div className="card-header">
                        <h1>Agregar Venta</h1>
                    </div>
                    <div className="card-body">
                        <input
                            placeholder="Cantidad"
                            className="form-control mb-3"
                            type="text"
                            value={cantidad}
                            onChange={(e) => setCantidad(e.target.value)}
                            required
                        />
                        <input
                            placeholder="ID Producto"
                            className="form-control mb-3"
                            type="text"
                            value={idProducto}
                            onChange={(e) => setIdProducto(e.target.value)}
                            required
                        />
                        <input
                            placeholder="ID Usuario"
                            className="form-control mb-3"
                            type="text"
                            value={idUsuario}
                            onChange={(e) => setIdUsuario(e.target.value)}
                            required
                        />
                        <input
                            placeholder="Status"
                            className="form-control mb-3"
                            type="text"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required
                        />
                    </div>
                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary">
                            Agregar Venta
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
