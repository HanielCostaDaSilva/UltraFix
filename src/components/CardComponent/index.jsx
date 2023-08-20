import './style.css';
import React from "react";
import {Link} from "react-router-dom";

function CardComponent({ movie }) {
    return (
        <div className="cardComponent">
            <Link to= { '/Movie/'+ movie.id} className='movieTitle' >
            <div className="customCard" key={movie.id}>
                <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={`capa ${movie.title}`}
                    className="cardCover"
                />
                <div className="customCardBody">
                    <h5>{movie.title}</h5>
                </div>
            </div>
            </Link>
        </div>
    );
}

export default CardComponent;
