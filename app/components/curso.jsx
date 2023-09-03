import React from "react";

export default function Curso({ curso }) {
  const { tirulo, contenido, imagen } = curso;
  return (
    <section className="curso">
      <style jsx="true">
        {`
          .curso {
            background-image: linear-gradient(
                to right,
                rgb(0 0 0 / 0.65),
                rgb(0 0 0 /0.7)
              ),
              url(${imagen.data.attributes.url});
          }
        `}
      </style>
      <div className="contenedor curso-grid">
        <div className="contenido">
          <h2 className="heading">{tirulo}</h2>
          <p className="texto">{contenido}</p>
        </div>
      </div>
    </section>
  );
}
