import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from './components/MovieList';
import FilterBar from './components/FilterBar';
import SearchBar from './components/SearchBar';
import FavoritesPage from './components/FavoritesPage';
import { FavoritesProvider } from './FavoritesContext';
import Login from './components/Login';
import SignUp from './components/Signup';

const TMDB_API_KEY = '82bf8e7015e539b6b3839975fa59392a'; // Replace with your TMDB API Key

const App = () => {
    const [movies, setMovies] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('ta'); // Default to Tamil
    const [searchQuery, setSearchQuery] = useState('');
    const [favorites, setFavorites] = useState([]);
    const [showFavorites, setShowFavorites] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [isUserSignedUp, setIsUserSignedUp] = useState(false);

    const selectedGenresList = [
        { id: 28, name: 'Action' },
        { id: 35, name: 'Comedy' },
        { id: 18, name: 'Drama' },
        { id: 27, name: 'Horror' },
        { id: 53, name: 'Thriller' },
        { id: 80, name: 'Crime' },
        { id: 10749, name: 'Romance' },
    ];

    const selectedLanguagesList = [
        { code: 'ta', name: 'Tamil' },
        { code: 'te', name: 'Telugu' },
        { code: 'hi', name: 'Hindi' },
        { code: 'ml', name: 'Malayalam' },
        { code: 'en', name: 'English' },
        { code: 'kn', name: 'Kannada' }
        // Add more languages as needed
    ];

    // Fetch movies
   // Fetch movies
useEffect(() => {
    const fetchMovies = async () => {
        try {
            let movieResults = [];
            const totalPages = 1; // Limit to 1 page for a total of 10 results

            for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
                let response;

                if (searchQuery) {
                    response = await axios.get(
                        `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${searchQuery}&with_original_language=${selectedLanguage}&page=${currentPage}`
                    );
                } else {
                    let genreParam = selectedGenre ? `&with_genres=${selectedGenre}` : '';
                    response = await axios.get(
                        `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}${genreParam}&with_original_language=${selectedLanguage}&page=${currentPage}`
                    );
                }
                

                const fetchedMovies = response.data.results;
                const tamilMovies = fetchedMovies.filter(movie => movie.original_language === selectedLanguage);

                // Limit to 10 movies
                movieResults = [...movieResults, ...tamilMovies.slice(0, 20 - movieResults.length)];

                if (movieResults.length >= 20) {
                    break; // Stop fetching if we already have 10 movies
                }
            }

            setMovies(movieResults);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    fetchMovies();
}, [selectedGenre, searchQuery, selectedLanguage]); // Add selectedLanguage to the dependency array

    // Toggle favorite
    const toggleFavorite = (movie) => {
        if (favorites.some(favorite => favorite.id === movie.id)) {
            setFavorites(favorites.filter(fav => fav.id !== movie.id));
        } else {
            setFavorites([...favorites, movie]);
        }
    };

    const clearSearch = () => {
        setSearchQuery('');
        setMovies([]);
    };

    return (
        <FavoritesProvider>
            <div
                style={{
                    fontFamily: '"Poppins", sans-serif',
    
                }}
            >
                {!isLoggedIn ? (
                    !isSignUp ? (
                        <Login onLogin={() => setIsLoggedIn(true)} onToggleSignUp={() => setIsSignUp(true)} />
                    ) : (
                        <SignUp
                            onSignUp={() => {
                                setIsUserSignedUp(true);
                                setIsLoggedIn(true);
                            }}
                        />
                    )
                ) : (
                    <>
                        <h1
                            style={{
                                textAlign: 'center',
                                color: '#ff6b00',
                                fontSize: '2.5rem',
                                marginBottom: '30px',
                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                            }}
                        >
                            Movie Recommendations
                        </h1>

                        <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
                            <button
                                onClick={() => setIsLoggedIn(false)}
                                style={{
                                    backgroundColor: '#ff6b00',
                                    color: '#fff',
                                    padding: '10px 20px',
                                    borderRadius: '5px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '1.1em',
                                    transition: 'background-color 0.3s',
                                }}
                                onMouseOver={(e) => (e.target.style.backgroundColor = '#e55e00')}
                                onMouseOut={(e) => (e.target.style.backgroundColor = '#ff6b00')}
                            >
                                Logout
                            </button>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                            <button
                                onClick={() => setShowFavorites(false)}
                                style={{
                                    backgroundColor: showFavorites ? '#ddd' : '#ff6b00',
                                    color: '#fff',
                                    padding: '10px 15px',
                                    borderRadius: '8px',
                                    marginRight: '10px',
                                    cursor: 'pointer',
                                    border: 'none',
                                    transition: 'background-color 0.3s',
                                }}
                            >
                                Home
                            </button>
                            <button
                                onClick={() => setShowFavorites(true)}
                                style={{
                                    backgroundColor: showFavorites ? '#ff6b00' : '#ddd',
                                    color: '#fff',
                                    padding: '10px 15px',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    border: 'none',
                                    transition: 'background-color 0.3s',
                                }}
                            >
                                Favorites
                            </button>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                            <label htmlFor="language-select" style={{ marginRight: '10px' }}>Select Language:</label>
                            <select
                                id="language-select"
                                value={selectedLanguage}
                                onChange={(e) => setSelectedLanguage(e.target.value)}
                                style={{
                                    padding: '10px',
                                    borderRadius: '5px',
                                    border: '1px solid #ccc',
                                }}
                            >
                                {selectedLanguagesList.map(lang => (
                                    <option key={lang.code} value={lang.code}>{lang.name}</option>
                                ))}
                            </select>
                        </div>

                        {!showFavorites ? (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
                                    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                                    <button
                                        onClick={clearSearch}
                                        style={{
                                            backgroundColor: '#ff6b00',
                                            color: '#fff',
                                            padding: '10px 20px',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            border: 'none',
                                            transition: 'background-color 0.3s',
                                            marginLeft: '10px', // Add margin to separate from the search bar
                                        }}
                                        onMouseOver={(e) => (e.target.style.backgroundColor = '#e55e00')}
                                        onMouseOut={(e) => (e.target.style.backgroundColor = '#ff6b00')}
                                    >
                                        Clear Search
                                    </button>
                                </div>

                                <FilterBar genres={selectedGenresList} selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} />

                                <MovieList movies={movies} toggleFavorite={toggleFavorite} />
                            </>
                        ) : (
                            <FavoritesPage favorites={favorites} toggleFavorite={toggleFavorite} />
                        )}
                    </>
                )}
            </div>
        </FavoritesProvider>
    );
};

export default App;
