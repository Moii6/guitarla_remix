import { useLoaderData } from "@remix-run/react";
import { getGuitarras } from "../models/guitarras.server";
import { getPosts } from "../models/post.server";
import { getCurso } from "../models/curso.server";
import ListaGuitarras from "../components/listaGuitarras";
import ListaPosts from "../components/listaPosts";
import Curso from "../components/curso";
import stylesGuitarras from "../styles/guitarras.css";
import stylesPosts from "../styles/posts.css";
import stylesCurso from "../styles/curso.css";
import { bienvenido, blogDeMusica, guitarla } from "../utils/diccionario";

export function meta() {
  return [
    {
      title: `${bienvenido}`,
      description: `${guitarla} - ${blogDeMusica}`,
    },
  ];
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: stylesGuitarras,
    },
    {
      rel: "stylesheet",
      href: stylesPosts,
    },
    ,
    {
      rel: "stylesheet",
      href: stylesCurso,
    },
  ];
}
export async function loader() {
  const [guitarras, posts, curso] = await Promise.all([
    getGuitarras(),
    getPosts(),
    getCurso(),
  ]);
  return {
    guitarras: guitarras.data,
    posts: posts.data,
    curso: curso.data.attributes,
  };
}
function Index() {
  const { guitarras, posts, curso } = useLoaderData();
  return (
    <>
      <main className="contenedor">
        <ListaGuitarras guitarras={guitarras} />
      </main>
      <div>
        <Curso curso={curso} />
      </div>
      <section className="contenedor">
        <ListaPosts posts={posts} />
      </section>
    </>
  );
}

export default Index;
