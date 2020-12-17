import { StatHelpText } from '@chakra-ui/react';
import { configureStore, Store } from '@reduxjs/toolkit';
import { counterReducer } from './counter/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

type GetStoreState<S> = S extends Store<infer State, any> ? State : unknown;

export type StoreState = GetStoreState<typeof store>;
