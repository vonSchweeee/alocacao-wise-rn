const INITIAL_STATE = {toastOpen: false, sidebarOpen: false};
const sidebarReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
      case "SIDEBAR_SHOW":
        return {
          ...state,
          sidebarOpen: true,
        };

      case "SIDEBAR_HIDE":
        return {
          ...state,
          sidebarOpen: false,
        };

      default:
        return state;
    }
};

export default sidebarReducer;