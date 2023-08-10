import './style.css';
import { Link } from 'react-router-dom';

function Header(){
    
    return (
        <header id='Cabecalho'>
        <div>
            <Link id='Logo' to='/'> 
            <img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="UltraFix" />
            <p>UltraFlix</p>
            </Link >
        </div>
            <Link id='MoviesLink' to='/'> Filmes </Link >
            <Link id='SeriesLink' to='/'> Séries </Link >
            <Link id='FavoriteLink' to='/favorites'> Favoritos </Link >
        </header>
    )
}

export default  Header;