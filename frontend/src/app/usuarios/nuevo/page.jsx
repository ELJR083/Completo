"use client"
import axios from "axios";
async function guardarUsuario(e){
    e.preventDefault();
    console.log("estas en guardar usuario");

   const url="http://localhost:3000/nuevoUsuario";
   const datos={
        nombre:document.getElementById("nombre").value,
        usuario:document.getElementById("usuario").value,
        password:document.getElementById("password").value
   }   
   const respuesta= await axios.post(url,datos);
   //window.replace("http://localhost:3000/usuarioshttp://localhost:3000/mostrarusuario")
   window.location.href="http://localhost:3001/usuarios/mostrar"
 //  console.log(datos);

}
export default function NuevoUsuario(e){
    return(
        <div className="m-0 row justify-content-center">
            <form onSubmit={guardarUsuario} className="col-6 mt-5" action="" method="post">
                <div className="card"></div>
            <div className="card-header"></div>
            <h1>Nuevo Usuario</h1>
            <div className="card-body">
                <input placeholder="Nombre" className="form-control mb-3"  id="nombre" required autoFocus type="text"></input>
                <input placeholder="Usuario" className="form-control mb-3" id="usuario" required autoFocus type="text"></input>
                <input placeholder="Password" className="form-control mb-3"  id="password" required autoFocus type="text"></input>
            
                </div>
            <div className="card-footer"></div>
            <button className="btn btn-primary col13">Guardar nuevo usuario</button>
            </form>
            
        </div>
    )
}