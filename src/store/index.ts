import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import todos from './slices/todos';

export const store = configureStore({
  reducer: { todos },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
