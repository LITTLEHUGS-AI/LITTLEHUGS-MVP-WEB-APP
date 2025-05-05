import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

function revokeGoogleTokens(accessToken, refreshToken) {
  if (accessToken) {
    window?.google?.accounts?.oauth2.revoke(accessToken, () => {
      console.log("Google access token revoked");
    });
  }

  if (refreshToken) {
    fetch(`https://oauth2.googleapis.com/revoke?token=${refreshToken}`, {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
    })
      .then(() => {
        console.log("Google refresh token revoked");
      })
      .catch((error) => {
        console.error("Error revoking refresh token:", error);
      });
  }
}

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const initialAccessToken = localStorage.getItem("accessToken");

    if (initialAccessToken) {
      return { access_token: initialAccessToken };
    }
    return null;
  });

  const [googleAccessToken, setGoogleAccessToken] = useState(() =>
    sessionStorage.getItem("googleAccessToken")
  );
  const [googleRefreshToken, setGoogleRefreshToken] = useState(() =>
    sessionStorage.getItem("googleRefreshToken")
  );
  const [isGoogleAuthorized, setIsGoogleAuthorized] = useState(
    !!googleAccessToken
  );

  const hasAuthenticated = isAuthenticated?.access_token;

  const [userDetails, setUserDetails] = useState(null);

  const login = (accessToken) => {
    if (accessToken) {
      if (accessToken.token) {
        localStorage.setItem("accessToken", `token ${accessToken.token}`);
      }
      setIsAuthenticated(accessToken);
      sessionStorage.removeItem("chats");
    }
  };

  const logout = () => {
    revokeGoogleTokens(googleAccessToken, googleRefreshToken);

    localStorage.removeItem("accessToken");
    sessionStorage.removeItem("googleAccessToken");
    sessionStorage.removeItem("googleRefreshToken");
    sessionStorage.removeItem("googleTokenExpiryTime");
    localStorage.removeItem("selectedBoardId");
    localStorage.removeItem("selectedBoardName");

    setGoogleAccessToken(null);
    setGoogleRefreshToken(null);
    setIsGoogleAuthorized(false);
    setUserDetails(null);
    setIsAuthenticated(null);
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        userDetails,
        setUserDetails,
        hasAuthenticated,
        googleAccessToken,
        setGoogleAccessToken,
        googleRefreshToken,
        setGoogleRefreshToken,
        isGoogleAuthorized,
        setIsGoogleAuthorized,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuth };
