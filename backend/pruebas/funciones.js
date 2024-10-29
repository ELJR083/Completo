function saludar(nombre) {
    console.log("hola" + nombre);
}
//saludar("Paco");
var saludo=nombre=>{
    console.log("hola"+ nombre);

}
saludo("pancho");
//saludo 2
var saludo2=(nombre1,nombre2)=>{
    console.log("hola"+ nombre1+ "y"+ nombre2);

}
saludo2("pancho","pedro");
//saludo3

var saludo3=(nombre1,nombre2)=>{
    
return "hola"+ nombre1+ "y"+ nombre2;;
}
console.log(saludo3("hugo","luis"));

//saludo4

var saludo4=(nombre1)=>"hola"+ nombre1;
    
    console.log(saludo4("bethoven"));
    //saludo5=funcion anonima
    var saludo5=function(){
        console.log("hola con funcion anonima");
    }
    saludo5();
    //saludo6
    var saludo6=()=>{
        console.log("Estas en saludo6");
    }
    //saludo7
    var saludo7=(nombre="entrenador pokemon",s)=>{
        console.log("hola "+nombre);
        s();
    }
    saludo7("pequeña", saludo6);