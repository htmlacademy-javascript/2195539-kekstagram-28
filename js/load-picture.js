import {closeImageLoadModal} from './form.js';
import {showAlert} from './util.js';

const FILE_TYPES = ['jpg','png'];
const FILEFIELD_ERROR_TEXT = 'Загрузите файл в формате jpg или png';

const fileChooser = document.querySelector('input[type=file]');
const preview = document.querySelector('.img-upload__preview img');

const loadLocalFile = () => {
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      preview.src = URL.createObjectURL(file);
    } else {
      closeImageLoadModal();
      showAlert(FILEFIELD_ERROR_TEXT);
    }
  });
};

export {loadLocalFile};
