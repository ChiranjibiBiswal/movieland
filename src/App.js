import React, { useState } from "react";
import { useEffect } from "react";
import './App.css';
import Search from "./search.svg";
import MovieCard from "./MovieCard";

// d62f3b85

const API_URL = `http://www.omdbapi.com?apikey=${process.env.REACT_APP_API_KEY}`;

// const movie1 = {
//     "Title": "Amazing Spiderman",
//     "Year": "2021",
//     "imdbID": "tt2586634",
//     "Type": "movie",
//     "Poster": "N/A"
// }

const App = () => {

    const [movies, setMovies] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('Superman')
    }, []);

    function handelKeyPress(e) {
        if(e.key === 'Enter') {
            searchMovies(searchTerm);
        }
    }

    return (
        <div className="app">
            <h1>Movie Land</h1>
            <div className="search">
                <input 
                    placeholder="Search for movies"
                    value= {searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handelKeyPress}
                />

                <img 
                    src={Search}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {
                movies.length > 0 
                ? (<div className="container">
                    {movies.map((movie) => (
                        <MovieCard key={movie.imdbID} movie = {movie} />
                    ))}
                    </div>) 
                : (
                    <div className="empty">
                        <h2>No movie found</h2>
                    </div>
                )
            }

        </div>
    )
}

export default App;
