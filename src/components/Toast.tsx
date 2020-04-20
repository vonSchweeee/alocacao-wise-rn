import * as React from 'react';
import { Snackbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../store/types';
import { clearToast } from '../store/ui/actions/uiActions';

const Toast: React.FC = () => {

    const dispatch = useDispatch();

    const { toastMessage, toastOpen, toastSeverity, toastAutoHide } = useSelector(
      (state: ReduxState)=> state.ui.toast
    );

    return (
      <Snackbar
        visible={toastOpen}
        onDismiss={() => dispatch(clearToast())}
        duration={toastAutoHide}
        style={{backgroundColor: toastSeverity === 'error' ? '#A00' : 'success' ? '#1A0' : '#000'}}
      >
        {toastMessage}
      </Snackbar>
    );
};

export default Toast;