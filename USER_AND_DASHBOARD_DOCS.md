# 📄 System Overview: User Logic, Authentication, and Dashboards

## 1. Who is the User? (User Context & Schema)

### User Object Shape

The user object is defined in `AuthContext.jsx` and is currently a static mock:

```json
{
  "name": "John Dela Cruz",
  "role": "Administrator"
}
```

The `user` state is initialized once and never updated (no setter is exposed). It is consumed via `useAuth()` in any component that needs the current user's name or role label.

### User Types / Roles

The system supports **8 distinct roles**, defined in two places:

| Role Key         | Display Label              | Icon     | Description                                  |
|------------------|----------------------------|----------|----------------------------------------------|
| `admin`          | Administrator              | Shield   | Full system access                           |
| `fisherman`      | Fisherman                  | Ship     | Fishing activity and buoy data               |
| `lgu`            | LGU Environmental Officer  | Building2| Local government environmental monitoring      |
| `bfar`           | BFAR Officer               | Fish     | Bureau of Fisheries and Aquatic Resources    |
| `research`       | Researcher                 | Microscope| Marine research and data analysis            |
| `community`      | Community Member           | Users    | Community-based monitoring                   |
| `beach`          | Beach Monitor              | Sun      | Beach water quality monitoring               |
| `coral_reef`     | Coral Reef Monitor         | Coral    | Coral reef ecosystem monitoring              |

Roles are defined in `src/context/RoleContext.jsx` (lines 12–21) and are also listed in the Login page (`src/pages/Login.jsx`, lines 48–55). Note: the Login page lists `sanctuary` as a role key but it is **not** present in `RoleContext.jsx`'s `roles` object, `permissions`, or `dashboardWidgets` — it is a legacy/unmapped role.

### How User Data Is Passed Around

- **`AuthContext`** (`src/context/AuthContext.jsx`): Provides `{ user }` via `useAuth()`. The user object is static/mock.
- **`RoleContext`** (`src/context/RoleContext.jsx`): Provides `{ currentRole, switchRole, hasPermission, getDashboardWidgets, getRoleLabel, getRoleIcon }` via `useRole()`. The `currentRole` is a string key (e.g., `"admin"`, `"fisherman"`) initialized to `"admin"` by default.
- **`ThemeContext`** (`src/context/ThemeContext.jsx`): Provides `{ darkMode, toggleTheme }` for UI theme only — no user data.

All three contexts are mounted in `src/main.jsx` as nested providers:

```jsx
<BrowserRouter>
  <AuthProvider>
    <RoleProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </RoleProvider>
  </AuthProvider>
</BrowserRouter>
```

---

## 2. Authentication & Session Flow

### Login Flow

1. User navigates to `/login` (rendered by `src/App.jsx` line 41).
2. The Login page (`src/pages/Login.jsx`) presents a form with email, password, role selector, and remember-me checkbox.
3. On submit, `handleLogin` (line 94) calls `supabase.auth.signInWithPassword({ email, password })` using the Supabase client (`src/lib/supabaseClient.js`).
4. If authentication succeeds, `switchRole(selectedRole)` is called to set the role in `RoleContext`, and the user is navigated to `/admin/dashboard` (if admin) or `/dashboard` (all other roles).
5. If authentication fails, an error message is displayed via `react-hot-toast`.

### Authentication Check

- **There is no `is_authenticated` flag or token verification** in the current codebase. The `ProtectedRoute` component (`src/App.jsx`, lines 26–28) is a **no-op** — it simply renders its children without any auth check:

  ```jsx
  function ProtectedRoute({ children }) {
    return children;
  }
  ```

- The Supabase session is used for login validation only. There is no session persistence check, no token refresh, and no redirect-to-login logic for unauthenticated users.

### Protected Routes

All routes under `/*` are wrapped in `<ProtectedRoute>` (line 44–81 of `src/App.jsx`), but since `ProtectedRoute` does nothing, **all routes are effectively accessible without authentication**.

### User Data Isolation

There is **no user data isolation** in the current codebase. The `user` object is static (always "John Dela Cruz"), and all dashboards use the same `buoyData` from `src/api/sampleData.js`. There is no per-user data filtering, no row-level security, and no user-specific API calls.

### Logout

There is no logout implementation. The Sidebar's "Sign Out" button (`src/components/layout/Sidebar.jsx`, line 263) has an empty click handler (`/* handle sign out */`).

---

## 3. Dashboard Breakdown

There are **8 distinct dashboards**, one per role. Each is rendered by `DashboardPage` (`src/pages/DashboardPage.jsx`) based on the `currentRole` from `RoleContext`.

