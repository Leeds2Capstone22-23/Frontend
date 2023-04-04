import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { retrieveAllLabels } from '../../logic/apiRequest';
import { RootStore } from '..';
import { Status } from '../../types/types';
import { AuthStatus } from './authHook';

/**
 * STATUS
 */
export function LabelStatus() {
  return useSelector((state: RootStore) => {
    const tmp = state as any;
    return tmp.rootReducer.labelStatusReducer;
  });
}

/**
 * DATA
 */
export function LabelData(forceRefresh = false) {
  const labelsData = useSelector((state: RootStore) => {
    const tmp = state as any;
    return tmp.rootReducer.labelDataReducer;
  });
  const labelsStatus = useSelector((state: RootStore) => {
    const tmp = state as any;
    return tmp.rootReducer.labelStatusReducer;
  });
  const authStatus = AuthStatus();
  const dispatch = useDispatch();

  useEffect(() => {
    // If we haven't loaded data or data loading has failed
    if (
      (
        labelsStatus === Status.Initial
        || labelsStatus === Status.Failed
        || forceRefresh
      )
      && authStatus === Status.Succeeded
    ) {
      // Fetch apps
      retrieveAllLabels(dispatch);
    }
  }, [dispatch, forceRefresh, authStatus]);
  return labelsData;
}
