import { RESTAURENT_SIGNIN_REQUEST, RESTAURENT_SIGNIN_SUCCESS, RESTAURENT_SIGNIN_FAIL, RESTAURENT_REGISTER_REQUEST, RESTAURENT_REGISTER_SUCCESS, RESTAURENT_REGISTER_FAIL, RESTAURENT_LOGOUT } from "../constants/restaurentConstants";

function restaurentSigninReducer(state = {}, action) {
    switch (action.type) {
        case RESTAURENT_SIGNIN_REQUEST:
            return { loading: true };
        case RESTAURENT_SIGNIN_SUCCESS:
            return { loading: false, restInfo: action.payload };
        case RESTAURENT_SIGNIN_FAIL:
            return { loading: false, error: action.payload };
        case RESTAURENT_LOGOUT:
            return {};
        default: return state;
    }
}


function restaurentRegisterReducer(state = {}, action) {
    switch (action.type) {
        case RESTAURENT_REGISTER_REQUEST:
            return { loading: true };
        case RESTAURENT_REGISTER_SUCCESS:
            return { loading: false, restInfo: action.payload };
        case RESTAURENT_REGISTER_FAIL:
            return { loading: false, error: action.payload };
        default: return state;
    }
}


export {
    restaurentSigninReducer, restaurentRegisterReducer
}