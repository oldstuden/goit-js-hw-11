function createMarcup(arr) {
  return arr
    .map(
      ({ webformatURL, tags, likes, views, comments, downloads }) => `
  <li class="photo-card gallery__item">
                   <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading ="lazy"/>
              <div class="info">
                   <p class="info-item">Likes: <span>${likes}</span></p>
                   <p class="info-item">Views: <span>${views}</span></p>
                   <p class="info-item">Comments:<span> ${comments}</span></p>
                   <p class="info-item">Downloads: <span>${downloads}</span></p>
              </div>
              
         </li>`
    )
    .join('');
}
export { createMarcup };
