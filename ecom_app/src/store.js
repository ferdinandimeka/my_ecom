import { applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { productListReducer, productDetailsReducer } from "./Redux/reducers/productReducers";
import { legacy_createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { productCreateReducer, productDeleteReducer, productTopReducer,
        productReviewCreateReducer, productUpdateReducer
    } from './Redux/reducers/productReducers'
    import { userDeleteUser, userLoginReducers, userUpdateReducer,
    userRegisterReducers, userProfileReducers, userUpdateProfileReducers,
    userListReducer } from './Redux/reducers/userReducers'
import { orderMakeReducer, orderDetailsReducer, orderPayReducer, 
        orderDeliverReducer, orderListReducer, 
        orderAllListReducer, orderDeleteReducer 
    } from './Redux/reducers/orderReducers'
import { cartReducers } from "./Redux/reducers/cartReducers";

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productCreate: productCreateReducer,
    productDelete: productDeleteReducer,
    productTopRated: productTopReducer,
    productCreateReview: productReviewCreateReducer,
    productUpdate: productUpdateReducer,
    cart: cartReducers,
    userLogin: userLoginReducers,
    userRegister: userRegisterReducers,
    userProfile: userProfileReducers,
    userUpdateProfile: userUpdateProfileReducers,
    userList: userListReducer,
    userDelete: userDeleteUser,
    userUpdate: userUpdateReducer,
    orderMake: orderMakeReducer,
    orderDetails: orderDetailsReducer,
    orderPayments: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    orderList: orderListReducer,
    orderListAll: orderAllListReducer,
    orderDelete: orderDeleteReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')? 
JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo')? 
JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')?
JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
    cart:{
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
    },

    userLogin:{
        userInfo: userInfoFromStorage
    }
};

const middleware = [thunk];
const store = legacy_createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)));

export default store;