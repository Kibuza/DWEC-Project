import { Producto } from "./pojoProductos.js";
import { DatosProductos } from "./mProductos.js";

console.log("Entro al controller ");
var arrayProductos = []; //Creamos un array vacío de productos

console.log("Voy a instanciar a un objeto del modelo, tipo DatosProductos");
var mDatosProductos = new DatosProductos(arrayProductos); //Creamos un objetos de la clase DatosProductos pasándole el array vacío ¿tiene sentido? en el controlador de DatosProductos no se usa

class Controller_Productos {
  constructor() {
    arrayProductos = mDatosProductos.getProductos();
    this.elem = arrayProductos[0]; //Elem es el primer elemento de arrayProductos
    this.elemVisualizado = 0;

    /* Eventos CRUD */

    //BOTÓN INSERTAR
    document
      .getElementById("inserta")
      .addEventListener("click", function (event) {
        //Creo un nuevo Producto con los datos del formulario y lo introduzco en el elem de CtrlProductos
        console.log("Estoy en click: obtenerformulario");
        CtrlProductos.elem = CtrlProductos.obtenerFormulario();
        //Inserto el elemento de CtrlProductos en el array de mDatosProductos (en la funciónn hay un this.arrayproductos.push())
        console.log("Estoy en click: llamo a insertar");
        mDatosProductos.insertar(CtrlProductos.elem);
        //Cambia el elemento visualizado a la longitud del array
        CtrlProductos.elemVisualizado = arrayProductos.length - 1;
        event.preventDefault();
      });

    //BOTÓN MODIFICAR
    document
      .getElementById("modifica")
      .addEventListener("click", function (event) {
        event.preventDefault();

        document.getElementById("caja_modificar").hidden = true;

        CtrlProductos.elem = CtrlProductos.obtenerFormularioMod();
        var indice = document.getElementById("index_id").value;
        console.log(indice);
        //Le estoy pasando al método del modelo un objeto que ya tiene la id de la base de datos:
        mDatosProductos.modificar(
          CtrlProductos.elem, indice
        );

        async function refrescarTabla(){
          await CtrlProductos.actualizarTabla();
        }
        refrescarTabla();

      });

    //BOTÓN TABLA
    document.getElementById("showTable").addEventListener("click", () => {
      var vistaVertical = document.getElementById("vista_vertical");
      var vistaCrud = document.getElementById("crud");
      var vistamod = document.getElementById("caja_modificar");

      //Oculto o muestro la tabla cada vez que pulso el botón
      if (vistaVertical.hidden === false) {
        document.getElementById("showTable").innerHTML = "Mostrar tabla";
        vistaVertical.hidden = true;
        vistaCrud.hidden = false;
        vistamod.hidden = true;
      } else {
        document.getElementById("showTable").innerHTML = "Ocultar tabla";
        vistaVertical.hidden = false;
        vistaCrud.hidden = true;
      }

      this.actualizarTabla();
    });

    /* Eventos movimiento */
    document
      .getElementById("boton1")
      .addEventListener("click", function (event) {
        CtrlProductos.elemVisualizado = 0;
        CtrlProductos.show();
        event.preventDefault();
      });

    document
      .getElementById("atras")
      .addEventListener("click", function (event) {
        if (CtrlProductos.elemVisualizado > 0) {
          CtrlProductos.elemVisualizado -= 1;
          CtrlProductos.show();
        }
        event.preventDefault();
      });

    document
      .getElementById("adelante")
      .addEventListener("click", function (event) {
        // if (CtrlProductos.validaApellido()) {
        if (CtrlProductos.elemVisualizado < arrayProductos.length - 1) {
          CtrlProductos.elemVisualizado += 1;
          CtrlProductos.show();
          event.preventDefault();
        }
        //}
      });
    //BOTÓN BUSCAR
    document
      .getElementById("buscarN")
      .addEventListener("click", function (event) {
        var nombre = document.getElementById("buscarNombre").value;
        var enc = false;

        for (var i = 0; i < arrayProductos.length; i++) {
          if (arrayProductos[i].nombre == nombre) {
            CtrlProductos.fijarValores(arrayProductos[i]);
            enc = true;
            CtrlProductos.elemVisualizado = i;
            CtrlProductos.show();
            break;
          }
        }
        if (!enc) {
          document.getElementById("buscarNombre").value = "NO ENCONTRADO";
          document.getElementById("buscarNombre").focus();
          document.getElementById("buscarNombre").select();
          CtrlProductos.vaciar();
          event.preventDefault();
        }
      });
  }

  error(elemento, mensaje) {
    document.getElementById("mensajeError").innerHTML = mensaje;
    elemento.className = "error";
    elemento.focus();
  }

