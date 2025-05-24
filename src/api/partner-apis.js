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
  let uniqueEmails = [];
  if (Array.isArray(data)) {
    data.forEach(item => {
      if (item.email && !uniqueEmails.includes(item.email)) {
        uniqueEmails.push(item.email);
      }
    });
  }
  return Array.from(uniqueEmails);
}



export function getUserAssessmentCounts(data) {
     if (!Array.isArray(data)) {
        return {
            completed: 0,
            notCompleted: 0
        };
    }

    const userStatusMap = {};

    data.forEach(record => {
        const user = record.email;
        const status = record.status;

        if (!user) return; 

        if (!userStatusMap[user]) {
            userStatusMap[user] = false;
        }

        if (status === "completed") {
            userStatusMap[user] = true;
        }
    });

    let completedCount = 0;
    let notCompletedCount = 0;

    for (const user in userStatusMap) {
        if (userStatusMap[user]) {
            completedCount++;
        } else {
            notCompletedCount++;
        }
    }

    return {
        completed: completedCount,
        notCompleted: notCompletedCount
    };
}

