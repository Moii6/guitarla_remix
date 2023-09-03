import { Link } from "@remix-run/react";
import styles from "../styles/posts.css";
import { getPost } from "../models/post.server";
import { useLoaderData } from "@remix-run/react";
import { formatoFecha } from "../utils/helpers";
import { status404, postNoExiste } from "../utils/diccionario";

export async function loader({ params }) {
  const { Url } = params;
  const post = await getPost({ Url });
  if (post.data.length === 0) {
    throw new Response(null, {
      status: { status404 },
      statusText: { postNoExiste },
    });
  }
  return await post.data[0].attributes;
}

export function meta({ data }) {
  //este data esta disponible una vez que el loader pasa la info al componente
  if (!data) {
    return [
      {
        title: { postNoExiste },
        description: `Guitarras, venta de guitarras, puiblicacion no encontrada`,
      },
    ];
  }
  return [
    {
      title: `GuitarLA - ${data.titulo}`,
      description: `Guitarras, venta de guitarras, ${data.nombre}`,
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

export default function Post() {
  const { contenido, imagen, titulo, url, publishedAt } = useLoaderData();
  return (
    <article className=" contenedor post mt-3">
      <img className="imagen" src={imagen.data.attributes.url} alt={url} />
      <div className="contenido">
        <h3>{titulo}</h3>
        <p className="fecha">{formatoFecha(publishedAt)}</p>
        <p className="texto">{contenido}</p>
        <Link className="enlace" to={`/blog`}>
          Ver otras publicaciones
        </Link>
      </div>
    </article>
  );
}
