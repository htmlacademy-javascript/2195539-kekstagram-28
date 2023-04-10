const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureContainer = document.querySelector('.pictures');
const pictureFragment = document.createDocumentFragment();

const renderPictureList = ({id, url, likes, comments, description}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').textContent = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.dataset.pictureId = id;
  pictureFragment.append(pictureElement);
  return pictureElement;
};

const renderPictures = (pictures) => {
  document.querySelectorAll('.picture').forEach((element) => element.remove());
  pictures.forEach((picture) => {
    const miniPicture = renderPictureList(picture);
    pictureFragment.appendChild(miniPicture);
  });
  pictureContainer.append(pictureFragment);
};

export {renderPictures};
