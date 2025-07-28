what will I need on Frontend?

first a generic home page, that is accessible by logged users.
renders links to logout, products, account, cart

what do I need for that?

in Main I wire the app, wrap it with browser routes, and context providors.

in app
I return the routes.

in the routes, I need all pages and paths rendered.

---

pages I need:
register
login
homepage.

register has a form that submits to the server/api
waits for response, if all good, redirects to login page

login page, renders a form, on submit it sends a post request to my backend through api, waits for response, if all good it redirects to home.

homepage, has 3 links.

what dependencies do I need?

**Runtime dep**

```bash
npm install react react-dom react-router-dom \
  tailwindcss postcss autoprefixer \
  @shadcn/ui lucide-react \
  axios \
  react-hook-form zod \
  chart.js react-chartjs-2 \
  date-fns \
  react-i18next i18next \
  dotenv
```

**Dev Dep**

```bash
npm install -D typescript @types/react @types/react-dom \
  vite @vitejs/plugin-react-swc \
  eslint prettier eslint-config-prettier \
  eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh \
  @typescript-eslint/parser @typescript-eslint/eslint-plugin \
  vitest @testing-library/react @testing-library/jest-dom jsdom \
  husky lint-staged
```
