import React from 'react';
import './FilterButtons.css';

const FilterButtons = ({ currentFilter, onFilterChange }) => {
  const filters = [
    { id: 'all', label: 'Todos', icon: '📽️' },
    { id: 'want', label: 'Quero Assistir', icon: '🎯' },
    { id: 'watching', label: 'Assistindo', icon: '👀' },
    { id: 'watched', label: 'Já Assisti', icon: '✅' }
  ];

  return (
    <div className="filter-buttons-container">
      <div className="filter-buttons">
        {filters.map(filter => (
          <button
            key={filter.id}
            className={`filter-btn ${currentFilter === filter.id ? 'active' : ''}`}
            onClick={() => onFilterChange(filter.id)}
          >
            <span className="filter-icon">{filter.icon}</span>
            <span className="filter-label">{filter.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterButtons;
