import React from 'react';
import {Link} from 'react-router-dom';
import './style.css';
import PageTitle from '../../components/PageTitle';

function NotFound() {
    return (
        <div className='notFound'>
        <PageTitle title='Page Not Found'></PageTitle>
            <h1>404</h1>
            <h2>Página não encontrada</h2>
            <p>A página que você está procurando não existe.</p>
            <Link to='/' className='backHome'>  Volte a página inicial! </Link> 
        </div>
    );
}

export default NotFound;