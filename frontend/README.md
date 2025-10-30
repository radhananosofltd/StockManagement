# Stock Management UI - Frontend

Angular frontend application for the Stock Management System with modern dashboard interface, centralized API endpoints, and comprehensive form validation.

## 🚀 Features

- ✨ **Modern Dashboard**: Professional sidebar navigation with responsive design
- 🏢 **Company Management**: Complete CRUD operations with form validation
- 📊 **Stock Management**: Ready for stock data management (expandable)
- 📈 **Reports**: Framework for generating various reports
- 🔄 **API Integration**: Centralized endpoint management with environment support
- 🎯 **Centralized API Constants**: All endpoints organized in constants files
- 🌍 **Environment Management**: Development, staging, and production configurations  
- 🔧 **HTTP Service**: Generic service for consistent API calls
- 🛡️ **Form Validation**: Advanced validation with custom validators
- 📱 **Responsive Design**: Works seamlessly across all devices
- ⚡ **Mock Data Support**: Development mode with simulated API responses

## 🛠️ Development Setup

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v20.3.8)

### Installation & Running
```bash
# Install dependencies
npm install

# Start development server
ng serve --port 4201

# Build for production
ng build --configuration production
```

## 🏗️ Project Structure

```
src/app/
├── constants/                # API endpoints and environment config
│   ├── api-endpoints.constants.ts
│   ├── environment.constants.ts
│   └── index.ts
├── services/                 # HTTP and business logic services
│   ├── http.service.ts
│   ├── company.service.ts
│   └── index.ts
├── components/               # UI components
│   ├── dashboard.component.ts
│   ├── sidebar.component.ts
│   ├── company-page.component.ts
│   └── home-page.component.ts
├── app.routes.ts            # Application routing
├── app.config.ts            # Angular configuration
└── main.ts                  # Application bootstrap
```

## 📋 Form Validation

### Company ID (Integer Only)
- **Type**: Number input with custom validation
- **Validation**: Positive integers only, no decimal values
- **Input Restriction**: Keypress prevention for non-numeric characters
- **Examples**: 1001, 2500, 9999

### Company Name
- **Required**: Yes
- **Minimum Length**: 2 characters
- **Examples**: Apple Inc., Microsoft Corporation, Tesla Inc.

## 🌍 Environment Configuration

### Development Environment
- API Base URL: `https://api-dev.example.com`
- Mock Data: ✅ Enabled
- Logging: ✅ Enabled

### Production Environment
- API Base URL: `https://api.example.com`
- Mock Data: ❌ Disabled
- Logging: ❌ Disabled

## 🔧 Development Commands

```bash
# Development
ng serve --port 4201          # Start dev server
ng build --configuration development  # Development build

# Production
ng build --configuration production   # Production build

# Testing & Quality
ng test                       # Run unit tests
ng lint                       # Run linting
ng generate component name    # Generate component
```

## 📚 Usage Examples

### Basic API Endpoint Usage
```typescript
import { COMPANY_ENDPOINTS } from './constants';

// Direct endpoint usage
const createUrl = COMPANY_ENDPOINTS.CREATE;
const getByIdUrl = COMPANY_ENDPOINTS.GET_BY_ID(123);
```

### Service Usage
```typescript
import { CompanyService } from './services';

// Inject service and use
this.companyService.submitCompany(companyData).subscribe(response => {
  console.log('Company created:', response);
});
```

## 🎨 UI Components

### Dashboard Layout
- **Header**: Application title and navigation
- **Sidebar**: Left navigation with menu items
- **Content Area**: Dynamic page content
- **Responsive**: Mobile-friendly design

### Company Management Page
- **Form**: Reactive forms with validation
- **Quick Actions**: View, import, export functionality  
- **Success/Error States**: User feedback with styled messages
- **Loading States**: Spinner during API calls

## 🚀 Available Routes

- `/dashboard/home` - Dashboard home page with statistics
- `/dashboard/company` - Company management form
- `/dashboard/stocks` - Stock management (ready for implementation)
- `/dashboard/reports` - Reports section (ready for implementation)

## 🔄 API Response Formats

### Success Response
```json
{
  "success": true,
  "message": "Company Apple Inc. (1001) has been successfully added!",
  "data": {
    "id": 1001,
    "name": "Apple Inc.",
    "createdAt": "2025-10-30T00:00:00Z"
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Failed to create company",
  "error": "Validation error: Company ID already exists"
}
```

---

**🎯 Production Ready!** This frontend application is fully functional with centralized API management, professional UI design, and comprehensive validation systems.