// store/userState.ts
import { atom } from 'recoil';

export const userRoleState = atom<string>({
    key: 'userRoleState',
    default: 'admin', // Giá trị mặc định, có thể là 'user' hoặc 'admin'
});
