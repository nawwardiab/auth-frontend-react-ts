# Auth-Frontend (React + TypeScript)

## Live Demo
🌐 **Frontend App**: https://auth-frontend-react-ts.vercel.app
🚀 **Backend API**: https://auth-service-backend-go-production.up.railway.app

Modern React frontend for the Auth-Service Backend API with production deployment on Vercel.

---

## Features

- **User Registration & Login** - Complete authentication flow with form validation
- **JWT Authentication** - Secure token-based auth via HTTP-only cookies
- **CSRF Handling** - Automatic CSRF token management for protected requests
- **Address Management CRUD** - Full create, read, update, delete operations for user addresses
- **Responsive Design** - Mobile-first UI built with TailwindCSS and shadcn/ui
- **Protected Routes** - React Router guards for authenticated pages
- **Form Validation** - Client-side validation using react-hook-form + zod
- **Axios Interceptors** - Automatic error handling and request/response transformation

---

## Tech Stack

- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool and dev server
- **Axios** - HTTP client with interceptors for auth and CSRF
- **React Router v6** - Client-side routing with protected routes
- **TailwindCSS + shadcn/ui** - Modern component library and styling
- **react-hook-form + zod** - Form management with schema validation
- **Vercel** - Cloud platform for frontend deployment

---

## Security

- **HTTP-Only Cookies** - JWT tokens stored securely, inaccessible to JavaScript
- **CSRF Token Validation** - Automatic token extraction and header injection for protected requests
- **Secure Cross-Site Cookies** - SameSite=None with Secure flag for production
- **No Token Storage** - No JWT tokens in localStorage or sessionStorage
- **Axios Interceptors** - Centralized auth error handling with automatic logout on 401

---

## Project Structure

```
src/
├── api/
│   └── authApi.ts            # API calls for auth endpoints
├── pages/
│   ├── HomePage.tsx          # Protected home page
│   ├── LoginPage.tsx         # Login form
│   └── RegisterPage.tsx      # Registration form
├── routes/
│   └── AppRouter.tsx         # Route definitions with protection
├── utils/
│   └── axiosConfig.ts        # Axios instance with baseURL & interceptors
├── App.tsx                   # Root app component
├── main.tsx                  # React entry point
└── index.css                 # Global styles
```

---

## Deployment

**Platform**: Vercel
**Deployment Date**: December 15, 2025
**Features**:
- Automatic HTTPS via Vercel edge network
- Auto-deploy on git push to main branch
- Environment variables configured via Vercel dashboard
- `VITE_API_BASE_URL` points to Railway backend
- Zero-config deployment with Vite

**Production URL**: https://auth-frontend-react-ts.vercel.app

---

## Local Development

All commands assume you are in the `frontend/` directory.

### Requirements

- Node.js 20+
- npm 9+

### Setup

#### 1. Clone repo

```bash
git clone https://github.com/nawwardiab/auth-frontend-react-ts.git
cd auth-frontend-react-ts
```

#### 2. Install dependencies

```bash
npm install
```

#### 3. Configure API base URL

Create `.env` file:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

For production, update to point to your deployed backend:

```env
VITE_API_BASE_URL=https://auth-service-backend-go-production.up.railway.app/api
```

The axios instance in `src/utils/axiosConfig.ts` uses this environment variable:

```ts
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api",
  withCredentials: true, // important for HttpOnly JWT cookies
});
```

#### 4. Run development server

```bash
npm run dev
```

Frontend available at: `http://localhost:5173`

#### 5. Build for production

```bash
npm run build
```

Output in `/dist`.

#### 6. Preview production build

```bash
npm run preview
```

---

## Available Scripts

- `npm run dev` - Start dev server with hot reload
- `npm run build` - Build production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint checks

---

## API Integration

This frontend integrates with the **Auth-Service Backend API**:

### Public Endpoints
- **Register** - `POST /api/register` (creates new user)
- **Login** - `POST /api/login` (sets HttpOnly JWT cookie)

### Protected Endpoints (require JWT + CSRF token)
- **Logout** - `POST /api/v1/logout` (clears cookie)
- **Profile** - `GET /api/v1/profile` (gets current user)
- **Addresses** - `POST/GET/PATCH/DELETE /api/v1/users/address/...`

### Authentication Flow

1. User logs in → Backend sets HTTP-only JWT cookie
2. Frontend makes protected request → Axios automatically includes cookie
3. Backend validates JWT + CSRF token → Returns response
4. On 401 error → Axios interceptor redirects to login

Frontend does not store tokens in `localStorage`/`sessionStorage` for security.

---

## Dependencies

Key runtime dependencies:

- `react`, `react-dom` - React framework
- `react-router-dom` - Client-side routing
- `axios` - HTTP client with interceptors
- `react-hook-form`, `zod` - Form handling and validation
- `tailwindcss`, `@shadcn/ui` - Styling and UI components
- `lucide-react` - Icon library
- `i18next`, `react-i18next` - Internationalization (future-ready)
- `chart.js`, `react-chartjs-2` - Charts (future extension)
- `date-fns` - Date formatting

Dev dependencies include `typescript`, `vite`, `eslint`, `prettier`, `vitest`, `husky`, `lint-staged`.

---

## License

MIT License. See [LICENSE](./LICENSE)

---

**Built by Nawar Diab** | [GitHub](https://github.com/nawwardiab) | [LinkedIn](https://www.linkedin.com/in/nawar-diab)
