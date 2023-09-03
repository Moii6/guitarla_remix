import { Link } from "@remix-run/react";
import React from "react";
import { formatoFecha } from "../utils/helpers";
import { leerPost } from "../utils/diccionario";

const Post = ({ post }) => {
  const { contenido, imagen, titulo, url, publishedAt } = post;
  return (
    <article className="contenedor post">
      <img
        className="imagen"
        src={imagen.data.attributes.formats.small.url}
        alt={url}
      />
      <div className="contenido">
        <h3>{titulo}</h3>
        <p className="fecha">{formatoFecha(publishedAt)}</p>
        <p className="resumen">{contenido}</p>
        <Link className="enlace" to={`/post/${url}`}>
          {leerPost}
        </Link>
      </div>
    </article>
  );
};

export default Post;
