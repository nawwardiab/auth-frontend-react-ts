# Auth-Frontend (React + TypeScript)

Frontend client for the **Auth-Service Backend API**. Provides a simple UI for user **registration, login, and home navigation**, integrated with backend authentication and address management endpoints. Built with **React, TypeScript, Vite, React Router, Axios, Tailwind, and shadcn/ui**.

---

## Features

* **Authentication**

  * Register new users
  * Login with credentials → handled via backend-issued HttpOnly JWT cookie
  * Logout (API call clears JWT cookie)
* **Protected Home Page** (visible to logged-in users)

  * Navigation links: Logout, Products, Account, Cart
* **Forms**

  * Built with `react-hook-form` + `zod` validation
* **Networking**

  * API requests with `axios` (configured in `src/utils/axiosConfig.ts`)
* **Routing**

  * `react-router-dom` for pages & navigation
* **UI/Styling**

  * TailwindCSS + shadcn/ui + lucide-react icons
* **Internationalization**

  * `i18next` + `react-i18next` setup for translations
* **Charts & Dates** (future extension)

  * `chart.js` + `react-chartjs-2`
  * `date-fns`

---

## Project Structure

```
.
├── eslint.config.js              # ESLint configuration
├── index.html                    # Root HTML template
├── LICENSE                       # License file
├── notes.md                      # Project notes
├── package.json / package-lock.json
├── src
│   ├── api
│   │   └── authApi.ts            # API calls for auth endpoints
│   ├── App.tsx                   # Root app component
│   ├── index.css                 # Global styles
│   ├── main.tsx                  # React entry point
│   ├── pages
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx
│   │   └── RegisterPage.tsx
│   ├── routes
│   │   └── AppRouter.tsx         # Route definitions
│   ├── utils
│   │   └── axiosConfig.ts        # Axios instance with baseURL & cookies
│   └── vite-env.d.ts             # Vite/TypeScript types
├── tsconfig*.json                # TypeScript configs
└── vite.config.ts                # Vite configuration
```

---

## Requirements

* Node.js 20+
* npm 9+

---

## Setup

### 1. Clone repo

```bash
git clone https://github.com/nawwardiab/auth-frontend-react-ts.git
cd auth-frontend-react-ts
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure API base URL

Update `src/utils/axiosConfig.ts` if backend is not running on default:

```ts
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api",
  withCredentials: true, // important for HttpOnly JWT cookies
});
```

Create `.env` file if needed:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

### 4. Run development server

```bash
npm run dev
```

Frontend available at: `http://localhost:5173`

### 5. Build for production

```bash
npm run build
```

Output in `/dist`.

### 6. Preview production build

```bash
npm run preview
```

---

## Available Scripts

* `npm run dev` → Start dev server
* `npm run build` → Build production bundle
* `npm run preview` → Preview production build
* `npm run lint` → Run ESLint checks

---

## API Integration

This frontend integrates with the **Auth-Service Backend API**:

* **Register** → `POST /register`
* **Login** → `POST /login` (sets HttpOnly JWT cookie)
* **Logout** → `POST /api/v1/logout` (clears cookie)
* **Addresses** → `POST/GET/PATCH/DELETE /api/v1/users/address/...`

Authentication state relies on:

* **HttpOnly JWT cookie** (set by backend on login)
* **CSRF token** for protected requests

Frontend does not store tokens in `localStorage`/`sessionStorage` for security.

---

## Deployment

### Local only (default)

Use Vite dev/preview as above.

### With Docker (optional)

Add a `Dockerfile` for consistent frontend deployment, or serve `/dist` with Nginx:

```bash
npm run build
npx serve -s dist
```

Recommended for staging/production when backend is also containerized.

---

## Dependencies

Key runtime dependencies:

* `react`, `react-dom`
* `react-router-dom`
* `axios`
* `react-hook-form`, `zod`
* `tailwindcss`, `@shadcn/ui`, `lucide-react`
* `i18next`, `react-i18next`
* `chart.js`, `react-chartjs-2`
* `date-fns`

Dev dependencies include `typescript`, `vite`, `eslint`, `prettier`, `vitest`, `husky`, `lint-staged`.

---

## License

MIT License. See [LICENSE](./LICENSE)
