"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?s=${search}&apikey=b42aa8ac`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Search) setMovies(data.Search);
      });
  }, [search]);

  function handleFavorite(movie) {
    const jaFavoritado = favorites.find((f) => f.imdbID === movie.imdbID);
    if (jaFavoritado) {
      setFavorites(favorites.filter((f) => f.imdbID !== movie.imdbID));
    } else {
      setFavorites([...favorites, movie]);
    }
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🎬 Catálogo de Filmes</h1>

      {/* Campo de busca */}
      <input
        type="text"
        placeholder="Buscar filme..."
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "8px",
          width: "300px",
          marginBottom: "1.5rem",
          fontSize: "16px",
          border: "2px solid #7a7a7a",
          borderRadius: "10px",
          marginTop: "6px",
        }}
      />

      {/* Lista de filmes */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: "1rem",
        }}
      >
        {movies.map((movie) => {
          const favoritado = favorites.find((f) => f.imdbID === movie.imdbID);
          return (
            <div
              key={movie.imdbID}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "8px",
                textAlign: "center",
              }}
            >
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/150"
                }
                alt={movie.Title}
                width="100%"
                style={{ borderRadius: "4px" }}
              />
              <p style={{ fontWeight: "bold", margin: "8px 0 4px" }}>
                {movie.Title}
              </p>
              <p style={{ color: "#666", fontSize: "14px" }}>{movie.Year}</p>
              <button
                onClick={() => handleFavorite(movie)}
                style={{
                  marginTop: "8px",
                  padding: "6px 12px",
                  cursor: "pointer",
                  background: favoritado ? "#f0c040" : "#eee",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                {favoritado ? "★ Favoritado" : "☆ Favoritar"}
              </button>
            </div>
          );
        })}
      </div>

      {/* Seção de favoritos */}
      {favorites.length > 0 && (
        <div style={{ marginTop: "3rem" }}>
          <h2>⭐ Meus Favoritos</h2>
          <ul>
            {favorites.map((f) => (
              <li key={f.imdbID} style={{ marginBottom: "8px" }}>
                {f.Title} ({f.Year})
                <button
                  onClick={() => handleFavorite(f)}
                  style={{ marginLeft: "12px", cursor: "pointer" }}
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
