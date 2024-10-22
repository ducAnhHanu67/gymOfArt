import { atom } from 'recoil';

export const emailState = atom<string>({
  key: 'emailState',
  default: '',
});

export const usernameState = atom<string>({
  key: 'usernameState',
  default: '',
});

export const passwordState = atom<string>({
  key: 'passwordState',
  default: '',
});
