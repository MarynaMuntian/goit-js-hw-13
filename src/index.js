import './sass/main.scss';
import Notiflix from 'notiflix';
import GetImagesAPI from './js/fetchImages';
import imgTemplate from './templates/img.hbs';

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('input[type=text]');
const submitBtn = document.querySelector('button[type=submit]');
const galleryContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

const imagesApi = new GetImagesAPI();

function hideLoadMoreBtn () {
loadMoreBtn.classList.remove('visible');
};
 
hideLoadMoreBtn();

function showLoadMoreBtn() {
    loadMoreBtn.classList.add('visible');
}

const renderPage = (img) => {
    const markup = imgTemplate(img.hits);
    galleryContainer.insertAdjacentHTML('beforeend', markup);
}

const clearPage = () => {
    galleryContainer.innerHTML = '';
}

const imagesQuantity = (items) => {
    if (items > 0) {
        Notify.success(`Hooray! We found ${items} images.`);
    }
}

const searchError = () => {
    imagesApi.resetPage();
    Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
    );
    clearPage();
    hideLoadMoreBtn();
}

const endError = () => {
    Notify.info("We're sorry, but you've reached the end of search results.");
 }

const submitSearch = (event) => {
    event.preventDefault();
    clearPage();
    // hideLoadMoreBtn();

    const input = event.currentTarget;
    imagesApi.query = input.elements.searchQuery.value.trim();
    imagesApi.resetPage();

    if (imagesApi.searchQuery !== '') {
        const request = async () => {
            try {
                const images = await imagesApi.fetchImages();
                imagesQuantity(images.totalHits);
                if (images.totalHits < 1) {
                    searchError();
                    return;
                } else if (images.totalHits <= imagesApi.itemsPerPage) {
                    endError();
                    hideLoadMoreBtn();
                    renderPage(images);
                    return;
                }
                showLoadMoreBtn();
                return renderPage(images);
            } catch (error) {
                searchError(error);
            } finally {
                input.reset();
            }
        };
        return request();
    } else {
        clearPage();
        searchError();
    }
}