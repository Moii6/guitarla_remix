import { Link } from "@remix-run/react";
import { simboloPesos, verProducto } from "../utils/diccionario";

export default function Guitarra({ guitarra }) {
  // a esta declaracion de variables se le llama destructuring y consiste de obtener
  // de manera individual los valoes ya
  //almacendados en el objeto guitarra
  //los valores almacenados en el objeto deben de tener el mismo nombre de las variables
  //se esta manera se hace el match automatico
  const { descripcion, imagen, precio, url, nombre } = guitarra;
  const imageUrl = imagen.data.attributes.formats.medium.url;
  return (
    <div className="guitarra">
      <img src={imageUrl} alt={`Imagen guitarra ${nombre}`} />
      <div className="contenido">
        <h3>{nombre}</h3>
        <p className="descripcion">{descripcion}</p>
        <p className="precio">{simboloPesos + precio}</p>
        <Link className="enlace" to={`/guitarras/${url}`}>
          {verProducto}
        </Link>
      </div>
    </div>
  );
}
