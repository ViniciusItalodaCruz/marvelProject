import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function Home() {

  const [whatHero, setWhatHero] = useState ();

  function result() {
    window.location.href = `/resultSearch?name=${whatHero}`;
  }

  return (
    <div className="introducao">
      <head>
        <title>Marvel Studio Heroes - All of Heroes</title>
      </head>
      <input type="search" className="searchBox" id="search" placeholder="Digite o nome do seu heroi aqui..."  onChange={(e) => {
            setWhatHero(e.target.value);
          }} />
      <button onClick={(event) => {
        event.preventDefault();
        result();
      }}>
        <FontAwesomeIcon className="icon" icon={faSearch}/>
      </button>
    </div>
  )
}
