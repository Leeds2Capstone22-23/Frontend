import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { retrieveAllSnippets } from '../../logic/apiRequest';
import { RootStore } from '..';
import { Status } from '../../types/types';
import { AuthStatus } from './authHook';

/**
 * STATUS
 */
export function SnippetStatus() {
  return useSelector((state: RootStore) => state.rootReducer.snippetStatusReducer);
}

/**
 * DATA
 */
export function SnippetData(forceRefresh = false) {
  const snippetsData = useSelector((state: RootStore) => state.rootReducer.snippetDataReducer);
  const snippetsStatus = useSelector((state: RootStore) => state.rootReducer.snippetStatusReducer);
  const authStatus = AuthStatus();
  const dispatch = useDispatch();

  useEffect(() => {
    // If we haven't loaded data or data loading has failed
    if (
      (
        snippetsStatus === Status.Initial
        || snippetsStatus === Status.Failed
        || forceRefresh
      )
      && authStatus === Status.Succeeded
    ) {
      // Fetch apps
      retrieveAllSnippets(dispatch);
    }
  }, [dispatch, forceRefresh, authStatus]);
  return snippetsData;
}
