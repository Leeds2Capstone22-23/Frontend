import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '..';
import { Status } from '../../types/types';
/**
 * STATUS
 */
export function AuthStatus() {
  return useSelector((state: RootStore) => state.authStatusReducer);
}

/**
 * DATA
 */
export function AuthData(forceRefresh = false) {
  const userAuthData = useSelector((state: RootStore) => state.authDataReducer);
  const userAuthStatus = useSelector((state: RootStore) => state.authStatusReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    // If we haven't loaded data or data loading has failed
    if (userAuthStatus === Status.Initial || userAuthStatus === Status.Failed || forceRefresh) {
      // If userID != -1, check to make sure it's a valid account, and fetch updated data

      // otherwise try and load from local storage

    } else if (userAuthStatus === Status.Succeeded) {
      // save to storage
    }
  }, [dispatch, forceRefresh]);
  return userAuthData;
}
