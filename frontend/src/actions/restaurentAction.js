import Axios from "axios";
import Cookie from 'js-cookie';
import { RESTAURENT_SIGNIN_REQUEST, RESTAURENT_SIGNIN_SUCCESS, RESTAURENT_SIGNIN_FAIL, RESTAURENT_REGISTER_REQUEST, RESTAURENT_REGISTER_SUCCESS, RESTAURENT_REGISTER_FAIL, RESTAURENT_LOGOUT } from "../constants/restaurentConstants";





const ressignin = (email, password) => async (dispatch) => {
    dispatch({ type: RESTAURENT_SIGNIN_REQUEST, payload: { email, password } });
    try {
        const { data } = await Axios.post("/api/restaurent/restsignin", { email, password });
        dispatch({ type: RESTAURENT_SIGNIN_SUCCESS, payload: data });
        Cookie.set('restInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({ type: RESTAURENT_SIGNIN_FAIL, payload: error.message });
    }
}

const resregister = (name, email, password) => async (dispatch) => {
    dispatch({ type: RESTAURENT_REGISTER_REQUEST, payload: { name, email, password } });
    try {
        const { data } = await Axios.post("/api/restaurent/restregister", { name, email, password });
        dispatch({ type: RESTAURENT_REGISTER_SUCCESS, payload: data });
        Cookie.set('restInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({ type: RESTAURENT_REGISTER_FAIL, payload: error.message });
    }
}
const reslogout = () => (dispatch) => {
    Cookie.remove("restInfo");
    dispatch({ type: RESTAURENT_LOGOUT })
}



export { ressignin, resregister, reslogout }