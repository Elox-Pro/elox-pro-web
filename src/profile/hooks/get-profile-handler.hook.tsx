import { useAppSelector } from "../../app/hooks/app.hooks";
import { useDispatch } from "react-redux";
import { useGetProfileQuery } from "../api/profile.api";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { useEffect } from "react";
import { setProfile, setProfileTranslations } from "../features/profile.slice";
import { useActiveUser } from "../../auth/hooks/active-user.hook";
import { useTranslation } from "react-i18next";

/**
 * A React hook that fetches the user's profile data from the API and manages the state accordingly.
 * It uses the Redux toolkit's RTK Query for API calls and Redux for state management.
 * @author Yonatan A Quintero R
 * @module useGetProfile
 * @returns {Object} An object containing the `isSuccess` property indicating whether the profile data was fetched successfully.
 */
export function useGetProfile() {
  // Get the current profile state from the Redux store
  const { profile } = useAppSelector(state => state.profile);
  const { t } = useTranslation("profile", { keyPrefix: "index" });
  const dispatch = useDispatch();
  const activeUser = useActiveUser();

  // Use the RTK Query hook to fetch the profile data
  const { data, status, isSuccess, refetch } = useGetProfileQuery();

  useEffect(() => {
    // clean up the query if the user is diferent from the profile
    if (activeUser.isAuthenticated && activeUser.username !== profile?.username) {
      refetch();
    }

  }, [profile, activeUser]);

  // Use the useEffect hook to manage the state based on the API call status
  useEffect(() => {
    if (status === QueryStatus.fulfilled && data) {
      dispatch(setProfile(data.user));
      dispatch(setProfileTranslations(data.userTranslations));
    }
  }, [status, data]);


  // Return the isSuccess flag indicating whether the profile data was fetched successfully
  return { isSuccess, profile, t };
}