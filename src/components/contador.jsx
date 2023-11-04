import React, { useState } from 'react';

function Contador(props) {
  const [contador, setContador] = useState(0);

  function incrementar() {
    setContador(contador + 1);
  }

  const numeros = [];
  for (let i = contador; i <= props.numero; i++) {
    numeros.push(i);
  }

  return (
    <div>
      {numeros.map((numero) => (
        <p key={numero}>{numero}</p>
      ))}
      <button onClick={incrementar}>Incrementar</button>
    </div>
  );
}

export default Contador;
