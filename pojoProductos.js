
export { Producto };

class Producto {

  constructor(nombre, precio, stock, idcat) {

    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
    this.idcat = idcat;
  }

  getNombre() {
    return this.nombre;
  }
  setNombre(nombre) {
    this.nombre = nombre;
  }

  getPrecio() {
    return this.precio;
  }
  setPrecio(precio) {
    this.precio = precio;
  }

  getStock() {
    return this.stock;
  }
  setStock(stock) {
    this.stock = stock;
  }

  getCategoria() {
    return this.idcat;
  }
  setCategoria(idcat) {
    this.idcat = idcat;
  }
}
