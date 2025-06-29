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

export const getUserMembers = () => {
  return apiService.get("/user-invite/");
};

export const deleteUserMembers = (id) => {
  return apiService.delete(`/user-invite/${id}`);
};

export const deleteTeamMember = (id) => {
  return apiService.delete(`/org-member/${id}`);
};



export const inviteTeamMember = (data) => {
  return apiService.post("/member-invite/", {
    ...data
  });
};

// User Profile APIs
export const getUserProfile = () => {
  return apiService.get("/user-profiles");
};

export const getUserLists = () => {
  return apiService.get("/partner-users/assessments/");
};

export const getPartnerUserLists = () => {
  return apiService.get("/partner-users/");
};

// User Invite API
export const inviteUser = (data) => {
  return apiService.post("/user-invite/", JSON.stringify(data));
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

export const getDashboardMetrics = (period, department) => {
  const params = {};
  if (period) params.period = period;
  if (department) params.department = department;
  return apiService.get("/partner-summary/metrics/", params);
}

export const getDashboardMetricsGraph = (period, department) => {
  const params = {};
  if (period) params.period = period;
  if (department) params.department = department;
  return apiService.get("/partner-summary-graph/metrics/", params);
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




export function analyzeAssessmentData(data) {
  const userMap = new Map();
  let completedCount = 0;
  let incompleteCount = 0;

  data.forEach(entry => {
    const email = entry.email;

    if (!userMap.has(email)) {
      userMap.set(email, { completed: 0, total: 0 });
    }

    const userData = userMap.get(email);
    userData.total += 1;

    if (entry.status === "completed") {
      userData.completed += 1;
      completedCount += 1;
    } else if (entry.status === "incomplete") {
      incompleteCount += 1;
    }
  });

  let completedAtLeastOne = 0;
  let didNotCompleteAny = 0;

  userMap.forEach(userData => {
    if (userData.completed > 0) {
      completedAtLeastOne++;
    } else {
      didNotCompleteAny++;
    }
  });

  return {
    uniqueUsers: userMap.size,
    completedAtLeastOneAssessment: completedAtLeastOne,
    didNotCompleteAnyAssessment: didNotCompleteAny,
    totalCompletedAssessments: completedCount,
    totalIncompleteAssessments: incompleteCount
  };
}


export function countUsersByStatus(users) {
  let acceptedCount = 0;
  let notAcceptedCount = 0;

  users.forEach(user => {
    if (user.status === "accepted") acceptedCount++;
    else notAcceptedCount++;
  });

  return {
    accepted: acceptedCount,
    notAccepted: notAcceptedCount
  };
}


export function getUniqueAssessmentTypes(data) {
  // Predefined color map for known assessment types
  const colorMap = {
    "women-wellness-360": "#A5B4FC",
    "child-wellness-360": "#FDE68A",
    "sel-assessment-360": "#FCA5A5"
  };

  const seen = new Set();
  const result = [];

  for (const entry of data) {
    const type = entry.assessment_type?.trim();

    if (type && !seen.has(type) && colorMap[type]) {
      seen.add(type);
      result.push({ name: type, value: 0, color: colorMap[type] });
    }
  }

  return result;
}

export function getLatestEntriesByEmail(data) {
  const latestEntries = {};

  data.forEach(entry => {
    const email = entry.email;
    const currentDate = new Date(entry.created_date);

    if (!latestEntries[email] || new Date(latestEntries[email].created_date) < currentDate) {
      latestEntries[email] = entry;
    }
  });

  return Object.values(latestEntries);
}



export function getLatestAssessmentsByUser(data) {
  const latestByEmail = {};

  data.forEach(entry => {
    const email = entry.email;
    const currentDate = new Date(entry.created_date);

    if (!latestByEmail[email] || new Date(latestByEmail[email].created_date) < currentDate) {
      latestByEmail[email] = entry;
    }
  });

  return Object.values(latestByEmail);
}