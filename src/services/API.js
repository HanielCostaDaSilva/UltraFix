import axios from "axios";
// base API url: https://api.themoviedb.org/3/
//API url Example: https://api.themoviedb.org/3/movie/550?api_key=71ae871274f1b2e455807128f37d9303&language=pt-BR


const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});


export default api;

