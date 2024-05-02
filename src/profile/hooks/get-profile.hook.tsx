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
import { useCallback, useEffect } from "react";
import { setOverlay } from "../../common/features/common.slice";
import { handleRejected } from "../../common/helpers/handle-rejected.helper";
import { setProfile, setProfileTranslations } from "../features/profile.slice";
import { useActiveUser } from "../../auth/hooks/active-user.hook";


export function useGetProfile() {
  // Get the current profile state from the Redux store
  const { profile } = useAppSelector(state => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeUser = useActiveUser();

  // Use the RTK Query hook to fetch the profile data
  const { data, error, status, isSuccess, refetch } = useGetProfileQuery();

  // Use effect to init request when the component mounts
  useEffect(() => {
    handleInitialRequest();
  }, []);

  useEffect(() => {
    // clean up the query if the user is diferent from the profile
    if (activeUser.isAuthenticated && activeUser.username !== profile?.username) {
      refetch();
    }

  }, [profile, activeUser]);

  // Use the useEffect hook to manage the state based on the API call status
  useEffect(() => {
    switch (status) {
      case QueryStatus.rejected:
        handleRejectedRequest();
        break;
      case QueryStatus.fulfilled:
        handleSuccessfulRequest();
        break;
      default:
        break;
    }
  }, [status, data, error]);

  /*
  * Handles the initial request to the API
  */
  const handleInitialRequest = useCallback(() => {
    // dispatch(setOverlay(true));
  }, [dispatch]);

  /**
   * Handles the rejected state by dispatching an action to hide the overlay and navigating to an error page.
   */
  const handleRejectedRequest = useCallback(() => {
    // dispatch(setOverlay(false));
    handleRejected({ error, message: "Profile Rejected", navigate });
  }, [dispatch, error, navigate]);

  /**
   * Handles the fulfilled state by dispatching actions to update the profile and profile translations in the Redux store.
   */
  const handleSuccessfulRequest = useCallback(() => {
    // dispatch(setOverlay(false));
    if (!data) {
      return;
    }
    dispatch(setProfile(data.user));
    dispatch(setProfileTranslations(data.userTranslations));
  }, [dispatch, data]);

  // Return the isSuccess flag indicating whether the profile data was fetched successfully
  return { isSuccess, profile };
}