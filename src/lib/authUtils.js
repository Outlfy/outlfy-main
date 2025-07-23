// Admin authentication utilities
export const ADMIN_PASSWORD = "outlfy will handle my tech 7122 times";

export const authUtils = {
  // Check if user is authenticated
  isAuthenticated: () => {
    if (typeof window === 'undefined') return false;
    
    try {
      const authenticated = localStorage.getItem("adminAuthenticated");
      const loginTime = localStorage.getItem("adminLoginTime");
      
      if (authenticated === "true" && loginTime) {
        const now = Date.now();
        const loginTimestamp = parseInt(loginTime);
        const hoursSinceLogin = (now - loginTimestamp) / (1000 * 60 * 60);
        
        // Session expires after 24 hours
        if (hoursSinceLogin < 24) {
          return true;
        } else {
          // Clear expired session
          authUtils.logout();
          return false;
        }
      }
      return false;
    } catch {
      return false;
    }
  },

  // Login user
  login: () => {
    if (typeof window === 'undefined') return;
    
    localStorage.setItem("adminAuthenticated", "true");
    localStorage.setItem("adminLoginTime", Date.now().toString());
  },

  // Logout user
  logout: () => {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem("adminAuthenticated");
    localStorage.removeItem("adminLoginTime");
  },

  // Get auth headers for API requests
  getAuthHeaders: () => {
    const encodedPassword = btoa(ADMIN_PASSWORD);
    return {
      'Content-Type': 'application/json',
      'x-admin-auth': encodedPassword
    };
  },

  // Make authenticated API request
  authenticatedFetch: async (url, options = {}) => {
    const headers = {
      ...authUtils.getAuthHeaders(),
      ...options.headers
    };

    return fetch(url, {
      ...options,
      headers
    });
  }
};
