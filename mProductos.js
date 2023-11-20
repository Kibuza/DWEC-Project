import { Producto } from "./pojoProductos.js";

export { DatosProductos };

class DatosProductos {
  constructor(arrayproductos) {
    console.log("Estoy en el constructor de DatosProductos");
    if (this.arrayproductos == null) this.arrayproductos = [];
    if (this.arrayproductos.length == 0) {
      this.arrayproductos = [];
    }
  }

  getProductos() {
    return this.arrayproductos;
  }

  modificar(DatosModificados) {

    const jsonAEnviar = JSON.stringify(DatosModificados);
    console.log("Vas a modificar -->", jsonAEnviar);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "./backend/mod-producto.php", false);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.send("json=" + jsonAEnviar);
    var phptext = xhr.responseText;
    console.log(phptext);
    if (phptext == "Error") {
      console.log("Algo no ha funcionado en la BBDD")
    } else {
      location.reload();
    }
  }

  insertar(producto) {
    console.log("Estoy en insertar en el modelo");
    const jsonAEnviar = JSON.stringify(producto);
    console.log("insert -->", jsonAEnviar);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "./backend/ins-producto.php", false);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.send("json=" + jsonAEnviar);
    var phptext = xhr.responseText;
    console.log(phptext);
    if (phptext == "Error") {
      //console.log("Algo no ha funcionado en la BBDD")
    } else {
      this.arrayproductos.push(producto);
      location.reload();
    }
  }

  eliminar(idProducto) {
    this.arrayproductos.splice(idProducto, 1);
    console.log("Estoy en eliminar en el modelo");
    const jsonAEnviar = JSON.stringify(idProducto);
    console.log("Vas a eliminar -->", jsonAEnviar);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "./backend/del-producto.php", false);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.send("json=" + jsonAEnviar);
    var phptext = xhr.responseText;
    console.log(phptext);
    if (phptext == "Error") {
      //console.log("Algo no ha funcionado en la BBDD")
    } else {
      this.arrayproductos.pop(producto);
      location.reload();
    }
  }

  async CargarProductos() {
    self = this;
    const promesaUsuarios = new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      let url = `./backend/cargar-producto.php`;
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          var productos = JSON.parse(this.responseText);
          self.arrayproductos = productos;
          resolve(productos);
        } else {
          reject;
        }
      };
      xhr.send();
    });
    return promesaUsuarios;
  }
}
