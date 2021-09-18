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

export {
  titleInputState,
  descriptionInputState,
  activeDateState,
  spinnerState,
};
