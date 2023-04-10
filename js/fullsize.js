import {isEscapeKey} from './util.js';
import {renderMoreComments} from './load-comments.js';

const renderFullsize = (data) => {
  const body = document.body;
  const bigPictureSection = document.querySelector('.big-picture');
  const pictureContainer = document.querySelector('.pictures');
  const closeButton = document.querySelector('.big-picture__cancel');
  const pictureImg = document.querySelector('.big-picture__img img');
  const pictureLikeCount = document.querySelector('.likes-count');
  const pictureDesc = document.querySelector('.social__caption');

  pictureContainer.addEventListener('click', (evt) => {
    const currentLink = evt.target.closest('[data-picture-id]');
    if (currentLink){
      const currentItem = data.find((item) => item.id.toString() === currentLink.dataset.pictureId);
      pictureImg.src = currentItem.url;
      pictureImg.alt = currentItem.description;
      pictureLikeCount.textContent = currentItem.likes;
      pictureDesc.textContent = currentItem.description;
      renderMoreComments(currentItem);
      evt.preventDefault();
      bigPictureSection.classList.remove('hidden');
    }
    body.classList.add('modal-open');
  });

  const onDocumentKeydown = document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      bigPictureSection.classList.add('hidden');
      body.classList.remove('modal-open');
      document.removeEventListener('keydown', onDocumentKeydown);
    }
  });

  closeButton.addEventListener('click', () => {
    bigPictureSection.classList.add('hidden');
  });
};

export {renderFullsize};
