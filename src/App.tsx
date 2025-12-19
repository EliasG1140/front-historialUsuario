import { BrowserRouter, Route, Routes } from "react-router";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Layout } from "./pages/Layout";
import { LayoutApp } from "./pages/LayoutApp";
import { Barrios } from "./pages/Barrios";
import { Lengua } from "./pages/Lengua";
import { CodigoC } from "./pages/CodigoC";
import { CodigoB } from "./pages/CodigoB";
import { PuestoVotacion } from "./pages/PuestoVotacion";
import { Categoria } from "./pages/Categoria";
import { Consulta } from "./pages/Consulta";
import { Usuarios } from "./pages/Usuarios";
import { Personas } from "./pages/Consultar/Personas";
import { Lideres } from "./pages/Consultar/Lideres";
import { ConsultaPuestoVotacion } from "./pages/Consultar/ConsultaPuestoVotacion";
import { AddPersona } from "./pages/Insertar/AddPersona";
import { PrivateRoute } from "./components/PrivateRoute";
import { TerminoCondicion } from "./pages/TerminoCondicion";
import { EditPersona } from "./pages/Insertar/EditPersona";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<LayoutApp />}>
              <Route index element={<Home />} />
              <Route path="terminos" element={<TerminoCondicion />} />
              <Route path="consultar" element={<Consulta />}>
                <Route index element={<Personas />} />
                <Route path="personas" element={<Personas />} />
                <Route path="lideres" element={<Lideres />} />
                <Route
                  path="puestos-votacion"
                  element={<ConsultaPuestoVotacion />}
                />
              </Route>
              <Route path="barrios" element={<Barrios />} />
              <Route path="lengua" element={<Lengua />} />
              <Route path="codigo-c" element={<CodigoC />} />
              <Route path="codigo-b" element={<CodigoB />} />
              <Route path="puesto-votacion" element={<PuestoVotacion />} />
              <Route path="categoria" element={<Categoria />} />
              <Route path="usuarios" element={<Usuarios />} />
              <Route path="insertar" element={<AddPersona />} />
              <Route path="insertar/:id" element={<EditPersona />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
