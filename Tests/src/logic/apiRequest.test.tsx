import '@testing-library/jest-dom';
import {
  retrieveAllLabels,
  createNewLabel,
  retrieveAllDocs,
  createNewDoc,
} from '../../../src/logic/apiRequest';
import { Label, Doc } from '../../../src/types/types';

test('Does retrieveAllLabels work?', async () => {
  let labels:Label[] = [];

  await retrieveAllLabels(() => {})
    .then((response:any) => {
      labels = response;
    });
  expect(labels[0].name).toEqual('Label 1');
  expect(labels.length).toEqual(3);
});

test('Does createNewLabel work?', async () => {
  expect(createNewLabel(() => {}, 'test')).toBeUndefined();
});

test('Does retrieveAllDocs work?', async () => {
  let docs:Doc[] = [];

  await retrieveAllDocs(() => {})
    .then((response:any) => {
      docs = response;
    });
  expect(docs[0].title).toEqual('Document 1');
  expect(docs.length).toEqual(1);
});

test('Does createNewDoc work?', async () => {
  expect(createNewDoc(() => {}, 'test_t', 'test_c')).toBeUndefined();
});