### Unified Dashboard Route

| Route          | Component                   | Role Key      |
|----------------|-----------------------------|---------------|
| `/dashboard`   | `DashboardPage`             | role-aware    |
| `/admin/dashboard` | Redirects to `/dashboard` | —             |

`DashboardPage` maps `currentRole` to a dashboard component via `dashboardMap` (`src/pages/DashboardPage.jsx`, lines 13–22):

```js
const dashboardMap = {
  admin: AdminDashboard,
  fisherman: FishermanDashboard,
  lgu: LGUDashboard,
  bfar: BfarDashboard,
  research: ResearchDashboard,
  community: CommunityDashboard,
  beach: BeachMonitoringDashboard,
  coral_reef: CoralReefDashboard,
};
```

### Individual Dashboards

#### 1. Admin Dashboard
- **Route**: `/dashboard` (when `currentRole === "admin"`)
- **Component**: `src/components/dashboards/AdminDashboard.jsx`
- **Access**: Role `admin` (all permissions)
- **Purpose**: Full system overview with all widget types — metrics, charts, maps, AI suggestions, alerts, maintenance, community feed, and all data views.
- **Widgets**: 14 widgets including `weather`, `buoyStatus`, `metrics`, `sensorChart`, `alertFeed`, `maintenanceTracker`, `aiSuggestion`, `map`, `forecastChart`, `waterQuality`, `fishActivity`, `riskAssessment`, `communityFeed`.

#### 2. Fisherman Dashboard
- **Route**: `/dashboard` (when `currentRole === "fisherman"`)
- **Component**: `src/components/dashboards/FishermanDashboard.jsx`
- **Access**: Role `fisherman`
- **Purpose**: Fishing activity, fish probability, sonar data, fishing zones, and weather for fishermen.
- **Widgets**: `weather`, `buoyStatus`, `metrics`, `sensorChart`, `alertFeed`, `aiSuggestion`, `map`, `forecastChart`, `fishActivity`, `riskAssessment`.

#### 3. LGU Dashboard
- **Route**: `/dashboard` (when `currentRole === "lgu"`)
- **Component**: `src/components/dashboards/LGUDashboard.jsx`
- **Access**: Role `lgu`
- **Purpose**: Local government environmental monitoring — water quality, pollution alerts, marine health, reports, and multi-buoy comparison.
- **Widgets**: `weather`, `buoyStatus`, `metrics`, `sensorChart`, `alertFeed`, `aiSuggestion`, `map`, `forecastChart`, `waterQuality`, `riskAssessment`, `communityFeed`.

#### 4. BFAR Dashboard
- **Route**: `/dashboard` (when `currentRole === "bfar"`)
- **Component**: `src/components/dashboards/BfarDashboard.jsx`
- **Access**: Role `bfar`
- **Purpose**: Bureau of Fisheries and Aquatic Resources — fish population trends, fishing zones, habitat scores, fisheries analysis, and sonar analytics.
- **Widgets**: `weather`, `buoyStatus`, `metrics`, `sensorChart`, `alertFeed`, `aiSuggestion`, `map`, `forecastChart`, `fishActivity`, `waterQuality`, `riskAssessment`.

#### 5. Research Dashboard
- **Route**: `/dashboard` (when `currentRole === "research"`)
- **Component**: `src/components/dashboards/ResearchDashboard.jsx`
- **Access**: Role `research`
- **Purpose**: Marine research — raw sensor data, historical graphs, CSV/PDF export, AI analysis, water quality index, marine health, and multi-buoy analytics.
- **Widgets**: `weather`, `buoyStatus`, `metrics`, `sensorChart`, `alertFeed`, `aiSuggestion`, `map`, `forecastChart`, `waterQuality`, `fishActivity`, `riskAssessment`, `history`.

#### 6. Community Dashboard
- **Route**: `/dashboard` (when `currentRole === "community"`)
- **Component**: `src/components/dashboards/CommunityDashboard.jsx`
- **Access**: Role `community`
- **Purpose**: Community-based monitoring — weather, water quality, beach safety, marine news, public advisories, and community feed.
- **Widgets**: `weather`, `buoyStatus`, `metrics`, `alertFeed`, `aiSuggestion`, `map`, `forecastChart`, `communityFeed`.

#### 7. Beach Monitoring Dashboard
- **Route**: `/dashboard` (when `currentRole === "beach"`)
- **Component**: `src/components/dashboards/BeachMonitoringDashboard.jsx`
- **Access**: Role `beach`
- **Purpose**: Beach water quality monitoring — swimming safety, UV index, trash density, pollution alerts, AI beach assessment, tide information, and beach map.
- **Widgets**: `weather`, `buoyStatus`, `metrics`, `alertFeed`, `aiSuggestion`, `map`, `forecastChart`, `waterQuality`.

