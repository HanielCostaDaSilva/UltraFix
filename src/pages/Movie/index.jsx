import './style.css';

import React, { useEffect, useState } from 'react';
import {useParams,useNavigate} from 'react-router-dom'
import api from '../../services/API';
import LoadingCircle from '../../components/LoadingCircle';
import PageTitle from '../../components/PageTitle';

//API url Example: https://api.themoviedb.org/3/movie/550?api_key=71ae871274f1b2e455807128f37d9303&language=pt-BR


function Movie(){
    const {id} = useParams();
    const [movie, setMovie] = useState({});
    const [genres, setGenres]= useState([]);
    const [loading, setLoading] = useState(true); //carregando a página
    const navigate= useNavigate();

    function salvarFavorito() {
      const favoritesList = localStorage.getItem("@ultraflix");
      
      let savedMovies = JSON.parse(favoritesList) || [];
      
      const hasMovie = savedMovies.some((movieSaved) => {
        return movieSaved.id === movie.id;
      });
      if (hasMovie){
        return;
      }
        savedMovies.push(movie);
        localStorage.setItem('@ultraflix', JSON.stringify(savedMovies));
        return;
  }

    useEffect(() => {
        async function loadFilme() {
            try {
                const response = await api.get(`/movie/${id}`, {
                    params: {
                        api_key: '71ae871274f1b2e455807128f37d9303',
                        language: 'pt-BR'
                    }
                });

                setMovie(response.data);
                setGenres(response.data.genres);
                setTimeout(() => {
                    setLoading(false);
                }, 100);

            } catch (error) {
                console.error('Erro ao carregar filme');
                if (error.response && error.response.status === 404) {
                    navigate('/', { replace: true });
                    return;
                }
                setLoading(false);
            }
        }

        loadFilme(); // Chame a função de carga aqui

    }, [id, navigate]);
    

    if (loading){
        return(
                <LoadingCircle />
        )
    }
    return (
<div className="movie">
  <PageTitle title={`${movie.title}`} />
  {/* Capa principal do filme */}
  <div className="moviePosterContainer">
    <div className="moviePosterBackground">
    <img
      src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
      className="moviePosterBackground"
      alt={`${movie.title}`}
    />
    </div>
    <img
      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
      alt={`capa ${movie.title}`}
      className="moviePoster"
    />
    <div className='movieTitleDescriptionBox'>
      <p className="movieTitleDescription">{movie.title}</p>
      <button className='saveMovieButton' onClick={salvarFavorito}>Salvar</button>
    </div>
  </div>
  {/* Descrição principal do filme */}
  <section className=" descriptionBoxes movieDescription">
  {/* Trailer button, ao clicado direcionará o usuário para ao youtbe */}
  
    <button className="trailer">
      <a href={`https://youtube.com/results?search_query=${movie.title}+trailer`} target='_blank' rel='external'>
        Trailer
      </a>
    </button>
    {/* Capa principal do filme */}
  
    <section className=" descriptionBoxes rate">
      <h3 className="sectionTitle">Avaliação</h3>
      <span className="sinopseText">{movie.vote_average}/10</span>
    </section>

    <section className=" descriptionBoxes genres">
      <h3 className="sectionTitle">Gêneros</h3>
      <span className="sinopseText">
        {genres.map((genre) => genre.name).join(', ')}
      </span>
    </section>

    <section className=" descriptionBoxes sinopse">
      <h3 className="sectionTitle">Sinopse</h3>
      <span className="sinopseText">{movie.overview}</span>
    </section>
  </section>
</div>

      );
      
    
}

export default Movie;