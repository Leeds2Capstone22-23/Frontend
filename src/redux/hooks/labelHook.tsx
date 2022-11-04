import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { retrieveAllLabels } from '../../logic/apiRequest';
import { RootStore } from '../../redux';
import { Status } from '../../types/types';
import { saveLabels } from '../reducers/labelReducer';

/**
 * STATUS
 */
export function LabelStatus() {
  return useSelector((state: RootStore) => state.labelStatusReducer);
}

/**
 * DATA
 */
export function LabelData(forceRefresh = false) {
  const labelsData = useSelector((state: RootStore) => state.labelDataReducer);
  const labelsStatus = useSelector((state: RootStore) => state.labelStatusReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    // If we haven't loaded data or data loading has failed
    console.log("Ayyo2")
    if (labelsStatus === Status.Initial || labelsStatus === Status.Failed || forceRefresh) {
      // Fetch apps
      retrieveAllLabels(dispatch)
        .then((response) => {
            dispatch(saveLabels(response));
        });
    }
  }, [dispatch, forceRefresh]);
  return labelsData;
}
