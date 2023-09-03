import { getGuitarras } from "../models/guitarras.server";
import { useLoaderData } from "@remix-run/react";
import styles from "~/styles/guitarras.css";
import ListaGuitarras from "../components/listaGuitarras";

/**export async function loader() {
  //se utiliza cuando el componente carga, puede precargar datos que se van a mostrar en una tabla y vienen de una Data Base para este caso espesifico se usa async

  const respuesta = await fetch(
    `${process.env.API_URL}/guitarras?populate=imagen`
  );
  const resultado = await respuesta.json();
  console.log(resultado);
  return {};
}*/
export function meta() {
  return [
    {
      title: "GuitarLA - Tienda de Guitarras",
      description: "GuitarLA - Nuestra coleccion de guitarras",
    },
  ];
}
export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
export async function loader() {
  /**En este ejemplo de loader se esta ejecutando una funcion que viene de un archivo que se ejecuta en el servidor */
  const guitarras = await getGuitarras();
  return guitarras.data;
}
function Tienda() {
  const guitarras = useLoaderData(); //useLoaderData trae automaticamente la info que retorna el loader
  return (
    <main className="contenedor">
      <ListaGuitarras guitarras={guitarras} />
    </main>
  );
}

export default Tienda;
