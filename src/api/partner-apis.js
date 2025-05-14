import apiService from "./api-service";

// Organization Profile APIs
export const getOrganizationProfile = () => {
  return apiService.get("/organisation-profile");
};

export const updateOrganizationProfile = (data) => {
  return apiService.put("/organisation-profile", data);
};

// Team Member APIs
export const getTeamMembers = () => {
  return apiService.get("/org-member/");
};

export const inviteTeamMember = (data) => {
  return apiService.post("/member-invite/", {
    ...data,
    role: "Admin",
  });
};

// User Profile APIs
export const getUserProfile = () => {
  return apiService.get("/user-profiles");
};

// User Invite API
export const inviteUser = (data) => {
  return apiService.post("/user-invite/", {
    name: data.name,
    email: data.email,
  });
};

// Logout APIs
export const logout = () => {
  return apiService.post("/logout");
};
