import { getGuitarra } from "~/models/guitarras.server";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import styles from "~/styles/guitarras.css";
import {
  guitarla,
  guitarlaDesc,
  guitarraNoEncontrada,
  status404,
  simboloPesos,
  cantidadText,
  numeros,
  seleccione,
  agregarCarritoText,
  debesSeleccionarUnaCantidadText,
} from "../utils/diccionario";
import { useState } from "react";

export async function loader({ params }) {
  //en esta funcion los params podrian ser el request y params, en esta ocasion solo se usa params
  //en este ejemplo los parametros vienen de guitarra.jsx linea 18, cuando se le da click al enlace
  const { Url } = params;
  const guitarra = await getGuitarra({ Url });
  if (guitarra.data.length === 0) {
    throw new Response(null, {
      status: { status404 },
      statusText: { guitarraNoEncontrada },
    });
  }
  console.log(
    "desde el loader guitarra: " + guitarra.data[0].attributes.nombre
  );
  return await guitarra;
}

export function meta({ data }) {
  //este data esta disponible una vez que el loader pasa la info al componente
  if (!data) {
    return [
      {
        title: { guitarraNoEncontrada },
        description: `${guitarlaDesc}+" "+${guitarraNoEncontrada}`,
      },
    ];
  }
  return [
    {
      title: `${guitarla} - ${data.data[0].attributes.nombre}`,
      description: `${guitarlaDesc} +" "+${guitarraNoEncontrada}`,
    },
  ];
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
}

function Guitarra() {
  const { agregarCarrito } = useOutletContext();
  const [cantidad, setCantidad] = useState(0);
  const guitarra = useLoaderData();
  const { nombre, descripcion, imagen, precio } = guitarra.data[0].attributes;
  const imagenUrl = imagen.data.attributes.url;
  const { cero, uno, dos, tres, cuatro, cinco } = numeros;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cantidad < 1) {
      alert(`${debesSeleccionarUnaCantidadText}`);
      return;
    }

    /**En el siguiente objeto el nombre, precio y cantidad no llevan otro argumento
     * porque tanto el nombre como la key se llaman igual
     * es decir el nombre es igual a la variable que guarda el valor
     * de esta forma se entiende que el valor proviene de una variable con el mismo nombre
     */
    const guitarraSelec = {
      id: guitarra.data[0].id,
      imagen: imagenUrl,
      nombre,
      precio,
      cantidad,
    };
    agregarCarrito(guitarraSelec);
  };
  return (
    <div className="contenedor guitarra">
      <img src={imagenUrl} alt="Imagen de la guitarra" />
      <div className="contenido">
        <h3>{nombre}</h3>
        <p className="texto">{descripcion}</p>
        <p className="precio">{simboloPesos + precio}</p>
        <form onSubmit={handleSubmit} className="formulario">
          <label htmlFor="cantidad">{cantidadText}</label>

          <select
            onChange={(e) => setCantidad(parseInt(e.target.value))}
            id="cantidad"
          >
            <option value={cero}>{seleccione}</option>
            <option value={uno}>{uno}</option>
            <option value={dos}>{dos}</option>
            <option value={tres}>{tres}</option>
            <option value={cuatro}>{cuatro}</option>
            <option value={cinco}>{cinco}</option>
          </select>
          <input type="submit" value={agregarCarritoText} />
        </form>
      </div>
    </div>
  );
}

export default Guitarra;