#### 8. Coral Reef Dashboard
- **Route**: `/dashboard` (when `currentRole === "coral_reef"`)
- **Component**: `src/components/dashboards/CoralReefDashboard.jsx`
- **Access**: Role `coral_reef`
- **Purpose**: Coral reef ecosystem monitoring — marine health, coral health index, water quality, dissolved oxygen, pH, salinity, pollution risk, turbidity, AI coral assessment, historical trends, and reef monitoring map.
- **Widgets**: `weather`, `buoyStatus`, `metrics`, `alertFeed`, `aiSuggestion`, `map`, `forecastChart`, `waterQuality`, `riskAssessment`.

### Additional Pages (Non-Dashboard)

| Route              | Page Component            | Purpose                              |
|--------------------|---------------------------|--------------------------------------|
| `/`                | `LandingPage`             | Marketing/landing page               |
| `/login`           | `Login`                   | Authentication form                  |
| `/ai`              | `AICommandCenter`         | AI command center page               |
| `/fish`            | `FishActivity`            | Fish activity page                   |
| `/sanctuary`       | `Sanctuary`               | Sanctuary monitoring page            |
| `/monitoring`      | `LiveMonitoring`          | Live monitoring page                 |
| `/map`             | `InteractiveMap`          | Interactive map page                 |
| `/buoys`           | `BuoyManagement`          | Buoy management page                 |
| `/alerts`          | `Alerts`                  | Alerts page                          |
| `/reports`         | `Reports`                 | Reports page                         |
| `/maintenance`     | `Maintenance`             | Maintenance page                     |
| `/history`         | `History`                 | Historical data page                 |
| `/settings`        | `Settings`                | User settings page                   |
| `/profile`         | `Profile`                 | User profile page                    |
| `/weather`         | `WeatherPage` (placeholder)| Weather monitoring page              |
| `/community`       | `CommunityPage` (placeholder)| Community feed page                |
| `/beach`           | `BeachPage` (placeholder)  | Beach monitor page                   |
| `/coral`           | `CoralPage` (placeholder)  | Coral reef monitor page              |

---

## 4. Feature Gating & Usage Limits

### Permission System

Permissions are defined in `src/context/RoleContext.jsx` (lines 23–50) as a flat mapping of role → array of allowed route paths (without leading `/`). The `hasPermission(page)` function (line 72) normalizes the page path and checks if it's in the current role's permission list.

This is used in the Sidebar (`src/components/layout/Sidebar.jsx`, line 147) to filter navigation items per role, and in the `roleSpecificNav` configuration (lines 74–131) to show role-specific nav sections.

### Plan Tiers / Usage Limits

**There are no plan tiers, usage limits, or free vs. pro distinctions** in the current codebase. The system has no concept of subscriptions, credits, or rate limits. All roles have equal access to all widgets within their permission set.

### Unauthenticated Access

Since `ProtectedRoute` is a no-op (line 26–28 of `src/App.jsx`), **unauthenticated users can access all protected routes** including `/dashboard`, `/ai`, `/fish`, etc. There is no redirect to `/login` and no authentication gate.

### Unauthorized Dashboard Access

If a user with a non-admin role navigates to `/admin/dashboard`, they are redirected to `/dashboard` (line 54 of `src/App.jsx`). However, the `/dashboard` route renders `DashboardPage` which shows the dashboard corresponding to `currentRole` — so users always see their own role's dashboard, not another role's.

The Sidebar menu items are filtered by `hasPermission()` (Sidebar.jsx line 147), so users only see nav items for routes they have permission to access.

### Widget-Level Gating

Widgets are gated by role via `getDashboardWidgets()` in `RoleContext.jsx` (line 77). Each role has a predefined list of widget keys. The `WidgetRegistry` (`src/components/widgets/system/WidgetRegistry.jsx`) and `WidgetGrid` (`src/components/widgets/system/WidgetGrid.jsx`) use this to render only the widgets permitted for the current role.

### AI Feature Gating

The `useAI` hook (`src/hooks/useAI.js`) and `useRoleAI` hook process sensor data and return role-specific AI outputs. Each role gets a filtered subset of AI results (e.g., `fisherman` gets fish probability and habitat score; `coral_reef` gets marine health index and coral-specific recommendations). The `aiService.js` (`src/lib/aiService.js`) computes all AI outputs centrally and each role's dashboard selects only its relevant outputs.
