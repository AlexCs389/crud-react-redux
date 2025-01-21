import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  name: string;
  email: string;
  github: string;
}

export type UserId = string;

export interface UserWithId extends User {
  id: UserId;
}

const DEFAULT_STATE: UserWithId[] = [
  {
    id: '1',
    name: "Peter McCrown",
    email: "peter@gamil.com",
    github: "peter",
  },
  {
    id: '2',
    name: "Peter McCrown",
    email: "peter2@gmail.com",
    github: "peter2",
  },
];

const initialState: UserWithId[] = (() => {
  const persistedState = localStorage.getItem('__redux_state__');
  return persistedState ? JSON.parse(persistedState).users : DEFAULT_STATE;
})();

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addNewUser: (state, action: PayloadAction<User>) => {
      const id = crypto.randomUUID();
      return [...state, { ...action.payload, id }];
    },
    deleteUserById: (state, action: PayloadAction<UserId>) => {
      return state.filter((user) => user.id !== action.payload);
    },
    rollbackUser: (state, action: PayloadAction<UserWithId>) => {
      const isUserAlreadyDefined = state.some(user => user.id === action.payload.id);
      if (!isUserAlreadyDefined) {
        state.push(action.payload);
      }
    },
  },
});

export default usersSlice.reducer;

export const { deleteUserById, addNewUser, rollbackUser } = usersSlice.actions;
