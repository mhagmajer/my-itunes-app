import { all, debounce, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { loadedEbooks, searchEbooks, searchEbooksTyping } from './itunesSlice';
import * as yup from 'yup';
import { ActionCreatorWithPayload, PayloadAction } from '@reduxjs/toolkit';
import { runSaga } from 'redux-saga';

const ebookSchema = yup
  .object({
    formattedPrice: yup.string(),
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

type PayloadActionFromCreator<AC> = AC extends ActionCreatorWithPayload<infer P>
  ? PayloadAction<P>
  : never;

function* onSearchEbooks({
  payload: { searchTerm },
}: PayloadActionFromCreator<typeof searchEbooks>) {
  const ebooks = yield fetchEbooks(searchTerm);
  yield put(loadedEbooks(ebooks));
}

function* watchSeachEbooks() {
  yield takeLatest(searchEbooks.type, onSearchEbooks);
}

function* watchSearchEbooksTyping() {
  yield debounce(1000, searchEbooksTyping.type, onSearchEbooks);
}

export function* itunesSaga() {
  yield all([watchSeachEbooks(), watchSearchEbooksTyping()]);
}
