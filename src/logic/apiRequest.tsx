import { Buffer } from 'buffer';
import { debounce } from 'lodash';
import {
  labelFailed, labelLoading, labelSuccess, saveLabels,
} from '../redux/reducers/labelReducer';
import {
  docFailed, docLoading, docSuccess, saveDocs,
} from '../redux/reducers/docReducer';
import {
  saveSnippets,
  snippetFailed,
  snippetLoading,
  snippetSuccess,
} from '../redux/reducers/snippetReducer';
import {
  Label, Doc, Status, newUserRegistration, newUserLogin, Snippet,
} from '../types/types';
import { defaultStore } from '../redux';
import {
  authFailed, authInitial, authLoading, authSuccess, clearAuth, saveAuth,
} from '../redux/reducers/authReducer';

/**
 * This is the main function that actually queries the API
 * @param query
 * @param setErrors
 * @returns
 */
export async function fetchData(
  query:string,
  setErrors?:Function,
  auth?:string,
) {
  const url = 'http://localhost:8080/v1/graphql';
  const user = defaultStore.getState().rootReducer.authDataReducer;
  const response = await fetch(
    `${url}`,
    {
      method: 'POST',
      credentials: 'omit',
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
        Authorization:
        (auth)
          ? (`Basic ${auth}`)
          : ((user.userSecret) ? (`Basic ${user.userSecret}`) : ('')),
      },
      body: JSON.stringify({ query }),
    },
  );
  const data = await response.json();
  return {
    data: (data.data) ? data.data : data.errors,
    status: response.status,
  };
}

/*
 ,-----.   ,--. ,--.,------.,------. ,--.,------. ,---.
'  .-.  '  |  | |  ||  .---'|  .--. '|  ||  .---''   .-'
|  | |  |  |  | |  ||  `--, |  '--'.'|  ||  `--, `.  `-.
'  '-'  '-.'  '-'  '|  `---.|  |\  \ |  ||  `---..-'    |
 `-----'--' `-----' `------'`--' '--'`--'`------'`-----'
*/
export async function loginUser(loginInfo: newUserLogin, dispatch: Function) {
  dispatch(authLoading());
  let newUserAuth = {
    userSecret: '',
    username: '',
    fullName: '',
    userId: -1,
  };
  await fetchData(
    `
      query {
        users {
            id
          }
      }`,
    () => {},
    Buffer.from(`${loginInfo.userName}:${loginInfo.password}`).toString('base64'),
  )
    .then((result) => {
      // Convert to appropriate data type
      if (result.data.users[0].id) {
        // we have data
        newUserAuth = {
          userSecret: Buffer.from(`${loginInfo.userName}:${loginInfo.password}`).toString('base64'),
          username: loginInfo.userName,
          fullName: '',
          userId: result.data.users[0].id,
        };
        dispatch(saveAuth(newUserAuth));
        dispatch(authSuccess());
      } else {
        // Case if the actual api returns an error
        dispatch(authFailed());
      }
    })
  // case if the fetch request from frontend to backend fails
    .catch(() => { dispatch(authFailed()); });
  if (newUserAuth.userId !== -1) {
    return newUserAuth;
  }
  throw new Error();
}

/**
 * Checks if the login loaded from cookies is still valid
 * @param username username for user to be verified
 * @param secret saved secret to verify
 * @param dispatch passing dispatch function from view
 * @returns user information
 */
export async function checkUserLoginDebounced(
  username: string,
  secret: string,
  dispatch: Function,
) {
  dispatch(authLoading());
  let newUserAuth = {
    userSecret: '',
    username: '',
    fullName: '',
    userId: -1,
  };
  await fetchData(
    `
      query {
        users {
            id
          }
      }`,
    () => {},
    secret,
  )
    .then((result) => {
      // Convert to appropriate data type
      if (result.data.users[0].id) {
        // we have data
        newUserAuth = {
          userSecret: secret,
          username,
          fullName: '',
          userId: result.data.users[0].id,
        };
        dispatch(saveAuth(newUserAuth));
        dispatch(authSuccess());
      } else {
        // Case if the actual api returns an error
        dispatch(clearAuth());
        dispatch(authInitial());
      }
    })
  // case if the fetch request from frontend to backend fails
    .catch(() => { dispatch(authFailed()); });
  if (newUserAuth.userId !== -1) {
    return newUserAuth;
  }
  return {
    userSecret: '',
    username: '',
    fullName: '',
    userId: -1,
  };
}
export const checkUserLogin = debounce(
  checkUserLoginDebounced,
  100,
  { leading: true, trailing: false },
);

