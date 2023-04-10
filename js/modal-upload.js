import {isEscapeKey} from './util.js';

const successMessage = document.querySelector('#success');
const errorMessage = document.querySelector('#error');

const onMessageCloseEvent = (evt) => {
  if (isEscapeKey(evt) ||
    evt.target.matches('.success__button') ||
    evt.target.matches('.success') ||
    evt.target.matches('.error__button') ||
    evt.target.matches('.error')) {
    closeMessage();
  }
};

const getModalSuccess = () => {
  const successMessageTemplate = successMessage.content.querySelector('.success');
  const cloneSectionSuccess = successMessageTemplate.cloneNode(true);
  document.body.appendChild(cloneSectionSuccess);
  document.addEventListener('keydown', onMessageCloseEvent);
  cloneSectionSuccess.addEventListener('click', onMessageCloseEvent);
};

const getModalError = () => {
  const errorMessageTemplate = errorMessage.content.querySelector('.error');
  const cloneSectionError = errorMessageTemplate.cloneNode(true);
  document.body.appendChild(cloneSectionError);
  document.addEventListener('keydown', onMessageCloseEvent);
  cloneSectionError.addEventListener('click', onMessageCloseEvent);
};

function closeMessage () {
  const successMessageElement = document.querySelector('.success');
  const errorMessageElement = document.querySelector('.error');
  if (successMessageElement) {
    successMessageElement.remove();
  }
  if (errorMessageElement) {
    errorMessageElement.remove();
  }
  document.removeEventListener('keydown', onMessageCloseEvent);
}

export {getModalSuccess, getModalError};