  //En este método se crear la tabla, llenándose con los valores del arrayProductos (que contiene los productos de la base de datos):
  actualizarTabla() {
    var tabla = document.getElementById("vista_vertical").firstChild;

    tabla.innerHTML = "";

    // Encabezados de la tabla
    var encabezado = tabla.appendChild(document.createElement("tr"));
    encabezado.appendChild(document.createElement("th")).innerHTML = "Producto";
    encabezado.appendChild(document.createElement("th")).innerHTML = "Precio";
    encabezado.appendChild(document.createElement("th")).innerHTML = "Stock";
    encabezado.appendChild(document.createElement("th")).innerHTML = "Category";
    encabezado.appendChild(document.createElement("th")).innerHTML = "Acciones";

    // Recorro el arrayProductos elemento a elemento, pongo cada atributo de producto en una fila, cada "elemento" es un producto del array
    arrayProductos.forEach((element) => {
      var fila = tabla.appendChild(document.createElement("tr"));
      fila.appendChild(document.createElement("td")).innerHTML = element.nombre;
      fila.appendChild(document.createElement("td")).innerHTML = element.precio;
      fila.appendChild(document.createElement("td")).innerHTML = element.stock;
      fila.appendChild(document.createElement("td")).innerHTML = element.idcat;

      // Formulario para eliminar el producto
      var formElemento = document.createElement("form");
      formElemento.action = "cProductos.js"; // Reemplaza con la ruta correcta
      formElemento.method = "post";

      // Campo oculto con el idprod del producto
      var inputIdProd = document.createElement("input");
      inputIdProd.type = "text";
      inputIdProd.id = "idprod"; // Nombre del campo que se enviará al backend
      inputIdProd.value = element.idprod;
      inputIdProd.name = "idprod";
      inputIdProd.hidden = true;

      // Botón de submit para eliminar
      var btnEliminar = document.createElement("input");
      btnEliminar.type = "submit";
      btnEliminar.id = "eliminar_concreto";
      btnEliminar.name = "borrado_especifico";
      btnEliminar.value = "ELIMINAR";

      // Botón de submit para eliminar
      var btnModificar = document.createElement("input");
      btnModificar.type = "submit";
      btnModificar.id = "modificar_concreto";
      btnModificar.name = "modificado_especifico";
      btnModificar.value = "MODIFICAR";

      // Agregar elementos al formulario
      formElemento.appendChild(inputIdProd);
      formElemento.appendChild(btnEliminar);
      formElemento.appendChild(btnModificar);

      // Agregar formulario a la fila
      fila.appendChild(document.createElement("td")).appendChild(formElemento);

      // Manejador de eventos para el formulario
      formElemento.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita que el formulario se envíe automáticamente
        // Determinar cuál es el botón que se ha pulsado

        //ELIMINAR
        if (event.submitter.id === "eliminar_concreto") {

          mDatosProductos.eliminar(element.idprod);
          async function refrescarTabla(){
            await CtrlProductos.actualizarTabla();
          }
          refrescarTabla();

          //MODIFICAR
        } else if (event.submitter.id === "modificar_concreto") {

          //Muestras el formulario de modificación
          var cajaMod = document.getElementById("caja_modificar");
          cajaMod.hidden = false;

          //Sacas la posición que ocupa el elemento en el array, para usarla con el splice en modificar.
          var indice_array = arrayProductos.indexOf(element);

          //Insertas los valores en las dos cajas hidden del formulario
          document.getElementById("id_mod").value = element.idprod; // Campo que se enviará al backend con el id
          document.getElementById("index_id").value = indice_array;

          fila.id = "selected"; //Le añades el id selected a la fila para que cambie de color

          btnEliminar.hidden = true;
        }
      });
    });
  }

  show() {
    var producto = arrayProductos[CtrlProductos.elemVisualizado];
    CtrlProductos.fijarValores(producto);
  }

  fijarValores(producto) {
    // Pone obj cli en la vista html

    document.getElementById("producto").value = producto.nombre;
    document.getElementById("precio").value = producto.precio;
    document.getElementById("stock").value = producto.stock;
    document.getElementById("category").value = producto.idcat;
  }

  obtenerFormulario() {
    // Crea obj Producto sacando los valores del formulario html

    var product = document.getElementById("producto").value;
    product = product.toUpperCase();
    var price = document.getElementById("precio").value;
    var stock = document.getElementById("stock").value;
    var category = document.getElementById("category").value;

    var prod = new Producto(product, price, stock, category);

    return prod;
  }

  obtenerFormularioMod() {
    // Crea obj Producto sacando los valores del formulario html

    var product = document.getElementById("producto_mod").value;
    product = product.toUpperCase();
    var price = document.getElementById("precio_mod").value;
    var stock = document.getElementById("stock_mod").value;
    var category = document.getElementById("category_mod").value;
    var id = document.getElementById("id_mod").value;

    var prod = new Producto(product, price, stock, category);
    prod.id = id; //Añades la propiedad id al objeto para usarla luego

    return prod;
  }

  vaciar() {
    document.getElementById("producto").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("stock").value = "";
    document.getElementById("category").value = "";
  }

  async init() {
    var promesaProductos = mDatosProductos.CargarProductos();
    //console.log("jode",promesaProductos);
    await promesaProductos.then(
      (prod) => {
        arrayProductos = prod; //Llenas el arrayProductos con los datos devueltos por la base de datos
        this.elem = prod[0];
        this.elemVisualizado = 0;
      },
      (error) => console.log(error)
    );
  }
}

var CtrlProductos = new Controller_Productos(); //Creamos un objeto de la clase Controller_Productos, la actual
await CtrlProductos.init();
CtrlProductos.show();
console.log("Estás trabajando con esto:");
console.log(mDatosProductos.getProductos()); //Saco por consola lo que contiene el array del modelo
