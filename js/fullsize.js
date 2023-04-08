import {isEscapeKey} from './util.js';
import {renderComments} from './comments.js';

const MAX_COMMENTS_NUMBER = 5;

const renderFullsize = (data) => {
  const body = document.body;
  const bigPictureSection = document.querySelector('.big-picture');
  const pictureContainer = document.querySelector('.pictures');
  const closeButton = document.querySelector('.big-picture__cancel');
  const pictureImg = document.querySelector('.big-picture__img img');

  const pictureLikeCount = document.querySelector('.likes-count');

  const pictureDesc = document.querySelector('.social__caption');
  const commentLoader = document.querySelector('.comments-loader');

  const commentsCount = document.querySelector('.social__comment-count');

  pictureContainer.addEventListener('click', (evt) => {
    const currentLink = evt.target.closest('[data-picture-id]');
    if (currentLink){
      const currentItem = data.find((item) => item.id.toString() === currentLink.dataset.pictureId);
      pictureImg.src = currentItem.url;
      pictureImg.alt = currentItem.description;
      pictureLikeCount.textContent = currentItem.likes;
      pictureDesc.textContent = currentItem.description;

      renderComments(currentItem.comments.slice(0, MAX_COMMENTS_NUMBER));

      const fromCommentsQty =
       currentItem.comments.length > 5 ? 5 : currentItem.comments.length;
      const CommentsQty = currentItem.comments.length;

      commentsCount.innerHTML = `${fromCommentsQty} из <span class='comments-count'>${CommentsQty}</span> комментариев`;

      commentLoader.addEventListener('click', () => {
        renderComments(currentItem.comments);
        commentsCount.innerHTML = `${fromCommentsQty} из ${CommentsQty} комментариев`;
      });

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
      //отписаться от события
      document.removeEventListener('keydown', onDocumentKeydown);
    }
  });

  closeButton.addEventListener('click', () => {
    bigPictureSection.classList.add('hidden');
  });
};

export {renderFullsize};
