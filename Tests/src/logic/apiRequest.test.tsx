import '@testing-library/jest-dom';
import {
    retrieveAllLabels,
    createNewLabel
} from '../../../src/logic/apiRequest'
import { Label } from '../../../src/types/types';

test('Does retrieveAllLabels work?', async () => {
    let labels:Label[] = [];

    await retrieveAllLabels(() => {})
        .then((response:any) => {
            labels = response
        });
    expect(labels.length).toEqual(3);
}); 

test('Does createNewLabel work?', async () => {
    expect(createNewLabel(() => {}, "test")).toBeUndefined();
}); 