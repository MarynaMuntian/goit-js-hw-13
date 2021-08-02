import axios from 'axios';

export default class GetImagesAPI {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.itemsPerPage = 40;
    }

    fetchImages() {
        const BASE_URL = 'https://pixabay.com/api/';
        const API_KEY = '22698897-2ba121c7da348ad857b7f6d23';
        const url = `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.itemsPerPage}`;
        return axios
            .get(url)
            .then(response => {
                this.updatePage();
                // console.log(response.data.totalHits);
                return response.data;
            })
            .catch(error => console.log(error));
    }

    resetPage() {
        this.page = 1;
    }

    updatePage() {
        this.page += 1;
    }
}