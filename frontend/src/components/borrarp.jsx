"use client";
import Link from "next/link";
import axios from "axios";

export default function BorrarProducto({ id }) {
    async function borrar() {
        const url = `http://localhost:3000/p/borrarProducto/${id}`;

        try {
            await axios.get(url);
            window.location.replace("/productos/mostrar");
        } catch (error) {
            alert("Ocurrió un error al intentar borrar el producto.");
            console.error("Error al borrar el producto:", error);
        }
    }

    return (
        <Link href="" onClick={borrar}>
            Borrar
        </Link>
    );
}
