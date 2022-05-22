import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productListReducer,
  productDetailsReducer,
  productCategoryReducer,
  productsubCategoryReducer,
  productSearchReducer,
  productReviewCreateReducer,
  productCreateReducer,
  productEditReducer,
  productDeleteReducer,
  productImageReducer,
} from './reducers/productReducers'
import {
  orderCreateReducer,
  orderListMyReducer,
  orderPayReducer,
  orderListReducer,
  orderDeliverReducer,
} from './reducers/orderReducers'

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userUpdateLanguageReducer,
  userListReducer,
  userDeleteReducer,
} from './reducers/userReducers'
import { cartReducer } from './reducers/cartReducers'
import { changeSettingsReducer } from "./reducers/settingsReducers";
const reducer = combineReducers({
  // Product
  productList:productListReducer,
  productDetails:productDetailsReducer,
  productCategory:productCategoryReducer,
  productsubCategory: productsubCategoryReducer,
  productSearch:productSearchReducer,
  productReviewCreate:productReviewCreateReducer,
  productCreate: productCreateReducer,
  productEdit:productEditReducer,
  productDelete:productDeleteReducer,
  productImage:productImageReducer,
  // Cart
  cart: cartReducer,
  // Settings
  settings: changeSettingsReducer,
  // User
  userLogin:userLoginReducer,
  userRegister:userRegisterReducer,
  userDetails:userDetailsReducer,
  userUpdateProfile:userUpdateProfileReducer,
  userUpdateLanguage:userUpdateLanguageReducer,
  userList:userListReducer,
  userDelete:userDeleteReducer,
  // Orders
  orderCreate:orderCreateReducer,
  orderListMy:orderListMyReducer,
  orderPay:orderPayReducer,
  orderList:orderListReducer,
  orderDeliver:orderDeliverReducer,

})
const cartItemsFromStorage = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : null;

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
    ? JSON.parse(localStorage.getItem("paymentMethod"))
    : null;

const settingsFromStorage = localStorage.getItem("settings")
    ? JSON.parse(localStorage.getItem("settings"))
    : { language: "en", country: "in", currency: "inr" };

const initialState = {
  cart: {
      cartItems: cartItemsFromStorage,
      shippingAddress: shippingAddressFromStorage,
      paymentMethod: paymentMethodFromStorage,
  },
  settings: settingsFromStorage,
  userLogin: { userInformation: userInfoFromStorage },
}

const middleware = [thunk]
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
