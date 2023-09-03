import React from "react";
import Navegacion from "./navegacion";
import { derechosReservados } from "../utils/diccionario";

function Footer() {
  return (
    <footer className="footer">
      <div className="contenedor contenido">
        <Navegacion />
        <p className="copyright">
          {derechosReservados} {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
