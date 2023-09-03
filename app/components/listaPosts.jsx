import React from "react";
import Post from "./post";
import { nuestroBlog } from "../utils/diccionario";

export default function ListaPosts({ posts }) {
  return (
    <>
      <h2 className="heading">{nuestroBlog}</h2>
      <div className="blog">
        {posts?.length &&
          posts.map((post) => (
            <Post key={post?.id} post={post?.attributes}></Post>
          ))}
      </div>
    </>
  );
}
