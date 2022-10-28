
import {Status} from '../types/types'

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
  export async function retrieveAllLabels(
    setStatus:Function,
    setData:Function
  ) {
    setStatus(Status.Loading)
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
            setData(result.data.labels)
            setStatus(Status.Succeeded)
        } else {
            setStatus(Status.Failed)
        }
      });
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