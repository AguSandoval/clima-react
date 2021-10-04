import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import Error from "./components/Error";
import Clima from "./components/Clima";


function App() {

  const [ciudad, guardarCiudad] = useState('');
  const [pais, guardarPais] = useState('');
  const [error, guardarError] = useState(false);
  const [resultado, guardarResultado] = useState({});

  useEffect(() => {
    // Para prevenir una ejecución directa de la funcion, creo la siguiente condición.
    if (ciudad === '') {
      return;
    }

    // Consultar la API de OpenWeatherMap, si la defino fuera de useEffect, la consola genera advertencias.
    // Dentro de la documentación, se aconseja hacerlo de esta manera, aun que queda muy cargado, pero es una buena práctica.
    async function consultarAPI() {
      let API_KEY = '9eb656408d3e1f4adde7874a8200ca36';
      let URL = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${API_KEY}`;


      let respuesta = await fetch(URL);
      let resultado = await respuesta.json();

      // console.log(resultado);
      guardarResultado(resultado);
    }

    consultarAPI();
  }, [ciudad, pais])


  function datosConsulta(datos) {

    if (datos.pais === '' || datos.ciudad === '') {
      guardarError(true);
      return;
    }

    guardarCiudad(datos.ciudad);
    guardarPais(datos.pais);
    guardarError(false);
  }

  let componente;
  if (error) {
    componente = <Error mensaje="Ambos campos son obligatorios" />
  } else if (resultado.cod === '404') {
    componente = <Error mensaje="¡Upsss! Ciudad no encontrada..."/>
  } else {
    componente = <Clima resultado={resultado} />;
  }



  return (
    <div className="App">
      <Header titulo="Clima React" />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col s12 m6">
              <Formulario datosConsulta={datosConsulta} />
            </div>
            <div className="col s12 m6">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
