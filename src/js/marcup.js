function createMarcup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
  <li class="photo-card gallery__item">
                   <a class="gallery__link" href="${largeImageURL}" ><img class="gallery__image" src="${webformatURL}" alt="${tags}" loading ="lazy"/></a>
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
