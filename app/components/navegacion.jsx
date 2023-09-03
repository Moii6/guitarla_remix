import { Link, useLocation } from "@remix-run/react";
import carrito from "../../public/img/carrito.png";
import {
  blogTitle,
  indexTitle,
  nosotrosTitle,
  tiendaTitle,
} from "../utils/diccionario";

function Navegacion({ isheader }) {
  const location = useLocation();
  return (
    <nav className="navegacion">
      <Link
        to="/index"
        className={location.pathname === "/index" ? "active" : ""}
      >
        {indexTitle}
      </Link>
      <Link
        to="/nosotros"
        className={location.pathname === "/nosotros" ? "active" : ""}
      >
        {nosotrosTitle}
      </Link>
      <Link
        to="/tienda"
        className={location.pathname === "/tienda" ? "active" : ""}
      >
        {tiendaTitle}
      </Link>
      <Link
        to="/blog"
        className={location.pathname === "/blog" ? "active" : ""}
      >
        {blogTitle}
      </Link>
      {isheader && (
        <Link to="/carrito">
          <img src={carrito}></img>
        </Link>
      )}
    </nav>
  );
}

export default Navegacion;
