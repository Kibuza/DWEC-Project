
export { Producto };

class Categoria {

  constructor(nombre, idcat) {

    this.nombre = nombre;
    this.idcat = idcat;
  }

  getNombre() {
    return this.nombre;
  }
  setNombre(nombre) {
    this.nombre = nombre;
  }

  getId() {
    return this.idcat;
  }
  setId(idcat) {
    this.idcat = idcat;
  }
}
