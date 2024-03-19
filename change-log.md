## Changelog

### Version 1.0.0

**updated at 3/19/2024**

#

**Features:**

- **Error Handling:**
  - Implemented form validation with zod.
  - Created custom error pages for 404 (Not Found) and 401 (Unauthorized) with redirection logic.
- **Internationalization (i18n):**
  - Added support for English (EN) and Spanish (ES) languages.
- **Authentication Module:**
  - Developed a login form with user authentication.
  - Implemented session management using secure cookies with JSON Web Tokens (JWT).
  - Created an Auth Layout component.
  - Integrated Google reCAPTCHA V3 for enhanced security.
  - Added Two-Factor Authentication (2FA) using email strategy.
  - Implemented logout functionality.
  - Defined protected routes with access guards.
- **Cover Module:**
  - Designed a dedicated cover page.
- **Dashboard Module:**
  - Built a comprehensive dashboard layout with sidebar, offcanvas for mobile devices, and main panel sections.

**Other Improvements:**

- Implemented a loading page with suspense for improved user experience.
