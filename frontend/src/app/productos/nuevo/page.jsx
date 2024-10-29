"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function NuevoProducto() {
    const [nombre, setNombre] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [precio, setPrecio] = useState("");
    const router = useRouter();

    async function crearProducto(e) {
        e.preventDefault();
        const url = "http://localhost:3000/p/nuevoProducto";
        const datos = { nombre, cantidad, precio };

        try {
            await axios.post(url, datos);
            alert("Producto creado exitosamente");
            router.push("/productos/mostrar"); // Redirige a la lista de productos
        } catch (error) {
            console.error("Error al crear el producto:", error);
            alert("Ocurrió un error al intentar crear el producto");
        }
    }

    return (
        <div className="m-0 row justify-content-center">
            <form onSubmit={crearProducto} className="col-6 mt-5">
                <h1>Nuevo Producto</h1>
                <input 
                    placeholder="Nombre" 
                    className="form-control mb-3" 
                    type="text" 
                    value={nombre} 
                    onChange={(e) => setNombre(e.target.value)} 
                    required 
                />
                <input 
                    placeholder="Cantidad" 
                    className="form-control mb-3" 
                    type="number" 
                    value={cantidad} 
                    onChange={(e) => setCantidad(e.target.value)} 
                    required 
                />
                <input 
                    placeholder="Precio" 
                    className="form-control mb-3" 
                    type="number" 
                    value={precio} 
                    onChange={(e) => setPrecio(e.target.value)} 
                    required 
                />
                <button type="submit" className="btn btn-primary col-12">Guardar Producto</button>
            </form>
        </div>
    );
}
