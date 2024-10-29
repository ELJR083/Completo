class Ventas {
    constructor(data) {
        this.id = data.id;
        this.idUsuario = data.idUsuario;
        this.idProducto = data.idProducto;
        this.cantidad = data.cantidad;
        this.fechaHora = new Date();
        this.status = data.status || "pendiente"; // Asigna "pendiente" si no se especifica status
    }

    
    set id(id) {
        this._id = id;
    }

    set idUsuario(idUsuario) {
        if (idUsuario) {
            this._idUsuario = idUsuario;
        }
    }

    set idProducto(idProducto) {
        if (idProducto) {
            this._idProducto = idProducto;
        }
    }

    set cantidad(cantidad) {
        if (cantidad > 0) {
            this._cantidad = cantidad;
        }
    }

    set fechaHora(fechaHora) {
        this._fechaHora = fechaHora || new Date();
    }

    set status(status) {
        const validStatuses = ["pendiente", "completado", "cancelado"];
        if (validStatuses.includes(status)) {
            this._status = status;
        } else {
            this._status = "pendiente";
        }
    }

    
    get id() {
        return this._id;
    }

    get idUsuario() {
        return this._idUsuario;
    }

    get idProducto() {
        return this._idProducto;
    }

    get cantidad() {
        return this._cantidad;
    }

    get fechaHora() {
        return this._fechaHora;
    }

    get status() {
        return this._status;
    }


    get getVenta() {
        const conId = {
            id: this._id,
            idUsuario: this._idUsuario,
            idProducto: this._idProducto,
            cantidad: this._cantidad,
            fechaHora: this._fechaHora,
            status: this._status
        };

        const sinId = {
            idUsuario: this._idUsuario,
            idProducto: this._idProducto,
            cantidad: this._cantidad,
            fechaHora: this._fechaHora,
            status: this._status
        };

        return this.id !== undefined ? conId : sinId;
    }
}

module.exports = Ventas;


