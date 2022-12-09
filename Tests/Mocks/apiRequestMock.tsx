import { Doc, Label, UserAuth } from "../../src/types/types";
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

let testUserReturn:UserAuth = {
    userSecret: '',
    username: 'Test',
    fullName: 'Testing',
    userId: 1,
}

jest.mock('../../src/logic/apiRequest', () => ({
    fetchData: jest.fn(() => {
        Promise.resolve();
    }),
    checkUserRegistration: jest.fn(() => {
        defaultStore.dispatch({
            type: 'auth/status/success',
        });
        defaultStore.dispatch({
            type: 'auth/data/save',
            payload: testUserReturn
        });
        return Promise.resolve(testUserReturn);
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
    }),
    registerNewUser: jest.fn(() => {
        defaultStore.dispatch({
            type: 'auth/status/success',
        });
        defaultStore.dispatch({
            type: 'auth/data/save',
            payload: testUserReturn
        });
        return Promise.resolve(testUserReturn);
    }),
}));

