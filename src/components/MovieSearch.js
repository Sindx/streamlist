import React, { useState } from 'react';

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const fetchMovies = async (searchTerm) => {
    const apiKey = '6a6f7275567f01c4a304383754a964ba';
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`
    );
    const data = await response.json();
    setMovies(data.results);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      fetchMovies(query);
    }
  };

  return (
    <div>
      <h2>Search Movies</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a movie"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div>
        {movies.map((movie) => (
          <div key={movie.id} style={{ marginBottom: '1rem' }}>
            <h3>{movie.title}</h3>
            <p>Release Date: {movie.release_date}</p>
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSearch;
