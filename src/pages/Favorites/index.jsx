import { useEffect, useState } from 'react'
import './style.css';
import CardComponent from '../../components/CardComponent';

import {toast} from 'react-toastify';

function Favorites() {
    const [movies, setMovies] = useState([]);


    function removeFavorite(movieId) {
        const moviesFilter = movies.filter((movie) => {
            return (movie.id !== movieId)
        })
        setMovies( moviesFilter)
        localStorage.setItem("@ultraflix", JSON.stringify(moviesFilter));
        toast.success("filme removido com sucesso")
    }

    useEffect(() => {
        const fetchFavorites = async () => {
            const favoritesList = await localStorage.getItem("@ultraflix");
            setMovies(JSON.parse(favoritesList) || []);
        }
        fetchFavorites();
    }, [])

    return (
        <div className='favoriteMovies'>
            {(movies.length ===0 ? <h1> Você não possui nenhum filme Salvo</h1> :"")}
            
            {movies.map(movie => {
                return (
                    <div key={movie.id} >
                        <CardComponent movie={movie}>
                        </CardComponent>
                        <button onClick={() => removeFavorite(movie.id)}>
                            Excluir
                        </button>

                    </div>
                )
            })
            }
        </div>

    )
}

export default Favorites;