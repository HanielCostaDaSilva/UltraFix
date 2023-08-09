import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Header from './components/Header';

import Home from './pages/Home';
import Movie from './pages/Movie';
import NotFound from './pages/NotFound';


function RoutesAPP(){
    return(
    <BrowserRouter>
        <Header />
        <Routes>
            <Route path= '/' element={<Home />} />

            <Route path='/Movie/:id' element={<Movie />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    </BrowserRouter>

    )
}

export default RoutesAPP;