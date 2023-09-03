import { Link } from "@remix-run/react";
import logo from "../../public/img/logo.svg";
import Navegacion from "./navegacion";
import { logoDesc } from "../utils/diccionario";

function Header() {
  return (
    <header className="header">
      <div className="contenedor barra">
        <div className="logo">
          <Link to="/index">
            <img className="logo" src={logo} alt={logoDesc} />
          </Link>
        </div>
        <Navegacion isheader={true} />
      </div>
    </header>
  );
}

export default Header;
