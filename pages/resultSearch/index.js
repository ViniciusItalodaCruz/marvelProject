import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import styles from './styleResult.module.css';

function heroes() {
  const [data, setData] = useState();
  const [name, setName] = useState();
 
  let urlParams = undefined;

  if (typeof window !== 'undefined') {

    const params = new URLSearchParams(window.location.search);

    params.forEach((value, key) => {
      urlParams = Object.assign({}, urlParams, {
        [key]: value.toString()
      });
    });
  }

  useEffect(() => {
    axios
      .get(
        `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${urlParams.name}&ts=1&apikey=dfdfc06935a1fe33837da6934f7b5373&hash=f5a214e5c63b897dfe0ebc1a1185c936`
      )
      .then((preview) => {
        setData(preview.data.data.results);
      });
  }, []);

  console.log(data, 'check')


  return (
    <div className={styles.content}>
      <head>
        <title>Marvel Studios Heroes - Você pesquisou sobre o seguinte heroi...</title>
      </head>

      <div className={styles.pattern_marvel}>

        <div className={styles.header_search}>
          <a href="../"><img src="./marvel.svg" /></a>
          <h3>Resultado da pesquisa...</h3>
        </div>
        


        <div className={styles.contentHero}>
         
            <div className={styles.container}>
            {
              data && data.map(heroi => {
                return (
                  <a href={`idHero?id=${heroi.id}`}>
                    <h2>{heroi.name}</h2>
                    <img className={styles.cardHero} src={`${heroi.thumbnail.path}.${heroi.thumbnail.extension}`} />
                  </a>
                )
              })
            }
            </div>
        </div>

        <div className={styles.buttonBack}>
          <a href="../"><FontAwesomeIcon className="back" icon={faHome}/></a>
        </div>

      </div>
    </div>
  )
}


export default heroes