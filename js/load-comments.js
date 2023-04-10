import {renderComment} from './comment.js';
import {getCommentsCounter} from './util.js';

const MAX_COMMENTS_NUMBER = 5;

const commentLoader = document.querySelector('.comments-loader');
const commentsCount = document.querySelector('.social__comment-count');

const renderComments = (data) => {
  const comments = document.querySelector('.social__comments');
  comments.innerHTML = '';
  data.forEach((item) => {
    const comment = renderComment(item);
    comments.append(comment);
  });
  return comments;
};

const renderMoreComments = (currentItem) => {
  const commentsCounter = getCommentsCounter();
  const commentsQty = currentItem.comments.length;
  const fromCommentsQt = commentsCounter(MAX_COMMENTS_NUMBER, commentsQty);
  renderComments(currentItem.comments.slice(0, fromCommentsQt));
  commentsCount.innerHTML = `${fromCommentsQt} из <span class='comments-count'>${commentsQty}</span> комментариев`;

  commentLoader.addEventListener('click', () => {
    const fromCommentsQty = commentsCounter(MAX_COMMENTS_NUMBER, commentsQty);
    renderComments(currentItem.comments.slice(0, fromCommentsQty));
    commentsCount.innerHTML = `${fromCommentsQty} из ${commentsQty} комментариев`;
  });
};

export {renderMoreComments};
