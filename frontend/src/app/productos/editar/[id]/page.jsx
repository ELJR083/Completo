"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function EditarProducto({ params }) {
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [cantidad, setCantidad] = useState("");
    const router = useRouter();
    const { id } = params;

    async function editarProducto(e) {
        e.preventDefault();
        const url = `http://localhost:3000/p/editarProducto/${id}`;
        const datos = { nombre, precio, cantidad };

        try {
            await axios.put(url, datos);
            alert("Producto editado correctamente");
            router.push("/productos/mostrar");
        } catch (error) {
            alert("Ocurrió un error al intentar editar el producto");
        }
    }

    return (
        <div className="m-0 row justify-content-center">
            <form onSubmit={editarProducto} className="col-6 mt-5">
                <div className="card">
                    <div className="card-header">
                        <h1>Editar Producto</h1>
                    </div>
                    <div className="card-body">
                        <input
                            placeholder="Nombre"
                            className="form-control mb-3"
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                        <input
                            placeholder="Precio"
                            className="form-control mb-3"
                            type="text"
                            value={precio}
                            onChange={(e) => setPrecio(e.target.value)}
                            required
                        />
                        <input
                            placeholder="Cantidad"
                            className="form-control mb-3"
                            type="text"
                            value={cantidad}
                            onChange={(e) => setCantidad(e.target.value)}
                            required
                        />
                    </div>
                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary">
                            Guardar edición del producto
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
