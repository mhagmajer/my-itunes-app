import { put, takeLatest } from 'redux-saga/effects';
import { loadedEbooks, searchEbooks } from './itunesSlice';
import * as yup from 'yup';
import { PayloadAction } from '@reduxjs/toolkit';

const ebookSchema = yup
  .object({
    formattedPrice: yup.string().defined(),
    trackName: yup.string().defined(),
    artworkUrl60: yup.string().defined(),
    trackId: yup.number().defined(),
  })
  .defined();

export type Ebook = yup.InferType<typeof ebookSchema>;

async function fetchEbooks(searchTerm: string) {
  const response = await fetch(
    `https://itunes.apple.com/search?term=${encodeURIComponent(
      searchTerm
    )}&entity=ebook`
  );
  const data = await response.json();

  const responseSchema = yup.object({
    resultCount: yup.number().defined(),
    results: yup.array(ebookSchema),
  });

  const { results } = await responseSchema.validate(data);
  return results;
}

function* onSearchEbooks({
  payload: { searchTerm },
}: PayloadAction<{ searchTerm: string }>) {
  const ebooks = yield fetchEbooks(searchTerm);
  yield put(loadedEbooks(ebooks));
}

export function* itunesSaga() {
  yield takeLatest(searchEbooks.type, onSearchEbooks);
}
