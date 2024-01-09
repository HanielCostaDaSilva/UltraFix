import React, { useEffect, useState } from "react";
import api from "../../services/API";

import './style.css';
import LoadingCircle from "../../components/LoadingCircle";
import PageTitle from "../../components/PageTitle";
import CardCarrousel from "../../components/CardCarrousel";
import getGenreList from "../../services/getGenres";

async function loadMoviesByGenre(genreId, genreName, setMoviesByGenre) {
    try {
        const response = await api.get('discover/movie', {
            params: {
                api_key: '71ae871274f1b2e455807128f37d9303',
                language: 'pt-BR',
                with_genres: genreId,
            },
        });
        const result = response.data.results;

        // Serão escolhidos filmes aleatórios para serem mostrados ao usuário.
        const insertedMovies = [];
        const maxMovies = 13;
        // O laço ocorre até que o limite de filmes inseridos seja atingido ou até atingir todos os resultados.
        while (insertedMovies.length < maxMovies && insertedMovies.length < result.length) {
            const randomIndex = Math.floor(Math.random() * result.length);
            const randomMovie = result[randomIndex];
            const hasThisMovie = insertedMovies.some((movie) => movie.id === randomMovie.id);
            if (!hasThisMovie) {
                insertedMovies.push(randomMovie);
            }
        }
        setMoviesByGenre((prevState) => [...prevState, { genreId, genreName, movies: insertedMovies }]);

    } catch (error) {
        alert("Error loading movies:", error);
    }
}

async function loadRecentMovies(setMovies) {
    try {
        const response = await api.get("movie/now_playing", {
            params: {
                api_key: '71ae871274f1b2e455807128f37d9303',
                language: 'pt-BR',
                page: 1
            }
        });
        setMovies(response.data.results.slice(0, 13));

    } catch (error) {
        alert("Error loading movies:", error);
    }
}

function shuffle(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}

function Home() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true); // Carregando a página
    const [moviesByGenre, setMoviesByGenre] = useState([]);
    let genres;

    useEffect(() => {
        // Carrega os filmes mais recentes
        loadRecentMovies(setMovies);

        // Função para buscar e carregar os gêneros
        async function fetchGenres() {
            try {
                const genresList = await getGenreList();
                console.log(genresList);
                genres = shuffle(genresList).slice(0, 5);
                console.log(genres);
            } catch (error) {
                alert("Error loading genres:", error);
            }
        }

        // Carrega filmes por gênero
        async function fetchMoviesByGenres() {
            await fetchGenres(); // Aguarde a conclusão da função fetchGenres para definir 'genres'.
            console.log(genres);
            const genrePromises = genres.map(async (genre) => {
                console.log(genre)
                await loadMoviesByGenre(genre.id, genre.name, setMoviesByGenre);
            });
            await Promise.all(genrePromises);
        }

        fetchMoviesByGenres();

        setTimeout(() => {
            setLoading(false);
        }, 100);
    }, []);

    if (loading) {
        return (
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
            {/*
                    {
                        genreId:1,
                        genreName:'Comedia',
                        movies:{
                            {movie},{movie}
                        }
                    }
                 */}
            {
                moviesByGenre.map((movieByGenre) => (
                    <section
                        key={`genre-${movieByGenre.genreId}-${movieByGenre.genreName}`}
                        id={`${movieByGenre.genreName}Section`}
                        className={`movieSection ${movieByGenre.genreName}`}>
                        <CardCarrousel movies={movieByGenre.movies} sectionTopic={movieByGenre.genreName} />
                    </section>))
            }

        </section>
    );
}

export default Home;
