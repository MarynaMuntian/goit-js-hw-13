import './sass/main.scss';
import Notiflix from 'notiflix';
import GetImagesAPI from './js/fetchImages';
import imgTemplate from './templates/img.hbs';

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('input[type=text]');
const submitBtn = document.querySelector('button[type=submit]');
const galleryContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');