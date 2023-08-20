import './style.css';

import React, { useEffect, useState } from 'react';
import {useParams,useNavigate} from 'react-router-dom'

import api from '../../services/API';
import LoadingCircle from '../../components/LoadingCircle';
import PageTitle from '../../components/PageTitle';
import { Alert } from 'react-bootstrap';


//API url Example: https://api.themoviedb.org/3/movie/550?api_key=71ae871274f1b2e455807128f37d9303&language=pt-BR


function Movie(){
    const {id} = useParams();
    const [movie, setMovie] = useState({});
    const [genres, setGenres]= useState([]);
    const [logading, setLoad] = useState(true); //carregando a página
    const navigate= useNavigate();

    useEffect(() => {
        async function loadFilme() {
            try {
                const response = await api.get(`/movie/${id}`, {
                    params: {
                        api_key: '71ae871274f1b2e455807128f37d9303',
                        language: 'pt-BR'
                    }
                });

                console.log(response.data);
                setMovie(response.data);
                setGenres(response.data.genres);
                setTimeout(() => {
                    setLoad(false);
                }, 100);

            } catch (error) {
                console.error('Erro ao carregar filme');
                if (error.response && error.response.status === 404) {
                    navigate('/', { replace: true });
                    return;
                }
                setLoad(false);
            }
        }

        loadFilme(); // Chame a função de carga aqui

    }, [id, navigate]);
    
    if (logading){
        return(
                <LoadingCircle />
        )
    }
    return (
<div className="movie">
  <PageTitle title={`${movie.title}`} />
  <div className="moviePosterContainer">
    <img
      src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
      className="moviePosterBackground"
      alt={`${movie.title}`}
    />
    <img
      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
      alt={`capa ${movie.title}`}
      className="moviePoster"
    />
    <div>
      <p className="movieTitleDescription">{movie.title}</p>
      <div className="boxButtons">
        <button>Salvar</button>
      </div>
    </div>
  </div>
  <section className="movieDescription">
    <button   className="trailer">
    <a href={`https://youtube.com/results?search_query=${movie.title}+trailer`} target='_blank' rel='external'>
        Trailer
    </a>
    
    </button>
    <section className="rate">
      <h3 className="sectionTitle">Avaliação</h3>
      <span className="sinopseText">{movie.vote_average}/10</span>
    </section>

    <section className="genres">
      <h3 className="sectionTitle">Gêneros</h3>
      <span className="sinopseText">
        {genres.map((genre) => genre.name).join(', ')}
      </span>
    </section>

    <section className="sinopse">
      <h3 className="sectionTitle">Sinopse</h3>
      <span className="sinopseText">{movie.overview}</span>
    </section>
  </section>
</div>

      );
      
    
}

export default Movie;