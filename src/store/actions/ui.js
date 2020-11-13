import { UI_START_LOADING, UI_STOP_LOADING, HIDE_TOAST } from './types';

export const uiStartLoading = () =>{
    return {
        type: UI_START_LOADING
    }
}

export const uiStopLoading = () =>{
    return {
        type: UI_STOP_LOADING
    }
}

export const hideToast = () =>{
    return {
        type: HIDE_TOAST
    }
}