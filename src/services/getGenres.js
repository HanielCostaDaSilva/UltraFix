import api from "./API";

async function getGenreList() {
    try {
        const response = await api.get('genre/movie/list', {
            params: {
                api_key: '71ae871274f1b2e455807128f37d9303',
                language: 'pt-BR',
            },
        });
        
        const genreList = response.data.genres;
        
        return genreList;
    } catch (error) {
        console.error('Error fetching genre list:', error);
        return [];
    }
}

export default getGenreList;