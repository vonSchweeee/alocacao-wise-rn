const INITIAL_STATE = {toastOpen: false, toastMessage: '', toastSeverity: 'error', toastAutoHide: '1000', sidebarOpen: false};
const toastReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
      case "TOAST_SUCCESS":
        return {
          ...state,
          toastOpen: true,
          toastMessage: action.payload.message,
          toastSeverity: 'success',
          toastAutoHide: action.payload.timeout || 1000
        };
      case "TOAST_ERROR":
        return {
          ...state,
          toastOpen: true,
          toastMessage: action.payload.message,
          toastSeverity: 'error',
          toastAutoHide: action.payload.timeout || 2500
        };
      case "TOAST_CLEAR":
        return {
          ...state,
          toastOpen: false,
        };

      default:
        return state;
    }
};

export default toastReducer;