import {isEscapeKey} from './util.js';


const bigPictureSection = document.querySelector('.big-picture');
const closeButton = document.querySelector('.big-picture__cancel');
const modalOpen = document.querySelector('body');
const pictureContainer = document.querySelector('.pictures');
const commentCounter = document.querySelector('.social__comment-count');
const commentLoader = document.querySelector('.comments-loader');

const pictureUrl = document.querySelector('.big-picture__img');
const pictureLike = document.querySelector('.likes-count');
const pictureComments = document.querySelector('.comments-count');
const pictureDesc = document.querySelector('.social__caption');

//открыть при клике
pictureContainer.addEventListener('click', () => {
  bigPictureSection.classList.remove('hidden');
  commentCounter.classList.add('hidden');
  commentLoader.classList.add('hidden');
  modalOpen.classList.add('.modal-open');
});

//закрыть при ESC
document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPictureSection.classList.add('hidden');
    commentCounter.classList.remove('hidden');
    commentLoader.classList.remove('hidden');
    modalOpen.classList.remove('.modal-open');
  }
});

//закрыть кнопкой Крестик
closeButton.addEventListener('click', () => {
  bigPictureSection.classList.add('hidden');
});