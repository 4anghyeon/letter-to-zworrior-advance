import {hideAlert, showAlert} from '../redux/modules/alertSlice';
import {useDispatch} from 'react-redux';

export const usePopup = () => {
  const dispatch = useDispatch();

  return (content, styleOption, type, millis, cb, confirmOption = null) => {
    setTimeout(() => {
      dispatch(showAlert({content, styleOption, type, confirmOption}));
      if (cb) cb();

      if (millis !== Number.POSITIVE_INFINITY) {
        setTimeout(() => {
          dispatch(hideAlert());
        }, millis);
      }
    });
  };
};
