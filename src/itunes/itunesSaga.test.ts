import { call, put } from 'redux-saga/effects';
import { onSearchEbooks, fetchEbooks } from './itunesSaga';
import { loadedEbooks, searchEbooks } from './itunesSlice';

test('onSearchEbooks', () => {
  const searchTerm = 'test';
  const saga = onSearchEbooks(searchEbooks({ searchTerm }));

  expect(saga.next()).toEqual({
    done: false,
    value: call(fetchEbooks, searchTerm),
  });

  const ebooks: any = [];

  expect(saga.next(ebooks)).toEqual({
    done: false,
    value: put(loadedEbooks(ebooks)),
  });

  expect(saga.next()).toEqual({
    done: true,
  });
});
