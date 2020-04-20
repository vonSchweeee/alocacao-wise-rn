//Action Types
export const TOAST_SUCCESS = 'TOAST_SUCCESS';
export const TOAST_ERROR = 'TOAST_ERROR';
export const TOAST_CLEAR = 'TOAST_CLEAR';
export const SIDEBAR_SHOW = 'SIDEBAR_SHOW';
export const SIDEBAR_HIDE = 'SIDEBAR_HIDE';

export type ShowSuccessToastAction = {
    type: typeof TOAST_SUCCESS;
    payload: {
        message: string, 
        timeout?: number
    }
}

export type ShowErrorToastAction = {
    type: typeof TOAST_ERROR;
    payload: {
        message: string, 
        timeout?: number
    }
}

export type ClearToastAction = {
    type: typeof TOAST_CLEAR
}

export type ShowSidebarAction = {
    type: typeof SIDEBAR_SHOW
}

export type HideSidebarAction = {
    type: typeof SIDEBAR_HIDE
}

export type UiState = {
    toast: {
        toastOpen: boolean,
        toastMessage: string,
        toastSeverity: string,
        toastAutoHide?: number
    },
    sidebar: {
        sidebarOpen: boolean
    }   
}
export type UiActionTypes = ShowSuccessToastAction | ShowErrorToastAction | ClearToastAction | ShowSidebarAction | HideSidebarAction;