import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { getOrganizationProfile, getUserProfile } from "../api/partner-apis";

const PartnerContext = createContext();

export const usePartner = () => useContext(PartnerContext);

export const PartnerProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [logo, setLogo] = useState(null);

  // Fetch organization profile data
  const fetchOrganizationProfile = useCallback(async () => {
    try {
      const response = await getOrganizationProfile();
      console.log("response------------", response);
      if (response && response.logo) {
        setLogo(response.logo);
      } else {
        setLogo(null);
      }
    } catch (error) {
      console.log("error------------", error);
    }
  }, []);

  useEffect(() => {
    fetchOrganizationProfile();
  }, [fetchOrganizationProfile]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await getUserProfile();
      setUserProfile(response);
      setError(null);
    } catch (err) {
      // setError(err.message || "Failed to fetch user profile");
      console.error("Error fetching user profile:", err);
    } finally {
      setLoading(false);
    }
  };

  // Logo handling functions
  const updateLogo = (newLogo) => {
    setLogo(newLogo);
  };

  const clearLogo = () => {
    setLogo(null);
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const value = {
    userProfile,
    loading,
    error,
    refreshUserProfile: fetchUserProfile,
    logo,
    setLogo: updateLogo,
    clearLogo,
  };

  return (
    <PartnerContext.Provider value={value}>{children}</PartnerContext.Provider>
  );
};