export async function retrieveAllLabelsDebounced(dispatch: Function) {
  let storage:Label[] = [];
  dispatch(labelLoading());
  await fetchData(
    `
        query {
          labels {
            id,
            name,
            color,
          }
        }`,
  )
    .then((result) => {
      // Convert to appropriate data type
      if (result.data) {
        // we have data
        storage = result.data.labels as Label[];
        dispatch(saveLabels(storage));
        dispatch(labelSuccess());
      } else {
        // Case if the actual api returns an error
        dispatch(labelFailed());
      }
    })
  // case if the fetch request from frontend to backend fails
    .catch(() => { dispatch(labelFailed()); });
}
export const retrieveAllLabels = debounce(
  retrieveAllLabelsDebounced,
  100,
  { leading: true, trailing: false },
);

export async function retrieveAllDocsDebounced(dispatch: Function) {
  let storage:Doc[] = [];
  dispatch(docLoading());
  await fetchData(
    `
      query {
        documents {
          id
          title
          content
          time_added
        }
      }`,
  )
    .then((result) => {
      // Convert to appropriate data type
      if (result.data) {
        // we have data
        storage = result.data.documents as Doc[];
        dispatch(saveDocs(storage));
        dispatch(docSuccess());
      } else {
        // Case if the actual api returns an error
        dispatch(docFailed());
      }
    })
  // case if the fetch request from frontend to backend fails
    .catch(() => { dispatch(docFailed()); });
  return storage;
}
export const retrieveAllDocs = debounce(
  retrieveAllDocsDebounced,
  100,
  { leading: true, trailing: false },
);

export async function retrieveAllSnippetsDebounced(dispatch: Function) {
  let storage:Snippet[] = [];
  dispatch(snippetLoading());
  await fetchData(
    `
      query {
        snippets {
          id
          document_id
          label_id
          length
          char_offset
        }
      }`,
  )
    .then((result) => {
      // Convert to appropriate data type
      if (result.data) {
        // we have data
        storage = result.data.snippets as Snippet[];
        dispatch(saveSnippets(storage));
        dispatch(snippetSuccess());
      } else {
        // Case if the actual api returns an error
        dispatch(snippetFailed());
      }
    })
  // case if the fetch request from frontend to backend fails
    .catch(() => { dispatch(snippetFailed()); });
  return storage;
}
export const retrieveAllSnippets = debounce(
  retrieveAllSnippetsDebounced,
  100,
  { leading: true, trailing: false },
);

/*
,--.   ,--.,--. ,--.,--------. ,---. ,--------.,--. ,-----. ,--.  ,--. ,---.
|   `.'   ||  | |  |'--.  .--'/  O  \'--.  .--'|  |'  .-.  '|  ,'.|  |'   .-'
|  |'.'|  ||  | |  |   |  |  |  .-.  |  |  |   |  ||  | |  ||  |' '  |`.  `-.
|  |   |  |'  '-'  '   |  |  |  | |  |  |  |   |  |'  '-'  '|  | `   |.-'    |
`--'   `--' `-----'    `--'  `--' `--'  `--'   `--' `-----' `--'  `--'`-----'

 */
export async function registerNewUser(
  newUser:newUserRegistration,
  dispatch: Function,
) {
  dispatch(authLoading());
  let newUserAuth = {
    userSecret: '',
    username: '',
    fullName: '',
    userId: -1,
  };
  let status = {
    data: [{
      extensions: {
        internal: {
          response: {
            status: 200,
          },
        },
      },
    }],
  };
  await fetchData(
    `
      mutation MyMutation {
        register_new_user(password: "${newUser.password}", username: "${newUser.userName}") {
          id
        }
      }`,
  )
    .then((result) => {
      status = result;
      // Convert to appropriate data type
      if (result.data.register_new_user) {
        newUserAuth = {
          userSecret: Buffer.from(`${newUser.userName}:${newUser.password}`).toString('base64'),
          username: newUser.userName,
          fullName: '',
          userId: result.data.register_new_user.id,
        };

        dispatch(saveAuth(newUserAuth));
        dispatch(authSuccess());
      } else {
        dispatch(authFailed());
      }
    });
  if (newUserAuth.userId !== -1) {
    return newUserAuth;
  }
  if (status && status.data[0].extensions.internal.response.status === 401) {
    throw new Error('Username already exists, please choose another.');
  }
  throw new Error('Please enter a username and password.');
}

export async function createNewLabel(
  setStatus:Function,
  labelName:string,
) {
  setStatus(Status.Loading);
  await fetchData(
    `
      mutation {
        insert_labels(objects: {color: 10, name: "${labelName}"}) {
          affected_rows
        }
      }`,
  )
    .then((result) => {
      // Convert to appropriate data type
      if (result.data) {
        setStatus(Status.Succeeded);
      } else {
        setStatus(Status.Failed);
      }
    });
}

export async function createNewDoc(
  setStatus:Function,
  title:string,
  content:string,
) {
  setStatus(Status.Loading);
  await fetchData(
    `
      mutation {
        insert_documents(objects: {title: "${title}", content: """${content}"""}) {
          affected_rows
        }
      }`,
  )
    .then((result) => {
      // Convert to appropriate data type
      if (result.data) {
        setStatus(Status.Succeeded);
      } else {
        setStatus(Status.Failed);
      }
    });
}
