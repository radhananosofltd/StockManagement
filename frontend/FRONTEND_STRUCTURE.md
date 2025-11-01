# Frontend Project Structure

This document outlines the organized structure of the Angular frontend application following Angular best practices.

## Project Structure Overview

```
frontend/src/app/
├── features/                    # Feature modules (organized by business domain)
│   ├── auth/                   # Authentication feature
│   │   ├── components/         # Auth-specific components
│   │   │   └── login/         # Login component folder
│   │   │       ├── login.component.ts
│   │   │       ├── login.component.html
│   │   │       └── login.component.css
│   │   └── index.ts           # Feature exports
│   ├── dashboard/             # Dashboard feature
│   │   ├── components/        # Dashboard-specific components
│   │   │   └── dashboard/     # Dashboard component folder
│   │   │       ├── dashboard.component.ts
│   │   │       ├── dashboard.component.html
│   │   │       └── dashboard.component.css
│   │   ├── services/          # Dashboard-specific services (if any)
│   │   └── index.ts          # Feature exports
│   └── company/              # Company management feature
│       ├── components/       # Company-specific components
│       │   └── company-page/ # Company page component folder
│       │       ├── company-page.component.ts
│       │       ├── company-page.component.html
│       │       └── company-page.component.css
│       └── index.ts         # Feature exports
├── pages/                    # Application pages (route components)
│   ├── home/                # Home page
│   │   └── home-page/       # Home page component folder
│   │       ├── home-page.component.ts
│   │       ├── home-page.component.html
│   │       └── home-page.component.css
│   └── index.ts            # Pages exports
├── shared/                  # Shared components, services, etc.
│   ├── components/         # Shared/reusable components
│   │   └── sidebar/        # Sidebar component folder
│   │       ├── sidebar.component.ts
│   │       ├── sidebar.component.html
│   │       └── sidebar.component.css
│   └── index.ts           # Shared exports
├── services/               # Application-wide services
│   ├── auth.service.ts    # Authentication service
│   ├── auth.guard.ts      # Route guards
│   ├── auth.interceptor.ts # HTTP interceptors
│   ├── company.service.ts # Company service
│   └── http.service.ts    # HTTP utility service
├── constants/             # Application constants
│   ├── api-endpoints.constants.ts
│   ├── environment.constants.ts
│   └── index.ts
├── configurations/        # App configurations
└── app.routes.ts         # Application routes
```

## Architecture Principles

### 1. Feature-Based Organization
- Each business domain has its own feature folder
- Features contain their specific components, services, and logic
- Features are self-contained and can be easily moved or removed

### 2. Shared Resources
- Common components go in `/shared/components/`
- Application-wide services go in `/services/`
- Constants and configurations have dedicated folders

### 3. Pages vs Components
- `/pages/` contains route-level components (entire pages)
- `/features/*/components/` contains feature-specific components
- `/shared/components/` contains reusable components

### 4. Component File Organization
- Each component has its own folder with three files:
  - `[component-name].component.ts` - TypeScript logic
  - `[component-name].component.html` - Template
  - `[component-name].component.css` - Styles
- This follows Angular CLI's default component generation pattern

### 5. Service Organization
- Authentication-related services: `/services/auth.*`
- Feature-specific services: `/features/[feature]/services/`
- Shared utilities: `/services/`

## Import Strategy

Each feature folder has an `index.ts` file that exports public APIs:

```typescript
// Instead of:
import { LoginComponent } from './features/auth/components/login/login.component';

// Use:
import { LoginComponent } from './features/auth';
```

## Benefits of This Structure

1. **Scalability**: Easy to add new features without cluttering the root
2. **Maintainability**: Related code is grouped together
3. **Reusability**: Shared components are clearly separated
4. **Team Collaboration**: Different teams can work on different features
5. **Lazy Loading**: Features can be easily converted to lazy-loaded modules

## Migration Notes

The following components were reorganized with proper folder structure:

- `login.component.ts` → `/features/auth/components/login/` (with .html and .css files)
- `dashboard.component.ts` → `/features/dashboard/components/dashboard/` (with .html and .css files)
- `home-page.component.ts` → `/pages/home/home-page/` (with .html and .css files)
- `company-page.component.ts` → `/features/company/components/company-page/` (with .html and .css files)
- `sidebar.component.ts` → `/shared/components/sidebar/` (with .html and .css files)

Each component now follows the Angular CLI convention:
- Separate TypeScript, HTML, and CSS files
- Individual folder for each component
- Clean import paths using index.ts files

All import statements have been updated to reflect the new structure.