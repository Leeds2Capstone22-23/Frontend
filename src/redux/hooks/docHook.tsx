import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { retrieveAllDocs } from '../../logic/apiRequest';
import { RootStore } from '../../redux';
import { Status } from '../../types/types';
import { saveDocs } from '../reducers/docReducer';

/**
 * STATUS
 */
export function DocStatus() {
  return useSelector((state: RootStore) => state.docStatusReducer);
}

/**
 * DATA
 */
export function DocData(forceRefresh = false) {
  const docsData = useSelector((state: RootStore) => state.docDataReducer);
  const docsStatus = useSelector((state: RootStore) => state.docStatusReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    // If we haven't loaded data or data loading has failed
    if (docsStatus === Status.Initial || docsStatus === Status.Failed || forceRefresh) {
      // Fetch apps
      retrieveAllDocs(dispatch)
        .then((response) => {
            dispatch(saveDocs(response));
        });
    }
  }, [dispatch, forceRefresh]);
  return docsData;
}
