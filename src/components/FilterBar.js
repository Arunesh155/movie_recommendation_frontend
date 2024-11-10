import React from 'react';

const FilterBar = ({ genres, selectedGenre, setSelectedGenre, movies }) => {
    // Check if `movies` is defined, is an array, and has a length of 0
    const isMoviesEmpty = Array.isArray(movies) && movies.length === 0;

    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '20px',
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    marginBottom: '30px',
                    gap: '15px',
                    flexWrap: 'wrap',
                }}
            >
                {genres.map((genre) => (
                    <div
                        key={genre.id}
                        onClick={() => setSelectedGenre(genre.id)}
                        style={{
                            padding: '15px 30px',
                            fontSize: '1.1em',
                            fontWeight: 'bold',
                            border: selectedGenre === genre.id ? '2px solid #FF4500' : '2px solid #ccc',
                            borderRadius: '10px',
                            backgroundColor: selectedGenre === genre.id ? '#FF4500' : '#ffffff',
                            color: selectedGenre === genre.id ? '#ffffff' : '#333',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease-in-out',
                            boxShadow: selectedGenre === genre.id
                                ? '0 10px 20px rgba(255, 69, 0, 0.6)'
                                : '0 6px 12px rgba(0, 0, 0, 0.1)',
                            textAlign: 'center',
                            margin: '10px',
                            letterSpacing: '1px',
                            transform: selectedGenre === genre.id ? 'scale(1.1)' : 'scale(1)',
                        }}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = '#FF6347';
                            e.target.style.color = '#fff';
                            e.target.style.boxShadow = '0 10px 20px rgba(255, 99, 71, 0.5)';
                            e.target.style.transform = 'scale(1.05)';
                        }}
                        onMouseOut={(e) => {
                            if (selectedGenre !== genre.id) {
                                e.target.style.backgroundColor = '#ffffff';
                                e.target.style.color = '#333';
                                e.target.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.1)';
                                e.target.style.transform = 'scale(1)';
                            }
                        }}
                    >
                        {genre.name}
                    </div>
                ))}
            </div>

            {/* Display message if no movies are found */}
            {isMoviesEmpty && (
                <div style={{ textAlign: 'center', color: '#999', fontSize: '1.2em', padding: '20px' }}>
                    No movies found.
                </div>
            )}
        </div>
    );
};

export default FilterBar;
