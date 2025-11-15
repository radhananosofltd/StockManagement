/**
 * API Endpoints Constants
 * Centralized configuration for all API endpoints used in the Stock Management application
 */

import { environment } from './environment.constants';

// Base API Configuration
export const API_CONFIG = {
  // Default headers
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
} as const;

// Construct full API base URL using environment configuration
export const API_BASE_URL = `${environment.apiBaseUrl}/api`;

// Company API Endpoints
export const COMPANY_ENDPOINTS = {
  // Base company endpoint
  BASE: `${API_BASE_URL}/company`,
  
  // Specific endpoints
  CREATE: `${API_BASE_URL}/company`,
  GET_ALL: `${API_BASE_URL}/company`,
  GET_BY_ID: (id: number) => `${API_BASE_URL}/company/${id}`,
  UPDATE: (id: number) => `${API_BASE_URL}/company/${id}`,
  DELETE: (id: number) => `${API_BASE_URL}/company/${id}`,
  
  // Bulk operations
  BULK_CREATE: `${API_BASE_URL}/company/bulk`,
  BULK_UPDATE: `${API_BASE_URL}/company/bulk`,
  BULK_DELETE: `${API_BASE_URL}/company/bulk`,
  
  // Import/Export operations
  IMPORT: `${API_BASE_URL}/company/import`,
  BULK_IMPORT: `${API_BASE_URL}/company/bulk-import`,
  EXPORT: `${API_BASE_URL}/company/export`,
  
  // Search and filter
  SEARCH: `${API_BASE_URL}/company/search`,
  FILTER: `${API_BASE_URL}/company/filter`
} as const;

// Country API Endpoints
export const COUNTRY_ENDPOINTS = {
  // Base country endpoint
  BASE: `${API_BASE_URL}/country`,

  // Specific endpoints
  GET_ALL: `${API_BASE_URL}/country`,
  GET_BY_ID: (id: number) => `${API_BASE_URL}/country/${id}`,
  CREATE: `${API_BASE_URL}/country`,
  UPDATE: (id: number) => `${API_BASE_URL}/country/${id}`,
  DELETE: (id: number) => `${API_BASE_URL}/country/${id}`,
} as const;

// Branch API Endpoints
export const BRANCH_ENDPOINTS = {
  HEAD_OFFICES: `${API_BASE_URL}/Branch/head-offices`,
  CREATE: `${API_BASE_URL}/Branch`,
  GET_ALL: `${API_BASE_URL}/Branch`,
  BULK_IMPORT: `${API_BASE_URL}/Branch/bulk-import`
} as const;

// Stock API Endpoints
export const STOCK_ENDPOINTS = {
  // Base stock endpoint
  BASE: `${API_BASE_URL}/stocks`,
  
} as const;

// Portfolio API Endpoints
export const PORTFOLIO_ENDPOINTS = {
  // Base portfolio endpoint
  BASE: `${API_BASE_URL}/portfolio`,
  
  // Portfolio management
  CREATE: `${API_BASE_URL}/portfolio`,
  GET_ALL: `${API_BASE_URL}/portfolio`,
  GET_BY_ID: (id: number) => `${API_BASE_URL}/portfolio/${id}`,
  UPDATE: (id: number) => `${API_BASE_URL}/portfolio/${id}`,
  DELETE: (id: number) => `${API_BASE_URL}/portfolio/${id}`,
  
  // Portfolio analytics
  SUMMARY: `${API_BASE_URL}/portfolio/summary`,
  PERFORMANCE: `${API_BASE_URL}/portfolio/performance`,
  ALLOCATION: `${API_BASE_URL}/portfolio/allocation`,
  RISK_ANALYSIS: `${API_BASE_URL}/portfolio/risk-analysis`
} as const;

export const SKU_ENDPOINTS = {
  BASE: `${API_BASE_URL}/sku`,
  GET_ALL: `${API_BASE_URL}/sku`,
  BULK_IMPORT: `${API_BASE_URL}/sku/bulk-import`,
  DEACTIVATE: `${API_BASE_URL}/sku/deactivate`
} as const;
// Reports API Endpoints
export const REPORTS_ENDPOINTS = {
  // Base reports endpoint
  BASE: `${API_BASE_URL}/reports`,
  
  // Report generation
  GENERATE: `${API_BASE_URL}/reports/generate`,
  GET_ALL: `${API_BASE_URL}/reports`,
  GET_BY_ID: (id: number) => `${API_BASE_URL}/reports/${id}`,
  DELETE: (id: number) => `${API_BASE_URL}/reports/${id}`,
  
  // Report types
  DAILY_SUMMARY: `${API_BASE_URL}/reports/daily-summary`,
  MONTHLY_SUMMARY: `${API_BASE_URL}/reports/monthly-summary`,
  QUARTERLY_SUMMARY: `${API_BASE_URL}/reports/quarterly-summary`,
  ANNUAL_SUMMARY: `${API_BASE_URL}/reports/annual-summary`,
  
  // Custom reports
  CUSTOM: `${API_BASE_URL}/reports/custom`,
  
  // Export formats
  EXPORT_PDF: (reportId: number) => `${API_BASE_URL}/reports/${reportId}/export/pdf`,
  EXPORT_EXCEL: (reportId: number) => `${API_BASE_URL}/reports/${reportId}/export/excel`,
  EXPORT_CSV: (reportId: number) => `${API_BASE_URL}/reports/${reportId}/export/csv`
} as const;

