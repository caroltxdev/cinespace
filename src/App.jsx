import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import AddMovieForm from './components/AddMovie/AddMovieForm';
import FilterButtons from './components/FilterButtons/FilterButtons';
import MovieList from './components/MovieList/MovieList';
import './styles/global.css';

const dadosIniciais = [
  {
    id: 1,
    title: "Desencanto",
    type: "series",
    genre: "animation",
    platform: "netflix",
    year: 2024,
    status: "watched",
    rating: 5,
    notes: "Um ótimo desenho conforto!",
    addedDate: "2026-01-15T10:00:00.000Z"
  },
  {
    id: 2,
    title: "Supernatural",
    type: "series",
    genre: "terror",
    platform: "prime",
    year: 2008,
    status: "watched",
    rating: 5,
    notes: "Melhor série criada!",
    addedDate: "2026-01-20T14:30:00.000Z"
  },
  {
    id: 3,
    title: "Barbie",
    type: "movie",
    genre: "comedy",
    platform: "netflix",
    year: 2023,
    status: "want",
    rating: 0,
    notes: "",
    addedDate: "2026-02-01T09:15:00.000Z"
  },
  {
    id: 4,
    title: "The Last of Us",
    type: "series",
    genre: "drama",
    platform: "hbo",
    year: 2023,
    status: "watched",
    rating: 5,
    notes: "Melhor adaptação de jogo que já vi. Episódio 3 me destruiu.",
    addedDate: "2026-01-10T16:45:00.000Z"
  },
  {
    id: 5,
    title: "Duna: Parte 2",
    type: "movie",
    genre: "scifi",
    platform: "cinema",
    year: 2024,
    status: "want",
    rating: 0,
    notes: "",
    addedDate: "2026-02-10T11:20:00.000Z"
  },
  {
    id: 6,
    title: "The Bear",
    type: "series",
    genre: "drama",
    platform: "disney",
    year: 2022,
    status: "watched",
    rating: 4,
    notes: "Ansiedade em forma de série. Jeremy Allen White é demais!",
    addedDate: "2026-01-25T13:00:00.000Z"
  },
  {
    id: 7,
    title: "Parasita",
    type: "movie",
    genre: "drama",
    platform: "other",
    year: 2019,
    status: "watched",
    rating: 5,
    notes: "Obra-prima coreana. Plot twist absurdo!",
    addedDate: "2026-01-05T19:30:00.000Z"
  },
  {
    id: 8,
    title: "Succession",
    type: "series",
    genre: "drama",
    platform: "hbo",
    year: 2018,
    status: "want",
    rating: 0,
    notes: "",
    addedDate: "2026-02-05T10:10:00.000Z"
  }
];

function App() {
  const [theme, setTheme] = useState('dark');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');

  const [movies, setMovies] = useState(() => {
    const savedMovies = localStorage.getItem('watchbloom-movies');
    if (savedMovies) {
      return JSON.parse(savedMovies);
    }
    return dadosIniciais;
  });

  // Aplica o tema no body sempre que theme mudar
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  // Salva no localStorage sempre que movies mudar
  useEffect(() => {
    localStorage.setItem('watchbloom-movies', JSON.stringify(movies));
  }, [movies]);

  const handleToggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleAddMovie = (newMovie) => {
    setMovies(prevMovies => [newMovie, ...prevMovies]);
  };

  const handleUpdateStatus = (movieId, newStatus) => {
    setMovies(prevMovies =>
      prevMovies.map(movie =>
        movie.id === movieId
          ? { ...movie, status: newStatus }
          : movie
      )
    );
  };

  const handleDeleteMovie = (movieId) => {
    if (window.confirm('Tem certeza que deseja excluir este título?')) {
      setMovies(prevMovies =>
        prevMovies.filter(movie => movie.id !== movieId)
      );
    }
  };

  const getFilteredMovies = () => {
    let filtered = currentFilter === 'all'
      ? movies
      : movies.filter(m => m.status === currentFilter);

    if (searchTerm) {
      filtered = filtered.filter(m =>
        m.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const stats = {
    total: movies.length,
    watched: movies.filter(m => m.status === 'watched').length,
    watching: movies.filter(m => m.status === 'watching').length,
    want: movies.filter(m => m.status === 'want').length
  };

  return (
    <div className="App">
      <Header
        stats={stats}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />
      <AddMovieForm onAddMovie={handleAddMovie} />
      <FilterButtons
        currentFilter={currentFilter}
        onFilterChange={setCurrentFilter}
      />
      <MovieList
        movies={getFilteredMovies()}
        onUpdateStatus={handleUpdateStatus}
        onDelete={handleDeleteMovie}
      />
    </div>
  );
}

export default App;
