import React from 'react';

function Clima({ resultado }) {

    // console.log(resultado);

    const { name, main } = resultado;
    const kelvin = 273.15;

    if (!name) return null;

    return (
        <div className="card-panel white col s12">
            <div className="black-text">
                <h2>Clima en {name}</h2>
                <p className="temperatura">{parseInt(main.temp - kelvin, 10)}&#x2103;</p>
                <p>Máxima: {parseInt(main.temp_max - kelvin, 10)}&#x2103;</p>
                <p>Mínima: {parseInt(main.temp_min - kelvin, 10)}&#x2103;</p>
            </div>
        </div>
    )

}

export default Clima;