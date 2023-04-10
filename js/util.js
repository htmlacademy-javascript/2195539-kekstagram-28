const ALERT_SHOW_TIME = 7000;

const showAlert = (message) => {
  const alert = document.createElement('div');
  alert.style.zIndex = '100';
  alert.style.position = 'absolute';
  alert.style.left = '0';
  alert.style.top = '0';
  alert.style.right = '0';
  alert.style.padding = '10px 3px';
  alert.style.fontSize = '30px';
  alert.style.textAlign = 'center';
  alert.style.backgroundColor = 'red';
  alert.textContent = message;
  document.body.append(alert);

  setTimeout(() => {
    alert.remove();
  }, ALERT_SHOW_TIME);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const createElement = (tagName, attributes = {}, text) => {
  const element = document.createElement(tagName);
  Object.assign(element, attributes);
  if (text) {
    element.appendChild(document.createTextNode(text));
  }
  return element;
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const getCommentsCounter = () => {
  let counter = 1;
  return (showComments, commentsLength) => {
    const currentNumber = counter++;
    return showComments * currentNumber < commentsLength ? showComments * currentNumber : commentsLength;
  };
};

export {isEscapeKey, createElement, showAlert, debounce, getCommentsCounter};
