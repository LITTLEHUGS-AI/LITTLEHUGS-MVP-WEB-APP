import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../lib/AuthContext";
import { Loader } from "../common/Loader";

const GoogleCallback = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const location = useLocation();
  const navigate = useNavigate();
  const hasFetched = useRef(false);
  const { login, hasAuthenticated } = useAuth();

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    const fetchUser = async () => {
      const queryParams = new URLSearchParams(location.search);
      const code = queryParams.get("code");
      const token = queryParams.get("token");
      const type = queryParams.get("type");

      if (!type) {
        if (code) {
          try {
            const response = await axios.post(
              `${apiUrl}/v1/api/google/callback`,
                { access_token: code, is_mobile: false }
            );
            const access_token = response?.data;
            localStorage.setItem("accessToken", access_token);
            login(access_token);
            window.location.href = "/";
          } catch (error) {
            console.error("Error during authentication", error);
          }
        } else {
          console.log("Code is not present");
        }
      } else {
        if (token) {
          try {
            let payload = {
              token: token,
            };
            const response = await axios.post(
              `${apiUrl}/auth/v2/login`,
              payload
            );
            const access_token = response?.data?.access_token;
            localStorage.setItem("accessToken", access_token);
            login(access_token);
            window.location.href = "/";
          } catch (error) {
            console.error("Error during authentication", error);
          }
        } else {
          console.log("Token is not present");
        }
      }
    };

    fetchUser();
  }, [apiUrl, location.search, login]);

  useEffect(() => {
    if (hasAuthenticated) {
      navigate("/new-chat");
    }
  }, [hasAuthenticated, navigate]);

  <div>
    <Loader />
  </div>;
};

export default GoogleCallback;
