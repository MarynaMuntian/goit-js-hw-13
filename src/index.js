import './sass/main.scss';
import Notiflix from 'notiflix';
import GetImagesAPI from './js/fetchImages';
import imgTemplate from './templates/img.hbs';

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('input[type=text]');
const submitBtn = document.querySelector('button[type=submit]');
const galleryContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

const images = new GetImagesAPI();

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