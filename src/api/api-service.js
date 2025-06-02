import axios from "axios";

// API Configuration
const API_CONFIG = {
  baseURL: "https://api.ourlittlehugs.com/v1/api",
  timeout: 30000, // 30 seconds
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

// Create axios instance
const axiosInstance = axios.create(API_CONFIG);

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem("accessToken");

    console.log("token------------", token);

    // If token exists, add to headers
    if (token) {
      config.headers.Authorization = `${token}`;
    }

    // Remove Content-Type for FormData so browser sets it with boundary
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    // Handle different error scenarios
    if (response) {
      switch (response.status) {
        case 401:
          // Unauthorized - Clear token and redirect to login
          localStorage.removeItem("accessToken");
          localStorage.removeItem("userType");
          window.location.href = "/signin";
          break;

        case 403:
          // Forbidden
          console.error("Access forbidden");
          break;

        case 404:
          // Not found
          console.error("Resource not found");
          break;

        case 500:
          // Server error
          console.error("Server error");
          break;

        default:
          console.error("An error occurred");
      }
    } else {
      // Network error or no response
      console.error("Network error or no response from server");
    }

    return Promise.reject(error);
  }
);

// Error handler
const handleError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error("Response Error:", {
      status: error.response.status,
      data: error.response.data,
      headers: error.response.headers,
    });
  } else if (error.request) {
    // The request was made but no response was received
    console.error("Request Error:", error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error("Error:", error.message);
  }
};

// API methods
const apiService = {
  // GET request
  get: async (endpoint, params = {}) => {
    try {
      const response = await axiosInstance.get(endpoint, { params });
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  // POST request
  post: async (endpoint, data = {}) => {
    try {
      const response = await axiosInstance.post(endpoint, data);
      console.log("response post------------", response);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  // PUT request (for JSON)
  put: async (endpoint, data = {}) => {
    try {
      const response = await axiosInstance.put(endpoint, data);
      console.log("response put------------", response);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  // PUT request for FormData (e.g., logo upload)
  putForm: async (endpoint, data = {}, config = {}) => {
    try {
      // Remove Content-Type if present so browser sets it with boundary
      // if (config.headers && config.headers["Content-Type"]) {
      //   delete config.headers["Content-Type"];
      // }
      console.log("config------------", config);
      const response = await axiosInstance.put(endpoint, data, config);
      console.log("response putForm------------", response);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  // DELETE request
  delete: async (endpoint) => {
    try {
      const response = await axiosInstance.delete(endpoint);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  // PATCH request
  patch: async (endpoint, data = {}) => {
    try {
      const response = await axiosInstance.patch(endpoint, data);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },
};

export default apiService;

/**
 * =============================================
 * EXAMPLE USAGE
 * =============================================
 *
 * 1. Basic API Calls
 * -----------------
 *
 * // GET request with query parameters
 * const fetchUsers = async () => {
 *   try {
 *     const params = { page: 1, limit: 10 };
 *     const users = await apiService.get('/users', params);
 *     console.log('Users:', users);
 *   } catch (error) {
 *     console.error('Failed to fetch users');
 *   }
 * };
 *
 * // POST request with data
 * const createUser = async () => {
 *   try {
 *     const userData = {
 *       name: 'John Doe',
 *       email: 'john@example.com'
 *     };
 *     const newUser = await apiService.post('/users', userData);
 *     console.log('Created user:', newUser);
 *   } catch (error) {
 *     console.error('Failed to create user');
 *   }
 * };
 *
 * 2. React Component Example
 * -------------------------
 *
 * import React, { useState, useEffect } from 'react';
 * import apiService from './api-service';
 *
 * const UserList = () => {
 *   const [users, setUsers] = useState([]);
 *   const [loading, setLoading] = useState(false);
 *   const [error, setError] = useState(null);
 *
 *   useEffect(() => {
 *     fetchUsers();
 *   }, []);
 *
 *   const fetchUsers = async () => {
 *     try {
 *       setLoading(true);
 *       const data = await apiService.get('/users');
 *       setUsers(data);
 *     } catch (error) {
 *       setError('Failed to fetch users');
 *     } finally {
 *       setLoading(false);
 *     }
 *   };
 *
 *   const handleCreateUser = async (userData) => {
 *     try {
 *       const newUser = await apiService.post('/users', userData);
 *       setUsers(prev => [...prev, newUser]);
 *     } catch (error) {
 *       setError('Failed to create user');
 *     }
 *   };
 *
 *   if (loading) return <div>Loading...</div>;
 *   if (error) return <div>{error}</div>;
 *
 *   return (
 *     <div>
 *       {users.map(user => (
 *         <div key={user.id}>{user.name}</div>
 *       ))}
 *     </div>
 *   );
 * };
 *
 * 3. Form Submission Example
 * -------------------------
 *
 * const handleSubmit = async (formData) => {
 *   try {
 *     // For creating new resource
 *     const response = await apiService.post('/users', formData);
 *     console.log('Created:', response);
 *
 *     // For updating existing resource
 *     const updateResponse = await apiService.put(`/users/${response.id}`, {
 *       ...formData,
 *       status: 'active'
 *     });
 *     console.log('Updated:', updateResponse);
 *
 *     // For partial update
 *     const patchResponse = await apiService.patch(`/users/${response.id}`, {
 *       status: 'inactive'
 *     });
 *     console.log('Patched:', patchResponse);
 *
 *     // For deleting resource
 *     await apiService.delete(`/users/${response.id}`);
 *     console.log('Deleted successfully');
 *   } catch (error) {
 *     console.error('Operation failed:', error);
 *   }
 * };
 *
 * 4. Error Handling Example
 * ------------------------
 *
 * const handleApiCall = async () => {
 *   try {
 *     const data = await apiService.get('/protected-resource');
 *     // Handle success
 *   } catch (error) {
 *     if (error.response) {
 *       // Server responded with error
 *       switch (error.response.status) {
 *         case 401:
 *           // Handle unauthorized
 *           break;
 *         case 403:
 *           // Handle forbidden
 *           break;
 *         case 404:
 *           // Handle not found
 *           break;
 *         default:
 *           // Handle other errors
 *       }
 *     } else if (error.request) {
 *       // Request made but no response
 *       console.error('Network error');
 *     } else {
 *       // Other errors
 *       console.error('Error:', error.message);
 *     }
 *   }
 * };
 */
