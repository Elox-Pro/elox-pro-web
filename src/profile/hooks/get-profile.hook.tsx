/**
 * A React hook that fetches the user's profile data from the API and manages the state accordingly.
 * It uses the Redux toolkit's RTK Query for API calls and Redux for state management.
 * @author Yonatan A Quintero R
 * @module useGetProfile
 * @returns {Object} An object containing the `isSuccess` property indicating whether the profile data was fetched successfully.
 */
import { useAppSelector } from "../../app/hooks/app.hooks";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetProfileQuery } from "../api/profile.api";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { useEffect } from "react";
import { setOverlay } from "../../common/features/common.slice";
import { handleRejected } from "../../common/helpers/handle-rejected.helper";
import { setProfile, setProfileTranslations } from "../features/profile.slice";

export function useGetProfile() {
  // Get the current profile state from the Redux store
  const { profile } = useAppSelector(state => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Use the RTK Query hook to fetch the profile data
  let { data, error, status, isSuccess, refetch } = useGetProfileQuery();

  // Use the useEffect hook to manage the state based on the API call status
  useEffect(() => {
    switch (status) {
      case QueryStatus.uninitialized:
        onUninitialized();
        break;
      case QueryStatus.pending:
        onPending();
        break;
      case QueryStatus.rejected:
        onRejected();
        break;
      case QueryStatus.fulfilled:
        onFulfilled();
        break;
      default:
        break;
    }
  }, [status, data, error]);

  /**
   * Handles the uninitialized state by refetching the profile data if it's not available.
   */
  const onUninitialized = () => {
    if (profile === null && !data) {
      refetch();
    }
  }

  /**
   * Handles the pending state by dispatching an action to show the overlay.
   */
  const onPending = () => {
    dispatch(setOverlay(true));
  }

  /**
   * Handles the rejected state by dispatching an action to hide the overlay and navigating to an error page.
   */
  const onRejected = () => {
    dispatch(setOverlay(false));
    handleRejected({ error, message: "Profile Rejected", navigate });
  }

  /**
   * Handles the fulfilled state by dispatching actions to update the profile and profile translations in the Redux store.
   */
  const onFulfilled = () => {
    dispatch(setOverlay(false));
    if (!data) {
      return;
    }
    dispatch(setProfile(data.user));
    dispatch(setProfileTranslations(data.userTranslations));
    resetQueryState();
  }

  /**
   * Resets the RTK Query state to its initial values.
   */
  const resetQueryState = () => {
    status = QueryStatus.uninitialized;
    isSuccess = false;
    data = undefined;
    error = undefined;
  }

  // Return the isSuccess flag indicating whether the profile data was fetched successfully
  return { isSuccess };
}