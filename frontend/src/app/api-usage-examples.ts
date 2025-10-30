/**
 * API Constants Usage Examples
 * This file demonstrates how to use the new centralized API constants
 */

import { 
  API_ENDPOINTS, 
  COMPANY_ENDPOINTS, 
  STOCK_ENDPOINTS,
  buildApiUrl 
} from './constants/api-endpoints.constants';
import { environment } from './constants/environment.constants';

// Example 1: Direct endpoint usage
console.log('Company API Endpoints:');
console.log('Create Company:', COMPANY_ENDPOINTS.CREATE);
console.log('Get All Companies:', COMPANY_ENDPOINTS.GET_ALL);
console.log('Get Company by ID 123:', COMPANY_ENDPOINTS.GET_BY_ID(123));
console.log('Update Company 456:', COMPANY_ENDPOINTS.UPDATE(456));
console.log('Delete Company 789:', COMPANY_ENDPOINTS.DELETE(789));

// Example 2: Using the centralized API_ENDPOINTS object
console.log('\nUsing centralized API_ENDPOINTS:');
console.log('Company Base:', API_ENDPOINTS.COMPANY.BASE);
console.log('Stock Base:', API_ENDPOINTS.STOCK.BASE);
console.log('Portfolio Base:', API_ENDPOINTS.PORTFOLIO.BASE);

// Example 3: Building URLs with query parameters
console.log('\nBuilding URLs with query parameters:');
const searchUrl = buildApiUrl(COMPANY_ENDPOINTS.SEARCH, {
  search: 'Apple',
  limit: 10,
  page: 1,
  sortBy: 'name',
  sortOrder: 'asc'
});
console.log('Search URL:', searchUrl);

const companiesUrl = buildApiUrl(COMPANY_ENDPOINTS.GET_ALL, {
  limit: 20,
  page: 2
});
console.log('Companies with pagination:', companiesUrl);

// Example 4: Environment-based configuration
console.log('\nEnvironment Configuration:');
console.log('API Base URL:', environment.apiBaseUrl);
console.log('API Version:', environment.apiVersion);
console.log('Is Production:', environment.production);
console.log('Mock Data Enabled:', environment.enableMockData);
console.log('Logging Enabled:', environment.enableLogging);

// Example 5: Stock API endpoints
console.log('\nStock API Endpoints:');
console.log('Get Stock Price for ID 100:', STOCK_ENDPOINTS.GET_PRICE(100));
console.log('Get Price History for ID 200:', STOCK_ENDPOINTS.GET_PRICE_HISTORY(200));
console.log('Portfolio Performance:', STOCK_ENDPOINTS.PERFORMANCE);
console.log('Market Data:', STOCK_ENDPOINTS.MARKET_DATA);

// Example 6: Export endpoints with different formats
console.log('\nExport Endpoints:');
console.log('Export Companies CSV:', buildApiUrl(COMPANY_ENDPOINTS.EXPORT, { format: 'csv' }));
console.log('Export Companies Excel:', buildApiUrl(COMPANY_ENDPOINTS.EXPORT, { format: 'excel' }));
console.log('Export Companies PDF:', buildApiUrl(COMPANY_ENDPOINTS.EXPORT, { format: 'pdf' }));

export const API_USAGE_EXAMPLES = {
  COMPANY_ENDPOINTS,
  STOCK_ENDPOINTS,
  API_ENDPOINTS,
  buildApiUrl,
  environment
};