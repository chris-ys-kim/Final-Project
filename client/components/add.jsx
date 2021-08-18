import React, { useState } from 'react';
import MediaCard from './moviecard';

export default function Add() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const onChange = e => {
    e.preventDefault();

    setQuery(e.target.value);
  };

  const searchMovie = (event) => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=en-US&page=1&include_adult=false&query=${query}`
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
                placeholder="Search for a movie"
                value={query}
                onChange={onChange}
              />
            </div>

            {results.length > 0 && (
              <ul className="results">
                {results.map(movie => (
                  <li key={movie.id}>
                    <MediaCard movie={movie}/>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
