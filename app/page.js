"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState("batman");
  const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?s=${search}&apikey=${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Search) {
          const semDuplicatas = data.Search.filter(
            (movie, index, self) =>
              index === self.findIndex((m) => m.imdbID === movie.imdbID),
          );
          setMovies(semDuplicatas);
        }
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
    <main className="min-h-screen bg-zinc-950 text-white px-6 py-10">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl font-bold text-yellow-400 mb-6">
            🎬 Catálogo de Filmes
          </h1>
          <input
            type="text"
            placeholder="Buscar filme..."
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-sm bg-zinc-800 text-white placeholder-zinc-500 border border-zinc-700 rounded-lg px-4 py-2 outline-none focus:border-yellow-400 transition"
          />
        </div>

        {/* Favoritos */}
        <div className="mb-10 border-b border-zinc-800 pb-8">
          <h2 className="text-xl font-bold text-yellow-400 mb-4">
            ⭐ Meus Favoritos
          </h2>
          {favorites.length === 0 ? (
            <p className="text-zinc-500 text-sm">
              Nenhum filme favoritado ainda.
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {favorites.map((f) => (
                <li
                  key={f.imdbID}
                  className="flex items-center justify-between bg-zinc-900 px-4 py-3 rounded-xl"
                >
                  <span className="text-sm">
                    {f.Title} <span className="text-zinc-400">({f.Year})</span>
                  </span>
                  <button
                    onClick={() => handleFavorite(f)}
                    className="text-xs border border-zinc-700 text-zinc-400 px-3 py-1 rounded-lg hover:border-yellow-400 hover:text-yellow-400 transition"
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Catálogo */}
        <div
          className="grid gap-4 mt-6"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
          }}
        >
          {movies.map((movie) => {
            const favoritado = favorites.find((f) => f.imdbID === movie.imdbID);
            return (
              <div
                key={movie.imdbID}
                className="bg-zinc-900 rounded-xl overflow-hidden hover:-translate-y-1 transition-transform duration-200"
              >
                <img
                  src={
                    movie.Poster !== "N/A"
                      ? movie.Poster
                      : "https://placehold.co/160x240?text=Sem+Foto"
                  }
                  alt={movie.Title}
                  className="w-full object-cover aspect-[2/3]"
                />
                <div className="p-3">
                  <p className="text-sm font-semibold truncate">
                    {movie.Title}
                  </p>
                  <span className="text-xs text-zinc-400">{movie.Year}</span>
                  <button
                    onClick={() => handleFavorite(movie)}
                    className={`mt-2 w-full text-xs py-1.5 rounded-lg transition font-medium ${
                      favoritado
                        ? "bg-yellow-400 text-black"
                        : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                    }`}
                  >
                    {favoritado ? "★ Favoritado" : "☆ Favoritar"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
