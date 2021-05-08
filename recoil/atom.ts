import { atom } from 'recoil';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

const titleInputState = atom({
  key: 'titleState',
  default: '',
});
const descriptionInputState = atom({
  key: 'descriptionState',
  default: '',
});

const userState = atom<FirebaseAuthTypes.User | null>({
  key: 'userState',
  default: null,
});

export { titleInputState, descriptionInputState, userState };
