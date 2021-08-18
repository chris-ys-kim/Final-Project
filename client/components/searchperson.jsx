import React, { useState } from 'react';
import PersonCard from './personcard';

export default function Add() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const onChange = e => {
    e.preventDefault();

    setQuery(e.target.value);
  }

  const searchMovie = () => {
    fetch(
      `https://api.themoviedb.org/3/search/person?api_key=${process.env.API_KEY}&language=en-US&page=1&include_adult=false&query=${query}`
    )
      .then(res => res.json())
      .then(data => {
        if (!data.errors) {
          setResults(data.results);
        } else {
          setResults([]);
        }
      });

      event.preventDefault();
  };


  return (
    <form onSubmit={ searchMovie }>
      <div className="add-page">
        <div className="container">
          <div className="add-content">
            <div className="input-wrapper">
              <button className="search-button" onClick={searchMovie}>Search</button>
              <input
                type="text"
                placeholder="Search for a person"
                value={query}
                onChange={onChange}
              />
            </div>

            {results.length > 0 && (
              <ul className="results">
                {results.map(person => {
                  if (person.known_for_department === 'Acting') {
                    return <li key={person.id}>
                          {
                              person.known_for.map(movie =>
                                (<li key={movie.id}>
                                      <PersonCard movie={movie}/>
                                  </li>
                                ))
                          }
                      </li>;
                  } else {
                    return (null);
                  }
                })
                }
              </ul>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
