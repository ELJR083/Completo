const crypto=require("crypto");
//aqui abajo se declara password y despues se pone en cryptosync
function encriptarPassword(password){//es nuestra funcion para poder encriptar la contraseña y cada que reinicies dara uno diferente
    const salt=crypto.randomBytes(32).toString("hex");
   // console.log(salt);
   const hash= crypto.scryptSync(password,salt,100000,64,"sha512").toString("hex");
  //console.log(hash);
   return{
    salt,
    hash
   }
}
   function validarPassword(paswword,hash,salt){
    const hashEvaluar= crypto.scryptSync(password,salt,100000,64,"sha512").toString("hex");
    return hashEvaluar==hash;
   }
   function usuarioutorizado(){//usuario normal
   }
   function adminautorizado(){//administrador

   }

module.exports={
    encriptarPassword,
    validarPassword,
    usuarioutorizado,
    adminautorizado
}

