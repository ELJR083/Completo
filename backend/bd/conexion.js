const admin = require("firebase-admin");
const keys = require("../keys.json");

admin.initializeApp({
    credential: admin.credential.cert(keys)
})

const bd=admin.firestore();
const usuarios= bd.collection("CompletoBd");
const productos= bd.collection("productosBD");
const ventas = bd.collection("ventasBD");

module.exports={
    usuarios,
    ventas,
    productos
}
    
   //console.log (usuarios);