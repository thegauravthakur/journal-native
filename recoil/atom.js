import { atom } from 'recoil';

const titleInputState = atom({
  key: 'titleState',
  default: '',
});
const descriptionInputState = atom({
  key: 'descriptionState',
  default: '',
});

export { titleInputState, descriptionInputState };
