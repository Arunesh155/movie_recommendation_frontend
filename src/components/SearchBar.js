import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '20px 0',
            }}
        >
            <input
                type="text"
                placeholder="Search for a movie..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                    padding: '15px 20px',
                    width: '400px',
                    fontSize: '1em',
                    borderRadius: '30px',
                    border: '2px solid #ccc',
                    backgroundColor: '#fff',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                    outline: 'none',
                }}
                onFocus={(e) => {
                    e.target.style.borderColor = '#FF4500';
                    e.target.style.boxShadow = '0 6px 12px rgba(255, 69, 0, 0.3)';
                }}
                onBlur={(e) => {
                    e.target.style.borderColor = '#ccc';
                    e.target.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
                }}
            />
        </div>
    );
};

export default SearchBar;
