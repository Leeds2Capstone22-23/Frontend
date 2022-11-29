import { Label, UserAuth } from "../../src/types/types";
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

let testUserAuthReturn:UserAuth = {
    userSecret: '',
    username: '',
    fullName: '',
    userId: -1,
}
jest.mock('../../src/logic/apiRequest', () => ({
    fetchData: jest.fn(() => {
        Promise.resolve();
    }),
    checkUserRegistration: jest.fn(() => {
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
    createNewLabel: jest.fn(() => {
        Promise.resolve();
    }),
    
}));

