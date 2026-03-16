# Analogix Frontend App

Step-by-step guide to prepare this React frontend for authentication with your backend:

- Backend repo: https://github.com/Shatrox/Analogix_Backend_App
- Auth routes:
	- `POST /api/Authentication/Register`
	- `POST /api/Authentication/Login`

## 1. Install dependencies

Run:

```bash
npm.cmd install
npm.cmd install react-router-dom axios
```

Optional:

```bash
npm.cmd install zod
```

## 2. Configure API environment

Create `.env` in the project root:

```env
VITE_API_BASE_URL=https://localhost:7073/api
```

Use the exact URL/port of your backend.

## 3. Create frontend structure

Inside `src`, create:

```text
src/
	api/
		httpClient.js
		authApi.js
	pages/
		LoginPage.jsx
		RegisterPage.jsx
	components/
		AuthForm.jsx
	context/
		AuthContext.jsx
	routes/
		AppRouter.jsx
```

## 4. Create HTTP client

In `src/api/httpClient.js`:

- Create one Axios instance.
- Set base URL to `import.meta.env.VITE_API_BASE_URL`.
- Add JSON headers.
- Add request interceptor to attach token from `localStorage` as `Authorization: Bearer <token>`.

## 5. Create auth API helpers

In `src/api/authApi.js`:

1. `register(payload)`
2. `login(payload)`

Payloads should match backend DTO:

- Register body:

```json
{
	"username": "string (3-50)",
	"email": "valid email",
	"password": "min 8, upper/lower/number/special"
}
```

- Login body:

```json
{
	"email": "string",
	"password": "string"
}
```

Login response:

```json
{
	"message": "Login successful.",
	"token": "jwt..."
}
```

## 6. Build Register page

In `src/pages/RegisterPage.jsx`:

- Fields: `username`, `email`, `password`, `confirmPassword`
- Client validation:
	- username 3-50 chars
	- valid email
	- password rule compatible with backend
	- password and confirmPassword match
- On submit:
	- call `register()`
	- show success state
	- redirect to `/login`
- Show backend errors (duplicate email, invalid data, etc.).

## 7. Build Login page

In `src/pages/LoginPage.jsx`:

- Fields: `email`, `password`
- On submit:
	- call `login()`
	- save token in `localStorage` (example key: `auth_token`)
	- redirect to protected page (`/`)
- Show invalid credentials errors clearly.

## 8. Add auth context

In `src/context/AuthContext.jsx`:

- Store `token`, `isAuthenticated`
- Expose `login`, `logout`
- On app start, initialize from `localStorage`
- `logout` removes token from storage

Wrap app in provider from `src/main.jsx`.

## 9. Configure routes

In `src/routes/AppRouter.jsx`:

- `/register` -> Register page
- `/login` -> Login page
- `/` -> Protected/home page

Optional: add `ProtectedRoute` component to redirect unauthenticated users to `/login`.

## 10. Replace starter app

Update `src/App.jsx` to render your router instead of the default Vite starter screen.

## 11. Backend checks

Confirm backend is ready for frontend auth calls:

1. CORS allows `http://localhost:5173`
2. `app.UseAuthentication();` is configured before `app.UseAuthorization();`
3. Auth endpoints are testable in OpenAPI/Scalar

## 12. Test checklist

1. Run backend
2. Run frontend: `npm.cmd run dev`
3. Register new user
4. Login with same user
5. Verify token is in browser storage
6. Refresh page and confirm auth state stays
7. Logout and verify protected routes block access

## 13. Common issues

- `Network Error`: wrong `.env` URL or certificate trust issue
- `404`: wrong path/casing (`/api/Authentication/Register`, `/api/Authentication/Login`)
- `401`: token not sent in `Authorization` header
- CORS browser error: API origin not allowed

## 14. Next steps after auth

1. Add profile/me endpoint consumption
2. Add role-based guards (`User`, `Admin`)
3. Add persistent session checks on page refresh
4. Move to secure cookie auth later if backend supports it

---

If you want, I can now generate all required auth files and wire everything so you can run Register/Login immediately.
