import React, { createContext, useContext, useState, useEffect } from "react";
import { getUserProfile } from "../api/partner-apis";

const PartnerContext = createContext();

export const usePartner = () => useContext(PartnerContext);

export const PartnerProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [logo, setLogo] = useState(localStorage.getItem("orgLogo") || null);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await getUserProfile();
      console.log("response------------", response);
      setUserProfile(response);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch user profile");
      console.error("Error fetching user profile:", err);
    } finally {
      setLoading(false);
    }
  };

  // Logo handling functions
  const updateLogo = (newLogo) => {
    setLogo(newLogo);
    if (newLogo) {
      localStorage.setItem("orgLogo", newLogo);
    } else {
      localStorage.removeItem("orgLogo");
    }
  };

  const clearLogo = () => {
    setLogo(null);
    localStorage.removeItem("orgLogo");
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
