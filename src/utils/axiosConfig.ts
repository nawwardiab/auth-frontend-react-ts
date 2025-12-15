import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/",
  withCredentials: true,
});

// Store CSRF tokens in memory
let csrfTokenCache: string | null = null;
let csrfTokenFromResponse: string | null = null; // ← NEW: Store token from response body

/*
 * Intercepts responses to capture CSRF token from response body and Set-Cookie header
 */
api.interceptors.response.use(
  (response) => {
    // NEW: Capture CSRF token from response body (login/register)
    if (response.data?.csrfToken) {
      csrfTokenFromResponse = response.data.csrfToken;
    }
    
    // Extract CSRF token from Set-Cookie header if present
    const setCookieHeader = response.headers["set-cookie"];
    if (setCookieHeader) {
      const cookies = Array.isArray(setCookieHeader)
        ? setCookieHeader
        : [setCookieHeader];
      for (const cookie of cookies) {
        const match = cookie.match(/csrf_token=([^;]+)/);
        if (match && match[1]) {
          csrfTokenCache = match[1];
          break;
        }
      }
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/*
 * Intercepts requests to add CSRF token header for protected routes
 */
api.interceptors.request.use((config) => {
  // Only add CSRF token for protected routes (containing /v1/)
  const isProtectedRoute = config.url?.includes("/v1/");
  if (!isProtectedRoute) {
    // Public routes like /login and /register don't need CSRF
    return config;
  }

  let csrfToken: string | undefined;
  
  // Priority 1: Use token from response body (most reliable for cross-site)
  if (csrfTokenFromResponse) {
    csrfToken = csrfTokenFromResponse;
  }
  
  // Priority 2: Try to read from document.cookie
  if (!csrfToken) {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      if (cookie.trim().startsWith("csrf_token=")) {
        csrfToken = cookie.split("=")[1];
        break;
      }
    }
  }
  
  // Priority 3: Fallback to cached token from Set-Cookie header
  if (!csrfToken && csrfTokenCache) {
    csrfToken = csrfTokenCache;
  }

  if (csrfToken) {
    config.headers["X-CSRF-Token"] = csrfToken;
  }

  return config;
});

export default api;