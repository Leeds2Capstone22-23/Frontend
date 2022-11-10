
import { labelFailed, labelLoading, labelSuccess } from '../redux/reducers/labelReducer';
import { docFailed, docLoading, docSuccess } from '../redux/reducers/docReducer';
import {Label, Doc, Status} from '../types/types'

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
    let url = 'http://localhost:8080/v1/graphql';
    let user = defaultStore.getState().authDataReducer;
    const response = await fetch(
      `${url}`,
      {
        method: 'POST',
        credentials: 'omit',
        headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
          'Content-Type': 'application/json',
          'Authorization': (auth) ? (`Basic ${auth}`): ((user.userSecret) ? (`Basic ${user.userSecret}`) : (''))
        },
        body: JSON.stringify({query}),
      },
    );
    const data = await response.json()
    return {
        data: (data.data) ? data.data : data.errors,
        status: response.status
    }
  }

  /*
 ,-----.   ,--. ,--.,------.,------. ,--.,------. ,---.
'  .-.  '  |  | |  ||  .---'|  .--. '|  ||  .---''   .-'
|  | |  |  |  | |  ||  `--, |  '--'.'|  ||  `--, `.  `-.
'  '-'  '-.'  '-'  '|  `---.|  |\  \ |  ||  `---..-'    |
 `-----'--' `-----' `------'`--' '--'`--'`------'`-----'
*/
export async function checkUserRegistration(loginInfo: newUserLogin, dispatch: Function) {
    dispatch(authLoading());
    let newUserAuth = {
        userSecret: '',
        username: '',
        fullName: '',
        userId: -1,
    }
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
            //we have data
            newUserAuth = {
                userSecret: Buffer.from(`${loginInfo.userName}:${loginInfo.password}`).toString('base64'),
                username: loginInfo.userName,
                fullName: '',
                userId: result.data.users[0].id,
            }
            dispatch(saveAuth(newUserAuth));
            dispatch(authSuccess());
        } else {
            //Case if the actual api returns an error
            dispatch(authFailed());
        }
      })
        //case if the fetch request from frontend to backend fails
      .catch(() => { dispatch(authFailed()); });
    if (newUserAuth.userId !== -1) {
        return newUserAuth
    } else {
        throw new Error();
    };
  }

  export async function retrieveAllLabels(dispatch: Function) {
    let storage:Label[] = [];
    dispatch(labelLoading());
    await fetchData(
      `
      query {
        labels {
          id
          name
        }
      }`,
    )
      .then((result) => {
        // Convert to appropriate data type
        if (result.data) {
            //we have data
            dispatch(labelSuccess());
            storage = result.data.labels as Label[];
        } else {
            //Case if the actual api returns an error
            dispatch(labelFailed());
        }
      })
        //case if the fetch request from frontend to backend fails
      .catch(() => { dispatch(labelFailed()); });
    return storage;
  }

  export async function retrieveAllDocs(dispatch: Function) {
    let storage:Doc[] = [];
    dispatch(docLoading());
    await fetchData(
      `
      query {
        documents {
          id
          title
          content
        }
      }`,
    )
      .then((result) => {
        // Convert to appropriate data type
        if (result.data) {
            //we have data
            dispatch(docSuccess());
            storage = result.data.documents as Doc[];
        } else {
            //Case if the actual api returns an error
            dispatch(docFailed());
        }
      })
        //case if the fetch request from frontend to backend fails
      .catch(() => { dispatch(docFailed()); });
    return storage;
  }


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
    }
    let status ={
        data: [{
            extensions: {
                internal: {
                    response: {
                        status: 200
                    }
                }
            }
        }]
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
        status = result
        // Convert to appropriate data type
        if (result.data.register_new_user) {
            
            newUserAuth = {
                userSecret: Buffer.from(`${newUser.userName}:${newUser.password}`).toString('base64'),
                username: newUser.userName,
                fullName: '',
                userId: result.data.register_new_user.id,
            }
            
            dispatch(saveAuth(newUserAuth));
            dispatch(authSuccess());
        } else {
            dispatch(authFailed());
        }
      });
    if (newUserAuth.userId !== -1) {
        return newUserAuth
    } else {
        if (status && status.data[0].extensions.internal.response.status === 401) {
            throw new Error('Username already exists, please choose another.');
        }
        throw new Error('Please enter a username and password.');
    };
  }



export async function createNewLabel(
    setStatus:Function,
    labelName:string
  ) {
    setStatus(Status.Loading)
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
            setStatus(Status.Succeeded)
        } else {
            setStatus(Status.Failed)
        }
      });
  }

  export async function createNewDoc(
    setStatus:Function,
    title:string,
    content:string
  ) {
    setStatus(Status.Loading)
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
            setStatus(Status.Succeeded)
        } else {
            setStatus(Status.Failed)
        }
      });
  }