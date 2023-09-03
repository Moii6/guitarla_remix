import React from "react";

import { getPosts } from "../models/post.server";
import { useLoaderData } from "@remix-run/react";
import styles from "../styles/posts.css";
import ListaPosts from "../components/listaPosts";
import { guitarla, nuestroBlog, blogDeMusica } from "../utils/diccionario";

export function meta() {
  return [
    {
      title: `${guitarla} - ${nuestroBlog}`,
      description: `${guitarla} - ${blogDeMusica}`,
    },
  ];
}
export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export async function loader() {
  const posts = await getPosts();
  return posts.data;
}
const Blog = () => {
  const posts = useLoaderData();
  return (
    <main className="contenedor">
      <ListaPosts posts={posts} />
    </main>
  );
};

export default Blog;
