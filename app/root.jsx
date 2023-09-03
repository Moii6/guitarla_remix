import {
  Meta,
  Links,
  Outlet,
  Scripts,
  LiveReload,
  Link,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react"; //los scripts se importan para el performance de la app al cargar las paginas
import styles from "./styles/index.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { useState } from "react";
import { useEffect } from "react";
import { carritotextkey } from "./utils/diccionario";

export function meta() {
  return [
    {
      charset: "utf-8",
      title: "GuitarLA-Remix",
      viewport: "width=device-width,initial-scale=1",
    },
  ];
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: "https://necolas.github.io/normalize.css/8.0.1/normalize.css",
    },
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "true",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap",
    },
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
}
export default function App() {
  /**local storage solo se ejecuta en el navegador
   * cuando se coloca en use effect no hay ningun pronblema
   * pero si se ejecuta fuera de, dara errores, dado que el codigo de remix se ejcuta en el servidor y el navegador
   * typeof window sirve para identificar en donde se esta intentando ejecutar el codigo
   * si el window es diferente a undefined se puede ejecutar local storage para obtener la info de localstorage
   */
  const carritoLS =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem(`${carritotextkey}`)) ?? []
      : null;
  const [carrito, setCarrito] = useState(carritoLS);
  useEffect(() => {
    localStorage.setItem(`${carritotextkey}`, JSON.stringify(carrito));
  }, [carrito]);

  const agregarCarrito = (guitarra) => {
    if (carrito.some((guitarraSingle) => guitarraSingle.id === guitarra.id)) {
      //iterando sobre carrito para identificar el elemeneto duplicado
      const carritoActualizado = carrito.map((guitarraSingle) => {
        //de cada elemento evaluar que id es elk mismo y reescribir la cantiad
        if (guitarraSingle.id === guitarra.id) {
          guitarraSingle.cantidad = guitarra.cantidad; //esta linea actrualiza el numero de elementos
          //          guitarraSingle.cantidad += guitarra.cantidad;//esta linea va sumando las cantidades nuevas
        }
        return guitarraSingle;
      });

      setCarrito(carritoActualizado);
    } else {
      setCarrito([...carrito, guitarra]);
    }
  };
  const actualizarCantidad = (guitarra) => {
    const carritoActualizado = carrito.map((guitarraSingle) => {
      if (guitarraSingle.id === guitarra.id) {
        guitarraSingle.cantidad = guitarra.cantidad;
      }
      return guitarraSingle;
    });
    setCarrito(carritoActualizado);
  };
  const eliminarDelCarrito = (id) => {
    const carritoActualizado = carrito.filter(
      (guitarraSingle) => guitarraSingle.id !== id
    );
    setCarrito(carritoActualizado);
  };
  return (
    <Document>
      <Header />
      <Outlet
        context={{
          /**mas info de este context buscando context api remix */
          agregarCarrito,
          carrito,
          actualizarCantidad,
          eliminarDelCarrito,
        }}
      />
    </Document>
  );
}

function Document({ children }) {
  return (
    <html lang="es">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <Footer />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

/***Manejo de Errores */
export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <Document>
        <Header />
        <h3 className="error">
          {error.status} {error.statusText}
        </h3>
        <Link className="error-enlace" to="/index">
          Puedes regresar e intentarlo de nuevo
        </Link>
      </Document>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return (
      <h1>Bueno... esto no me lo esperaba. Ocurrio un Error desconocido</h1>
    );
  }
}
