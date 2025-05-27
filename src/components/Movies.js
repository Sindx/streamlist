// Movies.js
import React, { useState } from "react";
import "./SharedPage.css";

function Movies() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const fetchMovies = async (searchTerm) => {
    const apiKey = "6a6f7275567f01c4a304383754a964ba";
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        setMovies(data.results);
        setError(null);
      } else {
        setMovies([]);
        setError("No results found.");
      }
    } catch (err) {
      setMovies([]);
      setError("Failed to fetch movie data.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      fetchMovies(query);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content-box">
        <h2>Search Movies</h2>
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            placeholder="Search for a movie"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}

        <div className="movie-results">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                />
              ) : (
                <img
                  src="https://via.placeholder.com/100x150?text=No+Image"
                  alt="No poster"
                />
              )}
              <p>{movie.title}</p>
              <p style={{ fontSize: "0.85rem", color: "#777" }}>
                {movie.release_date}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Movies;
