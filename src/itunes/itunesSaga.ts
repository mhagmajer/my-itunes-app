import { ActionCreatorWithPayload, PayloadAction } from '@reduxjs/toolkit';
import { all, call, debounce, put, takeLatest } from 'redux-saga/effects';
import * as yup from 'yup';
import { loadedEbooks, searchEbooks, searchEbooksTyping } from './itunesSlice';

const ebookSchema = yup
  .object({
    formattedPrice: yup.string(),
    trackName: yup.string().defined(),
    artworkUrl60: yup.string().defined(),
    trackId: yup.number().defined(),
  })
  .defined();

export type Ebook = yup.InferType<typeof ebookSchema>;

export async function fetchEbooks(searchTerm: string) {
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

export function* onSearchEbooks({
  payload: { searchTerm },
}: PayloadActionFromCreator<typeof searchEbooks>) {
  try {
    console.log('loading'); // yield put(setLoadingState(true))
    const ebooks = yield call(fetchEbooks, searchTerm);
    yield put(loadedEbooks(ebooks));
  } finally {
    console.log('loading done');
  }
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
