import React from 'react';
import {Link} from 'react-router-dom';
import './style.css';

function NotFound() {
    return (
        <div className='notFound'>
            <h1>404</h1>
            <h2>Página não encontrada</h2>
            <p>A página que você está procurando não existe.</p>
            <Link to='/' className='backHome'>  Volte a página inicial! </Link> 
        </div>
    );
}

export default NotFound;