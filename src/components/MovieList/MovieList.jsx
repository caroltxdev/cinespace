import React from 'react';
import MovieCard from "../MovieCard/MovieCard";
import './MovieList.css';

const MovieList = ({ movies, onUpdateStatus, onDelete }) => {
  // Se não houver filmes
  if (movies.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🍿</div>
        <h2 className="empty-title">Nenhum título por aqui</h2>
        <p className="empty-text">
          Adicione seu primeiro filme ou série para começar sua jornada cinematográfica!
        </p>
      </div>
    );
  }

  return (
    <div className="movie-list-container">
      <div className="movie-grid">
        {movies.map((movie, index) => (
          <div 
            key={movie.id}
            style={{
              animation: `fadeIn 0.6s ease-out ${index * 0.1}s both`
            }}
          >
            <MovieCard
              movie={movie}
              onUpdateStatus={onUpdateStatus}
              onDelete={onDelete}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
