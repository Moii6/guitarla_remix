import { useOutletContext } from "@remix-run/react";
import styles from "../styles/carrito.css";
import {
  carritoDeCompras,
  resumenDelPedido,
  totalPagar,
  simboloPesos,
  articulos,
  guitarla,
  guitarlaDesc,
  subtotal,
  cantidadText,
  numeros,
  eliminarText,
  carritoVacioText,
  cargandoCarritoText,
} from "../utils/diccionario";
import { useState, useEffect } from "react";
import { ClientOnly } from "remix-utils";

export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
}

export function meta() {
  return [
    {
      title: `${guitarla} - ${carritoDeCompras}`,
      description: `${guitarlaDesc} - ${carritoDeCompras}`,
    },
  ];
}

export default function Carrito() {
  const [total, setTotal] = useState(0);
  const { uno, dos, tres, cuatro, cinco } = numeros;
  const { carrito, actualizarCantidad, eliminarDelCarrito } =
    useOutletContext();
  useEffect(() => {
    //se utilizapara realizar acciones cuando ocurre algo
    const calculoTotal = carrito.reduce(
      (total, producto) => total + producto.cantidad * producto.precio,
      0
    );
    setTotal(calculoTotal);
  }, [carrito]); //en este caso cuando ocurran cambios en carrito se va a ejecutar lo que esta en el interior de esta funcion
  return (
    <ClientOnly fallback={cargandoCarritoText}>
      {() => (
        <main className="contenedor">
          <h1 className="heading">{carritoDeCompras}</h1>
          <div className="contenido">
            <div className="carrito">
              <h2>{articulos}</h2>
              {carrito?.length === 0
                ? { carritoVacioText }
                : carrito?.map((producto) => (
                    <div key={producto.id} className="producto">
                      <div>
                        <img src={producto.imagen} alt="" />
                      </div>
                      <div>
                        <p className="nombre">{producto.nombre}</p>
                        <p>{cantidadText}:</p>
                        <select
                          value={producto.cantidad}
                          className="select"
                          id={producto.nombre}
                          onChange={(e) =>
                            actualizarCantidad({
                              cantidad: e.target.value,
                              id: producto.id,
                            })
                          }
                        >
                          <option value={uno}>{uno}</option>
                          <option value={dos}>{dos}</option>
                          <option value={tres}>{tres}</option>
                          <option value={cuatro}>{cuatro}</option>
                          <option value={cinco}>{cinco}</option>
                        </select>
                        <p className="precio">
                          <span>
                            {simboloPesos}
                            {producto.precio}
                          </span>
                        </p>
                        <p className="subtotal">
                          {subtotal}
                          {simboloPesos}
                          <span>{producto.cantidad * producto.precio}</span>
                        </p>
                      </div>
                      <button
                        type="button"
                        className="btn_eliminar"
                        onClick={
                          //para poder colocarle argumentos a la funcion, es necesario usar primero un arrow function
                          () => eliminarDelCarrito(producto.id)
                        }
                      >
                        {eliminarText}
                      </button>
                    </div>
                  ))}
            </div>
            <aside className="resumen">
              <h3>{resumenDelPedido}</h3>
              <p>
                {totalPagar}
                {simboloPesos}
                {total}
              </p>
            </aside>
          </div>
        </main>
      )}
    </ClientOnly>
  );
}
