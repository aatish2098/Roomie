import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";

// import {composeWithDevTools}
import {
  userLoginReducers,
  userSignupReducers,
  userSettingsReducers,
  userGetPetsReducers,
  userAddPetReducers,
} from "../reducers/userReducers";
import { unitViewReducer } from "../reducers/listingsReducers";

const reducer = combineReducers({
  userLogin: userLoginReducers,
  userSignup: userSignupReducers,
  userPets: userGetPetsReducers,
  userAddPet: userAddPetReducers,
  unitDetails: unitViewReducer,
});

const initialState = {};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
