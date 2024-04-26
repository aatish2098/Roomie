import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_LOGOUT,
  USER_GET_PETS_REQUEST,
  USER_GET_PETS_SUCCESS,
  USER_GET_PETS_FAIL,
  USER_ADD_PET_REQUEST,
  USER_ADD_PET_SUCCESS,
  USER_ADD_PET_FAIL,
  USER_DELETE_PET_REQUEST,
  USER_DELETE_PET_SUCCESS,
  USER_DELETE_PET_FAIL,
} from "../constants/userConstants";

export const userSignupReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
      return { loading: true };
    case USER_SIGNUP_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGNUP_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const userLoginReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userGetPetsReducers = (state = { pets: [] }, action) => {
  switch (action.type) {
    case USER_GET_PETS_REQUEST:
      return { loading: true, ...state };
    case USER_GET_PETS_SUCCESS:
      return { loading: false, pets: action.payload };
    case USER_GET_PETS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userAddPetReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_ADD_PET_REQUEST:
      return { loading: true, ...state };
    case USER_ADD_PET_SUCCESS:
      return { loading: false, pet: action.payload };
    case USER_ADD_PET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userDeletePetReducer = (state = { pets: [] }, action) => {
  switch (action.type) {
    case USER_DELETE_PET_REQUEST:
      return { loading: true, ...state };
    case USER_DELETE_PET_SUCCESS:
      return {
        loading: false,
        pets: action.payload,
      };
    case USER_ADD_PET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
