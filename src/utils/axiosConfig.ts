import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/",
  withCredentials: true,
});

// Store CSRF token in memory (fallback if cookie reading fails due to path restrictions)
let csrfTokenCache: string | null = null;

/*
 * Intercepts responses to capture CSRF token from Set-Cookie header
 * This works even if the cookie has a specific path that prevents document.cookie access
 */
api.interceptors.response.use(
  (response) => {
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
 * Intercepts requests to add CSRF token from cookie or cache
 * Backend requires X-CSRF-Token header for protected routes (those starting with /v1/)
 */
api.interceptors.request.use((config) => {
  // Only add CSRF token for protected routes (starting with /v1/)
  const isProtectedRoute = config.url?.startsWith("/v1/");

  if (!isProtectedRoute) {
    // Public routes like /login and /register don't need CSRF
    return config;
  }

  let csrfToken: string | undefined;

  // First, try to read from document.cookie
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    if (cookie.trim().startsWith("csrf_token=")) {
      csrfToken = cookie.split("=")[1];
      break;
    }
  }

  // Fallback to cached token if cookie reading failed (due to path restrictions)
  if (!csrfToken && csrfTokenCache) {
    csrfToken = csrfTokenCache;
  }

  if (csrfToken) {
    config.headers["X-CSRF-Token"] = csrfToken;
  }
  // Note: CSRF token will be set by backend on first GET request
  // Missing token on first request is expected and will be handled by backend

  return config;
});

export default api;
