/**
 * Environment Configuration
 * Manages environment-specific settings for the Stock Management application
 */

export interface EnvironmentConfig {
  production: boolean;
  apiBaseUrl: string;
  apiVersion: string;
  apiTimeout: number;
  enableLogging: boolean;
  enableMockData: boolean;
  features: {
    realTimeUpdates: boolean;
    advancedAnalytics: boolean;
    bulkOperations: boolean;
    exportFeatures: boolean;
  };
}

// Development Environment
export const developmentConfig: EnvironmentConfig = {
  production: false,
  apiBaseUrl: 'http://localhost:5134',
  apiVersion: 'v1',
  apiTimeout: 30000,
  enableLogging: true,
  enableMockData: true,
  features: {
    realTimeUpdates: false,
    advancedAnalytics: true,
    bulkOperations: true,
    exportFeatures: true
  }
};

// Staging Environment
export const stagingConfig: EnvironmentConfig = {
  production: false,
  apiBaseUrl: 'https://api-staging.example.com',
  apiVersion: 'v1',
  apiTimeout: 30000,
  enableLogging: true,
  enableMockData: false,
  features: {
    realTimeUpdates: true,
    advancedAnalytics: true,
    bulkOperations: true,
    exportFeatures: true
  }
};

// Production Environment
export const productionConfig: EnvironmentConfig = {
  production: true,
  apiBaseUrl: 'https://api.example.com',
  apiVersion: 'v1',
  apiTimeout: 30000,
  enableLogging: false,
  enableMockData: false,
  features: {
    realTimeUpdates: true,
    advancedAnalytics: true,
    bulkOperations: true,
    exportFeatures: true
  }
};

// Function to get current environment configuration
export const getCurrentEnvironment = (): EnvironmentConfig => {
  // You can implement your own logic to detect the environment
  // For example, check window.location.hostname, environment variables, etc.
  
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    
    if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
      return developmentConfig;
    } else if (hostname.includes('staging') || hostname.includes('test')) {
      return stagingConfig;
    }
  }
  
  // Default to production
  return productionConfig;
};

// Current environment configuration
export const environment = getCurrentEnvironment();

// Helper functions
export const isProduction = (): boolean => environment.production;
export const isDevelopment = (): boolean => !environment.production;
export const isMockDataEnabled = (): boolean => environment.enableMockData;
export const isLoggingEnabled = (): boolean => environment.enableLogging;

// Feature flags helper
export const isFeatureEnabled = (feature: keyof EnvironmentConfig['features']): boolean => {
  return environment.features[feature];
};