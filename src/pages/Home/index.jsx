import React, { useEffect, useState } from "react";
import api from "../../services/API";

import './style.css';
import LoadingCircle from "../../components/LoadingCircle";
import PageTitle from "../../components/PageTitle";
import CardCarrousel from "../../components/CardCarrousel";


async function loadMovies(setMovies, setLoad) {
    try {
        const response = await api.get("movie/now_playing", {
            params: {
                api_key: '71ae871274f1b2e455807128f37d9303',
                language: 'pt-BR',
                page: 1
            }
        });
        setMovies(response.data.results.slice(0, 13));
        setTimeout(()=>{
            setLoad(false);
        },100);
        //setTimeout(() =>{setMovies(response.data.results.slice(10, 20))}, 2000);
    } catch (error) {
        alert("Error loading movies:", error);
    }
}

function Home() {
    const [movies, setMovies] = useState([]);
    const [logading, setLoad] = useState(true) //carregando a página
    useEffect(() => {
        loadMovies(setMovies,setLoad); // Chame a função e passe setMovies como argumento
    }, []);

    if (logading){
        return(
            <LoadingCircle />
        )
    }
    
    return (
        <section id='Home'>
            <PageTitle title='UltraFix' />
            <section id="Newmovies" className="movieSection">
                {/* Renderize os novos filmes aqui */}
                <CardCarrousel movies={movies} sectionTopic='Novidade' />
            </section>
        </section>
    );
}

export default Home;
