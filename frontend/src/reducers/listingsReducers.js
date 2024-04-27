import {
  LISTINGS_REQUEST,
  LISTINGS_SUCCESS,
  LISTINGS_FAIL,
  LISTING_REQUEST,
  LISTING_SUCCESS,
  LISTING_FAIL,
  UNIT_VIEW_DETAILS_REQUEST,
  UNIT_VIEW_DETAILS_SUCCESS,
  UNIT_VIEW_DETAILS_FAIL,
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
