import {
  UNIT_VIEW_DETAILS_REQUEST,
  UNIT_VIEW_DETAILS_SUCCESS,
  UNIT_VIEW_DETAILS_FAIL,
  UNIT_VIEW_PET_POLICIES_REQUEST,
  UNIT_VIEW_PET_POLICIES_SUCCESS,
  UNIT_VIEW_PET_POLICIES_FAIL,
} from "../constants/listingsConstants";

export const unitViewReducer = (state = { unitDetails: [] }, action) => {
  switch (action.type) {
    case UNIT_VIEW_DETAILS_REQUEST:
      return { loading: true, ...state };
    case UNIT_VIEW_DETAILS_SUCCESS:
      return { loading: false, unitDetails: action.payload };
    case UNIT_VIEW_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const unitPetPolicyReducer = (
  state = { petPolicy: undefined },
  action
) => {
  switch (action.type) {
    case UNIT_VIEW_PET_POLICIES_REQUEST:
      return { loading: true, ...state };
    case UNIT_VIEW_PET_POLICIES_SUCCESS:
      return { loading: false, petPolicy: action.payload };
    case UNIT_VIEW_PET_POLICIES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
