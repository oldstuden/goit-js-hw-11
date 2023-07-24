import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { searchParams, fetchPhoto } from './js/request-api';
import { createMarcup } from './js/marcup';
import { messageError } from './js/error';
import Notiflix from 'notiflix';

const selectors = {
  gallery: document.querySelector('.gallery'),
  loadMore: document.querySelector('.load-more'),
  form: document.querySelector('#search-form'),
};

const { gallery, loadMore, form } = selectors;
loadMore.addEventListener('click', onLoadMore);
form.addEventListener('submit', onSubmit);
let query;
let page = 1;
let perPage = 40;
function onLoadMore() {
  page += 1;
  const { height: cardHeight } = form.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });

  fetchPhoto(searchParams, page, query)
    .then(data => {
      gallery.insertAdjacentHTML('beforeend', createMarcup(data.hits));
      lightbox.refresh();
      let result = page * perPage;
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
      lightbox.refresh();
      let result = page * perPage;
      if (result < data.totalHits) {
        loadMore.hidden = false;
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images`);
      }
      if (!data.hits.length) {
        messageError(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        loadMore.hidden = true;
      }
    })
    .catch(err => {
      console.log(err);
    });
  form.reset();
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});
