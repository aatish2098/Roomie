import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";

// import {composeWithDevTools}
import {
  userLoginReducers,
  userSignupReducers,
  userGetPetsReducers,
  userAddPetReducers,
  userAddFavReducers,
  userGetFavsReducers,
  userCheckFavReducers,
  userDelFavReducer,
} from "../reducers/userReducers";
import {
  unitViewReducer,
  unitPetPolicyReducer,
} from "../reducers/listingsReducers";

const reducer = combineReducers({
  userLogin: userLoginReducers,
  userSignup: userSignupReducers,
  userPets: userGetPetsReducers,
  userAddPet: userAddPetReducers,
  unitDetails: unitViewReducer,
  unitPetPolicy: unitPetPolicyReducer,
  userAddFav: userAddFavReducers,
  userGetFavs: userGetFavsReducers,
  userCheckFav: userCheckFavReducers,
  userDelFav: userDelFavReducer,
});

const initialState = {};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
