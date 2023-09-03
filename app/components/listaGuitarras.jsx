import React from "react";
import Guitarra from "./guitarra";
import { nuestraColeccion } from "../utils/diccionario";

export default function ListaGuitarras({ guitarras }) {
  return (
    <>
      <h2 className="heading ">{nuestraColeccion}</h2>
      {guitarras?.length && (
        <div className="guitarras-grid">
          {guitarras?.map((guitarra) => (
            <Guitarra key={guitarra?.id} guitarra={guitarra?.attributes} />
          ))}
        </div>
      )}
    </>
  );
}
