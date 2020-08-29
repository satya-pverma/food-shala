import { createStore, combineReducers, applyMiddleware, composeEnhancer, compose } from 'redux';
import { productListReducer, productDetailsReducer, productSaveReducer, productDeleteReducer } from './reducers/productReducers';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import Cookie from 'js-cookie';
import { userSigninReducer, userRegisterReducer, userUpdateReducer, } from './reducers/userReducers';
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, myOrderListReducer, orderListReducer, orderDeleteReducer } from './reducers/orderReducers';
import { restaurentSigninReducer, restaurentRegisterReducer } from './reducers/restaurentsReducers';
const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;
const restInfo = Cookie.getJSON("restInfo") || null;

const initialState = { cart: { cartItems, shipping: {}, payment: {} }, userSignin: { userInfo }, restaurentSignin: { restInfo } };
const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer,
	userSignin: userSigninReducer,
	userRegister: userRegisterReducer,
	productSave: productSaveReducer,
	productDelete: productDeleteReducer,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
	orderPay: orderPayReducer,
	userUpdate: userUpdateReducer,
	myOrderList: myOrderListReducer,
	orderList: orderListReducer,
	orderDelete: orderDeleteReducer,
	restaurentRegister: restaurentRegisterReducer,
	restaurentSignin: restaurentSigninReducer




})
//const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, compose(applyMiddleware(thunk)));
export default store;