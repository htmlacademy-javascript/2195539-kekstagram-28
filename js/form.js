import {resetScale} from './scale.js';
import {resetEffects} from './effect.js';
import {showAlert} from './util.js';
import {sendData} from './api.js';
import {getModalSuccess, getModalError} from './modal-upload.js';

const TAG_ERROR_TEXT = 'Неправильно заполнено поле';
const COMMENT_ERROR_TEXT_MAXLENGTH = 'Длина комментария не может составлять больше 140 символов';
const MAX_TEXT_HASHTAGS = 5;
const MAX_TEXT_COMMENTS = 140;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...',
};

const submitButton = document.querySelector('#upload-submit');
const uploadFileField = document.querySelector('#upload-file');
const body = document.body;
const modalShow = document.querySelector('.img-upload__overlay');
const hashtagsField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const closeModalWindowButton = document.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent:'img-upload__field-wrapper',
  errorTextClass:'img-upload__field-wrapper--error',
});

const hasValidTag = (tag) => VALID_SYMBOLS.test(tag);
const hasValidCount = (tags) => tags.length <= MAX_TEXT_HASHTAGS;
const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag)=>tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(hasValidTag);
};

pristine.addValidator(
  hashtagsField,
  validateTags,
  TAG_ERROR_TEXT
);

const validateCommentMax = (value) => value.length <= MAX_TEXT_COMMENTS;

pristine.addValidator(
  commentField,
  validateCommentMax,
  COMMENT_ERROR_TEXT_MAXLENGTH
);


const openModalWindow = () => {
  modalShow.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentEscapeKeydown);
};

const closeModalWindow = () => {
  form.reset();
  resetScale();
  resetEffects();
  pristine.reset();
  modalShow.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentEscapeKeydown);
};

modalShow.addEventListener('click', (evt) => {
  if (evt.target === modalShow){
    evt.currentTarget.classList.add('hidden');
  }
});

function onDocumentEscapeKeydown (evt) {
  if (evt.key === 'Escape' && !(document.activeElement === hashtagsField || document.activeElement === commentField)) {
    evt.preventDefault();
    closeModalWindow();
  }
}

closeModalWindowButton.addEventListener('click', closeModalWindow);

uploadFileField.addEventListener('change', () => openModalWindow());

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const formSubmit = (onSuccess) => {
  form.addEventListener('submit',(evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .then(getModalSuccess)
        .then(closeModalWindow)
        .catch((err) => {
          showAlert(err.message);
          getModalError();
        })
        .finally(unblockSubmitButton);
    }
  });
};

export {formSubmit, closeModalWindow};
