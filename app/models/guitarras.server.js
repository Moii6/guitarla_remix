/**El framework remix ya sabe que cosas tiene que ejecutar en el servidor
 * y que cosas en el navegador
 * pero tambien se puede especificar generando estos archivos que en el nombre
 * llevan .server
 */
export async function getGuitarras() {
  const respuesta = await fetch(
    `${process.env.API_URL}/guitarras?populate=imagen`
  );
  return await respuesta.json();
}

export async function getGuitarra({ Url }) {
  const respuesta = await fetch(
    `${process.env.API_URL}/guitarras?filters[url]=${Url}&populate=imagen`
  );

  return await respuesta.json();
}
