import React, { useContext } from 'react';
import { FavoritesContext } from '../FavoritesContext';
import MovieCard from './MovieCard';

const FavoritesPage = () => {
    const { favorites, removeFavorite } = useContext(FavoritesContext);

    return (
        <div
            style={{
                padding: '30px',
                backgroundColor: '#fff',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                maxWidth: '1200px',
                margin: '0 auto',
                border: '1px solid #e6e6e6',
            }}
        >
            <h1
                style={{
                    fontSize: '2.5rem',
                    color: '#FF5733',
                    textAlign: 'center',
                    marginBottom: '25px',
                    textShadow: '1px 1px 6px rgba(0, 0, 0, 0.2)',
                }}
            >
                Your Favorites
            </h1>
            {favorites.length === 0 ? (
                <p
                    style={{
                        fontSize: '1.3rem',
                        color: '#555',
                        textAlign: 'center',
                        padding: '20px',
                        backgroundColor: '#fafafa',
                        borderRadius: '8px',
                    }}
                >
                    No favorites added yet.
                </p>
            ) : (
                favorites.map((movie) => (
                    <div
                        key={movie.id}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '20px',
                            marginBottom: '15px',
                            backgroundColor: '#f9f9f9',
                            border: '1px solid #ddd',
                            borderRadius: '10px',
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
                            transition: 'box-shadow 0.3s ease',
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.boxShadow = '0 6px 14px rgba(0, 0, 0, 0.1)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.05)';
                        }}
                    >
                        <MovieCard movie={movie} />
                        <button
                            onClick={() => removeFavorite(movie.id)}
                            style={{
                                padding: '12px 18px',
                                backgroundColor: '#FF5733',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                transition: 'background-color 0.3s',
                                outline: 'none',
                            }}
                            onMouseOver={(e) => (e.target.style.backgroundColor = '#e64e2a')}
                            onMouseOut={(e) => (e.target.style.backgroundColor = '#FF5733')}
                        >
                            Remove from Favorites
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};

export default FavoritesPage;
