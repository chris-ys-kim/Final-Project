import React, { useState } from 'react';
// import { ResultCard } from './ResultCard';
import MediaCard from './moviecard';

export default function Add() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const onChange = e => {
    e.preventDefault();

    setQuery(e.target.value);
    fetch(
      `https://api.themoviedb.org/3/search/person?api_key=930f628a8d2ecfb0a11f628757505c48&language=en-US&page=1&include_adult=false&query=${e.target.value}`
    )
      .then(res => res.json())
      .then(data => {
        if (!data.errors) {
          setResults(data.results);
        } else {
          setResults([]);
        }
      });

  };
  // src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
  // alt={`${movie.title} Poster`}
  return (
    <div className="add-page">
      <div className="container">
        <div className="add-content">
          <div className="input-wrapper">
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
                                    <MediaCard movie={movie}/>
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
  );
}
