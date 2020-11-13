import {
    UI_START_LOADING,
    UI_STOP_LOADING,
    PLACE_UPLOAD_STATUS,
    HIDE_TOAST
  } from "../actions/types";

  const initialState = {
      isLoading : false,
      showToast: false,
      uploadStatus: null,
      uploadError: null
  }

  const reducer = (state = initialState, action) =>{
      switch (action.type) {
          case UI_START_LOADING:
            return {
                ...state,
                isLoading:true
            }
            break;

          case UI_STOP_LOADING:
            return {
                ...state,
                isLoading:false
            }
            break;
            
          case PLACE_UPLOAD_STATUS:
            return {
                ...state,
                showToast: true,
                uploadStatus:action.payload.status,
                uploadError: action.payload.error
            }
            break;

          case HIDE_TOAST:
            return {
                ...state,
                showToast: false
            }
            break; 

          default:
            return state;
            break;
      }
  }

  export default reducer;