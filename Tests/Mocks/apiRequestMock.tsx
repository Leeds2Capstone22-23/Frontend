import { Doc, Label } from "../../src/types/types";
import { defaultStore } from "../../src/redux";


export {}

let testLabelReturn:Label[] = [
    {
        id: 1,
        name: "Label 1"
    },
    {
        id: 2,
        name: "Label 2"
    },
    {
        id: 3,
        name: "Label 3"
    },
]

let testDocReturn:Doc[] = [
    {
        id: 1,
        title: "Document 1",
        content: "Example Content"
    },
]

jest.mock('../../src/logic/apiRequest', () => ({
    fetchData: jest.fn(() => {
        Promise.resolve();
    }),
    retrieveAllLabels: jest.fn(() => {
        defaultStore.dispatch({
            type: 'labels/status/success',
        });
        defaultStore.dispatch({
            type: 'labels/data/save',
            payload: testLabelReturn
        });
        return Promise.resolve(testLabelReturn);
    }),
    retrieveAllDocs: jest.fn(() => {
        defaultStore.dispatch({
            type: 'docs/status/success',
        });
        defaultStore.dispatch({
            type: 'docs/data/save',
            payload: testDocReturn
        });
        return Promise.resolve(testDocReturn);
    }),
    createNewLabel: jest.fn(() => {
        Promise.resolve();
    }),
    createNewDoc: jest.fn(() => {
        Promise.resolve();
    })
}));

