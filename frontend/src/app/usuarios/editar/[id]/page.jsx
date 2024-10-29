"use client"; 

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import axios from "axios";

export default function EditarUsuario({ params }) {
    const [nombre, setNombre] = useState("");
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const { id } = params; 

    useEffect(() => {
        async function fetchUserData() {
            if (id) {
                try {
                    const response = await axios.get(`http://localhost:3000/editarUsuario/${id}`);
                    const userData = response.data;
                    setNombre(userData.nombre);
                    setUsuario(userData.usuario);
                    setPassword(userData.password || "");
                } catch (error) {
                    console.error("Error al cargar los datos del usuario:", error);
                }
            }
        }
        fetchUserData();
    }, [id]);

    async function editarUsuario(e) {
        e.preventDefault(); 
        console.log("Estás en editarUsuario");
        const url = `http://localhost:3000/editarUsuario/${id}`; 
        const datos = {
            nombre,
            usuario,
            password
        };

        try {
            const respuesta = await axios.put(url, datos); 
            console.log(respuesta.data);
            alert("Usuario editado correctamente");
            router.push("/usuarios/mostrar"); 
        } catch (error) {
            console.error("Error al intentar editar el usuario:", error);
            alert("Ocurrió un error al intentar editar el usuario");
        }
    }

    return (
        <div className="m-0 row justify-content-center">
            <form onSubmit={editarUsuario} className="col-6 mt-5">
                <div className="card">
                    <div className="card-header">
                        <h1>Editar usuario</h1>
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
                            placeholder="Usuario" 
                            className="form-control mb-3" 
                            type="text" 
                            value={usuario} 
                            onChange={(e) => setUsuario(e.target.value)} 
                            required 
                        />
                        <input 
                            placeholder="Password" 
                            className="form-control mb-3" 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary">
                            Guardar edición de usuario
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
