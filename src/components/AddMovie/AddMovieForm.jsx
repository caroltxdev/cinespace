import React, { useState } from 'react';
import './AddMovieForm.css';

const AddMovieForm = ({ onAddMovie }) => {
  // Estado do formulário
  const [formData, setFormData] = useState({
    title: '',
    type: 'movie',
    genre: '',
    platform: '',
    year: '',
    status: 'want',
    rating: 0,
    notes: ''
  });

  // Estado para controlar expansão do formulário
  const [isExpanded, setIsExpanded] = useState(false);

  // Atualizar campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submeter formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.title.trim()) {
      alert('Por favor, insira o título!');
      return;
    }

    // Criar objeto do filme
    const newMovie = {
      id: Date.now(),
      ...formData,
      title: formData.title.trim(),
      addedDate: new Date().toISOString()
    };

    // Passar para o componente pai
    onAddMovie(newMovie);

    // Resetar formulário
    setFormData({
      title: '',
      type: 'movie',
      genre: '',
      platform: '',
      year: '',
      status: 'want',
      rating: 0,
      notes: ''
    });

    // Colapsar formulário após adicionar
    setIsExpanded(false);
  };

  return (
    <div className="add-movie-form-container">
      {/* Botão de Expandir/Colapsar */}
      {!isExpanded ? (
        <button 
          className="add-button-expand"
          onClick={() => setIsExpanded(true)}
        >
          <span className="add-icon">+</span>
          <span>Adicionar Filme/Série</span>
        </button>
      ) : (
        <form className="add-movie-form" onSubmit={handleSubmit}>
          <div className="form-header">
            <h2>🎬 Novo Título</h2>
            <button 
              type="button" 
              className="close-button"
              onClick={() => setIsExpanded(false)}
            >
              ✕
            </button>
          </div>

          <div className="form-grid">
            {/* Título */}
            <div className="form-group full">
              <label>Título *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Ex: Desencanto"
                required
              />
            </div>

            {/* Tipo */}
            <div className="form-group">
              <label>Tipo</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="movie">🎬 Filme</option>
                <option value="series">📺 Série</option>
              </select>
            </div>

            {/* Gênero */}
            <div className="form-group">
              <label>Gênero</label>
              <select name="genre" value={formData.genre} onChange={handleChange}>
                <option value="">Selecione...</option>
                <option value="drama">🎭 Drama</option>
                <option value="comedy">😂 Comédia</option>
                <option value="action">🔫 Ação</option>
                <option value="romance">💕 Romance</option>
                <option value="horror">👻 Terror</option>
                <option value="scifi">🚀 Ficção Científica</option>
                <option value="documentary">📚 Documentário</option>
                <option value="animation">🎨 Animação</option>
              </select>
            </div>

            {/* Plataforma */}
            <div className="form-group">
              <label>Plataforma</label>
              <select name="platform" value={formData.platform} onChange={handleChange}>
                <option value="">Selecione...</option>
                <option value="netflix">Netflix</option>
                <option value="prime">Prime Video</option>
                <option value="disney">Disney+</option>
                <option value="hbo">HBO Max</option>
                <option value="apple">Apple TV+</option>
                <option value="cinema">Cinema</option>
                <option value="other">Outro</option>
              </select>
            </div>

            {/* Ano */}
            <div className="form-group">
              <label>Ano</label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                placeholder="2024"
                min="1900"
                max="2030"
              />
            </div>

            {/* Status */}
            <div className="form-group">
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="want">🎯 Quero Assistir</option>
                <option value="watching">👀 Assistindo</option>
                <option value="watched">✅ Já Assisti</option>
              </select>
            </div>

            {/* Avaliação (se já assistiu) */}
            {formData.status === 'watched' && (
              <div className="form-group">
                <label>Avaliação</label>
                <select name="rating" value={formData.rating} onChange={handleChange}>
                  <option value="0">Sem avaliação</option>
                  <option value="1">⭐</option>
                  <option value="2">⭐⭐</option>
                  <option value="3">⭐⭐⭐</option>
                  <option value="4">⭐⭐⭐⭐</option>
                  <option value="5">⭐⭐⭐⭐⭐</option>
                </select>
              </div>
            )}

            {/* Notas */}
            {formData.status === 'watched' && (
              <div className="form-group full">
                <label>Suas Anotações</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="O que achou? Cenas favoritas? Comentários..."
                  rows="3"
                />
              </div>
            )}
          </div>

          {/* Botões */}
          <div className="form-actions">
            <button type="button" onClick={() => setIsExpanded(false)} className="btn-cancel">
              Cancelar
            </button>
            <button type="submit" className="btn-submit">
              Adicionar à Lista
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddMovieForm;