// Authentication API Endpoints
export const AUTH_ENDPOINTS = {
  // Base auth endpoint
  BASE: `${API_BASE_URL}/auth`,
  
  // Authentication
  LOGIN: `${API_BASE_URL}/auth/login`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
  SIGNUP: `${API_BASE_URL}/auth/signup`,
  FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
  RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,
  REFRESH_TOKEN: `${API_BASE_URL}/auth/refresh`,
  PROFILE: `${API_BASE_URL}/auth/profile`
} as const;

// User Management API Endpoints
export const USER_ENDPOINTS = {
  // Base user endpoint
  BASE: `${API_BASE_URL}/users`,
  
  // User profile
  PROFILE: `${API_BASE_URL}/users/profile`,
  UPDATE_PROFILE: `${API_BASE_URL}/users/profile`,
  CHANGE_PASSWORD: `${API_BASE_URL}/users/change-password`,
  
  // User preferences
  PREFERENCES: `${API_BASE_URL}/users/preferences`,
  UPDATE_PREFERENCES: `${API_BASE_URL}/users/preferences`
} as const;

// Dashboard API Endpoints
export const DASHBOARD_ENDPOINTS = {
  // Base dashboard endpoint
  BASE: `${API_BASE_URL}/dashboard`,
  
  // Dashboard data
  SUMMARY: `${API_BASE_URL}/dashboard/summary`,
  STATISTICS: `${API_BASE_URL}/dashboard/statistics`,
  RECENT_ACTIVITIES: `${API_BASE_URL}/dashboard/recent-activities`,
  ALERTS: `${API_BASE_URL}/dashboard/alerts`,
  
  // Widgets
  WIDGETS: `${API_BASE_URL}/dashboard/widgets`,
  WIDGET_DATA: (widgetId: string) => `${API_BASE_URL}/dashboard/widgets/${widgetId}/data`
} as const;

// Category API Endpoints
export const CATEGORY_ENDPOINTS = {
  BASE: `${API_BASE_URL}/category`,
  SAVE: `${API_BASE_URL}/category`,
  GET_ALL: `${API_BASE_URL}/category/GetAllCategories`
} as const;

// Specification API Endpoints
export const SPECIFICATION_ENDPOINTS = {
  BASE: `${API_BASE_URL}/specification`,
  GET_ALL: `${API_BASE_URL}/specification`
} as const;

// Utility function to build query parameters
export const buildQueryParams = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      if (Array.isArray(value)) {
        value.forEach(item => searchParams.append(key, item.toString()));
      } else {
        searchParams.append(key, value.toString());
      }
    }
  });
  
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
};

// Utility function to build full URL with query parameters
export const buildApiUrl = (endpoint: string, params?: Record<string, any>): string => {
  return params ? `${endpoint}${buildQueryParams(params)}` : endpoint;
};

// Export all endpoints as a single object for easy access
export const API_ENDPOINTS = {
  AUTH: AUTH_ENDPOINTS,
  COMPANY: COMPANY_ENDPOINTS,
  STOCK: STOCK_ENDPOINTS,
  PORTFOLIO: PORTFOLIO_ENDPOINTS,
  REPORTS: REPORTS_ENDPOINTS,
  USER: USER_ENDPOINTS,
  DASHBOARD: DASHBOARD_ENDPOINTS,
  CATEGORY: CATEGORY_ENDPOINTS,
  SPECIFICATION: SPECIFICATION_ENDPOINTS
} as const;

// Type definitions for better TypeScript support
export type ApiEndpoint = typeof API_ENDPOINTS;
export type AuthEndpoint = typeof AUTH_ENDPOINTS;
export type CompanyEndpoint = typeof COMPANY_ENDPOINTS;
export type StockEndpoint = typeof STOCK_ENDPOINTS;
export type PortfolioEndpoint = typeof PORTFOLIO_ENDPOINTS;
export type ReportsEndpoint = typeof REPORTS_ENDPOINTS;
export type UserEndpoint = typeof USER_ENDPOINTS;
export type DashboardEndpoint = typeof DASHBOARD_ENDPOINTS;
export type CategoryEndpoint = typeof CATEGORY_ENDPOINTS;
export type SpecificationEndpoint = typeof SPECIFICATION_ENDPOINTS;