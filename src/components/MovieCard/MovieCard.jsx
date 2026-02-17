import React from 'react';
import './MovieCard.css';

const MovieCard = ({ movie, onUpdateStatus, onDelete }) => {
  // Mapear ícones por gênero
  const genreIcons = {
    drama: '🎭',
    comedy: '😂',
    action: '🔫',
    romance: '💕',
    horror: '👻',
    scifi: '🚀',
    documentary: '📚',
    animation: '🎨'
  };

  // Mapear badges por plataforma
  const platformColors = {
    netflix: '#E50914',
    prime: '#00A8E1',
    disney: '#113CCF',
    hbo: '#8440C5',
    apple: '#000000',
    cinema: '#FFD700',
    other: '#666666'
  };

  // Renderizar estrelas
  const renderStars = (rating) => {
    return '⭐'.repeat(rating);
  };

  // Status do filme
  const getStatusConfig = () => {
    switch (movie.status) {
      case 'want':
        return { label: 'Quero Assistir', color: '#20448C', icon: '🎯' };
      case 'watching':
        return { label: 'Assistindo', color: '#7193D9', icon: '👀' };
      case 'watched':
        return { label: 'Assistido', color: '#730A26', icon: '✅' };
      default:
        return { label: 'Status', color: '#666', icon: '📽️' };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <div className={`movie-card ${movie.status}`}>
      {/* Badge de Status */}
      <div className="card-badge" style={{ background: statusConfig.color }}>
        <span>{statusConfig.icon}</span>
        <span>{statusConfig.label}</span>
      </div>

      {/* Conteúdo Principal */}
      <div className="card-content">
        {/* Título e Tipo */}
        <div className="card-header">
          <h3 className="card-title">{movie.title}</h3>
          <span className="card-type">
            {movie.type === 'movie' ? '🎬' : '📺'}
          </span>
        </div>

        {/* Metadados */}
        <div className="card-meta">
          {movie.genre && (
            <span className="meta-item">
              <span className="meta-icon">{genreIcons[movie.genre] || '🎬'}</span>
              <span className="meta-text">{movie.genre}</span>
            </span>
          )}
          
          {movie.year && (
            <span className="meta-item">
              <span className="meta-icon">📅</span>
              <span className="meta-text">{movie.year}</span>
            </span>
          )}

          {movie.platform && (
            <span 
              className="meta-platform"
              style={{ 
                background: platformColors[movie.platform] || '#666',
                color: 'white'
              }}
            >
              {movie.platform}
            </span>
          )}
        </div>

        {/* Avaliação */}
        {movie.status === 'watched' && movie.rating > 0 && (
          <div className="card-rating">
            <span className="rating-stars">{renderStars(movie.rating)}</span>
          </div>
        )}

        {/* Notas */}
        {movie.status === 'watched' && movie.notes && (
          <p className="card-notes">"{movie.notes}"</p>
        )}

        {/* Ações */}
        <div className="card-actions">
          {/* Botão de mudança de status */}
          {movie.status === 'want' && (
            <button 
              className="btn-action btn-start"
              onClick={() => onUpdateStatus(movie.id, 'watching')}
            >
              <span>▶</span>
              <span>Começar</span>
            </button>
          )}

          {movie.status === 'watching' && (
            <button 
              className="btn-action btn-finish"
              onClick={() => onUpdateStatus(movie.id, 'watched')}
            >
              <span>✓</span>
              <span>Concluir</span>
            </button>
          )}

          {movie.status === 'watched' && (
            <button 
              className="btn-action btn-rewatch"
              onClick={() => onUpdateStatus(movie.id, 'watching')}
            >
              <span>🔄</span>
              <span>Reassistir</span>
            </button>
          )}

          {/* Botão de excluir */}
          <button 
            className="btn-action btn-delete"
            onClick={() => onDelete(movie.id)}
          >
            <span>🗑</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
