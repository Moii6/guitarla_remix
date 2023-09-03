import imagen from "../../public/img/nosotros.jpg";
import styles from "../styles/nosotros.css";
import {
  sobreNosotros,
  nosotrosDesc,
  nosotrosTitle,
  nosotrosText1,
  nosotrosText2,
  guitarla,
} from "../utils/diccionario";

export function meta() {
  return [
    {
      title: `${guitarla}+' - '+${sobreNosotros}`,
      description: { nosotrosDesc },
    },
  ];
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
    {
      rel: "preload", //este preload se usa cuando las fotos o archivos multimedia pudiesen ser muy pesados
      href: imagen,
      as: "image",
    },
  ];
}

function Nosotros() {
  return (
    <main className="contenedor nosotros">
      <h2 className="heading">{nosotrosTitle}</h2>
      <div className="contenido">
        <img src={imagen} alt="Imagen sobre Nosotros" />

        <div>
          <p>{nosotrosText1}</p>
          <p>{nosotrosText2}</p>
        </div>
      </div>
    </main>
  );
}

export default Nosotros;
