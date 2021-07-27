import React, { useState } from 'react';
// import { ResultCard } from './ResultCard';
import MediaCard from './moviecard';

export default function Add() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const onChange = e => {
    e.preventDefault();

    setQuery(e.target.value);
  };

  const searchMovie = () => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=930f628a8d2ecfb0a11f628757505c48&language=en-US&page=1&include_adult=false&query=${query}`
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

  return (
    <div className="add-page">
      <div className="container">
        <div className="add-content">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Search for a movie"
              value={query}
              onChange={onChange}
            />
            <button onClick={searchMovie}>Search</button>
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
  );
}
