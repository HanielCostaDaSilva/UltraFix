import './style.css';

import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'

import api from '../../services/API';
import LoadingCircle from '../../components/LoadingCircle';

//API url Example: https://api.themoviedb.org/3/movie/550?api_key=71ae871274f1b2e455807128f37d9303&language=pt-BR

async function loadFilme(id, setMovie, setLoad) {
    try {
        const response = await api.get(`/movie/${id}`,{
            params: {
                api_key: '71ae871274f1b2e455807128f37d9303',
                language: 'pt-BR'
            }
        });
        
        // Processar a resposta em caso de sucesso
        console.log(response.data);
        setMovie(response.data);
        setTimeout(() => {
            setLoad(false);
        }, 100);

    } catch (error) {
        console.error('Erro ao carregar filme');

        // Verifique o status do erro para fornecer mensagens específicas se necessário
        if (error.response && error.response.status === 404) {
            console.log('Filme não encontrado');
        }

        // Defina o estado de carregamento para false, mesmo em caso de erro
        setLoad(false);
    }
}


function Movie(){
    const {id} = useParams();
    const [movie, setMovie] = useState({});
    const [logading, setLoad] = useState(true) //carregando a página
    useEffect(()=>{
        loadFilme(id,setMovie,setLoad);
    },[])
    if (logading){
        return(
                <LoadingCircle />
        )
    }
    
    
    return (
    <div className='movieDescription'>
        <div className='moviePosterContainer'> 
            <img 
            src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} 
            className='moviePosterBackground' 
            />
        <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={`capa ${movie.title}`}
            className="moviePoster"
        />
         <p className='movieTitleDescription'>{movie.title}</p>
        </div>

        <section className='Avaliação'>
        <h3 className='sectionTitle'>Avaliação </h3>
        <span className='sinopseText'>{movie.vote_average}/10</span>
        </section>

        <section className='sinopse'>
        <h3 className='sectionTitle'>Sinopse </h3>
        <span className='sinopseText'>{movie.overview}</span>
        </section>
    </div>
    
    );
    
}

export default Movie;