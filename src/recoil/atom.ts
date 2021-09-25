import { atom } from 'recoil';

const titleInputState = atom({
  key: 'titleState',
  default: '',
});
const descriptionInputState = atom({
  key: 'descriptionState',
  default: '',
});
const activeDateState = atom({
  key: 'activeDateState',
  default: new Date(),
});
const spinnerState = atom({
  key: 'spinnerState',
  default: { visible: false, textContent: '' },
});

const themeState = atom({
  key: 'themeState',
  default: 'dark',
});

const markedDateState = atom({
  key: 'markedDateState',
  default: {},
});

export {
  titleInputState,
  descriptionInputState,
  activeDateState,
  spinnerState,
  themeState,
  markedDateState,
};
