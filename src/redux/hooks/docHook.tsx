import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { retrieveAllDocs } from '../../logic/apiRequest';
import { RootStore } from '..';
import { Status } from '../../types/types';
import { AuthStatus } from './authHook';

/**
 * STATUS
 */
export function DocStatus() {
  return useSelector((state: RootStore) => state.rootReducer.docStatusReducer);
}

/**
 * DATA
 */
export function DocData(forceRefresh = false) {
  const docsData = useSelector((state: RootStore) => state.rootReducer.docDataReducer);
  const docsStatus = useSelector((state: RootStore) => state.rootReducer.docStatusReducer);
  const authStatus = AuthStatus();
  const dispatch = useDispatch();

  useEffect(() => {
    // If we haven't loaded data or data loading has failed
    if (
      (
        docsStatus === Status.Initial
        || docsStatus === Status.Failed
        || forceRefresh
      )
      && authStatus === Status.Succeeded
    ) {
      // Fetch apps
      retrieveAllDocs(dispatch);
    }
  }, [dispatch, forceRefresh]);
  return docsData;
}
