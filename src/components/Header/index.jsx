import './style.css';
import { Link } from 'react-router-dom';

function Header(){
    return (
        <header id='Cabecalho'>
            <Link id='Logo' to='/'> UltraFlix </Link >
            <Link id='Favorite' to='/favorites'> Favorites </Link >
        </header>
    )
}

export default  Header;