// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
import { searchParams, fetchPhoto } from './js/request-api';
import { createMarcup } from './js/marcup';
import { messageError } from './js/error';
import Notiflix from 'notiflix';

const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');
const form = document.querySelector('#search-form');
loadMore.addEventListener('click', onLoadMore);
form.addEventListener('submit', onSubmit);
let query;
let page = 1;
let perPage = 40;
function onLoadMore() {
  page += 1;

  fetchPhoto(searchParams, page, query)
    .then(data => {
      gallery.insertAdjacentHTML('beforeend', createMarcup(data.hits));
      let result = page * perPage;
      console.log(result);
      if (result >= data.totalHits) {
        loadMore.hidden = true;
      }
    })
    .catch(err => {
      console.log(err);
    });
}
function onSubmit(evt) {
  evt.preventDefault();
  const { searchQuery } = evt.currentTarget.elements;
  query = searchQuery.value;
  page = 1;
  fetchPhoto(searchParams, page, query)
    .then(data => {
      gallery.innerHTML = createMarcup(data.hits);
      let result = page * perPage;
      if (result < data.totalHits) {
        loadMore.hidden = false;
      }
      if (!data.hits.length) {
        messageError(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images`);
    })
    .catch(err => {
      console.log(err);
    });
  form.reset();
}
