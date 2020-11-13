import {SIGN_UP_AUTH, SIGN_IN_AUTH, AUTH_SET_TOKEN} from '../actions/types';

const initialState = {
    tokenDetails:{token:null, refreshToken:null, expiryDate:null}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_SET_TOKEN:
            return {...state, tokenDetails: action.payload}
            break;
    
        default:
            return {...state}
            break;
    }
}

export default reducer;