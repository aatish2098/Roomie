import axios from "axios";
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
  UNIT_VIEW_PET_POLICIES_REQUEST,
  UNIT_VIEW_PET_POLICIES_SUCCESS,
  UNIT_VIEW_PET_POLICIES_FAIL,
} from "../constants/listingsConstants";

export const fetchListings = () => async (dispatch) => {
  try {
    dispatch({ type: LISTINGS_REQUEST });
    const response = await fetch("api/listings/");
    const data = await response.json();

    dispatch({
      type: LISTINGS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LISTINGS_FAIL,
      payload: error.message,
    });
  }
};

export const fetchListing = (pk) => async (dispatch) => {
  try {
    dispatch({ type: LISTING_REQUEST });
    const response = await fetch(`api/listings/${pk}/`);
    const data = await response.json();

    dispatch({
      type: LISTING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LISTING_FAIL,
      payload: error.message,
    });
  }
};

export const fetchListingDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: UNIT_VIEW_DETAILS_REQUEST });
    const { data } = await axios.get(`http://127.0.0.1:8000/unit/${id}/`);

    dispatch({
      type: UNIT_VIEW_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UNIT_VIEW_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getPetPolicies =
  (companyName, buildingName, pets) => async (dispatch) => {
    try {
      dispatch({ type: UNIT_VIEW_PET_POLICIES_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `http://127.0.0.1:8000/getPetPolicies/`,
        {
          CompanyName: companyName,
          BuildingName: buildingName,
          pets: pets,
        },
        config
      );

      dispatch({
        type: UNIT_VIEW_PET_POLICIES_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UNIT_VIEW_PET_POLICIES_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
