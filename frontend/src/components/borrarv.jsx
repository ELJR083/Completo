"use client";
import Link from "next/link";
import axios from "axios";

export default function BorrarVenta({ id }) {
    async function borrar() {
        const url = `http://localhost:3000/v/borrarVenta/${id}`;

        try {
            await axios.get(url);
            window.location.replace("/ventas/mostrar");
        } catch (error) {
            alert("Ocurrió un error al intentar borrar la venta.");
            console.error("Error al borrar la venta:", error);
        }
    }

    return (
        <Link href="#" onClick={borrar}>
            Borrar
        </Link>
    );
}
