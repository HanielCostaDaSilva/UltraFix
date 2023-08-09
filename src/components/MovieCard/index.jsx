import './style.css';
import React from "react";
import {Link} from "react-router-dom";

function MovieCard({ movie }) {
    return (
        <div className="movieCard">
            <Link to= { '/Movie/'+ movie.id} className='movieTitle' >
            <div className="customCard" key={movie.id}>
                <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={`capa ${movie.title}`}
                    className="movieCover"
                />
                <div className="customCardBody">
                    <h5>{movie.title}</h5>
                </div>
            </div>
            </Link>
        </div>
    );
}

export default MovieCard;
