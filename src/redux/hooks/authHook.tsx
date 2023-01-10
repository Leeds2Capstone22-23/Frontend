import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '..';
import { checkUserLogin } from '../../logic/apiRequest';
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
      const localCookies = document.cookie.replaceAll(' ', '');
      console.log(localCookies);
      if (
        localCookies.length > 0
        && localCookies.split(/,|;/).find((curr) => curr.startsWith('username'))
        && localCookies.split(/,|;/).find((curr) => curr.startsWith('secret'))
      ) {
        const localCookiesSplit = localCookies.split(/,|;/);
        checkUserLogin(
          localCookiesSplit.find((curr) => curr.startsWith('username'))!.split('=')[1],
          localCookiesSplit.find((curr) => curr.startsWith('secret'))!.split('=')[1],
          dispatch,
        );
      }
    }
  }, [dispatch, forceRefresh]);
  return userAuthData;
}
