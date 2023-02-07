import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '..';

/**
 * STATUS
 */
export function ExampleHook() {
  const status = useSelector((state: RootStore) => state.rootReducer.exampleReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('ayyo');
  }, [dispatch]);

  return status;
}
