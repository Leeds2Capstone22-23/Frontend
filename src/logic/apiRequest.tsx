
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
  ) {
    let url = 'http://localhost:8080/v1/graphql';
    const response = await fetch(
      `${url}`,
      {
        method: 'POST',
        credentials: 'omit',
        headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({query}),
      },
    );
    const data = await response.json()
    return data
  }

  /*
 ,-----.   ,--. ,--.,------.,------. ,--.,------. ,---.
'  .-.  '  |  | |  ||  .---'|  .--. '|  ||  .---''   .-'
|  | |  |  |  | |  ||  `--, |  '--'.'|  ||  `--, `.  `-.
'  '-'  '-.'  '-'  '|  `---.|  |\  \ |  ||  `---..-'    |
 `-----'--' `-----' `------'`--' '--'`--'`------'`-----'
*/
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