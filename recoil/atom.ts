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

export { titleInputState, descriptionInputState, activeDateState };
