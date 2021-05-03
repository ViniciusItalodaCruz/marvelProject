import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import styles from './idHero.module.css';

function heroi() {
  const [searchId, setSearchId] = useState();

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
        `https://gateway.marvel.com:443/v1/public/characters/${urlParams.id}?ts=1&apikey=dfdfc06935a1fe33837da6934f7b5373&hash=f5a214e5c63b897dfe0ebc1a1185c936`,
      )
      .then((preview) => {
        setSearchId(preview.data.data.results);
      });
  }, []);
  console.log(urlParams, 'click')
  return (
    <div className={styles.pattern_marvel}>
      <head>
        <title>Marvel Studio Heroes | All about your hero</title>
      </head>

      <>
        <div className={styles.header_search}>
          <a href="../"><img src="./marvel.svg" /></a>
          <h3>Tudo sobre o seu Heroi aqui em baixo!</h3>
        </div>

        {searchId &&
          <div className={styles.Container}>
            <h1>
              {searchId[0].name}
            </h1>

            <img src={`${searchId[0].thumbnail.path}.${searchId[0].thumbnail.extension}`} />

            <h2 className={styles.Subtitle}>Description</h2>
            <p className={styles.Description}>
              {searchId[0].description}
            </p>

            <div className={styles.ContentComic}>
              <h2 className={styles.Subtitle}>Comics</h2>
              <ul>
                {searchId[0].comics.items.map((comic) => {
                  return (
                    <li><a href={`/comic?=${comic.resourceURI}`}>{comic.name}</a></li>
                  )
                })
                }
              </ul>
            </div>

            <div className={styles.ContentSeries}>
                <h2 className={styles.Subtitle}>Series</h2>
                <ul>
                  {searchId[0].series.items.map((series) => {
                    return (
                      <li><a href={`/series?=${series.resourceURI}`}>{series.name}</a></li>
                    )
                  })
                  }
                </ul>
            </div>

            <div className={styles.ContentStories}>
              <h2 className={styles.Subtitle}>Stories</h2>
              <ul>
                  {searchId[0].stories.items.map((stories) => {
                    return (
                      <li><a href={`/stories?=${stories.resourceURI}`}>{stories.name}</a></li>
                    )
                  })
                  }
              </ul>
            </div>

          </div>
        }

        <div className={styles.buttonBack}>
          <a href="../"><FontAwesomeIcon className="back" icon={faHome} /></a>
        </div>
      </>
    </div>

  )
}




export default heroi