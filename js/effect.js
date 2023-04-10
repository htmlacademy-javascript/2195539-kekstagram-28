const EFFECTS = {
  none: {
    style: 'none',
    min:0,
    max:100,
    step:1,
    unit:'',
  },
  chrome: {
    style: 'grayscale',
    min:0,
    max:1,
    step:0.1,
    unit:'',
  },
  sepia: {
    style: 'sepia',
    min:0,
    max:1,
    step:0.1,
    unit:'',
  },
  marvin: {
    style: 'invert',
    min:0,
    max:100,
    step:1,
    unit:'%',
  },
  phobos: {
    style: 'blur',
    min:0,
    max:3,
    step:0.1,
    unit:'px',
  },
  heat: {
    style: 'brightness',
    min:1,
    max:3,
    step:0.1,
    unit:'',
  },
};

const DEFAULT_EFFECT = EFFECTS.none;

let chosenEffect = DEFAULT_EFFECT;

const imgPreviewElement = document.querySelector('.img-upload__preview img');
const effectsElement = document.querySelector('.effects');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderContainerElement = document.querySelector('.img-upload__effect-level');
const effectLevelElement = document.querySelector('.effect-level__value');

const isDefault = () => chosenEffect === DEFAULT_EFFECT;

const showSlider = () => {
  sliderContainerElement.classList.remove('hidden');
};

const hideSlider = () => {
  sliderContainerElement.classList.add('hidden');
};

const updateSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start: chosenEffect.max,
  });

  if (isDefault()) {
    hideSlider();
  } else {
    showSlider();
  }
};

const onSliderUpdate = () => {
  const sliderValue = sliderElement.noUiSlider.get();
  imgPreviewElement.style.filter = isDefault()
    ? DEFAULT_EFFECT.style
    : `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
  effectLevelElement.value = sliderValue;
};

const onEffectsChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  chosenEffect = EFFECTS[evt.target.value];
  imgPreviewElement.className = `effects__preview--${chosenEffect.name}`;
  updateSlider();
};

const resetEffects = () => {
  chosenEffect = DEFAULT_EFFECT;
  updateSlider();
};

noUiSlider.create(sliderElement, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower',
});
hideSlider();

effectsElement.addEventListener('change', onEffectsChange);
sliderElement.noUiSlider.on('update', onSliderUpdate);

export {resetEffects};
