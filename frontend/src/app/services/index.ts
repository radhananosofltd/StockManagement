/**
 * Barrel exports for services
 * This file provides a single import point for all services used in the application
 */

// HTTP Service
export * from './http.service';

// Company Service
export * from './company.service';

// Authentication Service
export * from './auth.service';

// Authentication Guard
export * from './auth.guard';

// Authentication Interceptor
export * from './auth.interceptor';

// Re-export commonly used types
export type {
  Company,
  CompanyApiResponse,
  CompanyListResponse,
  CompanySearchParams
} from './company.service';

export type {
  ApiResponse
} from './http.service';

export type {
  User,
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse
} from './auth.service';