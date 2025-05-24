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

export const getUserLists = () => {
  return apiService.get("/partner-users/assessments/");
};

// User Invite API
export const inviteUser = (data) => {
  return apiService.post("/user-invite/", {
    name: data.name,
    email: data.email,
    therapist: data.therapist,
  });
};

// Logout APIs
export const logout = () => {
  return apiService.post("/logout");
};

// Logo Update API
export const updateLogo = (file) => {
  console.log("file------------", file);
  const formData = new FormData();
  formData.append("logo", file);
  return apiService.putForm("/update-logo", formData, {
    headers: {
      Accept: "application/json",
    },
  });
};


export const getUniqueUsers = () => {
  return apiService.get("/partner-users/assessments/");
} 




export function getUniqueEmails(data) {
    const emailSet = new Set();
    if (Array.isArray(data.results)) {
        data.results.forEach(item => {
            if (item.email) {
                emailSet.add(item.email);
            }
        });
    }
    return Array.from(emailSet);
}