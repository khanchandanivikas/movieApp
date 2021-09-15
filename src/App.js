import "./App.css";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Header from "./components/Header";
import Inicio from "./pages/Inicio";
import Auth from "./pages/Auth";
import CrearDestino from "./components/CrearDestino";

function App() {
  const [tieneAcceso, setTieneAcceso] = useState(false);
  const [datos, setDatos] = useState({});
  const [token, setToken] = useState();

  const gestionarAcceso = (dato) => {
    setDatos(dato);
    setTieneAcceso(true);
    setToken(dato.token);
  };

  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Inicio />
          </Route>
          <Route path="/auth">
            <Auth gestionarAcceso={gestionarAcceso} />
          </Route>
          <Route path="/crearDestino">
            <CrearDestino datos={datos} />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
